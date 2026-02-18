/**
 * Industries Section Component - Technical Mono Design
 * Showcases the 7 industries served with grid layout
 */

import { useEffect, useState } from "react";
import {
  Sparkles,
  Smile,
  Scale,
  Building2,
  Calculator,
  Sparkle,
  Trophy,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function IndustriesSection() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("industries-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const industries = [
    {
      icon: Sparkles,
      name: "Med Spas & Aesthetic Clinics",
      description: "Where a single missed Botox inquiry costs $500+",
      highlight: "$500+ per missed call",
    },
    {
      icon: Smile,
      name: "Dental Practices",
      description: "Where every no-show is $350 in lost chair time",
      highlight: "$350 per no-show",
    },
    {
      icon: Scale,
      name: "Law Firms",
      description: "Where after-hours callers become someone else's client",
      highlight: "24/7 case intake",
    },
    {
      icon: Building2,
      name: "Property Management",
      description: "Where vacant days cost hundreds per unit",
      highlight: "Fill vacancies faster",
    },
    {
      icon: Calculator,
      name: "Accounting & CPA Firms",
      description: "Where tax season inquiries can't wait until Monday",
      highlight: "Scale with demand",
    },
    {
      icon: Sparkle,
      name: "Cleaning Companies",
      description: "Where instant quotes win the job",
      highlight: "$2,800 LTV",
    },
    {
      icon: Trophy,
      name: "Sports Facilities",
      description: "Where booking friction kills repeat business",
      highlight: "60% automation rate",
    },
  ];

  return (
    <section
      id="industries-section"
      className="relative py-16 md:py-24 lg:py-32 border-t border-border"
    >
      <div className="container">
        {/* Section header */}
        <div
          className={`max-w-3xl mx-auto text-center mb-12 md:mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            Built for{" "}
            <span className="underline decoration-2 underline-offset-4">Multi-Location Service Businesses</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            3–25 locations. High call volume. Real booking value. If a missed call costs you hundreds, our virtual receptionist was built for you.
          </p>
        </div>

        {/* Industries grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto mb-12">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                className={`bg-card rounded-sm border border-border p-6 sm:p-8 transition-all duration-500 cursor-pointer hover:border-foreground ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${100 + index * 50}ms`,
                }}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center text-foreground">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Industry name */}
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {industry.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>

                  {/* Highlight badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-secondary border border-border">
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {industry.highlight}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-700 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link href="/industries">
            <Button
              size="lg"
              variant="outline"
              className="border-2 text-base px-8 py-6 h-auto"
            >
              See How It Works for Your Industry
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
