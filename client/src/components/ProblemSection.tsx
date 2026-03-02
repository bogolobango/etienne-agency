/**
 * Problem Section — "The Cost of Slow Response" stat cards
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

  const problems = [
    {
      stat: "78%",
      description: "of clients book with the first practice that responds. Slow response hands them to your competitor.",
      cite: "Velocify / InsideSales.com",
      coral: false,
    },
    {
      stat: "$8K–15K",
      description: "in monthly revenue lost per location from after-hours inquiries that go unanswered until morning.",
      cite: "Med spa industry benchmarks",
      coral: true,
    },
    {
      stat: "42 hours",
      description: "is the average lead response time for med spas. Your competitor's AI answers in under 2 seconds.",
      cite: "Workee / ChiliPiper 2025",
      coral: false,
    },
    {
      stat: "20–40%",
      description: "of appointments become no-shows without automated reminders. That's thousands in lost revenue monthly.",
      cite: "Workee med spa booking data",
      coral: false,
    },
  ];

  return (
    <section id="problem-section" className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
      <div className="container relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-16 md:mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label">THE COST OF SLOW RESPONSE</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1]">
            Every hour you don't respond, revenue walks out the door
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {problems.map((p, i) => (
            <div
              key={i}
              className={`stat-card transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className={`font-display text-4xl sm:text-5xl mb-3 ${p.coral ? "text-[#FF6B6B]" : "text-foreground"}`}>
                {p.stat}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                {p.description}
              </p>
              <p className="text-xs text-muted-foreground/50 italic">{p.cite}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
