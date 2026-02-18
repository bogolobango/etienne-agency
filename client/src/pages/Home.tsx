/**
 * Home Page - Technical Mono with Spatial Depth
 * Design: Floating cards, generous negative space, physics-based interactions
 * Color: Near-monochromatic (off-white, warm gray, slate) + electric blue accents
 * Typography: Sora (display), Inter (body), JetBrains Mono (data)
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
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";

export default function Home() {
  usePageView('Homepage');
  useScrollTracking('Homepage');

  useEffect(() => {
    document.title = "AI Appointment Scheduling & Virtual Receptionist | Etienne Agency";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <SocialProofSection />
      <IndustriesSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
