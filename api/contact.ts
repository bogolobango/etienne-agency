import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { contactSchema, escapeHtml, sanitizeHeader, type ContactFormData } from "../server/contact.schema.js";

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
    // Prevent memory leak: prune stale entries periodically
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
// Industry key → display label
// ---------------------------------------------------------------------------
const industryLabels: Record<string, string> = {
  medspa: "Med Spa",
  dental: "Dental",
  law: "Law Firm",
  property: "Property Management",
  accounting: "Accounting",
  cleaning: "Cleaning",
  sports: "Sports Facility",
  other: "Other",
};

// ---------------------------------------------------------------------------
// Airtable
// ---------------------------------------------------------------------------
async function createAirtableRecord(data: ContactFormData, submittedAt: string) {
  const token = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID || "Discovery Call Submissions";

  if (!token || !baseId) return;

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        Name: data.name,
        Email: data.email,
        Phone: data.phone,
        Company: data.company,
        Industry: industryLabels[data.industry] || data.industry,
        Locations: data.locations,
        Challenge: data.challenge || "",
        "Submitted At": submittedAt,
        Status: "New",
        Source: "Website",
      },
      typecast: true,
    }),
  });

  if (!res.ok) {
    // Do not log response body — may echo tokens or sensitive config
    throw new Error(`Airtable API error: HTTP ${res.status}`);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Email notification
// ---------------------------------------------------------------------------
async function sendNotificationEmail(data: ContactFormData) {
  if (!process.env.SMTP_HOST || !process.env.NOTIFY_EMAIL) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "noreply@etienneagency.com",
    to: process.env.NOTIFY_EMAIL!,
    subject: sanitizeHeader(`New Discovery Call Request: ${data.name} — ${data.company}`),
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00D4AA;">New Discovery Call Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6B7280; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;">Phone</td><td style="padding: 8px 0;"><a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;">Company</td><td style="padding: 8px 0;">${escapeHtml(data.company)}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;">Industry</td><td style="padding: 8px 0;">${escapeHtml(industryLabels[data.industry] || data.industry)}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;">Locations</td><td style="padding: 8px 0;">${escapeHtml(data.locations)}</td></tr>
          ${data.challenge ? `<tr><td style="padding: 8px 0; color: #6B7280; vertical-align: top;">Challenge</td><td style="padding: 8px 0;">${escapeHtml(data.challenge)}</td></tr>` : ""}
        </table>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #E5E7EB;" />
        <p style="color: #9CA3AF; font-size: 12px;">Submitted at ${new Date().toISOString()}</p>
      </div>
    `,
  });
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // --- Security response headers ---
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  );

  const allowedOrigin = process.env.CORS_ORIGIN || "https://etienneagency.com";

  // Only allow POST
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

  // --- Rate limiting ---
  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim()
    || req.socket?.remoteAddress
    || "unknown";
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: "Too many submissions. Please try again later." });
  }

  // CSRF layer 1: verify Origin header
  const origin = (req.headers["origin"] || req.headers["referer"] || "") as string;
  if (!origin.startsWith(allowedOrigin)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // CSRF layer 2: reject requests missing the custom header
  if (req.headers["x-requested-with"] !== "fetch") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: result.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      })),
    });
  }

  const data = result.data;
  const submittedAt = new Date().toISOString();

  // Respond immediately — don't block on email/Airtable
  res.json({
    success: true,
    message: "Thank you! We'll reach out within 2 hours.",
  });

  console.log(JSON.stringify({
    level: "info",
    message: "Contact submission processed",
    name: data.name,
    company: data.company,
    industry: data.industry,
    submittedAt,
  }));

  // Fire-and-forget: email + Airtable run concurrently after response
  sendNotificationEmail(data).catch((err) => {
    console.error(JSON.stringify({
      level: "error",
      message: "Failed to send email notification",
      error: String(err),
    }));
  });
  createAirtableRecord(data, submittedAt).catch((err) => {
    console.error(JSON.stringify({
      level: "error",
      message: "Failed to create Airtable record",
      error: err instanceof Error ? err.message : "unknown error",
    }));
  });
}
