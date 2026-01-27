/**
 * Home Page - Kinetic Minimalism with Spatial Depth
 * Design: Floating cards, generous negative space, physics-based interactions
 * Color: Near-monochromatic (off-white, warm gray, slate) + electric blue accents
 * Typography: Sora (display), Inter (body), JetBrains Mono (data)
 */

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import SocialProofSection from "@/components/SocialProofSection";
import IndustriesSection from "@/components/IndustriesSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

export default function Home() {
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
