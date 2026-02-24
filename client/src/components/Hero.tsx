/**
 * Hero Component - Tango Editorial Design
 * Centered editorial layout with serif headlines, colored keyword highlights,
 * pill CTA, use-case badges, and social proof quote
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { trackCTAClick } from "@/lib/analytics";
import GradientOrbs, { type OrbConfig } from "@/components/GradientOrbs";

const heroOrbs: OrbConfig[] = [
  { size: 500, color: "#2D5BFF", x: "-8%", y: "-10%", opacity: 0.45, duration: 14, delay: 0, parallaxFactor: 50 },
  { size: 400, color: "#00D4AA", x: "70%", y: "55%", opacity: 0.4, duration: 12, delay: 3, parallaxFactor: -35 },
  { size: 350, color: "#7B61FF", x: "75%", y: "-15%", opacity: 0.35, duration: 15, delay: 6, parallaxFactor: 30 },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 overflow-hidden section-gradient-hero">
      {/* Animated gradient orbs */}
      <GradientOrbs orbs={heroOrbs} />

      {/* Faint background lifestyle photo — med spa reception, heavily blurred */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          opacity: 0.035,
          filter: "blur(2px) saturate(0.6)",
        }}
      />
      {/* Decorative radial rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true">
        <div className="deco-ring" style={{ width: 600, height: 600, marginLeft: -300, marginTop: -300 }} />
        <div className="deco-ring" style={{ width: 900, height: 900, marginLeft: -450, marginTop: -450, opacity: 0.5 }} />
      </div>
      <div className="container relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ease-out ${
            mounted
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {/* Headline — editorial serif with colored highlights */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
            Stop losing revenue to{" "}
            <span className="highlight-purple">missed calls</span> and{" "}
            <span className="highlight-coral">slow responses</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
            You're losing thousands every month to calls that go to voicemail, leads that get a response tomorrow, and appointments that no-show. We fix that in 4 weeks — without replacing a single tool you already use.
          </p>

          {/* CTA Buttons — primary pill + secondary outline pill */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
            <Link href="/contact">
              <Button
                className="rounded-full px-8 py-6 h-auto text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 btn-primary-pill"
                onClick={() => trackCTAClick('Get Started', 'Hero Section', 'primary')}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 h-auto text-base border-2 border-border hover:bg-muted hover:border-primary/30 transition-all duration-200"
                onClick={() => trackCTAClick('Book a Demo', 'Hero Section', 'secondary')}
              >
                Book a Demo
              </Button>
            </Link>
          </div>

          {/* Use case badges — pill tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {["Med Spas & Clinics", "Dental Practices", "Law Firms", "Property Management"].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-border/60 text-sm text-muted-foreground shadow-sm backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {tag}
              </span>
            ))}
          </div>

          {/* Social proof — industry stat */}
          <div className="max-w-2xl mx-auto">
            <div className="testimonial-card text-left">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-display text-2xl text-primary/60 leading-none" style={{ marginTop: '-4px' }}>&ldquo;</span>
                </div>
                <div>
                  <blockquote className="font-display italic text-xl sm:text-2xl text-foreground leading-snug mb-4">
                    78% of customers buy from the first business that responds to their inquiry.
                  </blockquote>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Lead Response Study</span> · Velocify / InsideSales.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
