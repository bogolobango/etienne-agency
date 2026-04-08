/**
 * Home Page — Revenue Intelligence for Multi-Location Med Spas
 */

import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SundayProblemSection from "@/components/SundayProblemSection";
import ProblemSection from "@/components/ProblemSection";
import InteractiveSolutions from "@/components/InteractiveSolutions";
import EarlyAdopterSection from "@/components/EarlyAdopterSection";
import SocialProofSection from "@/components/SocialProofSection";
import IndustriesSection from "@/components/IndustriesSection";
import FounderSection from "@/components/FounderSection";
import TwoStepClose from "@/components/TwoStepClose";
import Footer from "@/components/Footer";
import ScrollCTA from "@/components/ScrollCTA";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { CalculatorProvider } from "@/context/CalculatorContext";

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
    <CalculatorProvider>
      <div id="main-content" className="min-h-screen">
        <Header />

        {/* 1 — Recognition: hero with personalized calculator */}
        <Hero />

        {/* 2 — Empathy: the Sunday problem */}
        <SundayProblemSection />

        {/* 3 — Quantification: industry benchmarks + personalized projection */}
        <ProblemSection />

        {/* 4 — Intelligence layer: 3 interactive module demos */}
        <InteractiveSolutions />

        {/* 5 — Flagship playground: interactive dashboard (dark section) */}
        <SocialProofSection />

        {/* 6 — Integrations + differentiation (industries section) */}
        <IndustriesSection />

        {/* 7 — Founder POV: the only real face on the site */}
        <FounderSection />

        {/* 8 — The deal: Early Access Program with personalized CTA */}
        <EarlyAdopterSection />

        {/* 9 — Final close: two-step email-gated CTA with walkthrough */}
        <TwoStepClose />

        <Footer />
        <ScrollCTA />
      </div>
    </CalculatorProvider>
  );
}
