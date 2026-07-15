/**
 * How It Works Page — 3-tier walkthrough (Free Map, Exit Engine, Operator's Desk)
 */

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
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

export default function HowItWorks() {
  usePageView("How It Works");
  useScrollTracking("How It Works");
  useSEO("/how-it-works");

  // Hero is above the fold - reveal immediately, no scroll gate
  const inView = true;
  const { ref: stepsRef, inView: stepsInView } = useRevealAnimation();

  const steps = [
    {
      num: "01",
      icon: FileText,
      label: "Free",
      price: "$0",
      title: "The 48-Hour Leakage Map",
      intro:
        "Send us one CSV from your booking system. We do the analysis. Your Leakage Map comes back in 48 hours. Yours to keep. No call required.",
      howItWorks: [
        "Export your last 90 days of appointment data from Zenoti, Boulevard, or Mangomint. Takes about 2 minutes. We have a short Loom showing exactly which fields to include.",
        "We run your numbers against the AmSpa median and top-quartile operators. Every dollar leak is ranked by location, provider, and day of week. Every cause is named.",
        "You get your Leakage Map within 48 hours, plus a 2-minute Loom from Jim walking your top three leaks.",
      ],
      pdfContents: [
        "Every dollar leak, ranked by size, per location and per provider",
        "Your numbers against the AmSpa median and top-quartile benchmarks",
        "The cause behind each leak, drawn from your own CSV data",
        "A 2-minute Loom from Jim walking your top three findings",
      ],
      callout:
        "Most Maps surface between $80,000 and $220,000 in annual recoverable revenue per location. That number comes from your data, not an industry estimate.",
    },
    {
      num: "02",
      icon: BarChart3,
      label: "90-day engagement",
      price: "$7,500 base + 15% of measured recovery",
      title: "The Exit Engine",
      intro:
        "The working relationship. Your team executes. We run the system that makes execution actually happen and gets counted against a locked baseline.",
      howItWorks: [
        "Weeks 1-2: We lock the baseline. Location by location, provider by provider, from your own booking data. This is the number every recovered dollar is measured against, and the first artifact in your future data room.",
        "Ongoing: The fix queue. Every leak from the Map becomes a scheduled fix with a named owner on your team and a date. We write the deposit policy, the rebooking script, the schedule change, word for word.",
        "Every Monday by 9am: The numbers against baseline. What moved, what didn't, which location skipped the fix. We get on the call and ask why.",
        "Every month: A recovered-revenue statement measured against baseline. That's what the performance fee is calculated on, and it's the exact document a diligence team asks for.",
      ],
      whatYouGet: [
        "Locked baseline (first artifact in your data room)",
        "Fix queue with named owners and dates for every leak",
        "Every fix written for you, word for word",
        "Weekly Monday-9am numbers against baseline",
        "Monthly recovered-revenue statement",
        "Data room built as we go: fix log, SOPs, baseline, recovery statements",
      ],
      callout:
        "You never pay performance on a dollar we can't show you against your own baseline. If the number doesn't move, you owe nothing beyond the base.",
    },
    {
      num: "03",
      icon: PhoneCall,
      label: "Continuity",
      price: "$3,500/month, group-wide",
      title: "The Operator's Desk",
      intro:
        "The Engine ends. The cadence shouldn't. Available only after the Engine. Keeps the Monday numbers coming, the baseline current, and the data room warm.",
      howItWorks: [
        "Every Monday by 9am: Your numbers against baseline for every location on the Desk. What moved, what stalled, what needs attention.",
        "Once a month: A 60-minute operating review with Jim. We walk what recovered, what's still leaking, and what to prioritize next.",
        "Every quarter: A refreshed exit-readiness snapshot. Where you sit on the 3x-to-10x curve now, and what closes the remaining gap.",
      ],
      whatYouGet: [
        "Weekly numbers against baseline, every Monday by 9am",
        "Monthly 60-minute operating review with Jim",
        "Quarterly exit-readiness refresh",
        "Direct Slack channel, one-business-day response",
      ],
      callout:
        "Flat $3,500/month regardless of location count. Available only to groups that have run the Engine.",
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
            className={`max-w-4xl mx-auto text-center transition-all duration-[var(--duration-slow)] ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              How Etienne Works
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">
              One free look. One 90-day engine. One standing desk. Your team runs it. We make sure it runs on systems.
            </p>
            <a href="/#early-adopter-section">
              <Button
                className="rounded-full px-8 py-6 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
                onClick={() =>
                  trackCTAClick("Get Your Free Leakage Map", "How It Works", "primary")
                }
              >
                Get Your Free Leakage Map <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div ref={stepsRef} className="max-w-4xl mx-auto space-y-24 md:space-y-32">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  id={`step-${step.num}`}
                  style={{
                    opacity: stepsInView ? 1 : 0,
                    transform: stepsInView ? "translateY(0)" : "translateY(30px)",
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
                          {step.pdfContents ? "What's in the Leakage Map" : "What you get"}
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
                              "Get Your Free Leakage Map",
                              "How It Works",
                              "primary"
                            )
                          }
                        >
                          Get Your Free Leakage Map <ArrowRight className="ml-2 h-4 w-4" />
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
              Start with the free Map.
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
              Send your CSV. Get your Leakage Map in 48 hours. No call required. No commitment.
            </p>
            <a href="/#early-adopter-section">
              <Button
                className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
                onClick={() =>
                  trackCTAClick(
                    "Get Your Free Leakage Map",
                    "How It Works",
                    "primary"
                  )
                }
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
