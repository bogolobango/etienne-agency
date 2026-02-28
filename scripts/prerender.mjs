/**
 * Build-time prerender script.
 *
 * Generates static HTML for each route so search engines and social media
 * crawlers can index actual page content without executing JavaScript.
 *
 * Run after:
 *   1. vite build                              (client → dist/public/)
 *   2. vite build --config vite.prerender.config.ts (SSR → dist/prerender/)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.resolve(ROOT, "dist", "public");

// ---------------------------------------------------------------------------
// Load the SSR bundle (contains render function + re-exported SEO helpers)
// ---------------------------------------------------------------------------
const {
  render,
  getPageMeta,
  getBreadcrumbJsonLd,
  BASE_URL,
  OG_IMAGE,
} = await import(path.resolve(ROOT, "dist", "prerender", "entry-prerender.js"));

// ---------------------------------------------------------------------------
// Read the Vite-built HTML template
// ---------------------------------------------------------------------------
const template = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

// ---------------------------------------------------------------------------
// Routes to prerender
// ---------------------------------------------------------------------------
const routes = [
  "/",
  "/how-it-works",
  "/med-spas",
  "/industries",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function esc(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ---------------------------------------------------------------------------
// Prerender each route
// ---------------------------------------------------------------------------
console.log("\n[prerender] Generating static HTML…\n");

let successCount = 0;

for (const route of routes) {
  try {
    // Render the React tree to HTML
    const appHtml = render(route);

    // Get route-specific SEO metadata
    const meta = getPageMeta(route);
    const canonicalUrl = `${BASE_URL}${route === "/" ? "" : route}`;
    const ogImage = meta.ogImage || OG_IMAGE;

    let html = template;

    // --- Inject rendered content into <div id="root"> ---
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    // --- Page title ---
    html = html.replace(
      /<title>[^<]*<\/title>/,
      `<title>${esc(meta.title)}</title>`
    );

    // --- Meta description ---
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${esc(meta.description)}" />`
    );

    // --- Open Graph ---
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

    // --- Twitter Card ---
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

    // --- Canonical URL ---
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${esc(canonicalUrl)}" />`
    );

    // --- BreadcrumbList JSON-LD ---
    const breadcrumb = getBreadcrumbJsonLd(route);
    if (breadcrumb) {
      html = html.replace(
        "</head>",
        `  <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>\n  </head>`
      );
    }

    // --- Write the file ---
    const outPath =
      route === "/"
        ? path.join(DIST, "index.html")
        : path.join(DIST, route, "index.html");

    const outDir = path.dirname(outPath);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    fs.writeFileSync(outPath, html, "utf-8");
    successCount++;
    console.log(`  ✓ ${route}`);
  } catch (err) {
    // Log but don't fail the build — the SPA fallback still works
    console.error(`  ✗ ${route} — ${err.message}`);
  }
}

console.log(`\n[prerender] Done — ${successCount}/${routes.length} routes.\n`);
