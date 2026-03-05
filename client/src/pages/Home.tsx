/**
 * Home Page — Revenue Intelligence for Multi-Location Med Spas
 */

import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import SocialProofSection from "@/components/SocialProofSection";
import IndustriesSection from "@/components/IndustriesSection";
import RevenueGapCalculator from "@/components/RevenueGapCalculator";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";
import ScrollCTA from "@/components/ScrollCTA";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EIP — Etienne Intelligence Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "Revenue intelligence platform for multi-location med spas. Connects to Zenoti, Boulevard, and Mangomint to surface revenue gaps across locations.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Organization",
      name: "Etienne Agency",
      url: "https://etienneagency.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Etienne Agency",
    url: "https://etienneagency.com",
    logo: "https://etienneagency.com/images/logo.png",
    email: "jim@etienneagency.com",
    description:
      "Revenue intelligence for multi-location med spas.",
    areaServed: { "@type": "Country", name: "US" },
    sameAs: [],
  },
];

export default function Home() {
  usePageView("Homepage");
  useScrollTracking("Homepage");
  useSEO("/");

  useEffect(() => {
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
      {/* Product Preview (dark section) */}
      <SocialProofSection />
      {/* Integrations + Differentiation + Social Proof */}
      <IndustriesSection />
      <RevenueGapCalculator />
      <FinalCTASection />
      <Footer />
      <ScrollCTA />
    </div>
  );
}
