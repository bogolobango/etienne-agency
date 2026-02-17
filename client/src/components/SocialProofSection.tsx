/**
 * Social Proof Section Component - Technical Mono Design
 * Animated statistics counters with industry benchmarks
 */

import { useEffect, useState, useRef } from "react";
import { TrendingUp, Users, Clock, Target } from "lucide-react";

interface StatProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  description: string;
  delay: number;
}

function AnimatedStat({ icon: Icon, value, suffix, label, description, delay }: StatProps) {
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
      className="bg-card rounded-sm border border-border p-6 sm:p-8 transition-all duration-500"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="space-y-4">
        {/* Icon */}
        <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center text-foreground">
          <Icon className="w-5 h-5" />
        </div>

        {/* Animated number */}
        <div className="space-y-1">
          <div className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
            {count}
            <span className="text-3xl sm:text-4xl md:text-5xl">{suffix}</span>
          </div>
          <div className="font-semibold text-base sm:text-lg text-foreground">{label}</div>
        </div>

        {/* Description */}
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
      icon: TrendingUp,
      value: 391,
      suffix: "%",
      label: "Higher Conversion",
      description: "When responding within 1 minute vs. 1 hour (Velocify)",
      delay: 0,
    },
    {
      icon: Users,
      value: 60,
      suffix: "%",
      label: "Automated Inquiries",
      description: "Routine questions handled without human intervention (Arena Sports)",
      delay: 100,
    },
    {
      icon: Clock,
      value: 75,
      suffix: "%",
      label: "Time Saved",
      description: "Leasing staff time saved on initial inquiry handling (Zumper)",
      delay: 200,
    },
    {
      icon: Target,
      value: 35,
      suffix: "%",
      label: "Fewer No-Shows",
      description: "Reduction with automated multi-channel reminders",
      delay: 300,
    },
  ];

  return (
    <section
      id="social-proof-section"
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
            The Numbers <span className="underline decoration-2 underline-offset-4">Don't Lie</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Industry benchmarks from businesses using automated response and
            booking systems:
          </p>
        </div>

        {/* Stats grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto transition-all duration-700 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} />
          ))}
        </div>

        {/* Source note */}
        <div
          className={`max-w-4xl mx-auto text-center mt-12 transition-all duration-700 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm font-mono text-muted-foreground">
            Data from Velocify, Arena Sports, Zumper, and industry studies on
            automated response systems
          </p>
        </div>
      </div>
    </section>
  );
}
