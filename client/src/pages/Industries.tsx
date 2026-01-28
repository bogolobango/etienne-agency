/**
 * Industries Page - Kinetic Minimalism Design
 * Detailed breakdown of industries served with pain points and solutions
 * Typography: Sora for headlines, Inter for body, JetBrains Mono for stats
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  const industries = [
    {
      icon: Sparkles,
      name: "Med Spas & Aesthetic Clinics",
      problem: "A potential Botox client texts at 8pm. Your front desk closed at 6. By morning, she's already booked at your competitor down the street.",
      stats: [
        "75% reduction in no-shows with automated reminders",
        "46% of appointments booked online, 70% on mobile",
        "20% no-show rate costs average med spa 14% of daily revenue"
      ],
      solution: "Instant response to every inquiry, smart consultation booking, and multi-channel reminders that keep your chairs full.",
      highlight: "$500+ per missed call"
    },
    {
      icon: Smile,
      name: "Dental Practices",
      problem: "New patient calls come in during procedures. Your front desk is juggling check-ins, insurance, and the phone. Something has to give—and it's usually the phone.",
      stats: [
        "Average new patient value: $350-$700 for first visit",
        "30-40% no-show reduction with proper reminder systems",
        "Manual scheduling has 10% error rate vs. <1% automated"
      ],
      solution: "24/7 new patient intake, insurance verification triggers, and automated recall reminders that keep hygiene chairs full.",
      highlight: "$350 per no-show"
    },
    {
      icon: Scale,
      name: "Law Firms",
      problem: "Someone gets in an accident at 11pm. They call three law firms. The one that answers first gets the case.",
      stats: [
        "30% conversion increase with chatbot-assisted intake",
        "Response time under 1 minute critical for PI and immigration",
        "47% of immigration firms use AI for intake"
      ],
      solution: "After-hours intake that qualifies leads, captures case details, and routes urgent matters—all while maintaining attorney-client confidentiality.",
      highlight: "First responder wins"
    },
    {
      icon: Building2,
      name: "Property Management",
      problem: "A prospective tenant inquires about a unit on Saturday. Your leasing office is closed. They tour your competitor's property on Sunday and sign Monday morning.",
      stats: [
        "70% of rental inquiries can be handled by AI",
        "75% leasing staff time saved on inquiry handling",
        "60% vacancy time reduction with instant response"
      ],
      solution: "24/7 leasing inquiries, instant tour scheduling, and automated follow-up sequences that fill vacancies faster.",
      highlight: "Hundreds per vacant day"
    },
    {
      icon: Calculator,
      name: "Accounting & CPA Firms",
      problem: "Tax season hits. Your phone rings constantly. Your CPAs are buried in returns. New clients wait days for a callback—if they haven't already found someone else.",
      stats: [
        "3x faster lead conversion with AI-driven intake",
        "Response under 1 minute dramatically increases engagement",
        "Seasonal surges overwhelm traditional staffing"
      ],
      solution: "Instant inquiry response, consultation scheduling, and document collection workflows that scale with tax season demand.",
      highlight: "Tax season surge"
    },
    {
      icon: Sparkle,
      name: "Cleaning Companies",
      problem: "Someone searches 'house cleaning near me,' fills out three quote forms, and books with whoever responds first. If that's not you, you lost a $2,800 customer.",
      stats: [
        "67% of customers expect response within 5 minutes",
        "30-40% of leads lost to slow response",
        "$2,800 average customer lifetime value"
      ],
      solution: "Instant quote responses, automated booking, and reminder sequences that reduce cancellations and build repeat business.",
      highlight: "$2,800 LTV"
    },
    {
      icon: Trophy,
      name: "Sports Facilities",
      problem: "Your front desk is slammed with 'What time do you open?' calls while high-value corporate event inquiries go to voicemail. By the time you call back, they've booked elsewhere.",
      stats: [
        "60% automation rate for routine inquiries achievable",
        "15% no-show rate bleeds revenue from booked slots",
        "10,500+ hours/year answering repetitive FAQs"
      ],
      solution: "24/7 booking across all channels, smart escalation for corporate inquiries, and automated reminders that cut no-shows.",
      highlight: "60% automation"
    }
  ];

  const idealFit = [
    {
      title: "3-25 locations",
      description: "Big enough to feel the pain of scaling, nimble enough to move fast"
    },
    {
      title: "High-value appointments",
      description: "Where a single booking is worth $100-$5,000+"
    },
    {
      title: "Significant inquiry volume",
      description: "Enough leads that automation creates real leverage"
    },
    {
      title: "Existing systems in place",
      description: "A CRM, scheduling tool, or booking platform we can integrate with"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        </div>

        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              We Specialize in Businesses Where Every{" "}
              <span className="text-primary">Missed Call Has a Dollar Sign</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              Multi-location service businesses with high call volume and real booking value. If a slow response means lost revenue, we built this for you.
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
                  <div className="relative bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 p-6 sm:p-8 md:p-12 hover:shadow-2xl transition-all duration-500 group">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative space-y-6">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-7 h-7" />
                          </div>
                          <div>
                            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
                              {industry.name}
                            </h2>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono font-semibold">
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
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm sm:text-base text-foreground/70">
                                {stat}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Solution */}
                      <div className="space-y-3 pt-4 border-t border-border/50">
                        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
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
      <section className="relative py-12 md:py-20 lg:py-28 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                Who We're <span className="text-primary">Best For</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-foreground/70">
                We built this for multi-location service businesses:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
              {idealFit.map((item, index) => (
                <div
                  key={index}
                  className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border/50 p-6 sm:p-8 hover:shadow-xl transition-all duration-300"
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
              <div className="bg-card/70 backdrop-blur-xl rounded-3xl border border-border/50 p-8 md:p-12 shadow-xl">
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Not Sure If You're a Fit?
                </h3>
                <p className="text-base sm:text-lg text-foreground/70 mb-6">
                  Let's find out together. 15-minute call, no commitment.
                </p>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                  Schedule a Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
