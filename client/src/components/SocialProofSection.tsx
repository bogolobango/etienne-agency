/**
 * Social Proof Section Component - Tango Editorial Design
 * 3-column text card grid for benefits + testimonial quote block
 */

import { useEffect, useState, useRef } from "react";
import GradientOrbs, { type OrbConfig } from "@/components/GradientOrbs";

const socialOrbs: OrbConfig[] = [
  { size: 450, color: "#FF8C42", x: "-5%", y: "-10%", opacity: 0.35, duration: 13, delay: 2, parallaxFactor: 45 },
  { size: 400, color: "#00D4AA", x: "75%", y: "60%", opacity: 0.4, duration: 11, delay: 5, parallaxFactor: -35 },
];

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  description: string;
  delay: number;
}

function AnimatedStat({ value, suffix, label, description, delay }: StatProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (statRef.current) observer.observe(statRef.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div
      ref={statRef}
      className="card-on-alt p-6 sm:p-8 transition-all duration-500"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="space-y-3">
        <div className="font-display text-4xl sm:text-5xl text-foreground">
          {count}
          <span className="text-3xl sm:text-4xl">{suffix}</span>
        </div>
        <div className="font-semibold text-base text-foreground">{label}</div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function SocialProofSection() {
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

    const element = document.getElementById("social-proof-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: 391,
      suffix: "%",
      label: "Higher Conversion",
      description: "Leads contacted within 1 minute convert 391% more than those contacted after 1 hour (Velocify)",
      delay: 0,
    },
    {
      value: 60,
      suffix: "%",
      label: "Inquiries Automated",
      description: "Routine questions handled by AI — no human needed (based on industry benchmarks for AI-assisted inquiry handling)",
      delay: 100,
    },
    {
      value: 75,
      suffix: "%",
      label: "Staff Time Saved",
      description: "Front desk and leasing staff freed from repetitive inquiry handling (Zumper)",
      delay: 200,
    },
  ];

  return (
    <section
      id="social-proof-section"
      className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden"
    >
      {/* Animated gradient orbs */}
      <GradientOrbs orbs={socialOrbs} />

      <div className="container relative z-10">
        {/* Section header */}
        <div
          className={`max-w-3xl mx-auto text-center mb-16 md:mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.1] mb-6">
            What service business automation{" "}
            <span className="highlight-green">actually delivers</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Real results from businesses using AI receptionist and smart scheduling systems.
          </p>
        </div>

        {/* 3-column card grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16 md:mb-20 transition-all duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} />
          ))}
        </div>

        {/* Key outcomes preview */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-700 delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="testimonial-card">
            <p className="text-sm font-semibold text-foreground mb-4 text-center font-sans">What our clients can expect</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10">
              <div className="text-center">
                <div className="font-display text-2xl text-foreground">&lt; 60s</div>
                <p className="text-xs text-muted-foreground mt-1">Response time</p>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl text-foreground">30–40%</div>
                <p className="text-xs text-muted-foreground mt-1">Fewer no-shows</p>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl text-foreground">60%</div>
                <p className="text-xs text-muted-foreground mt-1">Inquiries automated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Source note */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xs text-muted-foreground">
            Data from Velocify, Zumper, and industry studies
          </p>
        </div>
      </div>
    </section>
  );
}
