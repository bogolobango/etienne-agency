/**
 * About Page - Founder story + done-for-you service positioning
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import FloatingDustMotes from "@/components/FloatingDustMotes";
import { CALENDLY_URL } from "@/const";

export default function About() {
  usePageView("About");
  useScrollTracking("About");
  useSEO("/about");

  const [inView, setInView] = useState(false);
  useEffect(() => { setInView(true); }, []);

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-12 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={50} />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)",
            transform: "translate(20%,-20%)",
          }}
        />
        <div className="container relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-[var(--duration-slow)] ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              About Etienne
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              Built so multi-location medspa owners stop spending Sunday nights in Excel.
            </p>
          </div>
        </div>
      </section>

      {/* Origin story */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-10"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease",
              }}
            >
              Where this started
            </h2>
            <div
              className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease",
                transitionDelay: "150ms",
              }}
            >
              <p>
                Jim spent eight years selling revenue intelligence to Fortune 500 manufacturers and retailers. He closed deals that put reporting in front of operators who had never seen their numbers laid out that clearly before. Multiple President's Club finishes. He knew what it felt like to hand someone a document that changed how they ran their business.
              </p>
              <p>
                Then his wife started going to a multi-location medspa. One of her providers left. She asked the front desk about it and got a shrug.
              </p>
              <p>
                The location near their home felt slower every month. The medspa owners were paying thousands a month for booking software that could not tell them which location was bleeding cash or why.
              </p>
              <p className="font-semibold text-foreground">
                He built Etienne to fix that gap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Etienne is */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-hero overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-10"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease",
                transitionDelay: "100ms",
              }}
            >
              Not software. A service.
            </h2>
            <div
              className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease",
                transitionDelay: "250ms",
              }}
            >
              <p>
                Etienne is done-for-you revenue recovery for multi-location medspas. You send a CSV export from your booking system. We deliver a 4-page audit in 48 hours and run the recovery playbook with you.
              </p>
              <p>
                There is no platform to log into. No dashboard to learn. No onboarding call with an account manager who hands you off to a success team. When you hire Etienne, you hire Jim. Every audit, every report, and every recovery plan goes through him directly.
              </p>
              <p>
                Your booking software is good at what it does. Etienne handles what it was never designed to do: tell you exactly where revenue is leaking, by location, by dollar amount, and what to do about it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder card */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div
            className="max-w-3xl mx-auto"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease",
              transitionDelay: "200ms",
            }}
          >
            <div className="card-premium p-8 sm:p-10">
              <h3 className="font-display text-2xl text-foreground mb-1">Jim Stephen</h3>
              <p className="text-sm text-primary font-semibold mb-6">Founder &amp; CEO</p>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">
                Eight years closing enterprise deals with Fortune 500 manufacturers and retailers, including multiple President's Club finishes, before building Etienne to bring that same level of revenue analysis to the medical aesthetics market.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Jim runs every engagement personally. He reads your data, writes your audit, and runs the recovery sessions. There is no junior analyst doing the work between calls. You have direct access to the person who built this.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA - dark */}
      <section className="relative py-20 md:py-28 lg:py-36 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={40} />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-6">
              Get Your Free Audit
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
              Send your CSV. Get the 4-page PDF in 48 hours. No call required. No commitment.
            </p>
            <a href="/#early-adopter-section">
              <Button
                className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
                onClick={() => trackCTAClick("Get Your Free Audit", "About", "primary")}
              >
                Get Your Free Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <p className="text-sm text-white/40 mt-6">
              If you want to talk through the numbers first, grab a 20-minute call below.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block"
            >
              <Button
                variant="ghost"
                className="rounded-full px-6 py-4 h-auto text-sm font-medium text-white/60 hover:text-white hover:bg-white/10"
                onClick={() => trackCTAClick("Schedule a Call", "About", "secondary")}
              >
                Schedule a 20-minute call
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
