/**
 * How It Works Page — 4-week process + 3 modules
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  usePageView("How It Works");
  useScrollTracking("How It Works");
  useSEO("/how-it-works");

  const [inView, setInView] = useState(false);
  useEffect(() => { setInView(true); }, []);

  const steps = [
    {
      week: "Week 1",
      title: "Discovery & Audit",
      description: "We analyze your current inquiry flow — how leads come in, where they get stuck, and exactly how much revenue is leaking. You get a detailed revenue gap report within 48 hours.",
    },
    {
      week: "Week 2",
      title: "Integration & Configuration",
      description: "We connect EIP to your booking platform (Zenoti, Boulevard, Mangomint) and configure the AI to handle your specific services, pricing, and booking rules. Your team reviews and approves everything.",
    },
    {
      week: "Week 3",
      title: "Launch & Monitor",
      description: "EIP goes live across all channels — SMS, email, web chat, and phone. We monitor every conversation for the first 7 days to fine-tune responses and ensure quality.",
    },
    {
      week: "Week 4+",
      title: "Optimize & Report",
      description: "Your dashboard shows real-time revenue recovery, AI performance, and location-level insights. Monthly optimization reviews keep performance improving.",
    },
  ];

  const modules = [
    {
      title: "Command Center",
      description: "One inbox for every AI conversation across all channels and locations. See what your AI is saying, how clients respond, and when to escalate.",
    },
    {
      title: "Scheduling Intelligence",
      description: "Real-time appointment data, utilization rates, and no-show tracking. Know which locations are underperforming before the month ends.",
    },
    {
      title: "Revenue Intelligence",
      description: "See exactly how much revenue EIP recovered — by location, by channel, by time period. Ask questions in plain English, get answers backed by your data.",
    },
  ];

  const integrations = [
    { category: "Booking Platforms", tools: "Zenoti, Boulevard, Mangomint, Mindbody, Acuity" },
    { category: "CRMs", tools: "Salesforce, HubSpot, and custom systems" },
    { category: "Phone Systems", tools: "Your existing phone numbers stay the same" },
    { category: "Channels", tools: "SMS, email, web chat, Facebook Messenger, Instagram DMs" },
  ];

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero — dark */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)", transform: "translate(20%,-20%)" }}
        />
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              How it works
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              From integration to revenue recovery in 4 weeks. No system replacement. No learning curve.
            </p>
          </div>
        </div>
      </section>

      {/* 4-week process */}
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <p className="section-label">THE PROCESS</p>
          </div>
          <div className="max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative mb-12 md:mb-16"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.7s ease",
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                {i < steps.length - 1 && (
                  <div className="absolute left-6 md:left-10 bottom-0 translate-y-full h-12 md:h-16 timeline-connector z-10" aria-hidden="true" />
                )}
                <div className="card-on-alt p-6 sm:p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex md:flex-col items-center md:items-start gap-4">
                      <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/15">
                        {step.week}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three modules */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1]">
              Three modules. One intelligence layer.
            </h2>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((mod, i) => (
              <div key={i} className="card-premium p-6 sm:p-8">
                <h3 className="font-display text-xl text-foreground mb-3">{mod.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{mod.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
              Works with your existing tools
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              We plug into what you already use — no rip and replace.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((item, i) => (
              <div key={i} className="card-premium p-6 sm:p-8">
                <h3 className="font-display text-lg text-foreground mb-3">{item.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tools.split(", ").map((tool, j) => (
                    <span key={j} className="tool-pill">{tool}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't see your tools? Ask us — we probably integrate with it.
          </p>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="relative py-20 md:py-28 lg:py-36 section-dark overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-6">
              Find out how much revenue your practice is losing
            </h2>
            <p className="text-base sm:text-lg text-white/70 mb-10">
              15 minutes. We'll analyze your current booking flow and estimate your monthly revenue gap. No commitment. No pitch deck. Just numbers.
            </p>
            <Link href="/contact">
              <Button className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill">
                Book a Revenue Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
