/**
 * Solution Section — Three modules: AI Revenue Analyst, Command Center, Smart Scheduling
 */

import { useEffect, useState } from "react";
import { Brain, Headset, CalendarDays } from "lucide-react";

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

  const modules = [
    {
      icon: Brain,
      title: "AI Revenue Analyst",
      description: 'Ask any question about your business in plain English. "Why did revenue drop at SoHo this month?" "Compare no-show rates across all locations." "Which provider should I hire next?" EIP analyzes your data across every center and gives you a specific, dollar-backed answer in seconds. Not a canned report. A real analysis.',
    },
    {
      icon: Headset,
      title: "Command Center",
      description: "Every missed call, delayed text, and abandoned web inquiry is captured, logged, and acted on before the lead goes cold. See the full AI conversation that turned a Saturday-night inquiry into a Monday-morning booking. Know exactly which leads your team dropped and how much it cost you.",
    },
    {
      icon: CalendarDays,
      title: "Smart Scheduling Intelligence",
      description: "See utilization rates by room, by provider, and by center. Spot the treatment room that's been empty every Tuesday afternoon for 3 months. Get alerts when a provider's schedule is 40% unfilled next week. Turn scheduling from reactive to predictive.",
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
          <p className="section-label">THE PLATFORM</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
            One platform. Every location. Every answer.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            EIP is the intelligence layer for multi-location med spas. It connects to your existing booking system — we don't replace anything — and unifies your appointment data, guest records, invoices, lead pipeline, and communication logs into a single view across all your centers. Then it tells you what to do about it.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div
                key={i}
                className={`card-premium p-6 sm:p-8 transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                <div className="icon-container-lg mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-foreground mb-4">
                  {mod.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {mod.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
