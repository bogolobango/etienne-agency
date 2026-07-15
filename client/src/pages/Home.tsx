/**
 * Home Page — Exit-Ready Operations for Multi-Location Medspas
 */

import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SundayProblemSection from "@/components/SundayProblemSection";
import ProblemSection from "@/components/ProblemSection";
import InteractiveSolutions from "@/components/InteractiveSolutions";
import EarlyAdopterSection from "@/components/EarlyAdopterSection";
import SocialProofSection from "@/components/SocialProofSection";
import FounderSection from "@/components/FounderSection";
import ValuationSection from "@/components/ValuationSection";
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
    "@type": "Service",
    name: "Etienne Exit Engine",
    serviceType: "Exit-ready operations for multi-location medspas",
    provider: {
      "@type": "Organization",
      name: "Etienne Agency",
      url: "https://etienneagency.com",
    },
    areaServed: { "@type": "Country", name: "US" },
    description:
      "Etienne finds the $200K to $500K/yr your medspa group is leaking, runs the 90-day system that closes it with your team, and builds the paper trail PE buyers pay a premium for. Free 48-hour Leakage Map.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Etienne Agency",
    url: "https://etienneagency.com",
    logo: "https://etienneagency.com/images/logo.png",
    email: "jim@etienneagency.com",
    description:
      "Revenue recovery and exit readiness for multi-location medspas. Your team runs it. We make sure it runs on systems.",
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
    if (existing) existing.remove(); // ensures no duplicate on route flap
    const script = document.createElement("script");
    script.id = "json-ld-home";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      document.getElementById("json-ld-home")?.remove();
    };
  }, []);

  return (
    <CalculatorProvider>
      <div id="main-content" className="min-h-screen">
        <Header />

        {/* 1 — Hero + estimator */}
        <Hero />

        {/* 2 — Sunday Night: emotional hook to exit stakes */}
        <SundayProblemSection />

        {/* 3 — The Execution Gap */}
        <ProblemSection />

        {/* 4 — The Exit Math: spine of the page */}
        <ValuationSection />

        {/* 5 — The Offer: three tiers */}
        <EarlyAdopterSection />

        {/* 6 — How the Free Map Works */}
        <InteractiveSolutions />

        {/* 7 — Sample Map (dark section) */}
        <SocialProofSection />

        {/* 8 — Founder POV */}
        <FounderSection />

        {/* 9 — Final CTA */}
        <TwoStepClose />

        <Footer />
        <ScrollCTA />
      </div>
    </CalculatorProvider>
  );
}
