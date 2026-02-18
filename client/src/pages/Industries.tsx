/**
 * Industries Page - Technical Mono Design
 * Detailed breakdown of industries served with pain points and solutions
 * Typography: Sora for headlines, Inter for body, JetBrains Mono for stats
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Sparkles,
  Smile,
  Scale,
  Building2,
  Calculator,
  Sparkle,
  Trophy,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function Industries() {
  usePageView('Industries');
  useScrollTracking('Industries');

  const [inView, setInView] = useState(false);

  useEffect(() => {
    document.title = "AI Scheduling by Industry | Med Spa, Dental, Law Firm | Etienne Agency";
    setInView(true);
  }, []);

  const industries = [
    {
      icon: Sparkles,
      name: "Med Spas & Aesthetic Clinics",
      problem: "A Botox client texts at 8pm. Your front desk closed at 6. By morning, she booked with your competitor. Med spa appointment scheduling can't stop at 5pm.",
      stats: [
        "75% fewer no-shows with automated reminders",
        "46% of appointments booked online, 70% on mobile",
        "20% no-show rate costs the average med spa 14% of daily revenue"
      ],
      solution: "Our AI receptionist responds to every inquiry instantly, books consultations with smart scheduling, and sends multi-channel reminders that keep your chairs full.",
      highlight: "$500+ per missed call"
    },
    {
      icon: Smile,
      name: "Dental Practices",
      problem: "New patient calls come in during procedures. Your front desk juggles check-ins, insurance, and the phone. Something gives — and it's the phone. Dental practice automation solves this.",
      stats: [
        "New patient value: $350–$700 for first visit alone",
        "30–40% no-show reduction with automated reminder systems",
        "Manual scheduling has 10% error rate vs. under 1% with AI"
      ],
      solution: "24/7 new patient intake, insurance verification triggers, and automated recall reminders. Your virtual receptionist keeps every hygiene chair full.",
      highlight: "$350 per no-show"
    },
    {
      icon: Scale,
      name: "Law Firms",
      problem: "Someone gets in an accident at 11pm. They call three firms. The first one to answer gets the case. Law firm lead management starts with speed.",
      stats: [
        "30% more conversions with AI-assisted intake",
        "Response under 1 minute is critical for PI and immigration",
        "47% of immigration firms already use AI for intake"
      ],
      solution: "After-hours intake that qualifies leads, captures case details, and routes urgent matters to your team — while protecting attorney-client confidentiality.",
      highlight: "First responder wins"
    },
    {
      icon: Building2,
      name: "Property Management",
      problem: "A prospective tenant inquires Saturday. Your leasing office is closed. They tour a competitor's unit Sunday and sign Monday. Property management automation stops the bleed.",
      stats: [
        "70% of rental inquiries can be handled by AI",
        "75% of leasing staff time saved on initial inquiry handling",
        "60% less vacancy time with instant response systems"
      ],
      solution: "24/7 leasing inquiries, instant tour scheduling, and an automated follow-up system that fills vacancies faster than any front desk can.",
      highlight: "Hundreds per vacant day"
    },
    {
      icon: Calculator,
      name: "Accounting & CPA Firms",
      problem: "Tax season hits. Your phone rings nonstop. Your CPAs are buried in returns. New clients wait days for a callback — if they haven't already found someone else.",
      stats: [
        "3x faster lead conversion with AI-driven intake",
        "Responding in under 1 minute doubles engagement",
        "Seasonal surges overwhelm traditional staffing every year"
      ],
      solution: "Accounting firm scheduling that scales with demand. Instant inquiry response, consultation booking, and document collection — all automated.",
      highlight: "Tax season surge"
    },
    {
      icon: Sparkle,
      name: "Cleaning Companies",
      problem: "Someone searches 'house cleaning near me,' fills out three quote forms, and books with whoever responds first. If that's not you, you lost a $2,800 customer.",
      stats: [
        "67% of customers expect a response within 5 minutes",
        "30–40% of leads lost to slow response times",
        "$2,800 average customer lifetime value"
      ],
      solution: "Instant quote responses, automated booking, and reminder sequences. Your AI receptionist turns first-time inquiries into repeat customers.",
      highlight: "$2,800 LTV"
    },
    {
      icon: Trophy,
      name: "Sports Facilities",
      problem: "Your front desk is buried in 'What time do you open?' calls. High-value corporate event inquiries go to voicemail. By the time you call back, they booked elsewhere.",
      stats: [
        "60% of routine inquiries handled automatically by AI",
        "15% no-show rate drains revenue from booked slots",
        "10,500+ hours/year spent answering repetitive FAQs"
      ],
      solution: "24/7 booking across all channels. Smart scheduling handles routine requests. Intelligent escalation routes corporate inquiries to your team instantly.",
      highlight: "60% automation"
    }
  ];

  const idealFit = [
    {
      title: "3–25 locations",
      description: "Big enough to feel the pain of scaling. Nimble enough to move fast."
    },
    {
      title: "High-value appointments",
      description: "Each booking worth $100–$5,000+. Every missed call hurts."
    },
    {
      title: "High inquiry volume",
      description: "Enough leads that appointment scheduling automation creates real ROI."
    },
    {
      title: "Existing systems in place",
      description: "A CRM, scheduling tool, or booking platform our AI plugs into."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-background" />
        </div>

        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              AI Appointment Scheduling for Industries Where Every{" "}
              <span className="underline decoration-2 underline-offset-4">Missed Call Has a Dollar Sign</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              Our virtual receptionist handles calls, books appointments, and follows up — built for multi-location service businesses where slow responses cost real money.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Detail Section */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container">
          <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={index}
                  className={`relative transition-all duration-1000 delay-${index * 100}`}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="relative bg-card rounded-sm border border-border p-6 sm:p-8 md:p-12 hover:shadow-sm transition-all duration-500 group">

                    <div className="relative space-y-6">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-sm bg-secondary flex items-center justify-center text-foreground flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                            <Icon className="w-7 h-7" />
                          </div>
                          <div>
                            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                              {industry.name}
                            </h2>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-secondary text-foreground text-sm font-mono font-semibold">
                              {industry.highlight}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Problem */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">
                          The Problem
                        </h3>
                        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                          {industry.problem}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-foreground/50 uppercase tracking-wider">
                          The Reality
                        </h3>
                        <ul className="space-y-2">
                          {industry.stats.map((stat, statIndex) => (
                            <li key={statIndex} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                              <span className="text-sm sm:text-base text-foreground/70">
                                {stat}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Solution */}
                      <div className="space-y-3 pt-4 border-t border-border">
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                          Our Solution
                        </h3>
                        <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                          {industry.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ideal Fit Section */}
      <section className="relative py-12 md:py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                Who the 24/7 Revenue Recovery Framework Is <span className="underline decoration-2 underline-offset-4">Best For</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-foreground/70">
                Multi-location service businesses that match these four criteria:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
              {idealFit.map((item, index) => (
                <div
                  key={index}
                  className="bg-card rounded-sm border border-border p-6 sm:p-8 hover:shadow-sm transition-all duration-300"
                >
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/70">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <div className="bg-card rounded-sm border border-border p-8 md:p-12 shadow-xl">
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Not Sure If You're a Fit?
                </h3>
                <p className="text-base sm:text-lg text-foreground/70 mb-6">
                  15-minute call. No commitment. We'll tell you if we can help — or point you somewhere better.
                </p>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-sm transition-all duration-300"
                  >
                    Book a Free Discovery Call
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
