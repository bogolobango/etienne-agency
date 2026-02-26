/**
 * Home Page - Tango Editorial Design
 * Minimal, airy, editorial landing page with generous whitespace,
 * serif display headlines, colored keyword highlights, and pill CTAs
 */

import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import SocialProofSection from "@/components/SocialProofSection";
import IndustriesSection from "@/components/IndustriesSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import ScrollCTA from "@/components/ScrollCTA";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Etienne Agency",
    description:
      "AI receptionist and appointment scheduling automation for multi-location service businesses.",
    url: "https://www.etienneagency.com",
    email: "jim@etienneagency.com",
    areaServed: { "@type": "Country", name: "US" },
    serviceType: [
      "AI Receptionist",
      "Appointment Scheduling Automation",
      "Lead Response Automation",
    ],
    knowsAbout: [
      "Med Spas",
      "Dental Practices",
      "Law Firms",
      "Property Management",
      "Accounting Firms",
      "Cleaning Companies",
      "Sports Facilities",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Automation Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Receptionist", description: "24/7 automated call answering and lead qualification" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Appointment Scheduling Automation", description: "Smart booking with automated reminders to reduce no-shows" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lead Response Automation", description: "Sub-60-second response to calls, texts, and web forms" } },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Etienne Agency",
    url: "https://www.etienneagency.com",
    publisher: {
      "@type": "Organization",
      name: "Etienne Agency",
      url: "https://www.etienneagency.com",
      logo: "https://www.etienneagency.com/images/logo.png",
      email: "jim@etienneagency.com",
      sameAs: [],
    },
  },
];

export default function Home() {
  usePageView('Homepage');
  useScrollTracking('Homepage');
  useSEO('/');

  useEffect(() => {
    // Inject JSON-LD structured data
    const existing = document.getElementById("json-ld-home");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "json-ld-home";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div id="main-content" className="min-h-screen">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <SocialProofSection />
      <IndustriesSection />
      <FinalCTASection />
      <Footer />
      <ScrollCTA />
    </div>
  );
}
