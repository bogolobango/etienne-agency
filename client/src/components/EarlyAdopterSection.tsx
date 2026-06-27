/**
 * Offer Section — 3-step outcome-based offer replacing the old Early Adopter pricing block.
 *
 * Structure:
 *   1. Section headline ("One offer. Three steps. The first one is free...")
 *   2. Three step cards (Free Map / Recovery Playbook / Intelligence Desk) with middle card highlighted
 *      Each card: price, name, body, stacked bonuses list, CTA
 *   3. Section closer (guarantee summary line)
 *   4. Three guarantee cards row ("Three guarantees, in order")
 *   5. FAQ accordion (preserved from v1 — Task 4 handles additions)
 *   6. Final CTA
 *
 * No fabricated testimonials. No phantom customer quotes.
 */

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Shield, Calendar } from "lucide-react";
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
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

interface Step {
  stepLabel: string;
  name: string;
  priceLabel: string;
  priceSublabel: string;
  body: string;
  ctaLabel: string;
  bonuses: string[];
  highlighted: boolean;
}

const steps: Step[] = [
  {
    stepLabel: "Step 1 of 3",
    name: "The 48-Hour Leakage Map",
    priceLabel: "$0",
    priceSublabel: "free, no commitment",
    body: "You send a CSV export from Zenoti, Boulevard, or Mangomint. We send back a 4-page Leakage Map in 48 hours: every dollar leak, ranked by size, with the cause. No call. No commitment. Yours to keep even if you walk.",
    ctaLabel: "Claim Your Free Map",
    bonuses: [
      "The Leakage Map PDF (4 pages, dollar-ranked)",
      "Cross-location benchmark scorecard against the AmSpa median",
      "A 2-minute Loom from Jim walking through your top 3 leaks",
    ],
    highlighted: false,
  },
  {
    stepLabel: "Step 2 of 3",
    name: "The 60-Day Recovery Playbook",
    priceLabel: "$3,500",
    priceSublabel: "one-time, money-back if we don't find $50K/loc",
    body: "If the free Map hits a nerve, we go deep. Two-week engagement. We map every leak across every location, build your prioritized 60-day Recovery Playbook, and run a 90-minute strategy session walking through it. You leave with a plan you can run with or without us.",
    ctaLabel: "Book the Playbook",
    bonuses: [
      "The 60-Day Recovery Playbook (location-by-location SOPs)",
      "90-minute strategy session with Jim, recorded for your COO",
      "The PE Readiness Scorecard: where you sit on the 3x-to-10x EBITDA curve",
      "30 days of email follow-up while you execute",
    ],
    highlighted: true,
  },
  {
    stepLabel: "Step 3 of 3",
    name: "The Operator's Intelligence Desk",
    priceLabel: "$2,000",
    priceSublabel: "per location per month",
    body: "We run the Recovery Playbook with you. Weekly anomaly reports, monthly strategy calls, and an analyst on call when Sunday-night questions hit. Most clients recover 5 to 10x the retainer in the first 90 days. Cancel anytime after month 3.",
    ctaLabel: "Talk to Jim About a Desk",
    bonuses: [
      "Weekly anomaly report every Monday by 9am",
      "Monthly 60-minute strategy review with Jim",
      "On-call analyst response within one business day",
      "Quarterly PE Readiness refresh as you prep for a future exit",
      "Direct Slack channel with Jim",
    ],
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

interface GuaranteeCard {
  icon: React.ElementType;
  title: string;
  body: string;
}

const guarantees: GuaranteeCard[] = [
  {
    icon: CheckCircle2,
    title: "The 48-Hour Promise",
    body: "Free Map only. If you don't see your Leakage Map in 48 hours, you don't owe a thing. The free tier is free.",
  },
  {
    icon: Shield,
    title: "The $50K Guarantee",
    body: "Recovery Playbook only. If the Playbook doesn't identify at least $50,000/year of recoverable revenue per location, we refund the full $3,500. Every audit goes through Jim personally, which is why we can make this promise.",
  },
  {
    icon: Calendar,
    title: "The Month-3 Walk",
    body: "Intelligence Desk only. Cancel anytime after month 3. Most clients recover 5 to 10x the monthly retainer in their first quarter. If you don't, you walk.",
  },
];

export default function EarlyAdopterSection() {
  const { ref, inView } = useRevealAnimation<HTMLElement>({ threshold: 0.15 });
  const { hasInteracted, result } = useCalculator();

  // Personalized CTA label on the highlighted step — only if they've interacted
  const personalizedCtaLabel =
    hasInteracted && result.recoveryAnnual.expected > 0
      ? `Reclaim your ${formatCurrencyCompact(result.recoveryAnnual.expected)}/yr`
      : null;

  return (
    <section
      ref={ref}
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
            One offer. Three steps. The first one is free, the second pays for itself, the third is what PE buyers ask if you have.
          </h2>
        </div>

        {/* Step Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10">
          {steps.map((step, i) => (
            <div
              key={step.stepLabel}
              className={`transition-all duration-[var(--duration-reveal)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${150 + i * 150}ms` }}
            >
              <StepCard
                step={step}
                personalizedCtaLabel={step.highlighted ? personalizedCtaLabel : null}
              />
            </div>
          ))}
        </div>

        {/* Section closer */}
        <div
          className={`max-w-2xl mx-auto text-center mb-12 transition-all duration-[var(--duration-reveal)] delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            Most medspa software charges you for dashboards. We charge you for recovered revenue and a higher exit multiple. The free Map is yours in 48 hours or you owe nothing. The Playbook is refunded if we don't surface $50K/location. The Desk you cancel after month 3 if it isn't paying for itself.
          </p>
        </div>

        {/* Three Guarantees Row */}
        <div
          className={`max-w-5xl mx-auto mb-16 transition-all duration-[var(--duration-reveal)] delay-250 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label text-center mb-6">THREE GUARANTEES, IN ORDER</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {guarantees.map((g) => {
              const Icon = g.icon;
              return (
                <div
                  key={g.title}
                  className="rounded-xl border border-border bg-white/60 p-6"
                >
                  <Icon className="w-5 h-5 text-primary mb-3 flex-shrink-0" />
                  <h3 className="font-semibold text-foreground text-base mb-2 leading-snug">
                    {g.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.body}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div
          className={`max-w-3xl mx-auto mb-14 transition-all duration-[var(--duration-reveal)] delay-300 ${
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
          className={`text-center transition-all duration-[var(--duration-reveal)] delay-350 ${
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

      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{step.body}</p>

      {/* Stacked bonuses */}
      <div className="mb-7 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          What's included:
        </p>
        <ul className="space-y-1.5">
          {step.bonuses.map((bonus) => (
            <li key={bonus} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <span>{bonus}</span>
            </li>
          ))}
        </ul>
      </div>

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
