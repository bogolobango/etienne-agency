/**
 * Solution Section Component - Tango Editorial Design
 * Step-based feature sections with editorial headlines, colored keyword highlights,
 * visual placeholders with rounded corners and soft shadows
 */

import { useEffect, useState } from "react";
import { Zap, Calendar, ArrowUpRight, Plug } from "lucide-react";

export default function SolutionSection() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    const element = document.getElementById("solution-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      step: "Step 1",
      title: "Instant",
      titleRest: " response system",
      highlightClass: "highlight-purple",
      icon: Zap,
      description: "Your AI receptionist answers every call, text, web form, and social message in under 60 seconds. 24/7, 365 days a year. Leads never wait. They never call your competitor.",
      visual: "< 60 seconds response time",
    },
    {
      step: "Step 2",
      title: "Smart",
      titleRest: " scheduling",
      highlightClass: "highlight-coral",
      icon: Calendar,
      description: "AI appointment scheduling books qualified leads right into your calendar. Automated reminders at 24 hours and 2 hours cut no-shows by 30–40%. One-click rescheduling keeps appointments on the books.",
      visual: "Auto-booked & confirmed",
    },
    {
      step: "Step 3",
      title: "Intelligent",
      titleRest: " escalation",
      highlightClass: "highlight-green",
      icon: ArrowUpRight,
      description: "Routine questions get handled automatically. High-value leads and urgent issues get routed to your team with full context. Your staff focuses on work that grows revenue.",
      visual: "Smart routing to your team",
    },
    {
      step: "Step 4",
      title: "Plug-in",
      titleRest: " integration",
      highlightClass: "highlight-purple",
      icon: Plug,
      description: "Connects to your CRM, scheduling software, and phone system in days. No rip and replace. Your automated follow-up system runs on the tools you already use.",
      visual: "CRM · Calendar · Phone · SMS · Email",
    },
  ];

  return (
    <section
      id="solution-section"
      className="relative py-20 md:py-28 lg:py-36"
    >
      <div className="container">
        {/* Section header */}
        <div
          className={`max-w-3xl mx-auto text-center mb-16 md:mb-24 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.1] mb-6">
            The{" "}
            <span className="highlight-purple">24/7 Revenue Recovery</span>{" "}
            Framework
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Our conversational AI plugs into your current tools and starts recovering lost revenue in weeks — not months. No ripping out what works. No learning curve.
          </p>
        </div>

        {/* Step-based feature sections */}
        <div className="max-w-5xl mx-auto space-y-20 md:space-y-28">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                {/* Step label with numbered badge */}
                <div className="text-center mb-6 flex items-center justify-center gap-3">
                  <div className="step-number">{index + 1}</div>
                  <span className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
                    {item.step}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground text-center leading-[1.15] mb-8">
                  <span className={item.highlightClass}>{item.title}</span>
                  {item.titleRest}
                </h3>

                {/* Content grid: text + visual */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${isEven ? '' : 'md:[direction:rtl]'}`}>
                  <div className={isEven ? '' : 'md:[direction:ltr]'}>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Visual container — polished icon with frosted glass effect */}
                  <div className={isEven ? '' : 'md:[direction:ltr]'}>
                    <div className="step-visual p-8 md:p-12">
                      {/* Faint dot pattern background */}
                      <div className="absolute inset-0 section-dot-pattern opacity-40 rounded-2xl" aria-hidden="true" />
                      <div className="relative flex items-center justify-center h-40 md:h-48">
                        <div className="text-center">
                          {/* Decorative rings behind icon */}
                          <div className="relative inline-flex items-center justify-center mb-6">
                            <div className="absolute w-24 h-24 rounded-full border border-primary/10" />
                            <div className="absolute w-32 h-32 rounded-full border border-primary/06" />
                            <div className="icon-container-glass">
                              <Icon className="w-7 h-7 text-primary" />
                            </div>
                          </div>
                          <p className="text-sm font-semibold text-foreground/70 tracking-wide">{item.visual}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
