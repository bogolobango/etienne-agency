/**
 * Early Access Program Section — replaces the old Early Adopter / pricing block.
 *
 * Structure:
 *   1. Hero + pitch (the founding spots framing)
 *   2. Three pricing tiers with middle tier highlighted (classic anchoring)
 *   3. What founding clients get (mutual-value framing — transparent about
 *      why we're doing this, what we expect in exchange)
 *   4. Feature comparison table (defuses "what do I actually get?" objection)
 *   5. FAQ accordion (answers the four most common objections)
 *   6. CTA
 *
 * No fabricated testimonials. No phantom customer quotes. The section sells
 * the program honestly: here's the deal, here's what both sides get, here's
 * why it's a good trade.
 */

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Minus, Lock, Compass, MessageSquare, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackCTAClick } from "@/lib/analytics";
import { useCalculator } from "@/context/CalculatorContext";
import { formatCurrencyCompact } from "@/lib/leakage";
import MagneticButton from "@/components/MagneticButton";
import SpotlightCard from "@/components/SpotlightCard";

interface Tier {
  name: string;
  priceLabel: string;
  priceSublabel: string;
  description: string;
  ctaLabel: string;
  highlighted: boolean;
  badge?: string;
  features: Array<{ label: string; included: boolean }>;
}

const tiers: Tier[] = [
  {
    name: "Early Adopter",
    priceLabel: "$500",
    priceSublabel: "/ location / month",
    description: "Founding cohort. Limited to 3 spots. Pricing locked for life.",
    ctaLabel: "Claim a Founding Spot",
    highlighted: true,
    badge: "3 spots left",
    features: [
      { label: "All revenue intelligence modules", included: true },
      { label: "Cross-location benchmarking", included: true },
      { label: "AI Revenue Analyst (natural language)", included: true },
      { label: "Weekly ops review with founder", included: true },
      { label: "Direct product roadmap input", included: true },
      { label: "Pricing locked for the life of subscription", included: true },
    ],
  },
  {
    name: "Standard",
    priceLabel: "$800",
    priceSublabel: "/ location / month",
    description: "Opens after the 3 founding spots are filled. Standard onboarding.",
    ctaLabel: "Join the Waitlist",
    highlighted: false,
    features: [
      { label: "All revenue intelligence modules", included: true },
      { label: "Cross-location benchmarking", included: true },
      { label: "AI Revenue Analyst (natural language)", included: true },
      { label: "Quarterly ops review", included: true },
      { label: "Standard product feedback channel", included: true },
      { label: "Pricing locked for the life of subscription", included: false },
    ],
  },
  {
    name: "Enterprise",
    priceLabel: "Custom",
    priceSublabel: "25+ locations",
    description: "Custom onboarding, SLA, and data residency for larger groups.",
    ctaLabel: "Talk to Sales",
    highlighted: false,
    features: [
      { label: "All revenue intelligence modules", included: true },
      { label: "Cross-location benchmarking", included: true },
      { label: "AI Revenue Analyst (natural language)", included: true },
      { label: "Dedicated solutions architect", included: true },
      { label: "Custom data pipelines + SLA", included: true },
      { label: "Volume pricing", included: true },
    ],
  },
];

const foundingBenefits = [
  {
    icon: Lock,
    title: "Pricing locked for life",
    copy: "Your $500/location/month stays $500 even when we raise rates. Forever.",
  },
  {
    icon: Compass,
    title: "Shape the roadmap",
    copy: "Direct line to the product team. The features you need get prioritized.",
  },
  {
    icon: MessageSquare,
    title: "Weekly ops review",
    copy: "30 min a week with the founder walking through your revenue gaps together.",
  },
  {
    icon: Users,
    title: "Case study co-development",
    copy: "When the results come in, we document them together — you get the exposure, we get the proof.",
  },
];

const faqs = [
  {
    q: "What if I'm on Pabau, not Zenoti/Boulevard/Mangomint?",
    a: "Pabau is on the integration roadmap. Founding clients can reserve a spot now and get prioritized when the Pabau integration ships. If you'd rather not wait, we can talk through a custom data-sync path during the onboarding call.",
  },
  {
    q: "How long does onboarding take?",
    a: "For a supported booking system (Zenoti, Boulevard, Mangomint), initial data connection is 1–2 days. Full historical backfill and benchmarking takes 5–7 days. You'll see your first cross-location revenue gaps surface within the first week.",
  },
  {
    q: "Does EIP replace my booking system?",
    a: "No. EIP sits on top of your existing booking system — Zenoti, Boulevard, or Mangomint — and makes sense of the data across every location. You keep using your booking software exactly as you do today.",
  },
  {
    q: "What if I have 30+ locations?",
    a: "Talk to us about the Enterprise tier. We handle data residency, custom pipelines, volume pricing, and dedicated solutions architecture for groups above 25 locations. The founding-client program is designed for 3–25-location operators.",
  },
];

