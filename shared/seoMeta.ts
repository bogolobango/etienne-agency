/**
 * Shared SEO metadata for every public route.
 * Used by both the client-side useSEO hook and the server-side HTML injector
 * so that crawlers see correct meta tags even without executing JavaScript.
 */

export const BASE_URL = "https://www.etienneagency.com";
export const OG_IMAGE = `${BASE_URL}/images/og-image.png`;
export const SITE_NAME = "Etienne Agency";

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}

// ---------------------------------------------------------------------------
// Static route metadata
// ---------------------------------------------------------------------------
const staticRoutes: Record<string, PageMeta> = {
  "/": {
    title: "Stop Losing Revenue to Missed Calls | AI for Multi-Location Businesses | Etienne Agency",
    description:
      "Multi-location service businesses lose thousands monthly to missed calls and slow follow-up. The 24/7 Revenue Recovery Framework fixes that in 4 weeks. Med spas, dental, law firms, property management.",
  },
  "/how-it-works": {
    title: "From Overwhelmed to Automated in 4 Weeks | Etienne Agency",
    description:
      "See how the 24/7 Revenue Recovery Framework automates lead response, appointment booking, and follow-up in just 4 weeks. Discovery, build, launch, optimize.",
  },
  "/industries": {
    title: "AI for Your Industry | Med Spa · Dental · Law · Property | Etienne Agency",
    description:
      "Discover how AI receptionist and scheduling automation works for med spas, dental practices, law firms, property management, accounting firms, cleaning companies, and sports facilities.",
  },
  "/contact": {
    title: "Book Your Free Revenue Audit | 15 Minutes, No Pitch | Etienne Agency",
    description:
      "Schedule a free 15-minute discovery call. We'll show you exactly how many leads you're losing to missed calls and slow follow-up — and how to fix it in 4 weeks.",
  },
  "/about": {
    title: "The Team Behind the 24/7 Revenue Recovery Framework | Etienne Agency",
    description:
      "Meet the Etienne Agency team. We build AI receptionist and scheduling systems that help multi-location service businesses stop losing revenue to missed calls.",
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

// ---------------------------------------------------------------------------
// Industry-specific metadata (keyed by slug)
// ---------------------------------------------------------------------------
const industryRoutes: Record<string, PageMeta> = {
  medspa: {
    title: "AI Scheduling for Med Spas | Reduce No-Shows 75% | Etienne Agency",
    description:
      "Med spas lose $500+ per missed call. The 24/7 Revenue Recovery Framework responds to every inquiry instantly, books consultations, and cuts no-shows by 75%. See how in 15 minutes.",
  },
  dental: {
    title: "AI Scheduling for Dental Practices | Reduce No-Shows 40% | Etienne Agency",
    description:
      "New patient calls come in during procedures. Your front desk can't keep up. The 24/7 Revenue Recovery Framework automates intake, booking, and reminders in 4 weeks.",
  },
  law: {
    title: "AI Intake for Law Firms | Never Miss a Case Again | Etienne Agency",
    description:
      "Someone gets in an accident at 11pm and calls three firms. The first to answer gets the case. Our AI intake system responds in under 60 seconds, 24/7.",
  },
  property: {
    title: "AI Leasing Assistant for Property Management | Fill Vacancies 60% Faster | Etienne Agency",
    description:
      "A prospective tenant inquires Saturday. Your leasing office is closed. They tour a competitor's unit Sunday and sign Monday. Our AI responds 24/7 and books tours instantly.",
  },
  accounting: {
    title: "AI Scheduling for Accounting Firms | Scale Through Tax Season | Etienne Agency",
    description:
      "Tax season hits. Your phone rings nonstop. New clients wait days for a callback. Our AI handles intake and scheduling 24/7 so your CPAs can focus on returns.",
  },
  cleaning: {
    title: "AI Booking for Cleaning Companies | Respond First, Win the Job | Etienne Agency",
    description:
      "67% of customers expect a response within 5 minutes. With an average $2,800 lifetime value per customer, every slow response costs you thousands. Our AI responds instantly.",
  },
  sports: {
    title: "AI Receptionist for Sports Facilities | Automate 60% of Inquiries | Etienne Agency",
    description:
      "Your front desk is buried in 'What time do you open?' calls. High-value corporate event inquiries go to voicemail. Our AI handles routine questions and routes the big deals to your team.",
  },
};

// ---------------------------------------------------------------------------
// Industry display names (for breadcrumbs / structured data)
// ---------------------------------------------------------------------------
const industryNames: Record<string, string> = {
  medspa: "Med Spas & Aesthetic Clinics",
  dental: "Dental Practices",
  law: "Law Firms",
  property: "Property Management",
  accounting: "Accounting & CPA Firms",
  cleaning: "Cleaning Companies",
  sports: "Sports Facilities",
};

// ---------------------------------------------------------------------------
// Breadcrumb labels for static routes
// ---------------------------------------------------------------------------
const breadcrumbLabels: Record<string, string> = {
  "/how-it-works": "How It Works",
  "/industries": "Industries",
  "/contact": "Contact",
  "/about": "About",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
};

/**
 * Generate BreadcrumbList JSON-LD for the given path.
 * Returns null for the homepage (no breadcrumb needed).
 */
export function getBreadcrumbJsonLd(pathname: string): object | null {
  if (pathname === "/") return null;

  const items: { name: string; url: string }[] = [
    { name: "Home", url: BASE_URL },
  ];

  // Industry detail: Home → Industries → Industry Name
  const industryMatch = pathname.match(/^\/industries\/([^/]+)$/);
  if (industryMatch) {
    const slug = industryMatch[1];
    items.push({ name: "Industries", url: `${BASE_URL}/industries` });
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

/**
 * Resolve SEO metadata for a given URL path.
 * Returns the best-matching PageMeta, or a sensible default for unknown routes.
 */
export function getPageMeta(pathname: string): PageMeta {
  // Exact static match
  if (staticRoutes[pathname]) return staticRoutes[pathname];

  // Industry detail pages: /industries/:slug
  const industryMatch = pathname.match(/^\/industries\/([^/]+)$/);
  if (industryMatch) {
    const slug = industryMatch[1];
    if (industryRoutes[slug]) return industryRoutes[slug];
  }

  // Fallback to homepage meta
  return staticRoutes["/"];
}
