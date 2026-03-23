/**
 * About Page — Our Story + Founder
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
      <section className="relative pt-24 pb-12 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-gradient-hero overflow-hidden">
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
              We built the intelligence layer your booking system should have included.
            </h1>
            <a href="https://calendly.com/jim-etienneagency/30min" target="_blank" rel="noopener noreferrer">
              <Button
                className="rounded-full px-8 py-6 h-auto text-base font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
                onClick={() => trackCTAClick('Book a Revenue Call', 'About Hero', 'primary')}
              >
                Book a Revenue Call <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* The Story */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-10">
              Our story
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Etienne started with a question: if multi-location med spas are running some of the most sophisticated booking and CRM platforms in the service industry, why are they still losing $15K&ndash;$20K/month in revenue they can't see?
              </p>
              <p>
                The answer is simple: booking platforms are tools for operations. They're built to manage appointments, process payments, and track guest records. They're excellent at what they do. But they were never designed to be intelligence tools &mdash; to tell you why Williamsburg is underperforming, how much your Tuesday no-shows are really costing you, or why your rebooking rate at one center is 14 points lower than the others.
              </p>
              <p className="font-semibold text-foreground">
                That's the gap we fill.
              </p>
              <p>
                The Etienne Intelligence Platform connects to your existing stack &mdash; Zenoti, Boulevard, Mangomint &mdash; and adds a layer of revenue intelligence that these platforms aren't built to provide. We don't replace anything. We make everything you already have more valuable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="card-premium p-8 sm:p-10">
              <h3 className="font-display text-2xl text-foreground mb-1">Jim Stephen</h3>
              <p className="text-sm text-primary font-semibold mb-6">Founder &amp; CEO</p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Eight years closing enterprise SaaS deals with Fortune 500 manufacturers and retailers &mdash; including multiple President&rsquo;s Club finishes &mdash; before building Etienne to bring the same intelligence infrastructure to the $21 billion medical aesthetics market. Jim built EIP specifically for operators who are running 3&ndash;25 locations and making decisions from spreadsheets.
              </p>
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
              See what your locations are missing
            </h2>
            <a href="https://calendly.com/jim-etienneagency/30min" target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full px-8 py-6 h-auto text-base font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill">
                Book a Revenue Call <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <p className="text-sm text-white/40 mt-6">
              20 minutes. We'll show you exactly what EIP would surface from your booking data.<br />
              No pitch deck. No commitment.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
