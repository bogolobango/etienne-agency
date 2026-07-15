/**
 * Shared SEO metadata for every public route.
 */

export const BASE_URL = "https://www.etienneagency.com";
export const OG_IMAGE = `${BASE_URL}/images/og-image.png`;
export const SITE_NAME = "Etienne";

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}

const staticRoutes: Record<string, PageMeta> = {
  "/": {
    title: "Exit-Ready Operations for Multi-Location Medspas | Etienne",
    description:
      "Etienne finds the $200K to $500K/yr your medspa group is leaking, runs the 90-day system that closes it with your team, and builds the paper trail PE buyers pay a premium for. Free 48-hour Leakage Map.",
  },
  "/how-it-works": {
    title: "How Etienne Works | Exit-Ready Ops for Medspas",
    description:
      "Three tiers: free 48-hour Leakage Map, the 90-day Exit Engine, and the Operator's Desk for continuity. Your team executes. We run the system that makes execution happen.",
  },
  "/med-spas": {
    title: "Built for Multi-Location Medspas | Etienne",
    description:
      "Running 5 to 25 medspa locations? Etienne finds every dollar leak, closes it with your team in 90 days, and builds the operating cadence PE buyers pay a premium for.",
  },
  "/industries": {
    title: "Built for Multi-Location Medspas | Etienne",
    description:
      "Running 5 to 25 medspa locations? Etienne finds every dollar leak, closes it with your team in 90 days, and builds the operating cadence PE buyers pay a premium for.",
  },
  "/calculator": {
    title: "Revenue Gap Calculator for Multi-Location Medspas | Etienne",
    description:
      "See how much revenue your medspa locations are losing to no-shows, utilization gaps, and missed rebookings. Free, based on AmSpa and Zenoti benchmarks.",
  },
  "/contact": {
    title: "Get in Touch | Etienne",
    description:
      "Talk to Jim. We'll walk you through what a free Leakage Map would surface from your booking data. No pitch deck. No commitment.",
  },
  "/about": {
    title: "About Etienne | Exit-Ready Operations for Medspas",
    description:
      "Etienne runs the operating system that turns multi-location medspa groups into the kind of business PE buyers pay a premium for. Free 48-hour Leakage Map to start.",
  },
  "/privacy": {
    title: "Privacy Policy | Etienne",
    description: "Read the Etienne Agency privacy policy. Learn how we collect, use, and protect your data.",
  },
  "/terms": {
    title: "Terms of Service | Etienne",
    description: "Read the Etienne Agency terms of service and conditions of use.",
  },
  "/sample-audit": {
    title: "Sample Leakage Map | See What You Get | Etienne",
    description:
      "See a real Leakage Map before you send a CSV. Yours arrives in 48 hours with your actual numbers.",
  },
};

const industryRoutes: Record<string, PageMeta> = {};

const industryNames: Record<string, string> = {};

const breadcrumbLabels: Record<string, string> = {
  "/how-it-works": "How It Works",
  "/med-spas": "Med Spas",
  "/industries": "Med Spas",
  "/calculator": "Revenue Gap Calculator",
  "/contact": "Get in Touch",
  "/about": "About",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
  "/sample-audit": "Sample Leakage Map",
};

export function getBreadcrumbJsonLd(pathname: string): object | null {
  if (pathname === "/") return null;

  const items: { name: string; url: string }[] = [
    { name: "Home", url: BASE_URL },
  ];

  if (breadcrumbLabels[pathname]) {
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
  return staticRoutes["/"];
}
