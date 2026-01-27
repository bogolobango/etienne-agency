/**
 * Solution Section Component - Kinetic Minimalism Design
 * 24/7 Revenue Recovery Framework with three pillars
 * Grid layout inspired by modern SaaS feature showcases
 * Typography: Sora for headlines, Inter for body
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
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container relative z-10">
        {/* Section header */}
        <div
          className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            The{" "}
            <span className="text-primary">24/7 Revenue Recovery Framework</span>
          </h2>
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
            We plug directly into your existing systems and start recovering
            lost revenue within weeks—not months. No ripping out what works. No
            learning curve for your team.
          </p>
        </div>

        {/* Grid layout - 2x2 with intro card */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Instant Response */}
          <div
            className={`group relative bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 p-8 md:p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative space-y-6">
              {/* Number badge */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-mono font-bold text-lg">
                1
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Instant Response
              </h3>

              {/* Visual element - Response time indicator */}
              <div className="relative h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    <Zap className="relative w-12 h-12 text-primary" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-6 font-mono text-xs text-primary font-semibold">
                  &lt; 60 seconds
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-foreground/70 leading-relaxed">
                Every inquiry gets answered in under 60 seconds. Calls, texts,
                web forms, social messages—24 hours a day, 7 days a week. Your
                leads never wait, never wonder, never wander to a competitor.
              </p>
            </div>
          </div>

          {/* Card 2: Smart Scheduling */}
          <div
            className={`group relative bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 p-8 md:p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative space-y-6">
              {/* Number badge */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-mono font-bold text-lg">
                2
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Smart Scheduling
              </h3>

              {/* Visual element - Calendar grid */}
              <div className="relative h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6">
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-6 rounded ${
                        i === 4 || i === 7
                          ? "bg-primary animate-pulse"
                          : "bg-primary/20"
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute bottom-4 right-6 flex items-center gap-1 text-primary">
                  <Calendar className="w-4 h-4" />
                  <span className="font-mono text-xs font-semibold">
                    Auto-booked
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-foreground/70 leading-relaxed">
                Qualified leads get booked directly into your calendar.
                Automated reminders at 24 hours and 2 hours cut no-shows by
                30-40%. One-click rescheduling keeps appointments on the books.
              </p>
            </div>
          </div>

          {/* Card 3: Intelligent Escalation */}
          <div
            className={`group relative bg-card/60 backdrop-blur-xl rounded-3xl border border-border/50 p-8 md:p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative space-y-6">
              {/* Number badge */}
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary font-mono font-bold text-lg">
                3
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Intelligent Escalation
              </h3>

              {/* Visual element - Flow diagram */}
              <div className="relative h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6">
                <div className="flex items-center justify-between h-full">
                  <div className="flex flex-col gap-2">
                    <div className="h-3 w-16 bg-primary/30 rounded" />
                    <div className="h-3 w-12 bg-primary/30 rounded" />
                    <div className="h-3 w-14 bg-primary/30 rounded" />
                  </div>
                  <ArrowUpRight className="w-8 h-8 text-primary" />
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border-2 border-primary">
                    <span className="text-xs font-mono font-bold text-primary">
                      VIP
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-foreground/70 leading-relaxed">
                Routine questions get handled automatically. High-value
                opportunities and urgent issues get routed to your team with
                full context. You focus on what moves the needle.
              </p>
            </div>
          </div>

          {/* Card 4: Integration highlight */}
          <div
            className={`group relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-xl rounded-3xl border border-primary/20 p-8 md:p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="relative space-y-6 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Seamless Integration
                </h3>
                <p className="text-base text-foreground/70 leading-relaxed">
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
                      className="flex items-center justify-center h-14 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 text-xs font-semibold text-foreground/70 hover:text-primary hover:border-primary/50 transition-all duration-300"
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
