/**
 * Home Page — Med spa positioned, teal accent design
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
    "@type": "SoftwareApplication",
    name: "EIP — Etienne Intelligence Platform",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI-powered revenue recovery platform for multi-location med spas. Integrates with Zenoti, Boulevard, and Mangomint.",
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
      "AI-powered revenue recovery for multi-location med spas.",
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
      {/* Product Preview (dark section) — re-uses SocialProofSection export name */}
      <SocialProofSection />
      {/* Who It's For — med spa use cases */}
      <IndustriesSection />
      {/* Trust bar */}
      <section className="py-12 md:py-16 section-gradient-alt">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="section-label">TRUSTED BY FORWARD-THINKING PRACTICES</p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>Integrates with Zenoti &middot; Boulevard &middot; Mangomint</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>HIPAA-compliant</span>
              <span>&middot;</span>
              <span>SOC 2 aligned</span>
            </div>
          </div>
        </div>
      </section>
      <FinalCTASection />
      <Footer />
      <ScrollCTA />
    </div>
  );
}
