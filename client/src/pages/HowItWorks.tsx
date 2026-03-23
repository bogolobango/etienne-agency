/**
 * How It Works Page — Connect. Analyze. Recover.
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import FloatingDustMotes from "@/components/FloatingDustMotes";

export default function HowItWorks() {
  usePageView("How It Works");
  useScrollTracking("How It Works");
  useSEO("/how-it-works");

  const [inView, setInView] = useState(false);
  useEffect(() => { setInView(true); }, []);

  const steps = [
    {
      num: "01",
      title: "Connect Your Platforms",
      description: "One API key. 30 seconds. EIP connects to your Zenoti, Boulevard, or Mangomint account and starts reading your appointment data, guest records, invoices, and lead pipeline. We never write to your system — we only read from it. Your booking workflows stay the same.",
      syncs: ["Appointments", "Guests/Clients", "Invoices", "Services", "Providers", "Opportunities (Leads)"],
    },
    {
      num: "02",
      title: "EIP Maps Your Revenue Landscape",
      description: 'Within hours, EIP has mapped your entire business: revenue by center, utilization by room and provider, no-show patterns by day and time, lead response times, and rebooking rates. Every number traces back to your booking data with full provenance — you\'ll see "via Zenoti" attribution on every metric so you know exactly where it comes from.',
    },
    {
      num: "03",
      title: "Ask Anything. Get Answers.",
      description: "This is the part no booking platform does. Open the AI Revenue Analyst and ask any question about your business in plain English. EIP analyzes your data across every center and delivers a specific, data-backed answer with dollar amounts, trend analysis, and recommended actions. Not a dashboard you have to interpret. A direct answer to your question.",
      examples: [
        '"Why is White Plains underperforming?"',
        '"How much revenue did we lose from no-shows last month?"',
        '"Compare provider rebooking rates across all centers."',
        '"What should I focus on this week?"',
      ],
    },
    {
      num: "04",
      title: "Act on the Intelligence",
      description: "EIP doesn't just tell you what's wrong — it tells you what to do. Priority-ranked action items, revenue impact estimates, and specific operational recommendations. Toggle between Owner view (full financial intelligence across all locations) and Staff view (operational focus on a single center) so every team member sees what they need.",
    },
  ];

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero — dark */}
      <section className="relative pt-24 pb-12 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={50} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)", transform: "translate(20%,-20%)" }}
        />
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              Connect. Analyze. Recover.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-4">
              EIP reads your booking data and turns it into cross-location revenue intelligence. Here's how.
            </p>
            <p className="text-sm text-white/40 max-w-2xl mx-auto mb-10">
              We're onboarding early-access partners now. The platform is live and generating insights for real multi-location med spas.
            </p>
            <Link href="/calculator">
              <Button
                className="rounded-full px-8 py-6 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
                onClick={() => trackCTAClick('Get Your Free Revenue Audit', 'How It Works Hero', 'primary')}
              >
                Get Your Free Revenue Audit <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={i}>
              <div
                className="relative mb-16 md:mb-20"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.7s ease",
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <span className="text-[4rem] md:text-[5rem] font-display leading-none select-none text-primary/15">
                      {step.num}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                      {step.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed mb-4">
                      {step.description}
                    </p>
                    {step.syncs && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-full mb-1">What gets synced:</p>
                        {step.syncs.map((s, j) => (
                          <span key={j} className="tool-pill text-xs">{s}</span>
                        ))}
                      </div>
                    )}
                    {step.examples && (
                      <ul className="space-y-2 mt-4">
                        {step.examples.map((ex, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground italic">{ex}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              {/* Mid-page CTA after step 2 */}
              {i === 1 && (
                <div className="text-center mb-16 md:mb-20">
                  <Link href="/calculator">
                    <Button
                      className="rounded-full px-8 py-6 h-auto text-base font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
                      onClick={() => trackCTAClick('Get Your Free Revenue Audit', 'How It Works Mid-Page', 'primary')}
                    >
                      Get Your Free Revenue Audit <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="relative py-20 md:py-28 lg:py-36 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={40} />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-6">
              See it on your data.
            </h2>
            <p className="text-base sm:text-lg text-white/70 mb-4">
              Connect your booking system and see exactly what EIP surfaces in the first week.
            </p>
            <p className="text-sm text-white/40 mb-10">
              Start with the calculator to estimate your gaps. Then we'll run the full analysis on your real data — free, 15 minutes to set up.
            </p>
            <Link href="/calculator">
              <Button className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill">
                Get Your Free Revenue Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
