/**
 * Industries Section Component - Tango Editorial Design
 * Editorial headline with highlights, card grid, alternating accent colors
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
      photo: "/images/medspa.jpg",
    },
    {
      icon: Smile,
      name: "Dental Practices",
      description: "Where every no-show is $350 in lost chair time",
      highlight: "$350 per no-show",
      photo: "/images/dental.jpg",
    },
    {
      icon: Scale,
      name: "Law Firms",
      description: "Where after-hours callers become someone else's client",
      highlight: "24/7 case intake",
      photo: "/images/law.jpg",
    },
    {
      icon: Building2,
      name: "Property Management",
      description: "Where vacant days cost hundreds per unit",
      highlight: "Fill vacancies faster",
      photo: "/images/property.jpg",
    },
    {
      icon: Calculator,
      name: "Accounting & CPA Firms",
      description: "Where tax season inquiries can't wait until Monday",
      highlight: "Scale with demand",
      photo: "/images/accounting.jpg",
    },
    {
      icon: Sparkle,
      name: "Cleaning Companies",
      description: "Where instant quotes win the job",
      highlight: "$2,800 LTV",
      photo: "/images/cleaning.jpg",
    },
    {
      icon: Trophy,
      name: "Sports Facilities",
      description: "Where booking friction kills repeat business",
      highlight: "60% automation rate",
      photo: "/images/sports.jpg",
    },
  ];

  return (
    <section
      id="industries-section"
      className="relative py-20 md:py-28 lg:py-36"
    >
      <div className="container">
        {/* Section header */}
        <div
          className={`max-w-3xl mx-auto text-center mb-16 md:mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.1] mb-6">
            Built for{" "}
            <span className="highlight-purple">multi-location</span> service businesses
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            3–25 locations. High call volume. Real booking value. If a missed call costs you hundreds, our virtual receptionist was built for you.
          </p>
        </div>

        {/* Industries grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                className={`card-premium p-6 sm:p-8 transition-all duration-500 ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${100 + index * 50}ms`,
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="icon-container-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    {industry.photo && (
                      <img
                        src={industry.photo}
                        alt={industry.name}
                        className="industry-photo"
                        loading="lazy"
                      />
                    )}
                  </div>

                  <h3 className="font-display text-xl text-foreground">
                    {industry.name}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {industry.description}
                  </p>

                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {industry.highlight}
                  </span>
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
              className="rounded-full px-8 py-6 h-auto text-base border-2 border-foreground/20 bg-transparent text-foreground hover:bg-muted"
              variant="outline"
            >
              See How It Works for Your Industry
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
