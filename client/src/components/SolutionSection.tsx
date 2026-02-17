/**
 * Solution Section Component - Technical Mono Design
 * 24/7 Revenue Recovery Framework with three pillars
 */

import { useEffect, useState } from "react";
import { Zap, Calendar, ArrowUpRight } from "lucide-react";

export default function SolutionSection() {
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

    const element = document.getElementById("solution-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="solution-section"
      className="relative py-16 md:py-24 lg:py-32 border-t border-border"
    >
      <div className="container">
        {/* Section header */}
        <div
          className={`max-w-4xl mx-auto text-center mb-12 md:mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
            The{" "}
            <span className="underline decoration-2 underline-offset-4">24/7 Revenue Recovery Framework</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We plug directly into your existing systems and start recovering
            lost revenue within weeks—not months. No ripping out what works. No
            learning curve for your team.
          </p>
        </div>

        {/* Grid layout - 2x2 */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Instant Response */}
          <div
            className={`bg-card rounded-sm border border-border p-6 sm:p-8 md:p-10 transition-all duration-500 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-sm bg-secondary text-foreground font-mono font-bold text-lg">
                1
              </div>

              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Instant Response
              </h3>

              {/* Visual element */}
              <div className="relative h-32 bg-secondary rounded-sm p-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-12 h-12 text-foreground" />
                </div>
                <div className="absolute bottom-4 left-6 font-mono text-xs text-foreground font-semibold">
                  &lt; 60 seconds
                </div>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">
                Every inquiry gets answered in under 60 seconds. Calls, texts,
                web forms, social messages—24 hours a day, 7 days a week. Your
                leads never wait, never wonder, never wander to a competitor.
              </p>
            </div>
          </div>

          {/* Card 2: Smart Scheduling */}
          <div
            className={`bg-card rounded-sm border border-border p-6 sm:p-8 md:p-10 transition-all duration-500 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-sm bg-secondary text-foreground font-mono font-bold text-lg">
                2
              </div>

              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Smart Scheduling
              </h3>

              {/* Visual element - Calendar grid */}
              <div className="relative h-32 bg-secondary rounded-sm p-6">
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 rounded-sm ${
                        i === 4 || i === 7
                          ? "bg-foreground"
                          : "bg-border"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute bottom-4 right-6 flex items-center gap-1 text-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="font-mono text-xs font-semibold">
                    Auto-booked
                  </span>
                </div>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">
                Qualified leads get booked directly into your calendar.
                Automated reminders at 24 hours and 2 hours cut no-shows by
                30-40%. One-click rescheduling keeps appointments on the books.
              </p>
            </div>
          </div>

          {/* Card 3: Intelligent Escalation */}
          <div
            className={`bg-card rounded-sm border border-border p-6 sm:p-8 md:p-10 transition-all duration-500 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-sm bg-secondary text-foreground font-mono font-bold text-lg">
                3
              </div>

              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Intelligent Escalation
              </h3>

              {/* Visual element - Flow diagram */}
              <div className="relative h-32 bg-secondary rounded-sm p-6">
                <div className="flex items-center justify-between h-full">
                  <div className="flex flex-col gap-2">
                    <div className="h-3 w-16 bg-border rounded-sm" />
                    <div className="h-3 w-12 bg-border rounded-sm" />
                    <div className="h-3 w-14 bg-border rounded-sm" />
                  </div>
                  <ArrowUpRight className="w-8 h-8 text-foreground" />
                  <div className="flex items-center justify-center w-16 h-16 rounded-sm bg-foreground text-background">
                    <span className="text-xs font-mono font-bold">
                      VIP
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">
                Routine questions get handled automatically. High-value
                opportunities and urgent issues get routed to your team with
                full context. You focus on what moves the needle.
              </p>
            </div>
          </div>

          {/* Card 4: Integration highlight */}
          <div
            className={`bg-secondary rounded-sm border border-border p-8 md:p-10 transition-all duration-500 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Seamless Integration
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Works with your existing CRM, scheduling software, and phone
                  system. No rip and replace.
                </p>
              </div>

              {/* Integration icons grid */}
              <div className="grid grid-cols-3 gap-3">
                {["CRM", "Cal", "Phone", "SMS", "Email", "Web"].map(
                  (label, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center h-14 rounded-sm bg-card border border-border text-xs font-mono font-semibold text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-200"
                    >
                      {label}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
