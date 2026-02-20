/**
 * Problem Section Component - Tango Editorial Design
 * Stats grid with editorial headline, colored keyword highlights, generous spacing
 */

import { useEffect, useState } from "react";

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
      stat: "78%",
      description: "of customers book with the first business that responds. Slow lead response time hands them to your competitor.",
    },
    {
      stat: "100x",
      description: "more likely to connect when you respond in 5 minutes vs. 30. An instant response system closes the gap.",
    },
    {
      stat: "42 hours",
      description: "is the average lead response time. Your competitor already closed the deal by then.",
    },
    {
      stat: "20–40%",
      description: "of appointments become no-shows without automated reminders. That's thousands in lost revenue each month.",
    },
  ];

  return (
    <section
      id="problem-section"
      className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden"
    >
      {/* Decorative front-desk photo accent */}
      <div className="absolute right-0 top-0 w-72 h-full pointer-events-none hidden xl:block" aria-hidden="true">
        <div
          style={{
            backgroundImage: "url('/images/front-desk.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.06,
            position: "absolute",
            inset: 0,
          }}
        />
      </div>
      <div className="container">
        {/* Section intro */}
        <div
          className={`max-w-3xl mx-auto text-center mb-16 md:mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-foreground leading-[1.1] mb-6">
            Every missed call is{" "}
            <span className="highlight-coral">revenue lost</span> forever
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            The phone rings during a procedure. A lead submits a form at 9pm. Your front desk is slammed. A $5,000 client hangs up after three rings. Without an AI receptionist, that money goes to your competitor.
          </p>
        </div>

        {/* Step label */}
        <div
          className={`text-center mb-10 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
            Here's what that costs you
          </p>
        </div>

        {/* Statistics grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`card-on-alt p-6 sm:p-8 transition-all duration-500 ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
              }}
            >
              <div className="space-y-3">
                <div className="font-display text-4xl sm:text-5xl text-foreground">
                  {problem.stat}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing quote */}
        <div
          className={`max-w-2xl mx-auto text-center mt-16 md:mt-20 transition-all duration-700 delay-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="font-display text-xl md:text-2xl lg:text-3xl text-foreground italic">
            You didn't build your business to babysit a phone.{" "}
            <span className="highlight-green">A virtual receptionist fixes this.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
