/**
 * For Multi-Location Med Spas - ICP-qualification landing page.
 * Exit-led repositioning: who we are for, what we deliver, who we are NOT for.
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import FloatingDustMotes from "@/components/FloatingDustMotes";
import { CALENDLY_URL } from "@/const";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

export default function Industries() {
  usePageView("Med Spas");
  useScrollTracking("Med Spas");
  useSEO("/med-spas");

  // Hero is above the fold - reveal immediately, no scroll gate
  const inView = true;
  const { ref: fitRef, inView: fitInView } = useRevealAnimation();
  const { ref: offerRef, inView: offerInView } = useRevealAnimation();
  const { ref: distinctionRef, inView: distinctionInView } = useRevealAnimation();

  const isFor = [
    "Med spa groups running 5 to 25 locations on Zenoti, Boulevard, or Mangomint",
    "Owners, COOs, and Operations Directors who need to close the gap between insight and execution",
    "PE-backed aesthetics practices that need a diligence-grade operating cadence across sites",
    "Regional chains growing through acquisition that need consistent SOPs across newly integrated centers",
  ];

  const isNotFor = [
    "Single-location practices (the cross-location cadence does not apply yet)",
    "Plastic surgery practices with one attached medspa (different patient mix and billing model)",
    "Enterprise groups at 30-plus locations (the Engine cadence needs more than one analyst at that scale)",
  ];

  const offer = [
    {
      label: "Free",
      price: "$0",
      title: "The 48-Hour Leakage Map",
      desc: "Send us one CSV from your booking system. We run the analysis. Your Leakage Map comes back in 48 hours: every dollar leak across every location, ranked by size, with the cause named. No call required. Yours to keep.",
    },
    {
      label: "90-day engagement",
      price: "$7,500 base + 15% of measured recovery",
      title: "The Exit Engine",
      desc: "The working relationship. Your team executes. We lock the baseline, write the fixes, run the Monday numbers, and count the money against your own booking data. You pay performance only on dollars we can prove.",
    },
    {
      label: "Continuity",
      price: "$3,500/month, group-wide",
      title: "The Operator's Desk",
      desc: "Available only after the Engine. Keeps the Monday numbers coming, the baseline current, and the data room warm. Weekly numbers, monthly review with Jim, quarterly exit-readiness refresh.",
    },
  ];

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero - dark */}
      <section className="relative pt-24 pb-12 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={50} />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)",
            transform: "translate(20%,-20%)",
          }}
        />
        <div className="container relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-[var(--duration-slow)] ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              Exit-ready operations for multi-location medspas
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">
              Built for owners of 5 to 25 location medspas running Zenoti, Boulevard, or Mangomint. Your team executes. We run the system that makes execution happen and gets counted.
            </p>
            <a href="/#early-adopter-section">
              <Button
                className="rounded-full px-8 py-6 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
                onClick={() => trackCTAClick("Get Your Free Leakage Map", "Industries", "primary")}
              >
                Get Your Free Leakage Map <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Who Etienne is for */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <p className="section-label">IS THIS YOU?</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1]">
                Who Etienne is for
              </h2>
            </div>

            <div
              ref={fitRef}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-[var(--duration-reveal)] ${
                fitInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="card-premium p-6 sm:p-8">
                <h3 className="font-display text-xl text-foreground mb-4">Good fit:</h3>
                <ul className="space-y-3">
                  {isFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-premium p-6 sm:p-8">
                <h3 className="font-display text-xl text-foreground mb-4">Not a good fit:</h3>
                <ul className="space-y-3">
                  {isNotFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-[#FF6B6B] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you get - 3-tier offer summary */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <p className="section-label">THE OFFER</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-4">
                What you get
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Three ways to work together. Start free. Go deeper only if the numbers warrant it.
              </p>
            </div>

            <div ref={offerRef} className="space-y-6">
              {offer.map((item, i) => (
                <div
                  key={i}
                  className="card-on-alt p-6 sm:p-8"
                  style={{
                    opacity: offerInView ? 1 : 0,
                    transform: offerInView ? "translateY(0)" : "translateY(20px)",
                    transition: "all 0.7s ease",
                    transitionDelay: `${i * 120}ms`,
                  }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-foreground/60">{item.price}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground mb-6">
                See the full breakdown of each tier on the How It Works page.
              </p>
              <a href="/how-it-works">
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-4 h-auto text-sm font-medium"
                  onClick={() => trackCTAClick("See How It Works", "Industries", "secondary")}
                >
                  See how it works <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why this is not software */}
      <section className="relative py-16 md:py-20 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto">
            <div
              ref={distinctionRef}
              className="rounded-xl border border-primary/20 bg-primary/5 px-6 py-8 sm:px-10 sm:py-10 text-center"
              style={{
                opacity: distinctionInView ? 1 : 0,
                transition: "opacity 0.8s ease 0.3s",
              }}
            >
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                Important distinction
              </p>
              <p className="font-display text-xl md:text-2xl text-foreground mb-4">
                We're an operating system, run by a person. Not a software product.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                There is no dashboard to log into. No platform to learn. Your team executes the fixes in their own locations. Jim locks the baseline, writes the fixes word for word, runs the Monday numbers, and asks why any fix that stalled, stalled. If you want a SaaS tool, this isn't it. If you want the accountability structure a diligence team will pay a premium for, that's what we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA - dark */}
      <section className="relative py-20 md:py-28 lg:py-36 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={40} />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-6">
              Start with the free Map.
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
              Send your CSV. Get your Leakage Map in 48 hours. No call required. No commitment.
            </p>
            <a href="/#early-adopter-section">
              <Button
                className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
                onClick={() => trackCTAClick("Get Your Free Leakage Map", "Industries", "primary")}
              >
                Get Your Free Leakage Map <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <p className="text-sm text-white/40 mt-6">
              If you want to talk through the numbers first, grab a 20-minute call below.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block"
            >
              <Button
                variant="ghost"
                className="rounded-full px-6 py-4 h-auto text-sm font-medium text-white/60 hover:text-white hover:bg-white/10"
                onClick={() => trackCTAClick("Schedule a Call", "Industries", "secondary")}
              >
                Schedule a 20-minute call
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
