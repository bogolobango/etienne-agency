import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, stack, url, timestamp } = req.body || {};
  console.error(`[client-error] ${timestamp} ${url}: ${message}\n${stack || ""}`);

  return res.status(204).end();
}
