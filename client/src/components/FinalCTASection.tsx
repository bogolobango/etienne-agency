/**
 * Final CTA Section Component - Tango Editorial Design
 * Centered editorial CTA with pill button and trust indicators
 */

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function FinalCTASection() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("final-cta-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const benefits = [
    "Your current lead response time and where missed calls cost you the most",
    "A quick ROI estimate based on your call volume and no-show rate",
    "Whether the 24/7 Revenue Recovery Framework fits your business (sometimes it doesn't, and we'll say so)",
  ];

  return (
    <section
      id="final-cta-section"
      className="relative py-20 md:py-28 lg:py-36 section-gradient-cta"
    >
      <div className="container">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.1] mb-6">
            Find out what{" "}
            <span className="highlight-coral">missed calls</span> cost you
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-12">
            15-minute call. No pitch deck. Just an honest look at your numbers.
          </p>

          {/* Benefits list */}
          <div className="space-y-4 max-w-xl mx-auto text-left mb-12">
            <p className="text-sm uppercase tracking-wider text-muted-foreground font-medium text-center">
              We'll walk through
            </p>
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{
                  transitionDelay: `${300 + index * 100}ms`,
                }}
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-base text-muted-foreground leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button — pill */}
          <div className="flex justify-center mb-10">
            <Link href="/contact">
              <Button
                className="rounded-full px-10 py-7 h-auto text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/30 btn-primary-pill"
              >
                Get Your Free Revenue Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>15 minutes, no pressure</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>Honest assessment</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>Clear next steps</span>
          </div>
        </div>
      </div>
    </section>
  );
}
