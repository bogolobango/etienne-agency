/**
 * "Who It's For" Section — Med spa focused, 4 use-case cards
 */

import { useEffect, useState } from "react";

export default function IndustriesSection() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 }
    );
    const el = document.getElementById("who-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const useCases = [
    {
      title: "Multi-location med spas",
      description: "You need one view across all locations. EIP gives you revenue recovery and AI performance metrics by center — not just in aggregate.",
    },
    {
      title: "High-volume aesthetic practices",
      description: "CoolSculpting consultations at 11pm. Botox inquiries on Sunday morning. Your highest-intent clients reach out when you're closed. EIP captures them.",
    },
    {
      title: "Practices on Zenoti or Boulevard",
      description: "We integrate directly with your existing platform. No data migration. No workflow changes. Live in 4 weeks.",
    },
    {
      title: "Owners tired of hiring more front desk staff",
      description: "The average med spa spends $42K/year per receptionist. EIP handles 60% of inquiries automatically — without adding headcount.",
    },
  ];

  return (
    <section id="who-section" className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
      <div className="container relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-16 md:mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label">BUILT FOR MED SPAS</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
            Designed for multi-location aesthetic practices
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            If you operate 3 or more med spa locations and lose sleep over missed inquiries, no-shows, and inconsistent client experience across locations — EIP was built for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {useCases.map((item, i) => (
            <div
              key={i}
              className={`bg-white rounded-xl p-6 sm:p-8 border-l-4 border-l-primary border border-border/50 transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${100 + i * 100}ms` }}
            >
              <h3 className="font-display text-lg sm:text-xl text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
