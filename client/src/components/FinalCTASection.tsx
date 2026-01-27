/**
 * Final CTA Section Component - Kinetic Minimalism Design
 * Closing call-to-action with consultation details
 * Features: Large floating card, prominent CTA, value proposition list
 * Typography: Sora for headline, Inter for body
 */

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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
    "Your current response times and where leads are falling through the cracks",
    "What recovery looks like for your specific situation",
    "Whether we're the right fit (sometimes we're not, and we'll tell you)",
  ];

  return (
    <section
      id="final-cta-section"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background with dynamic gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <img
            src="/images/cta-accent.png"
            alt=""
            className="w-full max-w-4xl h-auto object-contain"
          />
        </div>
      </div>

      <div className="container relative z-10">
        {/* Main CTA card */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Large glassmorphic card */}
          <div className="relative bg-card/70 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl p-12 md:p-16 hover:shadow-3xl transition-all duration-500">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative space-y-8">
              {/* Headline */}
              <div className="text-center space-y-4">
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Let's Talk About What{" "}
                  <span className="text-primary">You're Losing</span>
                </h2>
                <p className="text-xl md:text-2xl text-foreground/70">
                  A 15-minute call. No pitch deck. Just an honest conversation
                  about whether this makes sense for your business.
                </p>
              </div>

              {/* Benefits list */}
              <div className="space-y-4 max-w-2xl mx-auto">
                <p className="text-lg font-semibold text-foreground">
                  We'll walk through:
                </p>
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 group"
                    style={{
                      animation: inView
                        ? `fadeIn 0.5s ease-out ${0.3 + index * 0.1}s both`
                        : "none",
                    }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-base text-foreground/70 leading-relaxed">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-lg px-12 py-8 h-auto"
                >
                  Schedule Your Call
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="pt-8 border-t border-border/50">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>15 minutes, no pressure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Honest assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Clear next steps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add fadeIn animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
