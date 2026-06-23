/**
 * SundayProblemSection — the empathy beat.
 *
 * Sits between the hero (the diagnosis) and the Problem section
 * (the quantification). Job: make the visitor feel seen before we
 * start throwing numbers at them.
 *
 * Uses calm-office.jpg as a darkened, parallax-scrolled background
 * (existing repo asset, no new stock). Editorial serif pull-quote
 * treatment via .font-display (Playfair Display from Phase B).
 */

import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

export default function SundayProblemSection() {
  const { ref: sectionRef, inView } = useRevealAnimation<HTMLElement>({ threshold: 0.15 });
  const bgRef = useRef<HTMLDivElement | null>(null);

  // Parallax background (very subtle, ~60px max)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const section = sectionRef.current;
        const bg = bgRef.current;
        if (!section || !bg) {
          ticking = false;
          return;
        }
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // progress 0..1 across the section's travel through viewport
        const progress = 1 - (rect.bottom / (viewportHeight + rect.height));
        const translateY = (progress - 0.5) * 60; // ±30px
        bg.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.08)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36 lg:py-44 overflow-hidden bg-[#0A0F1C]"
    >
      {/* Parallax background image — editorial, heavily darkened */}
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/images/calm-office.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
        }}
      />
      {/* Dark + teal tint overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 15, 28, 0.92) 0%, rgba(10, 15, 28, 0.78) 50%, rgba(10, 15, 28, 0.95) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-multiply"
        style={{
          background: "linear-gradient(135deg, rgba(0, 212, 170, 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        <div
          className={`max-w-3xl mx-auto transition-all duration-[var(--duration-slow)] ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="section-label mb-6" style={{ color: "rgba(94, 236, 200, 0.85)" }}>
            SUNDAY, 9:47 PM
          </p>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-10 tracking-tight">
            You're in Excel again, pulling reports from three screens, looking for the number you know is there.
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
            <p>
              Williamsburg is down. You can feel it. You just can't prove it — not without exporting the no-show report, crossing it against rebooking rates, re-running the pivot, and squinting at a chart your booking system was never designed to make.
            </p>
            <p>
              By the time you find the answer, Monday's already on top of you. The call happens. The next week starts. The number you were going to act on sits in a spreadsheet you never open again.
            </p>
            <p className="text-white font-semibold text-lg sm:text-xl font-display leading-snug mt-8">
              This is the part of the job nobody sold you. And it's the part that's quietly costing you six figures a year.
            </p>
          </div>

          <div className="mt-10">
            <Link href="#problem-section">
              <span className="text-sm text-primary/90 hover:text-primary cursor-pointer link-underline">
                See what it's actually costing ↓
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
