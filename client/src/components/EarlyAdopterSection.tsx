/**
 * Early Adopter / Founding Client Section — pricing + urgency
 */

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

export default function EarlyAdopterSection() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    const el = document.getElementById("early-adopter-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="early-adopter-section" className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
      <div className="container relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label">FOUNDING CLIENT OFFER</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
            3 founding client spots. Early adopter pricing.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            We're accepting 3 med spa groups as founding EIP clients. Founding clients get early adopter pricing locked in for the life of their subscription, direct access to the product roadmap, and case study co-development. Once these 3 spots are filled, we move to standard pricing.
          </p>
        </div>

        <div
          className={`max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="card-premium p-6 sm:p-8 border-primary/40 text-center">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Early Adopter</p>
            <p className="font-display text-4xl text-foreground mb-1">$500</p>
            <p className="text-sm text-muted-foreground">/ location / month</p>
          </div>
          <div className="card-premium p-6 sm:p-8 text-center opacity-60">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Standard (after 3 clients)</p>
            <p className="font-display text-4xl text-foreground mb-1">$800</p>
            <p className="text-sm text-muted-foreground">/ location / month</p>
          </div>
        </div>

        <div
          className={`text-center transition-all duration-700 delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a href="https://calendly.com/jim-etienneagency/30min" target="_blank" rel="noopener noreferrer">
            <Button
              className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
              onClick={() => trackCTAClick('Book a Revenue Call', 'Early Adopter Section', 'primary')}
            >
              Book a Revenue Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <p className="text-sm text-muted-foreground mt-4">
            Founding pricing is available while spots last.
          </p>
        </div>
      </div>
    </section>
  );
}
