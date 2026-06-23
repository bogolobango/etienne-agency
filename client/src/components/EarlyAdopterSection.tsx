/**
 * Offer Section — 3-step outcome-based offer replacing the old Early Adopter pricing block.
 *
 * Structure:
 *   1. Section headline ("One offer. Three steps. 60 days to recovered revenue.")
 *   2. Three step cards (Free Audit / Deep Audit / Retainer) with middle card highlighted
 *   3. Section closer (plain-copy guarantee line)
 *   4. FAQ accordion (preserved from v1 — Task 4 handles additions)
 *   5. Final CTA
 *
 * No fabricated testimonials. No phantom customer quotes.
 */

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackCTAClick } from "@/lib/analytics";
import { useCalculator } from "@/context/CalculatorContext";
import { formatCurrencyCompact } from "@shared/leakage";
import MagneticButton from "@/components/MagneticButton";
import SpotlightCard from "@/components/SpotlightCard";
import { CALENDLY_URL } from "@/const";

interface Step {
  stepLabel: string;
  name: string;
  priceLabel: string;
  priceSublabel: string;
  body: string;
  ctaLabel: string;
  highlighted: boolean;
}

const steps: Step[] = [
  {
    stepLabel: "Step 1 of 3",
    name: "Free Revenue Recovery Audit",
    priceLabel: "$0",
    priceSublabel: "free, no commitment",
    body: "You send us a CSV export from Zenoti, Boulevard, or Mangomint. We send back a 4-page report in 48 hours showing where you're leaking revenue, ranked by dollar size. No call. No commitment. Yours to keep.",
    ctaLabel: "Get Your Free Audit",
    highlighted: false,
  },
  {
    stepLabel: "Step 2 of 3",
    name: "Deep Audit + 60-Day Recovery Plan",
    priceLabel: "$3,500",
    priceSublabel: "one-time",
    body: "If the free audit hits a nerve, we go deep. Two-week engagement. We map every leak across every location, build a prioritized 60-day recovery plan, and run a 90-minute strategy session with you to walk through it. You leave with a plan you can execute with or without us.",
    ctaLabel: "Book Deep Audit",
    highlighted: true,
  },
  {
    stepLabel: "Step 3 of 3",
    name: "Recovery Retainer",
    priceLabel: "$2,000",
    priceSublabel: "per location per month",
    body: "We run the recovery plan with you. Weekly anomaly reports, monthly strategy calls, an analyst on call when Sunday-night questions hit. Most clients recover 5 to 10x the retainer fee in the first 90 days. Cancel anytime after month 3.",
    ctaLabel: "Talk to Jim About a Retainer",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Is this a software platform I log into?",
    a: "No. We deliver the report and the recovery work to you. You can log into Zenoti or Boulevard for your booking. We sit on top, find what's broken, and fix it with you. A real platform comes later. Right now, you get the outcome without the implementation.",
  },
  {
    q: "What does the free audit actually include?",
    a: "A 4-page PDF with: (1) your dollar-quantified revenue leaks ranked by size, (2) what's causing each one based on your CSV data, (3) a 60-day recovery roadmap, (4) the benchmark comparison against multi-location medspas your size. Delivered in 48 hours from when you send the export.",
  },
  {
    q: "Do I need to give you access to my Zenoti / Boulevard account?",
    a: "Not for the free audit. You export a CSV (we send a 2-minute Loom showing exactly how). For paid retainers, we set up a read-only data connection so reports run weekly without you exporting anything.",
  },
  {
    q: "How long until I see recovered revenue?",
    a: "Most clients see the first dollar recovery in week 2. Material recovery (5-figures per location) in 30-60 days. The full 60-day plan typically recovers 5-10x the retainer fee.",
  },
  {
    q: "What if I'm not on Zenoti, Boulevard, or Mangomint?",
    a: "Email Jim direct (jim@etienneagency.com). If you're on Pabau, Mindbody, or anything similar, we can still run the audit. The leakage model is the same.",
  },
  {
    q: "What if I have 30+ locations?",
    a: "Talk to us. We handle data residency, custom pipelines, volume pricing, and dedicated solutions architecture for groups above 25 locations. The free audit works regardless of size.",
  },
];