export default function EarlyAdopterSection() {
  const [inView, setInView] = useState(false);
  const { hasInteracted, result } = useCalculator();

  // Personalized CTA label on the highlighted tier — only if they've interacted
  const personalizedCtaLabel = hasInteracted && result.recoveryAnnual.expected > 0
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
    <section id="early-adopter-section" className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div
          className={`max-w-3xl mx-auto text-center mb-14 md:mb-18 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label">EARLY ACCESS PROGRAM</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.05] mb-6">
            Three founding spots. A real trade.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We're taking on three med spa groups as founding clients. You get early-adopter pricing locked in for life, weekly time with the founder, and direct influence over the roadmap. We get the real-world signal we need to build this right. Once the three spots are gone, standard pricing opens.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div
          className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-14 transition-all duration-700 delay-150 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {tiers.map((tier) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              personalizedCtaLabel={tier.highlighted ? personalizedCtaLabel : null}
            />
          ))}
        </div>

        {/* What founding clients get — mutual value framing */}
        <div
          className={`max-w-5xl mx-auto mb-16 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="font-display text-2xl sm:text-3xl text-foreground text-center mb-3">
            What the founding deal actually includes
          </h3>
          <p className="text-center text-sm text-muted-foreground mb-10 max-w-xl mx-auto">
            No vague "white-glove onboarding" language. Here's what you get and what we get in exchange.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {foundingBenefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="card-on-alt p-5">
                  <div className="icon-container-lg mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground text-base mb-1.5">{b.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.copy}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div
          className={`max-w-3xl mx-auto mb-14 transition-all duration-700 delay-250 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="font-display text-2xl sm:text-3xl text-foreground text-center mb-8">
            The four questions everyone asks first
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
          className={`text-center transition-all duration-700 delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <MagneticButton className="inline-block">
            <a href="https://calendly.com/jim-etienneagency/30min" target="_blank" rel="noopener noreferrer">
              <Button
                className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
                onClick={() => trackCTAClick(personalizedCtaLabel ?? "Book a Revenue Call", 'Early Access Section', 'primary')}
              >
                {personalizedCtaLabel ?? "Book a Revenue Call"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </MagneticButton>
          <p className="text-sm text-muted-foreground mt-4">
            20 minutes with Jim. We'll walk through your numbers together. Founding pricing available while the 3 spots last.
          </p>
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  tier: Tier;
  personalizedCtaLabel: string | null;
}

function PricingCard({ tier, personalizedCtaLabel }: PricingCardProps) {
  const base =
    "relative rounded-2xl border p-7 sm:p-8 flex flex-col h-full interactive-card ";
  const visual = tier.highlighted
    ? "bg-white border-primary/60 shadow-xl shadow-primary/10 md:scale-[1.03]"
    : "bg-white/80 border-border/60 shadow-sm";

  const effectiveCtaLabel = personalizedCtaLabel ?? tier.ctaLabel;

  const cardContent = (
    <>
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">
          {tier.badge}
        </div>
      )}

      <div className="mb-5">
        <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${tier.highlighted ? "text-primary" : "text-muted-foreground"}`}>
          {tier.name}
        </p>
        <p className="font-display text-4xl sm:text-5xl text-foreground leading-none">{tier.priceLabel}</p>
        <p className="text-sm text-muted-foreground mt-1.5">{tier.priceSublabel}</p>
      </div>

      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{tier.description}</p>

      <ul className="space-y-2.5 mb-7 flex-1">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            {f.included ? (
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            ) : (
              <Minus className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mt-0.5" />
            )}
            <span className={f.included ? "text-foreground" : "text-muted-foreground/60 line-through"}>
              {f.label}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="https://calendly.com/jim-etienneagency/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button
          className={`w-full rounded-full py-5 h-auto text-sm font-semibold ${
            tier.highlighted
              ? "bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
              : "bg-white border-2 border-border text-foreground hover:border-primary/40 hover:bg-primary/5"
          }`}
          onClick={() => trackCTAClick(effectiveCtaLabel, `Pricing ${tier.name}`, tier.highlighted ? "primary" : "secondary")}
        >
          {effectiveCtaLabel}
        </Button>
      </a>
    </>
  );

  // Highlighted tier gets a spotlight cursor effect
  if (tier.highlighted) {
    return (
      <SpotlightCard className={`rounded-2xl ${base} ${visual}`} intensity={0.1} radius={420}>
        {cardContent}
      </SpotlightCard>
    );
  }

  return <div className={base + visual}>{cardContent}</div>;
}
