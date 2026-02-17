/**
 * Hero Component - Technical Mono Design
 * Centered card with sharp geometry and high-contrast typography
 */

import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { trackCTAClick } from "@/lib/analytics";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-background">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Main content card */}
      <div className="container relative z-10">
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 ease-out ${
            mounted
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="relative bg-card rounded-sm border border-border p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="space-y-8">
              {/* Headline */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.15] tracking-tight">
                Stop Losing Revenue to{" "}
                <span className="text-primary underline decoration-2 underline-offset-4">Missed Calls</span> and{" "}
                <span className="text-primary underline decoration-2 underline-offset-4">Slow Responses</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                We handle the busywork so you don't have to. Our 24/7 Revenue
                Recovery Framework captures every lead, books every appointment,
                and follows up automatically, so your team can focus on what
                actually grows your business.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 h-auto"
                  onClick={() => trackCTAClick('See How It Works', 'Hero Section', 'primary')}
                >
                  See How It Works
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 text-base px-8 py-6 h-auto"
                  onClick={() => trackCTAClick('Watch 2-Minute Demo', 'Hero Section', 'secondary')}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch 2-Minute Demo
                </Button>
              </div>

              {/* Trust indicator */}
              <div className="pt-6 md:pt-8 border-t border-border">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span className="font-mono font-medium">4-week implementation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span className="font-mono font-medium">No rip & replace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                    <span className="font-mono font-medium">24/7 automated response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-700 delay-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-mono font-medium tracking-wider uppercase">Scroll</span>
          <div className="w-px h-12 bg-border" />
        </div>
      </div>
    </section>
  );
}
