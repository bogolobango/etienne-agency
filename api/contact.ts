import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { contactSchema, type ContactFormData } from "../server/contact.schema.js";

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
    const body = await res.text();
    throw new Error(`Airtable API ${res.status}: ${body}`);
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
    subject: `New Discovery Call Request: ${data.name} — ${data.company}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7C3AED;">New Discovery Call Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #6B7280; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;">Phone</td><td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;">Company</td><td style="padding: 8px 0;">${data.company}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;">Industry</td><td style="padding: 8px 0;">${industryLabels[data.industry] || data.industry}</td></tr>
          <tr><td style="padding: 8px 0; color: #6B7280;">Locations</td><td style="padding: 8px 0;">${data.locations}</td></tr>
          ${data.challenge ? `<tr><td style="padding: 8px 0; color: #6B7280; vertical-align: top;">Challenge</td><td style="padding: 8px 0;">${data.challenge}</td></tr>` : ""}
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
  console.log("[contact] Incoming request", {
    method: req.method,
    hasBody: !!req.body,
    timestamp: new Date().toISOString(),
  });

  // Only allow POST
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "https://etienneagency.com");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
    res.setHeader("Access-Control-Max-Age", "86400");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // CSRF: reject requests missing the custom header
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

  // Send email notification (silent-fail)
  try {
    await sendNotificationEmail(data);
  } catch (err) {
    console.error("Failed to send email notification:", err);
  }

  // Push to Airtable (silent-fail)
  try {
    await createAirtableRecord(data, submittedAt);
  } catch (err) {
    console.error("Failed to create Airtable record:", err);
  }

  console.log("[contact] Submission processed successfully", {
    name: data.name,
    company: data.company,
    industry: data.industry,
    submittedAt,
  });

  return res.json({
    success: true,
    message: "Thank you! We'll reach out within 2 hours.",
  });
}
