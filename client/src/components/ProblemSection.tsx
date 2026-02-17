/**
 * Problem Section Component - Technical Mono Design
 * Highlights the pain points and costs of missed calls
 */

import { useEffect, useState } from "react";
import { PhoneOff, Clock, TrendingDown, CalendarX } from "lucide-react";

export default function ProblemSection() {
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

    const element = document.getElementById("problem-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const problems = [
    {
      icon: PhoneOff,
      stat: "78%",
      description: "of customers choose the first business that responds. If you're not first, you're last.",
    },
    {
      icon: Clock,
      stat: "100x",
      description: "more likely to connect with leads when responding within 5 minutes vs. 30 minutes.",
    },
    {
      icon: TrendingDown,
      stat: "42 hours",
      description: "average response time to a lead. By then, your competitor already closed the deal.",
    },
    {
      icon: CalendarX,
      stat: "20-40%",
      description: "of appointments become no-shows without proper reminder systems.",
    },
  ];

  return (
    <section
      id="problem-section"
      className="relative py-16 md:py-24 lg:py-32"
    >
      <div className="container">
        {/* Section intro */}
        <div
          className={`max-w-3xl mx-auto text-center mb-12 md:mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            Every Missed Call Is{" "}
            <span className="underline decoration-2 underline-offset-4">Money Walking Out the Door</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            You know the feeling. The phone rings during a procedure. A lead
            submits a form at 9pm. Your front desk is slammed and a potential
            $5,000 client hangs up after the third ring.
          </p>
        </div>

        {/* Problem statement */}
        <div
          className={`max-w-2xl mx-auto text-center mb-12 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-lg sm:text-xl font-semibold text-foreground mb-2">
            Here's what that costs you:
          </p>
        </div>

        {/* Statistics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className={`bg-card rounded-sm border border-border p-6 sm:p-8 transition-all duration-500 ${
                  inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${300 + index * 100}ms`,
                }}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-sm bg-secondary flex items-center justify-center text-foreground">
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Statistic */}
                  <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                    {problem.stat}
                  </div>

                  {/* Description */}
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing statement */}
        <div
          className={`max-w-2xl mx-auto text-center mt-16 transition-all duration-700 delay-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-xl md:text-2xl font-semibold text-foreground">
            You didn't build your business to babysit a phone.{" "}
            <span className="underline decoration-2 underline-offset-4">Let's fix this.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
