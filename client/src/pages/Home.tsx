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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Etienne Agency",
  description:
    "AI receptionist and appointment scheduling automation for multi-location service businesses.",
  url: "https://etienneagency.com",
  email: "jim@etienneagency.com",
  areaServed: "US",
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
  ],
};

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
