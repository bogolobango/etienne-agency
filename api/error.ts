import type { VercelRequest, VercelResponse } from "@vercel/node";

// Simple in-memory rate limiter for error reporting (warm instance scope)
const ipHits = new Map<string, { count: number; windowStart: number }>();
const WINDOW = 60_000; // 1 minute
const MAX = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW) {
    ipHits.set(ip, { count: 1, windowStart: now });
    if (ipHits.size > 5000) {
      ipHits.forEach((val, key) => {
        if (now - val.windowStart > WINDOW) ipHits.delete(key);
      });
    }
    return false;
  }
  entry.count++;
  return entry.count > MAX;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
    || req.socket?.remoteAddress
    || "unknown";
  if (isRateLimited(clientIp)) {
    return res.status(429).end();
  }

  const { message, stack, url } = req.body || {};
  // Sanitize: only log verified strings, truncate to prevent log injection
  const safeMsg = typeof message === "string" ? message.slice(0, 500) : "unknown";
  const safeUrl = typeof url === "string" ? url.slice(0, 200) : "unknown";
  const safeStack = typeof stack === "string" ? stack.split("\n").slice(0, 5).join("\n") : "";
  console.error(`[client-error] ${safeUrl}: ${safeMsg}\n${safeStack}`);

  return res.status(204).end();
}
