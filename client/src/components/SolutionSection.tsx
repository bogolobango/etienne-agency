/**
 * Solution Section — 3-step process: Connect, Capture, Recover
 */

import { useEffect, useState } from "react";

export default function SolutionSection() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    const el = document.getElementById("solution-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      num: "01",
      title: "Connect",
      description: "We integrate with your existing platform — Zenoti, Boulevard, Mangomint, or others. Your data stays where it is. EIP reads it, not replaces it.",
    },
    {
      num: "02",
      title: "Capture",
      description: "Every after-hours inquiry, missed call, and web form gets an instant, intelligent response. SMS, email, web chat — all channels, all hours. Clients get answers in under 2 seconds.",
    },
    {
      num: "03",
      title: "Recover",
      description: "Watch revenue come back. Automated follow-ups reduce no-shows by 40%. Your dashboard shows exactly how much revenue was recovered, by location, in real time.",
    },
  ];

  return (
    <section id="solution-section" className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
      <div className="container relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-16 md:mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label">HOW IT WORKS</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
            From missed inquiry to booked appointment — automatically
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Our AI plugs into your existing booking system and starts recovering lost revenue in weeks. No ripping out what works. No learning curve.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="text-[5rem] font-display leading-none mb-[-1rem] select-none text-primary/10">
                {step.num}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 right-0 translate-x-1/2 w-8 h-[2px] bg-primary/20" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
