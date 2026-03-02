/**
 * Med Spas Landing Page — highest-intent page for email outreach
 * Replaces the old generic Industries page. Also accessible at /med-spas.
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import FloatingDustMotes from "@/components/FloatingDustMotes";

export default function Industries() {
  usePageView("Med Spas");
  useScrollTracking("Med Spas");
  useSEO("/med-spas");

  const [inView, setInView] = useState(false);
  useEffect(() => { setInView(true); }, []);

  const timeline = [
    { time: "9:47 PM", text: "A prospective client fills out a consultation request for CoolSculpting. She's researched three practices and is ready to book.", active: false },
    { time: "9:48 PM", text: 'Your form sends an auto-reply: "We\'ll get back to you during business hours." She Googles the next practice on her list.', active: false },
    { time: "9:51 PM", text: "A competitor with AI-powered instant response books her for a $4,500 body contouring consultation. She's off the market.", active: false },
    { time: "10:02 AM (next day)", text: "Your front desk calls back. She doesn't answer. She's already booked. That's $4,500 in revenue — gone.", active: true },
  ];

  const withoutEIP = [
    "After-hours inquiries wait until morning",
    "34% of calls missed during peak hours",
    "No-show rate: 20–40%",
    "Staff spends 17,500 hours/year on repetitive FAQs",
    "No visibility into lost revenue across locations",
  ];

  const withEIP = [
    "Every inquiry gets an intelligent response in under 2 seconds",
    "AI handles 60% of inquiries automatically",
    "No-show rate drops to 8–12% with automated reminders",
    "Staff freed for high-value client interactions",
    "Real-time revenue recovery dashboard across all locations",
  ];

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero — dark */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={50} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)", transform: "translate(20%,-20%)" }}
        />
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              Revenue intelligence built for multi-location med spas
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">
              The average 5-location med spa loses $60K–$180K per year from missed after-hours inquiries, no-shows, and slow follow-up. EIP recovers it automatically — without adding staff or replacing your booking system.
            </p>
            <Link href="/contact">
              <Button className="rounded-full px-8 py-6 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill">
                Book a Revenue Audit <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline — what happens every night */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <p className="section-label">THE REALITY</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1]">
                What happens every night at your practice
              </h2>
            </div>

            <div className="relative pl-8 md:pl-12">
              {/* Vertical timeline line */}
              <div className="absolute left-3 md:left-5 top-0 bottom-0 w-[2px] bg-primary/20" aria-hidden="true" />

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <div key={i} className={`relative transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${i * 150}ms` }}>
                    {/* Dot */}
                    <div className={`absolute -left-5 md:-left-7 top-1 w-3 h-3 rounded-full border-2 ${item.active ? "bg-[#FF6B6B] border-[#FF6B6B]" : "bg-primary border-primary"}`} />
                    <div className={`font-mono text-sm font-semibold mb-1 ${item.active ? "text-[#FF6B6B]" : "text-primary"}`}>
                      {item.time}
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`mt-12 p-6 rounded-xl bg-[#FF6B6B]/5 border border-[#FF6B6B]/15 transition-all duration-700 delay-700 ${inView ? "opacity-100" : "opacity-0"}`}>
              <p className="text-base text-foreground leading-relaxed">
                <strong>This happens 3–5 times per week, per location.</strong> For a 5-location med spa, that's $8K–15K/month in revenue that never needed to be lost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <p className="section-label">THE FIX</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1]">
                What changes with EIP
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Without EIP */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border-l-4 border-l-[#FF6B6B] border border-border/50">
                <h3 className="font-display text-xl text-foreground mb-4">Without EIP</h3>
                <ul className="space-y-3">
                  {withoutEIP.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B6B] mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* With EIP */}
              <div className="bg-white rounded-xl p-6 sm:p-8 border-l-4 border-l-primary border border-border/50">
                <h3 className="font-display text-xl text-foreground mb-4">With EIP</h3>
                <ul className="space-y-3">
                  {withEIP.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="section-label">WORKS WITH YOUR STACK</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
              Plugs into Zenoti, Boulevard, or Mangomint in weeks
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
              EIP is an intelligence layer that sits on top of your existing booking platform. No data migration. No workflow changes. No retraining your team.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Zenoti", "Boulevard", "Mangomint"].map((name) => (
                <span key={name} className="tool-pill text-base px-5 py-2">{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="relative py-20 md:py-28 lg:py-36 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={40} />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-6">
              See what you're losing — in 15 minutes
            </h2>
            <p className="text-base sm:text-lg text-white/70 mb-10">
              We'll analyze your after-hours inquiry patterns and calculate your specific revenue gap. No obligation. Just data.
            </p>
            <Link href="/contact">
              <Button className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill">
                Book a Free Revenue Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
