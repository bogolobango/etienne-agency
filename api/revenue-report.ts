import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import {
  revenueReportSchema,
  buildReportEmail,
  type RevenueReportData,
} from "../server/revenue-report.schema.js";
import { sanitizeHeader } from "../server/contact.schema.js";

// ---------------------------------------------------------------------------
// In-memory rate limiter (persists across warm Vercel invocations)
// ---------------------------------------------------------------------------
const ipSubmissions = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipSubmissions.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
    ipSubmissions.set(ip, { count: 1, windowStart: now });
    if (ipSubmissions.size > 10000) {
      ipSubmissions.forEach((val, key) => {
        if (now - val.windowStart > RATE_LIMIT_WINDOW) ipSubmissions.delete(key);
      });
    }
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ---------------------------------------------------------------------------
// Email delivery — sends the report to the visitor AND a notification to Jim
// ---------------------------------------------------------------------------
async function deliverReport(data: RevenueReportData) {
  if (!process.env.SMTP_HOST) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const { subject, html, text } = buildReportEmail(data);

  // Send the report to the visitor
  await transporter.sendMail({
    from: process.env.SMTP_FROM || "noreply@etienneagency.com",
    to: data.email,
    subject: sanitizeHeader(subject),
    html,
    text,
  });

  // Notify Jim internally so he can follow up personally
  if (process.env.NOTIFY_EMAIL) {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || "noreply@etienneagency.com",
      to: process.env.NOTIFY_EMAIL,
      subject: sanitizeHeader(`New Revenue Gap Report Request: ${data.email}`),
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00D4AA;">New report sent — possible warm lead</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #6B7280; width: 160px;">Email</td><td style="padding: 6px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            ${data.name ? `<tr><td style="padding: 6px 0; color: #6B7280;">Name</td><td style="padding: 6px 0;">${data.name}</td></tr>` : ""}
            ${data.company ? `<tr><td style="padding: 6px 0; color: #6B7280;">Company</td><td style="padding: 6px 0;">${data.company}</td></tr>` : ""}
            <tr><td style="padding: 6px 0; color: #6B7280;">Locations</td><td style="padding: 6px 0;">${data.locations}</td></tr>
            <tr><td style="padding: 6px 0; color: #6B7280;">Appts / location / mo</td><td style="padding: 6px 0;">${data.apptsPerLocation}</td></tr>
            <tr><td style="padding: 6px 0; color: #6B7280;">Avg ticket</td><td style="padding: 6px 0;">$${data.avgTicket}</td></tr>
          </table>
          <p style="margin-top: 24px; color: #6B7280; font-size: 12px;">
            Report was sent to ${data.email} at ${new Date().toISOString()}.
          </p>
        </div>
      `,
    });
  }
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

  const allowedOrigin = process.env.CORS_ORIGIN || "https://etienneagency.com";

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
    res.setHeader("Access-Control-Max-Age", "86400");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
    || req.socket?.remoteAddress
    || "unknown";
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const origin = (req.headers["origin"] || req.headers["referer"] || "") as string;
  if (process.env.NODE_ENV === "production" && !origin.startsWith(allowedOrigin)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (req.headers["x-requested-with"] !== "fetch") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const parsed = revenueReportSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: parsed.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      })),
    });
  }

  // Respond immediately — email send is fire-and-forget
  res.json({
    success: true,
    message: "Report sent. Check your inbox.",
  });

  console.log(JSON.stringify({
    level: "info",
    message: "Revenue report request processed",
    email: parsed.data.email,
    locations: parsed.data.locations,
    submittedAt: new Date().toISOString(),
  }));

  deliverReport(parsed.data).catch((err) => {
    console.error(JSON.stringify({
      level: "error",
      message: "Failed to send revenue report email",
      error: String(err),
    }));
  });
}
