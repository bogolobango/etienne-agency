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

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 overflow-hidden">
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
            Our AI receptionist answers every call in under 60 seconds. It books appointments, sends reminders, and follows up with leads — 24/7. No extra staff needed.
          </p>

          {/* CTA Buttons — primary pill + secondary outline pill */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8">
            <Link href="/contact">
              <Button
                className="rounded-full px-8 py-6 h-auto text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                onClick={() => trackCTAClick('Get Started', 'Hero Section', 'primary')}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 h-auto text-base border-2 border-border hover:bg-muted"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {tag}
              </span>
            ))}
          </div>

          {/* Social proof quote */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="quote-mark text-center leading-none mb-[-1.5rem]">&ldquo;</div>
              <blockquote className="font-display italic text-xl sm:text-2xl md:text-3xl text-foreground leading-snug mb-4">
                We were losing 30% of leads to after-hours calls. Now every inquiry gets an instant response — and our bookings are up 40%.
              </blockquote>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Sarah Chen</span> · Med Spa Owner, 6 Locations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
