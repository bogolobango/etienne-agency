/**
 * Final CTA Section — Dark background, single clear CTA
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import FloatingDustMotes from "@/components/FloatingDustMotes";

export default function FinalCTASection() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    const el = document.getElementById("final-cta-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="final-cta-section" className="relative py-20 md:py-28 lg:py-36 section-dark overflow-hidden">
      <FloatingDustMotes particleCount={40} />
      <div className="container relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-6">
            Find out how much revenue your practice is losing
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-12">
            15 minutes. We'll analyze your current booking flow and estimate your monthly
            revenue gap. No commitment. No pitch deck. Just numbers.
          </p>

          <div className="flex justify-center mb-10">
            <Link href="/contact">
              <Button
                className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
              >
                Book a Free Revenue Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
