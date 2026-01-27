/**
 * Industries Section Component - Kinetic Minimalism Design
 * Showcases the 7 industries served with grid layout
 * Features: Hover effects, industry-specific icons, compelling copy
 * Typography: Sora for headlines, Inter for descriptions
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
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background via-muted/10 to-background"
    >
      <div className="container relative z-10">
        {/* Section header */}
        <div
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Built for Businesses That{" "}
            <span className="text-primary">Are Inbound Leads Heavy</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
            We specialize in service businesses with 3-25 locations where every
            missed call, text and DM could cost hundreds to thousands of dollars.
          </p>
        </div>

        {/* Industries grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div
                key={index}
                className={`group relative bg-card/60 backdrop-blur-xl rounded-2xl border border-border/50 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${100 + index * 50}ms`,
                }}
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative space-y-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Industry name */}
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {industry.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {industry.description}
                  </p>

                  {/* Highlight badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="font-mono text-xs font-semibold text-primary">
                      {industry.highlight}
                    </span>
                  </div>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 text-base px-8 py-6 h-auto"
          >
            See Your Industry
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
