/**
 * Shared SEO metadata for every public route.
 */

export const BASE_URL = "https://etienneagency.com";
export const OG_IMAGE = `${BASE_URL}/images/og-image.png`;
export const SITE_NAME = "Etienne Agency";

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}

const staticRoutes: Record<string, PageMeta> = {
  "/": {
    title: "Etienne Agency — AI Revenue Recovery for Multi-Location Med Spas",
    description:
      "Multi-location med spas lose $8K–15K/month per location from missed after-hours inquiries. Etienne Agency's AI captures and converts them automatically. Book a free revenue audit.",
  },
  "/how-it-works": {
    title: "How It Works — AI Revenue Recovery for Med Spas | Etienne Agency",
    description:
      "From integration to revenue recovery in 4 weeks. EIP plugs into your Zenoti, Boulevard, or Mangomint platform and captures missed revenue automatically.",
  },
  "/med-spas": {
    title: "AI Revenue Recovery for Med Spas — Etienne Agency",
    description:
      "The average 5-location med spa loses $60K–$180K/year from missed inquiries and no-shows. EIP recovers it automatically without replacing your booking system.",
  },
  "/industries": {
    title: "AI Revenue Recovery for Med Spas — Etienne Agency",
    description:
      "The average 5-location med spa loses $60K–$180K/year from missed inquiries and no-shows. EIP recovers it automatically without replacing your booking system.",
  },
  "/contact": {
    title: "Book Your Free Revenue Audit | 15 Minutes, No Pitch | Etienne Agency",
    description:
      "Schedule a free 15-minute discovery call. We'll show you exactly how many leads you're losing to missed inquiries and how to fix it in 4 weeks.",
  },
  "/about": {
    title: "About Etienne Agency — The Intelligence Layer for Med Spas",
    description:
      "Etienne Agency builds AI revenue recovery for multi-location med spas. Founded by Fortune 500 AI sales veterans, now bringing enterprise intelligence to local businesses.",
  },
  "/privacy": {
    title: "Privacy Policy | Etienne Agency",
    description: "Read the Etienne Agency privacy policy. Learn how we collect, use, and protect your data.",
  },
  "/terms": {
    title: "Terms of Service | Etienne Agency",
    description: "Read the Etienne Agency terms of service and conditions of use.",
  },
};

const industryRoutes: Record<string, PageMeta> = {
  medspa: {
    title: "AI Revenue Recovery for Med Spas — Etienne Agency",
    description:
      "The average 5-location med spa loses $60K–$180K/year from missed inquiries and no-shows. EIP recovers it automatically without replacing your booking system.",
  },
};

const industryNames: Record<string, string> = {
  medspa: "Med Spas",
};

const breadcrumbLabels: Record<string, string> = {
  "/how-it-works": "How It Works",
  "/med-spas": "Med Spas",
  "/industries": "Med Spas",
  "/contact": "Contact",
  "/about": "About",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
};

export function getBreadcrumbJsonLd(pathname: string): object | null {
  if (pathname === "/") return null;

  const items: { name: string; url: string }[] = [
    { name: "Home", url: BASE_URL },
  ];

  const industryMatch = pathname.match(/^\/industries\/([^/]+)$/);
  if (industryMatch) {
    const slug = industryMatch[1];
    items.push({ name: "Med Spas", url: `${BASE_URL}/med-spas` });
    if (industryNames[slug]) {
      items.push({ name: industryNames[slug], url: `${BASE_URL}/industries/${slug}` });
    }
  } else if (breadcrumbLabels[pathname]) {
    items.push({ name: breadcrumbLabels[pathname], url: `${BASE_URL}${pathname}` });
  }

  if (items.length < 2) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getPageMeta(pathname: string): PageMeta {
  if (staticRoutes[pathname]) return staticRoutes[pathname];

  const industryMatch = pathname.match(/^\/industries\/([^/]+)$/);
  if (industryMatch) {
    const slug = industryMatch[1];
    if (industryRoutes[slug]) return industryRoutes[slug];
  }

  return staticRoutes["/"];
}