export default function EarlyAdopterSection() {
  const [inView, setInView] = useState(false);
  const { hasInteracted, result } = useCalculator();

  // Personalized CTA label on the highlighted step — only if they've interacted
  const personalizedCtaLabel =
    hasInteracted && result.recoveryAnnual.expected > 0
      ? `Reclaim your ${formatCurrencyCompact(result.recoveryAnnual.expected)}/yr`
      : null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    const el = document.getElementById("early-adopter-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="early-adopter-section"
      className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden"
    >
      <div className="container relative z-10">
        {/* Header */}
        <div
          className={`max-w-3xl mx-auto text-center mb-14 md:mb-18 transition-all duration-[var(--duration-reveal)] ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label">THE OFFER</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.05] mb-0">
            One offer. Three steps. 60 days to recovered revenue.
          </h2>
        </div>

        {/* Step Cards */}
        <div
          className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10 transition-all duration-[var(--duration-reveal)] delay-150 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {steps.map((step) => (
            <StepCard
              key={step.stepLabel}
              step={step}
              personalizedCtaLabel={step.highlighted ? personalizedCtaLabel : null}
            />
          ))}
        </div>

        {/* Section closer */}
        <div
          className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-[var(--duration-reveal)] delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            Most medspa software charges you for dashboards. We charge you for recovered revenue. If you don't see the report in 48 hours, you don't owe a thing.
          </p>
        </div>

        {/* FAQ */}
        <div
          className={`max-w-3xl mx-auto mb-14 transition-all duration-[var(--duration-reveal)] delay-250 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="font-display text-2xl sm:text-3xl text-foreground text-center mb-8">
            Questions we hear every time
          </h3>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border/60 rounded-xl px-5 bg-white/60 data-[state=open]:bg-white data-[state=open]:shadow-sm"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Final CTA */}
        <div
          className={`text-center transition-all duration-[var(--duration-reveal)] delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <MagneticButton className="inline-block">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button
                className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
                onClick={() =>
                  trackCTAClick(
                    personalizedCtaLabel ?? "Get Your Free Audit",
                    "Early Adopter",
                    "primary"
                  )
                }
              >
                {personalizedCtaLabel ?? "Get Your Free Audit"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </MagneticButton>
          <p className="text-sm text-muted-foreground mt-4">
            Start with the free audit. No call required. 48-hour turnaround.
          </p>
        </div>
      </div>
    </section>
  );
}

interface StepCardProps {
  step: Step;
  personalizedCtaLabel: string | null;
}

function StepCard({ step, personalizedCtaLabel }: StepCardProps) {
  const base =
    "relative rounded-2xl border p-7 sm:p-8 flex flex-col h-full interactive-card ";
  const visual = step.highlighted
    ? "bg-white border-primary/60 shadow-xl shadow-primary/10 md:scale-[1.03]"
    : "bg-white/80 border-border/60 shadow-sm";

  const effectiveCtaLabel = personalizedCtaLabel ?? step.ctaLabel;

  const cardContent = (
    <>
      <div className="mb-5">
        <p
          className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
            step.highlighted ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {step.stepLabel}
        </p>
        <p className="font-display text-4xl sm:text-5xl text-foreground leading-none">
          {step.priceLabel}
        </p>
        <p className="text-sm text-muted-foreground mt-1.5">{step.priceSublabel}</p>
      </div>

      <h3 className="font-semibold text-foreground text-base mb-3 leading-snug">
        {step.name}
      </h3>

      <p className="text-sm text-muted-foreground mb-7 leading-relaxed flex-1">{step.body}</p>

      <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="block">
        <Button
          className={`w-full rounded-full py-5 h-auto text-sm font-semibold ${
            step.highlighted
              ? "bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
              : "bg-white border-2 border-border text-foreground hover:border-primary/40 hover:bg-primary/5"
          }`}
          onClick={() =>
            trackCTAClick(
              effectiveCtaLabel,
              `Early Adopter - ${step.name}`,
              step.highlighted ? "primary" : "secondary"
            )
          }
        >
          {effectiveCtaLabel}
        </Button>
      </a>
    </>
  );

  // Highlighted step gets a spotlight cursor effect
  if (step.highlighted) {
    return (
      <SpotlightCard className={`rounded-2xl ${base} ${visual}`} intensity={0.1} radius={420}>
        {cardContent}
      </SpotlightCard>
    );
  }

  return <div className={base + visual}>{cardContent}</div>;
}
