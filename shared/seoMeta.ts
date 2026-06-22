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
    title: "Done-for-You Revenue Recovery for Multi-Location Medspas | Etienne",
    description:
      "Etienne finds where your medspa locations are losing revenue and hands you a 4-page audit in 48 hours. No platform to log into. Built for owners running 3-25 centers.",
  },
  "/how-it-works": {
    title: "How Etienne Works | Revenue Recovery for Multi-Location Medspas",
    description:
      "Three steps: share your booking data, get a 4-page audit in 48 hours, act on clear findings. Done-for-you revenue recovery for multi-location medspa operators.",
  },
  "/med-spas": {
    title: "Built for Multi-Location Medspas | Etienne Revenue Recovery",
    description:
      "Running 3-25 medspa locations? Etienne delivers a done-for-you audit showing exactly where you're losing revenue to no-shows, rebooking gaps, and missed calls.",
  },
  "/industries": {
    title: "Built for Multi-Location Medspas | Etienne Revenue Recovery",
    description:
      "Running 3-25 medspa locations? Etienne delivers a done-for-you audit showing exactly where you're losing revenue to no-shows, rebooking gaps, and missed calls.",
  },
  "/calculator": {
    title: "Revenue Gap Calculator for Multi-Location Medspas | Etienne",
    description:
      "See how much revenue your medspa locations are losing to no-shows, utilization gaps, and missed rebookings. Free calculator based on AmSpa and Zenoti benchmarks.",
  },
  "/contact": {
    title: "Get in Touch | Etienne Revenue Recovery",
    description:
      "Talk to the Etienne team. We'll walk you through what a done-for-you audit would surface from your booking data. No pitch deck. No commitment.",
  },
  "/about": {
    title: "About Etienne | Done-for-You Revenue Recovery",
    description:
      "Etienne delivers done-for-you revenue recovery audits for multi-location medspa operators. A 4-page report in 48 hours showing exactly where revenue is leaking.",
  },
  "/privacy": {
    title: "Privacy Policy | Etienne",
    description: "Read the Etienne Agency privacy policy. Learn how we collect, use, and protect your data.",
  },
  "/terms": {
    title: "Terms of Service | Etienne",
    description: "Read the Etienne Agency terms of service and conditions of use.",
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
