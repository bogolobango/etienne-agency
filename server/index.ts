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
import { contactSchema, escapeHtml, sanitizeHeader, type ContactFormData } from "./contact.schema.js";
import { getPageMeta, getBreadcrumbJsonLd, BASE_URL, OG_IMAGE, SITE_NAME } from "../shared/seoMeta.js";

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
    subject: sanitizeHeader(`New Discovery Call Request: ${data.name} — ${data.company}`),
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #7C3AED;">New Discovery Call Request</h2>
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
    // Do not log response body — may echo tokens or sensitive config
    throw new Error(`Airtable API error: HTTP ${res.status}`);
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
          scriptSrc: ["'self'", "'unsafe-inline'", "https://va.vercel-scripts.com", "https://www.googletagmanager.com", "https://assets.calendly.com"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://assets.calendly.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", "https://va.vercel-scripts.com", "https://vitals.vercel-insights.com", "https://www.google-analytics.com", "https:"],
          frameSrc: ["https://calendly.com"],
          objectSrc: ["'none'"],
          baseUri: ["'self'"],
          formAction: ["'self'"],
          upgradeInsecureRequests: [],
        },
      },
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    })
  );

  // Permissions-Policy: deny access to sensitive browser APIs
  app.use((_req, res, next) => {
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
    );
    next();
  });

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
    const { message, stack, url } = req.body || {};
    // Sanitize: only log verified strings, truncate to prevent log injection
    const safeMsg = typeof message === "string" ? message.slice(0, 500) : "unknown";
    const safeUrl = typeof url === "string" ? url.slice(0, 200) : "unknown";
    const safeStack = typeof stack === "string" ? stack.split("\n").slice(0, 5).join("\n") : "";
    console.error(`[client-error] ${safeUrl}: ${safeMsg}\n${safeStack}`);
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
    // CSRF layer 1: verify Origin header in production
    if (process.env.NODE_ENV === "production") {
      const origin = req.header("Origin") || req.header("Referer") || "";
      const expected = process.env.CORS_ORIGIN || "https://etienneagency.com";
      if (!origin.startsWith(expected)) {
        res.status(403).json({ error: "Forbidden" });
        return;
      }
    }

    // CSRF layer 2: reject requests missing the custom header (browsers
    // block cross-origin requests with custom headers via preflight)
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
      // Log only the message, not the full error object (may contain tokens)
      console.error("Failed to create Airtable record:", err instanceof Error ? err.message : "unknown error");
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

  app.use(express.static(staticPath, {
    dotfiles: "deny",
    index: false,
  }));

  // --- SPA fallback with SEO meta-tag injection ---
  // Read the index.html template once at startup so we can inject per-route
  // meta tags for crawlers that don't execute JavaScript (Bing, social
  // media link previews, etc.).
  const indexPath = path.join(staticPath, "index.html");
  let htmlTemplate = "";
  try {
    htmlTemplate = fs.readFileSync(indexPath, "utf-8");
  } catch {
    console.warn("[seo] Could not read index.html template — meta injection disabled");
  }

  app.get("*", (req, res) => {
    if (!htmlTemplate) {
      res.sendFile(indexPath);
      return;
    }

    const meta = getPageMeta(req.path);
    const canonicalUrl = `${BASE_URL}${req.path === "/" ? "" : req.path}`;
    const ogImage = meta.ogImage || OG_IMAGE;

    // Escape HTML entities in meta content to prevent injection
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    let html = htmlTemplate;

    // Replace <title>
    html = html.replace(
      /<title>[^<]*<\/title>/,
      `<title>${esc(meta.title)}</title>`
    );

    // Replace meta description
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${esc(meta.description)}" />`
    );

    // Replace Open Graph tags
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${esc(meta.title)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${esc(meta.description)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${esc(canonicalUrl)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:image" content="${esc(ogImage)}" />`
    );

    // Replace Twitter Card tags
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${esc(meta.title)}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${esc(meta.description)}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:image" content="${esc(ogImage)}" />`
    );

    // Inject canonical link (add before </head> if not present)
    if (!html.includes('rel="canonical"')) {
      html = html.replace(
        "</head>",
        `  <link rel="canonical" href="${esc(canonicalUrl)}" />\n  </head>`
      );
    }

    // Inject BreadcrumbList JSON-LD for subpages
    const breadcrumb = getBreadcrumbJsonLd(req.path);
    if (breadcrumb) {
      html = html.replace(
        "</head>",
        `  <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>\n  </head>`
      );
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(html);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
