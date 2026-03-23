/**
 * Problem Section — "You Have the Data. You Don't Have the Answers."
 */

import { useEffect, useState } from "react";

export default function ProblemSection() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    const el = document.getElementById("problem-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      stat: "23%",
      description: "Industry average no-show rate — a 5-location practice at $536/visit loses $40K+/month to empty chairs",
      coral: true,
    },
    {
      stat: "50%",
      description: "Average utilization drop when practices scale from 2 to 4+ treatment rooms — invisible without cross-location data",
      coral: false,
    },
    {
      stat: "47%",
      description: "Rebooking rate at the average med spa vs. 61%+ at top-performing groups — a gap worth finding",
      coral: false,
    },
  ];

  return (
    <section id="problem-section" className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
      <div className="container relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-12 md:mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label">THE INTELLIGENCE GAP</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
            You have the data. You don't have the answers.
          </h2>
        </div>

        <div
          className={`max-w-3xl mx-auto mb-16 transition-all duration-700 delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              Your booking platform tracks every appointment, every no-show, and every invoice. But when you want to know why Williamsburg is underperforming, or how much your White Plains no-show rate is actually costing you, or which provider has the worst rebooking rate — you're pulling reports from three different screens, exporting to Excel, and spending your Sunday doing math.
            </p>
            <p>
              The data exists. It's sitting inside Zenoti, Boulevard, or Mangomint right now. But no one is connecting it across locations, quantifying what it's costing you, or telling you what to do about it.
            </p>
            <p className="font-semibold text-foreground">
              You don't have a software problem. You have an intelligence problem.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((p, i) => (
            <div
              key={i}
              className={`stat-card transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className={`font-display text-3xl sm:text-4xl md:text-5xl mb-3 break-words ${p.coral ? "text-[#FF6B6B]" : "text-foreground"}`}>
                {p.stat}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed break-words">
                {p.description}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground/50 italic mt-6">
          Based on industry data from AmSpa, ASAPS, and Zenoti market research
        </p>
      </div>
    </section>
  );
}
