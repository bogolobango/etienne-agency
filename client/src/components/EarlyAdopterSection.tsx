/**
 * Offer Section — exit-led three-tier offer.
 *
 * Structure:
 *   1. Section headline ("One free look. One 90-day engine. One standing desk.")
 *   2. Three step cards (Free Map / Exit Engine / Operator's Desk) with middle card highlighted
 *   3. Section closer
 *   4. Three guarantee cards row
 *   5. FAQ accordion (8 questions)
 *   6. Final CTA
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
    body: "You export one CSV from Zenoti, Boulevard, or Mangomint. We send back your Leakage Map in 48 hours: every dollar leak across every location, ranked by size, with the cause named. No call. No pitch. Yours to keep even if we never speak.",
    ctaLabel: "Claim Your Free Map",
    bonuses: [
      "The Leakage Map, dollar-ranked by location, provider, and day of week",
      "Your numbers against the AmSpa median and top-quartile operators",
      "A 2-minute Loom from Jim walking your top 3 leaks",
    ],
    highlighted: false,
  },
  {
    stepLabel: "Step 2 of 3",
    name: "The Exit Engine",
    priceLabel: "$7,500 + 15%",
    priceSublabel: "base plus 15% of measured recovery. 90-day engagement. Performance fee only on dollars we can show against your locked baseline.",
    body: "The working relationship. Your team executes. We run the system that makes sure execution actually happens and gets counted.",
    ctaLabel: "Start With the Free Map",
    bonuses: [
      "Locked baseline by location, provider, and day of week: first artifact in your data room",
      "Fix queue: every leak becomes a scheduled fix with a named owner on your team and a date",
      "Every fix written for you: deposit policy, rebooking script, provider schedule change, word for word",
      "Weekly Monday-9am numbers against baseline: what moved, what didn't, which location skipped",
      "Monthly recovered-revenue statement, measured against baseline",
      "Data room built as we go: fix log, SOPs, baseline, recovery statements",
    ],
    highlighted: true,
  },
  {
    stepLabel: "Step 3 of 3",
    name: "The Operator's Desk",
    priceLabel: "$3,500",
    priceSublabel: "per month, group-wide. Available only after the Engine.",
    body: "The Engine ends. The cadence shouldn't. The Desk keeps the Monday numbers coming, the baseline current, and the data room warm.",
    ctaLabel: "Talk to Jim About the Desk",
    bonuses: [
      "Weekly numbers against baseline, every Monday by 9am",
      "Monthly 60-minute operating review with Jim",
      "Quarterly exit-readiness refresh: where you sit on the 3x-to-10x curve now",
      "Direct Slack channel, one-business-day response",
    ],
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Couldn't my ops person do this with AI tools?",
    a: "The analysis, maybe some of it. But the analysis was never what recovers the money. What recovers the money is a locked baseline nobody can argue with, a fix with a named owner and a date, and someone outside the building checking the number every Monday and asking why it didn't move. That's a cadence and an accountability structure, not an output. It's also what a diligence team wants to see, and 'our ops person ran some prompts' doesn't hold up in a data room.",
  },
  {
    q: "What if my team doesn't execute the fixes?",
    a: "Then Monday's numbers say so, with the location and the owner named, and we address it on the call that week. That pressure is most of what you're paying for. If a fix stalls three weeks running, we escalate to you directly with the cost of the delay in dollars. What we don't do is quietly let it slide and send another document.",
  },
  {
    q: "Is this consulting? Who actually does the work?",
    a: "Your team executes and we run the system that makes execution happen. We lock the baseline, write every fix word for word, set the weekly queue, and check the numbers every Monday. Your managers deploy the fixes in their locations. That split is deliberate: fixes your own team ships are the ones that survive, and they're the ones a buyer believes.",
  },
  {
    q: "What does the free Leakage Map actually include?",
    a: "Your dollar leaks ranked by size, per location and per provider and per day of week. The cause behind each leak, drawn from your own CSV data. Your numbers against the AmSpa median and top-quartile benchmarks. A 2-minute Loom from Jim walking your top three leaks. Delivered in 48 hours from when we get your export.",
  },
  {
    q: "How do you measure 'recovered revenue' for the performance fee?",
    a: "Against the baseline we lock in the first two weeks, from your own booking data, location by location. The monthly recovery statement shows the delta. You see the math before any performance invoice. If a gain came from something outside the fix queue, like a new location opening, it's excluded. The measurement rules are in the agreement in plain English.",
  },
  {
    q: "Do I need to give you access to my Zenoti / Boulevard / Mangomint account?",
    a: "No. The free Map runs on one CSV export. Inside the Engine, most clients share a read-only export cadence or a report login. We read your data. We never change it.",
  },
  {
    q: "What if I'm not on Zenoti, Boulevard, or Mangomint?",
    a: "If your system exports appointments, providers, and invoices to CSV, we can almost certainly work with it. Mindbody and Pabau both work today. Send the export and we'll confirm within a day. Email Jim direct at jim@etienneagency.com.",
  },
  {
    q: "What if I have 30+ locations?",
    a: "The Engine is built for 5 to 25. Above that, the cadence needs more than one analyst and we'd rather tell you that up front. Book a call and we'll either scope it honestly or point you to a better fit.",
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
    body: "Free Map only. If your Leakage Map isn't in your inbox in 48 hours, you'll never get a follow-up email from us. The free tier is free.",
  },
  {
    icon: Shield,
    title: "The $50K Floor",
    body: "Exit Engine only. If the locked baseline doesn't surface at least $50,000 per location in year-one recoverable revenue within the first 30 days, we refund the full $7,500 base and part ways. Every baseline goes through Jim personally, which is why we can make this promise.",
  },
  {
    icon: Calendar,
    title: "The Zero-Movement Clause",
    body: "Exit Engine only. The performance fee is 15% of measured recovery above your locked baseline. Measured means shown in your own booking data, month over month. If the number doesn't move, you owe nothing beyond the base.",
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
            One free look. One 90-day engine. One standing desk.
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
            Software charges you for dashboards. We charge a base to run the system and a percentage of what actually moves. If the number doesn't move, the percentage is zero.
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
                    personalizedCtaLabel ?? "Claim Your Free Map",
                    "Early Adopter",
                    "primary"
                  )
                }
              >
                {personalizedCtaLabel ?? "Claim Your Free Map"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </MagneticButton>
          <p className="text-sm text-muted-foreground mt-4">
            Start with the free Map. No call required. 48-hour turnaround.
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
