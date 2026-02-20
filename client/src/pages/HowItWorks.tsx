/**
 * How It Works Page - Tango Editorial Design
 * 4-week implementation timeline with editorial styling
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  ArrowRight,
  Search,
  Wrench,
  Rocket,
  TrendingUp,
  CheckCircle2,
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
        "The integration roadmap built for your stack"
      ],
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
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
              From overwhelmed to{" "}
              <span className="highlight-purple">automated</span> in 4 weeks
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              No six-month implementations. No ripping out your existing systems. We plug into what you already use and start recovering lost revenue fast.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20 md:py-28 lg:py-36 bg-section-alt">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
            {timeline.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <div
                  key={index}
                  className="relative"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.7s ease',
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <div className="bg-background rounded-2xl border border-border/50 p-6 sm:p-8 md:p-10 transition-all duration-300 hover:shadow-md">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Icon & Week badge */}
                      <div className="flex md:flex-col items-center md:items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          {phase.week}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="space-y-4 flex-1">
                        <h3 className="font-display text-2xl md:text-3xl text-foreground">
                          {phase.title}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {phase.description}
                        </p>

                        <div className="space-y-2 pt-2">
                          <p className="text-sm font-semibold text-foreground font-sans">
                            What you'll get:
                          </p>
                          {phase.outcomes.map((outcome, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-muted-foreground leading-relaxed">
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
      <section className="relative py-20 md:py-28 lg:py-36">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
              What we{" "}
              <span className="highlight-green">integrate with</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We work with your existing tools—no rip and replace.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="bg-section-alt rounded-2xl p-6 sm:p-8"
              >
                <h3 className="font-display text-xl text-foreground mb-3">
                  {integration.category}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {integration.tools}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-muted-foreground">
              Don't see your tools? Ask us—we probably integrate with it.
            </p>
          </div>
        </div>
      </section>

      {/* ROI Math Section */}
      <section className="relative py-20 md:py-28 lg:py-36 bg-section-alt">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
              The math that{" "}
              <span className="highlight-coral">matters</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-12">
              The question isn't whether you can afford this. It's whether you can afford not to.
            </p>

            <div className="space-y-6 max-w-xl mx-auto text-left mb-12">
              {[
                { num: "1", text: <>If you get <strong className="text-foreground">100 inquiries per month</strong> and lose <strong className="text-foreground">20% to slow response</strong>, that's <strong className="text-foreground">20 lost opportunities</strong>.</> },
                { num: "2", text: <>If your average customer is worth <strong className="text-foreground">$1,000</strong>, that's <strong className="text-foreground">$20,000 in monthly lost revenue</strong>.</> },
                { num: "3", text: <>Recover even half of those, and you've added <strong className="text-foreground">$10,000/month</strong> to your top line.</> },
              ].map((item) => (
                <div key={item.num} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-semibold text-primary">{item.num}</span>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-display text-xl sm:text-2xl text-foreground italic mb-2">
              That's the 24/7 Revenue Recovery Framework.
            </p>
            <p className="text-sm text-muted-foreground">
              We help you capture money that's already trying to reach you.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 md:py-28 lg:py-36">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
              Ready to{" "}
              <span className="highlight-coral">stop the bleeding?</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-10">
              Let's look at your numbers together. 15 minutes, no pressure, just data.
            </p>
            <Link href="/contact">
              <Button
                className="rounded-full px-10 py-7 h-auto text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
              >
                Schedule Your Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
