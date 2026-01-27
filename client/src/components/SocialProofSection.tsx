/**
 * Social Proof Section Component - Kinetic Minimalism Design
 * Animated statistics counters with industry benchmarks
 * Features: Count-up animations, glassmorphic cards, data visualization
 * Typography: Sora for headline, JetBrains Mono for numbers, Inter for descriptions
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
          
          // Animate counter
          const duration = 2000; // 2 seconds
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
      className="group relative bg-card/60 backdrop-blur-xl rounded-2xl border border-border/50 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative space-y-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>

        {/* Animated number */}
        <div className="space-y-1">
          <div className="font-mono text-5xl md:text-6xl font-bold text-primary">
            {count}
            <span className="text-4xl md:text-5xl">{suffix}</span>
          </div>
          <div className="font-semibold text-lg text-foreground">{label}</div>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/60 leading-relaxed">
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
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background with stats visualization */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img
            src="/images/stats-background.png"
            alt=""
            className="w-full max-w-5xl h-auto object-contain"
          />
        </div>
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <div
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            The Numbers <span className="text-primary">Don't Lie</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
            Industry benchmarks from businesses using automated response and
            booking systems:
          </p>
        </div>

        {/* Stats grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto transition-all duration-1000 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} />
          ))}
        </div>

        {/* Source note */}
        <div
          className={`max-w-4xl mx-auto text-center mt-12 transition-all duration-1000 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm text-muted-foreground">
            Data from Velocify, Arena Sports, Zumper, and industry studies on
            automated response systems
          </p>
        </div>
      </div>
    </section>
  );
}
