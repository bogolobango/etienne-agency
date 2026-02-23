import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import nodemailer from "nodemailer";
import { contactSchema, type ContactFormData } from "./contact.schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Industry key → Airtable display label mapping
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
// Email notification helper
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
// Airtable integration helper
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
      typecast: true, // auto-create select options if they don't exist yet
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Airtable API ${res.status}: ${body}`);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Server bootstrap
// ---------------------------------------------------------------------------
function validateEnv() {
  const warnings: string[] = [];
  if (process.env.NODE_ENV === "production") {
    if (!process.env.CORS_ORIGIN) warnings.push("CORS_ORIGIN not set — defaulting to https://etienneagency.com");
    if (!process.env.SMTP_HOST) warnings.push("SMTP_HOST not set — email notifications disabled");
    if (!process.env.NOTIFY_EMAIL) warnings.push("NOTIFY_EMAIL not set — using default recipient");
    if (!process.env.AIRTABLE_PAT) warnings.push("AIRTABLE_PAT not set — Airtable integration disabled");
    if (!process.env.AIRTABLE_BASE_ID) warnings.push("AIRTABLE_BASE_ID not set — Airtable integration disabled");
  }
  for (const w of warnings) console.warn(`[env] ${w}`);
}

async function startServer() {
  validateEnv();

  const app = express();
  const server = createServer(app);

  // --- Logging ---
  app.use(
    morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")
  );

  // --- Security headers ---
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "https://va.vercel-scripts.com"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", "https://va.vercel-scripts.com", "https://vitals.vercel-insights.com", "https:"],
          frameSrc: ["'none'"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
        },
      },
    })
  );

  // --- CORS ---
  const allowedOrigin = process.env.CORS_ORIGIN || "https://etienneagency.com";
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? allowedOrigin
          : true, // allow all in dev only
      credentials: true,
    })
  );

  // --- Body parsing ---
  app.use(express.json({ limit: "100kb" }));

  // --- Health check ---
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // --- Client error logging endpoint ---
  const errorLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.post("/api/error", errorLimiter, (req, res) => {
    const { message, stack, url, timestamp } = req.body || {};
    console.error(`[client-error] ${timestamp} ${url}: ${message}\n${stack || ""}`);
    res.status(204).end();
  });

  // --- Contact form rate limiter ---
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 submissions per window per IP
    message: { error: "Too many submissions. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // --- Contact form endpoint (fixes #1 + #4) ---
  app.post("/api/contact", contactLimiter, async (req, res) => {
    // CSRF: reject requests missing the custom header (browsers block
    // cross-origin requests with custom headers via preflight)
    if (req.header("X-Requested-With") !== "fetch") {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    const result = contactSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: "Validation failed",
        details: result.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
      return;
    }

    const data = result.data;
    const submission = {
      ...data,
      submittedAt: new Date().toISOString(),
    };

    // Persist to local JSON log (works even without a DB)
    try {
      const dataDir = path.resolve(__dirname, "..", "data");
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
      const logFile = path.join(dataDir, "contact-submissions.json");
      const existing = fs.existsSync(logFile)
        ? JSON.parse(fs.readFileSync(logFile, "utf-8"))
        : [];
      existing.push(submission);
      fs.writeFileSync(logFile, JSON.stringify(existing, null, 2));
    } catch (err) {
      console.error("Failed to save submission to file:", err);
    }

    // Send email notification (silent-fail if SMTP not configured)
    try {
      await sendNotificationEmail(data);
    } catch (err) {
      console.error("Failed to send email notification:", err);
    }

    // Push to Airtable (silent-fail if not configured)
    try {
      await createAirtableRecord(data, submission.submittedAt);
    } catch (err) {
      console.error("Failed to create Airtable record:", err);
    }

    res.json({
      success: true,
      message: "Thank you! We'll reach out within 2 hours.",
    });
  });

  // --- Static files ---
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // --- SPA fallback ---
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
