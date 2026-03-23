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
    title: "Revenue Intelligence for Multi-Location Med Spas | Etienne",
    description:
      "EIP connects to your Zenoti, Boulevard, or Mangomint data and shows you exactly where you're losing revenue across locations — AI-powered insights for med spa owners running 3-25 centers.",
  },
  "/how-it-works": {
    title: "How EIP Works | Revenue Intelligence for Med Spas",
    description:
      "Connect your Zenoti or Boulevard account, and EIP surfaces revenue gaps across your locations in days. See how the AI Revenue Analyst, Command Center, and Smart Scheduling work together.",
  },
  "/med-spas": {
    title: "Revenue Intelligence for Multi-Location Med Spas | Etienne",
    description:
      "Running 3-25 med spa locations? EIP shows you where revenue is leaking across your centers — no-shows, missed leads, and utilization gaps — and tells you exactly what to do about it.",
  },
  "/industries": {
    title: "Revenue Intelligence for Multi-Location Med Spas | Etienne",
    description:
      "Running 3-25 med spa locations? EIP shows you where revenue is leaking across your centers — no-shows, missed leads, and utilization gaps — and tells you exactly what to do about it.",
  },
  "/calculator": {
    title: "Revenue Gap Calculator for Med Spas | Etienne",
    description:
      "See how much revenue your med spa locations are losing to no-shows, utilization gaps, and missed rebookings. Free interactive calculator powered by the EIP leakage model.",
  },
  "/contact": {
    title: "Free Revenue Audit for Multi-Location Med Spas | Etienne",
    description:
      "Connect your Zenoti or Boulevard account to get a 14-day revenue intelligence report that shows exactly where your locations are losing money. No cost, no commitment.",
  },
  "/about": {
    title: "About Etienne | Revenue Intelligence for Med Spas",
    description:
      "Etienne builds revenue intelligence for multi-location med spas. Founded by Fortune 500 AI veterans bringing enterprise-grade intelligence to the $21B medical aesthetics industry.",
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
  "/contact": "Free Revenue Audit",
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
