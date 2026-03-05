/**
 * Diagnostics Page — Revenue Gap Calculator
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevenueGapCalculator from "@/components/RevenueGapCalculator";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";

export default function Diagnostics() {
  usePageView("Diagnostics");
  useScrollTracking("Diagnostics");
  useSEO("/diagnostics");

  return (
    <div id="main-content" className="min-h-screen">
      <Header />
      <RevenueGapCalculator />
      <Footer />
    </div>
  );
}
