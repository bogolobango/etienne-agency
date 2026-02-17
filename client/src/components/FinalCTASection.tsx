/**
 * Final CTA Section Component - Technical Mono Design
 * Closing call-to-action with consultation details
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
      className="relative py-16 md:py-24 lg:py-32 border-t border-border"
    >
      <div className="container">
        {/* Main CTA card */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-card rounded-sm border border-border p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="space-y-8">
              {/* Headline */}
              <div className="text-center space-y-4">
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Let's Talk About What{" "}
                  <span className="underline decoration-2 underline-offset-4">You're Losing</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground">
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
                    className={`flex items-start gap-3 transition-all duration-500 ${
                      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                    style={{
                      transitionDelay: `${300 + index * 100}ms`,
                    }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  className="text-lg px-12 py-8 h-auto"
                >
                  Schedule Your Call
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="pt-8 border-t border-border">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span className="font-mono">15 minutes, no pressure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span className="font-mono">Honest assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span className="font-mono">Clear next steps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
