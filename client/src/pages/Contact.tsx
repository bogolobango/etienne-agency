/**
 * Contact page - outcome-positioned hero, primary audit CTA, Calendly embed for direct booking
 */

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import FloatingDustMotes from "@/components/FloatingDustMotes";
import { CALENDLY_URL } from "@/const";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

export default function Contact() {
  usePageView("Contact");
  useScrollTracking("Contact");
  useSEO("/contact");

  // Hero is above the fold - reveal immediately, no scroll gate
  const inView = true;
  const { ref: ctaRef, inView: ctaInView } = useRevealAnimation();
  const { ref: calendlyRef, inView: calendlyInView } = useRevealAnimation();

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

      {/* Hero - dark */}
      <section className="relative pt-24 pb-12 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={50} />
        <div className="container relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-[var(--duration-slow)] ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              Get in touch with Jim
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-4">
              The fastest path is the free Revenue Recovery Audit. Send a CSV, get a 4-page PDF back in 48 hours. No call required.
            </p>
            <p className="text-sm text-white/40">
              If you'd rather talk first, book a 20-minute call below.
            </p>
          </div>
        </div>
      </section>

      {/* Primary CTA + Calendly Embed */}
      <section className="relative py-16 md:py-24 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">

            {/* Primary CTA */}
            <div
              ref={ctaRef}
              className="text-center mb-14"
              style={{
                opacity: ctaInView ? 1 : 0,
                transform: ctaInView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease",
              }}
            >
              <p className="text-sm text-muted-foreground mb-5">
                Most visitors start here. CSV in, PDF out, 48 hours.
              </p>
              <a href="/#early-adopter-section">
                <Button
                  className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
                  onClick={() => trackCTAClick("Get Your Free Audit", "Contact", "primary")}
                >
                  Get Your Free Audit <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-10">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground uppercase tracking-widest">or book a call</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Calendly Embed */}
            <div
              ref={calendlyRef}
              style={{
                opacity: calendlyInView ? 1 : 0,
                transform: calendlyInView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease",
                transitionDelay: "150ms",
              }}
            >
              <p className="text-sm text-muted-foreground text-center mb-6">
                Prefer a 20-minute call instead? Pick a time that works for you.
              </p>
              <div
                className="calendly-inline-widget"
                data-url={CALENDLY_URL}
                style={{ minWidth: "320px", height: "700px" }}
              />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
