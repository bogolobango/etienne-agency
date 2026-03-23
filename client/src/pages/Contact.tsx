/**
 * Book a Revenue Call — Calendly embed page
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import FloatingDustMotes from "@/components/FloatingDustMotes";

export default function Contact() {
  usePageView("Book a Revenue Call");
  useScrollTracking("Book a Revenue Call");
  useSEO("/contact");

  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  // Load Calendly widget script
  useEffect(() => {
    const existing = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero — dark */}
      <section className="relative pt-24 pb-12 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={50} />
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              Book a Revenue Call
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-4">
              20 minutes. We'll walk through what EIP would surface from your booking data.
            </p>
            <p className="text-sm text-white/40">
              No pitch deck. No commitment.
            </p>
          </div>
        </div>
      </section>

      {/* Calendly Embed */}
      <section className="relative py-16 md:py-24 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/jim-etienneagency/30min"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
