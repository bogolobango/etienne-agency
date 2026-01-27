/**
 * Home Page - Kinetic Minimalism with Spatial Depth
 * Design: Floating cards, generous negative space, physics-based interactions
 * Color: Near-monochromatic (off-white, warm gray, slate) + electric blue accents
 * Typography: Sora (display), Inter (body), JetBrains Mono (data)
 */

import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
    </div>
  );
}
