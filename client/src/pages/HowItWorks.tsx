/**
 * How It Works Page - Kinetic Minimalism Design
 * 4-week implementation timeline with detailed breakdown
 * Color: Near-monochromatic (off-white, warm gray, slate) + electric blue accents
 * Typography: Sora (display), Inter (body), JetBrains Mono (data)
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Search, 
  Wrench, 
  Rocket, 
  TrendingUp,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Zap
} from "lucide-react";

export default function HowItWorks() {
  usePageView('How It Works');
  useScrollTracking('How It Works');
  
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  const timeline = [
    {
      week: "Week 1",
      title: "Discovery & Integration Planning",
      icon: Search,
      description: "We audit your current lead flow, response times, and booking systems. No judgment—just data. We map exactly where revenue is slipping through the cracks and design a custom integration plan for your existing tools.",
      outcomes: [
        "Exactly how many leads you're losing and why",
        "Your true cost of slow response (usually eye-opening)",
        "The integration roadmap tailored to your stack"
      ],
      color: "from-blue-500/20 to-blue-600/20"
    },
    {
      week: "Week 2",
      title: "System Build & Knowledge Training",
      icon: Wrench,
      description: "We build your custom response system, trained on your specific services, pricing, FAQs, and brand voice. This isn't a generic chatbot—it sounds like your best front desk person, available 24/7.",
      outcomes: [
        "Instant response flows for calls, texts, web forms, and social messages",
        "Smart qualification logic that routes hot leads to your team",
        "Automated booking with real-time calendar sync",
        "Multi-channel reminder sequences to kill no-shows"
      ],
      color: "from-primary/20 to-blue-500/20"
    },
    {
      week: "Week 3",
      title: "Pilot Launch",
      icon: Rocket,
      description: "We go live with real leads at one location. You watch the system work while we monitor everything and fine-tune responses in real-time. Zero risk to your existing operations.",
      outcomes: [
        "Live testing with actual customer inquiries",
        "Daily optimization based on real conversations",
        "Performance dashboard so you see every metric"
      ],
      color: "from-primary/20 to-primary/30"
    },
    {
      week: "Week 4",
      title: "Full Rollout & Optimization",
      icon: TrendingUp,
      description: "Once the pilot proves results, we expand across all locations. Ongoing optimization ensures the system keeps getting smarter and your recovery rate keeps climbing.",
      outcomes: [
        "Weekly performance reports with clear ROI metrics",
        "Continuous response optimization",
        "Direct access to our team for adjustments"
      ],
      color: "from-primary/30 to-primary/20"
    }
  ];

  const integrations = [
    {
      category: "Scheduling",
      tools: "Bond Sports, Mindbody, Jane, Acuity, Calendly, Google Calendar, and most major platforms"
    },
    {
      category: "CRMs",
      tools: "Salesforce, HubSpot, Clio, Practice Panther, AppFolio, Buildium, and custom systems"
    },
    {
      category: "Phone Systems",
      tools: "Your existing phone numbers stay the same"
    },
    {
      category: "Communication Channels",
      tools: "SMS, email, web chat, Facebook Messenger, Instagram DMs"
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
              From Overwhelmed to <span className="text-primary">Automated</span> in 4 Weeks
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              No six-month implementations. No ripping out your existing systems. We plug into what you already use and start recovering lost revenue fast.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
            {timeline.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div
                  key={index}
                  className={`relative transition-all duration-1000 delay-${index * 100}`}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  {/* Connecting line */}
                  {index < timeline.length - 1 && (
                    <div className="absolute left-8 top-24 w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />
                  )}

                  <div className="relative bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 p-6 sm:p-8 md:p-12 hover:shadow-2xl transition-all duration-500 group">
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${phase.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    <div className="relative grid md:grid-cols-[auto,1fr] gap-8">
                      {/* Icon & Week */}
                      <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-8 h-8" />
                        </div>
                        <div className="font-mono text-sm font-semibold text-primary px-4 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                          {phase.week}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                            {phase.title}
                          </h3>
                          <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                            {phase.description}
                          </p>
                        </div>

                        {/* Outcomes */}
                        <div className="space-y-3">
                          <p className="font-semibold text-foreground">
                            What you'll get:
                          </p>
                          {phase.outcomes.map((outcome, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-foreground/70 leading-relaxed">
                                {outcome}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              What We <span className="text-primary">Integrate With</span>
            </h2>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
              We work with your existing tools—no rip and replace.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border/50 p-8 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {integration.category}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {integration.tools}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center mt-12">
            <p className="text-base text-foreground/60">
              Don't see your tools? Ask us—we probably integrate with it.
            </p>
          </div>
        </div>
      </section>

      {/* ROI Math Section */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card/70 backdrop-blur-xl rounded-3xl border border-border/50 p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                  The Math That <span className="text-primary">Matters</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-foreground/70">
                  The question isn't whether you can afford this. It's whether you can afford not to.
                </p>
              </div>

              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-mono text-sm font-bold text-primary">1</span>
                  </div>
                  <p className="text-base text-foreground/70 leading-relaxed">
                    If you get <span className="font-semibold text-foreground">100 inquiries per month</span> and lose <span className="font-semibold text-foreground">20% to slow response</span>, that's <span className="font-semibold text-primary">20 lost opportunities</span>.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-mono text-sm font-bold text-primary">2</span>
                  </div>
                  <p className="text-base text-foreground/70 leading-relaxed">
                    If your average customer is worth <span className="font-semibold text-foreground">$1,000</span>, that's <span className="font-semibold text-primary">$20,000 in monthly lost revenue</span>.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-mono text-sm font-bold text-primary">3</span>
                  </div>
                  <p className="text-base text-foreground/70 leading-relaxed">
                    Recover even half of those, and you've added <span className="font-semibold text-primary">$10,000/month</span> to your top line.
                  </p>
                </div>
              </div>

              <div className="mt-12 text-center">
                <p className="text-base sm:text-lg font-semibold text-foreground mb-2">
                  That's the 24/7 Revenue Recovery Framework.
                </p>
                <p className="text-base text-foreground/60">
                  We help you capture money that's already trying to reach you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Ready to <span className="text-primary">Stop the Bleeding?</span>
            </h2>
            <p className="text-xl text-foreground/70">
              Let's look at your numbers together. 15 minutes, no pressure, just data.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-lg px-12 py-8 h-auto"
            >
              Schedule Your Discovery Call
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
