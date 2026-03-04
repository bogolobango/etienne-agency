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
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
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
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-gradient-hero overflow-hidden">
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
              We built the intelligence layer your booking system should have included.
            </h1>
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
                The answer is simple: booking platforms are tools for operations. They're built to manage appointments, process payments, and track guest records. They're excellent at what they do. But they were never designed to be intelligence tools &mdash; to tell you why Williamsburg is underperforming, or how much your Tuesday no-shows are really costing you, or which leads your front desk dropped last week, and what those leads were worth.
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
                Formerly led AI-powered go-to-market strategy at the Fortune 500 level. Built Etienne to bring enterprise-grade revenue intelligence to the $21 billion medical aesthetics market &mdash; specifically for operators running 3&ndash;25 locations who need cross-center intelligence without hiring a data team.
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
            <p className="text-base sm:text-lg text-white/70 mb-10">
              15 minutes. No pitch deck. Just numbers.
            </p>
            <Link href="/contact">
              <Button className="rounded-full px-8 py-6 h-auto text-base font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill">
                Get Your Free Revenue Audit <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
