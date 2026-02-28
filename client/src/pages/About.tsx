/**
 * About Page — Team, thesis, approach
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

export default function About() {
  usePageView("About");
  useScrollTracking("About");
  useSEO("/about");

  const [inView, setInView] = useState(false);
  useEffect(() => { setInView(true); }, []);

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero — light background */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
              We built the intelligence layer that booking systems forgot
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Etienne Agency was founded on a simple observation: multi-location med spas
              invest heavily in marketing to generate leads, then lose thousands in revenue
              because nobody answers after hours.
            </p>
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-12 md:mb-16">
              The team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Jim */}
              <div className="card-premium p-6 sm:p-8">
                <h3 className="font-display text-2xl text-foreground mb-1">Jim Etienne</h3>
                <p className="text-sm text-primary font-semibold mb-4">Co-Founder &amp; CEO</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Before Etienne Agency, Jim spent years selling AI solutions to Fortune 500
                  companies. He saw firsthand how enterprise-grade AI could transform operations —
                  and how local service businesses were being left behind. Etienne Agency brings
                  that same caliber of intelligence to the businesses that need it most.
                </p>
              </div>
              {/* Rumeer */}
              <div className="card-premium p-6 sm:p-8">
                <h3 className="font-display text-2xl text-foreground mb-1">Rumeer</h3>
                <p className="text-sm text-primary font-semibold mb-4">Co-Founder &amp; CTO</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Rumeer leads technical architecture and product development, building the
                  integrations and intelligence engines that power EIP. His background in
                  full-stack development and system design ensures that EIP is reliable,
                  fast, and built to scale across hundreds of locations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Thesis */}
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground text-center mb-10">
              Our thesis
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                The $18.6 billion med spa industry is growing at 14% annually.
                Over 10,000 medical spas operate in the US alone. But the technology stack
                hasn't kept up. Booking platforms manage what's already scheduled.
                Nobody is managing what's being missed.
              </p>
              <p>
                That's the gap. EIP is the intelligence layer that sits on top of your
                existing systems and captures the revenue that falls through the cracks —
                automatically, 24/7, across every channel and every location.
              </p>
            </div>
          </div>
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
              15 minutes. No pitch deck. Just numbers.
            </p>
            <Link href="/contact">
              <Button className="rounded-full px-8 py-6 h-auto text-base font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill">
                Book a Revenue Audit <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
