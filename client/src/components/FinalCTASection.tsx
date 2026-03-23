/**
 * Final CTA Section — "Find Out What Your Locations Are Missing."
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { trackCTAClick } from "@/lib/analytics";
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
            Find out what your locations are missing.
          </h2>
          <div className="flex justify-center mb-6">
            <a href="https://calendly.com/jim-etienneagency/30min" target="_blank" rel="noopener noreferrer">
              <Button
                className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
                onClick={() => trackCTAClick('Book a Revenue Call', 'Final CTA Section', 'primary')}
              >
                Book a Revenue Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>

          <p className="text-sm text-white/40">
            20 minutes. We'll show you exactly what EIP would surface from your booking data.<br />
            No pitch deck. No commitment.
          </p>
        </div>
      </div>
    </section>
  );
}
