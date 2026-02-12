/**
 * Hero Component - Kinetic Minimalism Design
 * Centered floating card with spatial depth
 * Features: Glassmorphism, spring animations, generous negative space
 * Typography: Sora 700 for headline (72px), Inter 500 for subheadline (20px)
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
      {/* Background with subtle gradient and dot pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Floating background image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663030063122/FtClfDncbdVKzIHc.png"
          alt=""
          className={`w-full max-w-6xl h-auto object-contain opacity-40 transition-all duration-1000 ${
            mounted ? "scale-100 opacity-40" : "scale-95 opacity-0"
          }`}
        />
      </div>

      {/* Main content card */}
      <div className="container relative z-10">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${
            mounted
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Glassmorphic card */}
          <div className="relative bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl p-6 sm:p-8 md:p-12 lg:p-16 hover:shadow-3xl transition-all duration-500 hover:-translate-y-1">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative space-y-8">
              {/* Headline */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.15] tracking-tight">
                Stop Losing Revenue to{" "}
                <span className="text-primary">Missed Calls</span> and{" "}
                <span className="text-primary">Slow Responses</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl">
                We handle the busywork so you don't have to. Our 24/7 Revenue
                Recovery Framework captures every lead, books every appointment,
                and follows up automatically, so your team can focus on what
                actually grows your business.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-base px-8 py-6 h-auto"
                  onClick={() => trackCTAClick('See How It Works', 'Hero Section', 'primary')}
                >
                  See How It Works
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-border hover:bg-card text-foreground shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-base px-8 py-6 h-auto"
                  onClick={() => trackCTAClick('Watch 2-Minute Demo', 'Hero Section', 'secondary')}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch 2-Minute Demo
                </Button>
              </div>

              {/* Trust indicator */}
              <div className="pt-6 md:pt-8 border-t border-border/50">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono font-medium">4-week implementation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono font-medium">No rip & replace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
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
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
