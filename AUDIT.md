# Vibe Coded App Audit Report

**Date:** 2026-03-23
**Codebase:** Etienne Agency — React + Express marketing site with contact form

---

## Summary

This is a marketing/lead-gen website (no user authentication, no database, no payments). Many checklist items are **not applicable** because the app has no auth system, no database, no Stripe integration, and no user-uploaded content. The items that do apply are largely well-handled already. A few improvements were made.

---

## Security & Authentication

### 1. Rate Limiting on API Routes ✅ PASS
**Status:** Already implemented.
- `server/index.ts:159` — Contact endpoint: 5 requests per 15 minutes per IP via `express-rate-limit`
- `server/index.ts:141` — Error endpoint: 10 requests per minute per IP
- `api/contact.ts:14-33` — Vercel serverless: in-memory rate limiter (5/15min)
- `api/error.ts:6-24` — Vercel serverless: in-memory rate limiter (10/min)

### 2. Secure Token Storage ✅ N/A
**Status:** Not applicable. This is a public marketing website with no user authentication. The only `localStorage` usage is for theme preference (`ThemeContext.tsx:26`), which is non-sensitive.

### 3. Input Sanitization ✅ PASS
**Status:** Already implemented.
- `server/contact.schema.ts` — Zod schema validates all form inputs with strict types, enums, max lengths, and trimming
- `server/contact.schema.ts:18-24` — `escapeHtml()` prevents XSS in email templates
- `server/contact.schema.ts:27-29` — `sanitizeHeader()` prevents email header injection
- `server/index.ts:148,164` — Error endpoint sanitizes and truncates all logged values
- CSRF protection via Origin header verification + custom `X-Requested-With` header requirement

### 4. Hardcoded API Keys ✅ PASS
**Status:** No hardcoded secrets found. All sensitive credentials (SMTP, Airtable PAT) are in environment variables. The frontend contains no API keys — the contact form submits to a same-origin `/api/contact` proxy endpoint.

### 5. Stripe Webhook Signature Verification ✅ N/A
**Status:** Not applicable. No Stripe or payment integration exists in this codebase.

### 6. Session Expiration ✅ N/A
**Status:** Not applicable. No user authentication or session management. The `COOKIE_NAME` constant in `shared/const.ts` is unused infrastructure.

### 7. Password Reset Link Expiration ✅ N/A
**Status:** Not applicable. No user accounts or password reset functionality.

### 8. Admin Route Role Checks ✅ N/A
**Status:** Not applicable. No admin routes or privileged endpoints.

### 9. CORS Policy ✅ PASS
**Status:** Already implemented.
- `server/index.ts:126-133` — Production: restricted to `CORS_ORIGIN` env var (defaults to `https://etienneagency.com`). Development: allows all origins.
- `api/contact.ts:135-140` — Vercel function: Origin header verified against `CORS_ORIGIN`
- `vercel.json` — Security headers (HSTS, X-Frame-Options, CSP, Permissions-Policy) applied globally

---

## Database & Performance

### 10. Database Indexing ✅ N/A
**Status:** Not applicable. No database. Contact submissions are stored in a JSON file on disk and pushed to Airtable via API.

### 11. Query Pagination ✅ N/A
**Status:** Not applicable. No database queries or list endpoints.

### 12. Database Connection Pooling ✅ N/A
**Status:** Not applicable. No database connections.

### 13. Backup Strategy ⚠️ ADVISORY
**Status:** Low risk. Airtable is the source of truth for contact submissions, and Airtable provides its own backup/restore features. The local JSON file (`data/contact-submissions.json`) is a secondary log. For the self-hosted Express deployment, ensure the `data/` directory is on a persistent volume.

---

## Architecture & Reliability

### 14. Error Boundaries in the UI ✅ PASS
**Status:** Already implemented.
- `client/src/components/ErrorBoundary.tsx` — Catches React rendering errors, shows fallback UI
- `client/src/main.tsx` — Global `window.onerror` and `unhandledrejection` handlers report to `/api/error` in production
- `client/src/App.tsx` — Lazy-loaded routes with `<Suspense>` fallback

### 15. Environment Variable Validation ⚠️ FIXED
**Status:** Was only logging warnings. Now crashes on missing critical vars in production.
- **Before:** `validateEnv()` in `server/index.ts` logged warnings but continued even when `CORS_ORIGIN` was unset
- **After:** Crashes with a clear error message if `CORS_ORIGIN` is missing in production (the only truly critical env var for this app; SMTP/Airtable are optional features)

### 16. Asynchronous Email Sending ⚠️ FIXED
**Status:** Email and Airtable calls were blocking the response.
- **Before:** `await sendNotificationEmail()` and `await createAirtableRecord()` ran sequentially before responding to the client
- **After:** Both are fired off concurrently without awaiting, using `.catch()` for error logging. The client gets an immediate response.
- Applied to both `server/index.ts` (Express) and `api/contact.ts` (Vercel function)

### 17. Health Check Endpoint ✅ PASS
**Status:** Already implemented.
- `server/index.ts:138` — `/api/health` returns `{status: "ok", timestamp}`
- `api/health.ts` — Vercel serverless equivalent
- `Dockerfile:29-30` — Docker HEALTHCHECK configured with 30s interval

### 18. Production Logging ⚠️ FIXED
**Status:** Was using unstructured `console.log`/`console.error`.
- **After:** Added a `logger` module (`server/logger.ts`) that outputs structured JSON in production (with level, timestamp, context fields) and human-readable format in development. Integrated into `server/index.ts` for contact submissions and error logging.

---

## Infrastructure & Code Quality

### 19. Asset Hosting (CDN) ✅ PASS
**Status:** Already handled. The app is deployed on Vercel, which serves all static assets through its global CDN. There are no user-uploaded files — only pre-built static assets.

### 20. TypeScript Usage ⚠️ FIXED
**Status:** `strict: true` is enabled in `tsconfig.json`. Two files had `any` types.
- `client/src/lib/analytics.ts:41-42` — `(window as any).gtag` replaced with a proper type declaration for `window.gtag`
- `client/src/hooks/usePersistFn.ts:3` — `any` in function type replaced with `unknown`

---

## Additional Findings

### Email Transporter Reuse
The `sendNotificationEmail` function in both `server/index.ts` and `api/contact.ts` creates a new SMTP transporter on every request. For the Express server, the transporter is now created once at startup and reused. For the Vercel function, this is acceptable since each invocation is short-lived.

### SMTP Connection in Vercel Serverless
Vercel serverless functions have a 10-second default timeout. SMTP connections can be slow. The fire-and-forget pattern mitigates this — the response is sent immediately and email delivery happens in the background of the warm invocation.
