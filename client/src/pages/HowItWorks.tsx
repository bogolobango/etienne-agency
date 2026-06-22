/**
 * How It Works Page — 3-step outcome walkthrough (Free Audit, Deep Audit, Recovery Retainer)
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, BarChart3, PhoneCall } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import FloatingDustMotes from "@/components/FloatingDustMotes";
import { CALENDLY_URL } from "@/const";

export default function HowItWorks() {
  usePageView("How It Works");
  useScrollTracking("How It Works");
  useSEO("/how-it-works");

  const [inView, setInView] = useState(false);
  useEffect(() => { setInView(true); }, []);

  const steps = [
    {
      num: "01",
      icon: FileText,
      label: "Free",
      price: "$0",
      title: "The Free Revenue Recovery Audit",
      intro:
        "Send us a CSV export from your booking system. We do the analysis. You get a 4-page PDF back in 48 hours. Yours to keep. No call required.",
      howItWorks: [
        "Export your last 90 days of appointment data from Zenoti, Boulevard, or Mangomint. Takes about 2 minutes. We have a short Loom showing exactly which fields to include.",
        "We run your numbers against five industry benchmarks: no-show rate (median 15%), provider utilization (median 62%), rebooking at checkout (median 48%), inbound call answer rate (median 78%), and cross-location variance.",
        "You get a 4-page PDF within 48 hours. Page 1 is your estimated annual revenue leak. Page 2 is the leakage map by location. Page 3 is how you compare to multi-location peers. Page 4 is your 60-day recovery roadmap.",
      ],
      pdfContents: [
        "Estimated annual revenue leak (dollar amount, not a range)",
        "Location-by-location breakdown of every identified gap",
        "Benchmark comparison with sourced industry data",
        "A 60-day roadmap with specific steps, named owners, and timelines",
      ],
      callout:
        "Most audits surface between $80,000 and $220,000 in recoverable annual revenue. That number comes from your data, not an industry estimate.",
    },
    {
      num: "02",
      icon: BarChart3,
      label: "One-time",
      price: "$3,500",
      title: "The Deep Audit + 60-Day Recovery Plan",
      intro:
        "A two-week engagement. We map every revenue leak across every location, not just the top four. You leave with a complete recovery plan and a 90-minute walkthrough with your team.",
      howItWorks: [
        "Week 1: We pull your full data set. We map provider utilization by room, by hour, and by day across all locations. We model the demand imbalance between your highest- and lowest-performing centers.",
        "Week 2: We build the prioritized recovery plan. Every finding gets a dollar impact, a fix-complexity rating, and a named owner. The plan is designed so your VP of Operations can run it without us.",
        "At the end of week 2: a 90-minute strategy session with you and whoever owns execution. We walk through each finding, answer questions, and hand off the plan.",
      ],
      whatYouGet: [
        "Full leakage model across all locations (not capped at 4 findings)",
        "Provider-level utilization analysis",
        "After-hours call miss rate by location",
        "A written 60-day execution plan with weekly milestones",
        "90-minute recorded strategy session",
        "30-day email access to ask follow-up questions",
      ],
      callout:
        "This is a one-time engagement. No subscription. No platform. You own everything we deliver.",
    },
    {
      num: "03",
      icon: PhoneCall,
      label: "Monthly",
      price: "$2,000/location/month",
      title: "The Recovery Retainer",
      intro:
        "We run the recovery plan with you. Weekly anomaly reports, monthly strategy calls, and an analyst available when questions come up between sessions.",
      howItWorks: [
        "Week 1 of every month: we pull fresh data and send you an anomaly report. If something moved since last month, we flag it before you have to ask.",
        "Once a month: a 60-minute strategy call. We review what recovered, what is still leaking, and what to prioritize next.",
        "Between calls: you can reach your analyst directly. Not a support ticket. Not a forum. An actual person who knows your data.",
      ],
      whatYouGet: [
        "Weekly anomaly report for every location on the retainer",
        "Monthly strategy call (60 min, recorded)",
        "Direct analyst access between sessions",
        "Updated recovery roadmap every quarter",
        "Cancel anytime after month 3",
      ],
      callout:
        "Most retainer clients recover 5 to 10 times the monthly fee in the first 90 days. The retainer is month-to-month after the initial 3-month term.",
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
            background:
              "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)",
            transform: "translate(20%,-20%)",
          }}
        />
        <div className="container relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              How Etienne Works
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">
              Done-for-you revenue recovery in 3 steps. No platform to learn. No software to log into. You send a CSV. We send back a plan.
            </p>
            <a href="/#early-adopter-section">
              <Button
                className="rounded-full px-8 py-6 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
                onClick={() =>
                  trackCTAClick("Get Your Free Audit", "How It Works", "primary")
                }
              >
                Get Your Free Audit <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto space-y-24 md:space-y-32">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  id={`step-${step.num}`}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(30px)",
                    transition: "all 0.7s ease",
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  {/* Step header */}
                  <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
                    <div className="flex-shrink-0">
                      <span className="text-[4rem] md:text-[5rem] font-display leading-none select-none text-primary/15">
                        {step.num}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1">
                          <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                          {step.label}
                        </span>
                        <span className="text-sm font-semibold text-foreground/60">
                          {step.price}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
                        {step.title}
                      </h2>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {step.intro}
                      </p>
                    </div>
                  </div>

                  {/* How it works list */}
                  <div className="pl-0 md:pl-[calc(5rem+1.5rem)]">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      How it works
                    </h3>
                    <ol className="space-y-4 mb-8">
                      {step.howItWorks.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">
                            {j + 1}
                          </span>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ol>

                    {/* What you get */}
                    {(step.pdfContents ?? step.whatYouGet) && (
                      <div className="mb-8">
                        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                          {step.pdfContents ? "What is in the PDF" : "What you get"}
                        </h3>
                        <ul className="space-y-2">
                          {(step.pdfContents ?? step.whatYouGet ?? []).map(
                            (item, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-sm text-muted-foreground">
                                  {item}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Callout box */}
                    <div className="rounded-xl border border-primary/20 bg-primary/5 px-6 py-5">
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {step.callout}
                      </p>
                    </div>
                  </div>

                  {/* Mid-page CTA after step 1 */}
                  {i === 0 && (
                    <div className="text-center mt-10 pl-0 md:pl-[calc(5rem+1.5rem)]">
                      <a href="/#early-adopter-section">
                        <Button
                          className="rounded-full px-8 py-6 h-auto text-base font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
                          onClick={() =>
                            trackCTAClick(
                              "Get Your Free Audit",
                              "How It Works",
                              "primary"
                            )
                          }
                        >
                          Get Your Free Audit <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA - dark */}
      <section className="relative py-20 md:py-28 lg:py-36 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={40} />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-6">
              Start with the free audit.
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
              Send your CSV. Get the 4-page PDF in 48 hours. No call required. No commitment.
            </p>
            <a href="/#early-adopter-section">
              <Button
                className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
                onClick={() =>
                  trackCTAClick(
                    "Get Your Free Audit",
                    "How It Works",
                    "primary"
                  )
                }
              >
                Get Your Free Audit <ArrowRight className="ml-2 h-5 w-5" />
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
                onClick={() =>
                  trackCTAClick(
                    "Schedule a Call",
                    "How It Works",
                    "secondary"
                  )
                }
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
