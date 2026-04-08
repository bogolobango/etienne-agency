/**
 * Hero Component — Revenue Intelligence positioning, dark background.
 *
 * Changes in this revision:
 *  - Single primary surface: an inline HeroCalculator that personalizes
 *    the recovery estimate from the visitor's own inputs. Removes the
 *    old dual-CTA dilution ("Book a Call" + "See the Platform").
 *  - Secondary path is a small text link, not a second button.
 *  - Ambient depth (dust motes + teal radial accent) is preserved —
 *    just restrained to let the calculator dominate visual weight.
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import HeroCalculator from "@/components/HeroCalculator";
import FloatingDustMotes from "@/components/FloatingDustMotes";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-18 md:pt-36 md:pb-24 lg:pt-44 lg:pb-32 overflow-hidden section-dark">
      <FloatingDustMotes particleCount={45} />
      {/* Ambient teal accent (kept subtle — the calculator is the centerpiece) */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(0, 212, 170, 0.05) 0%, transparent 70%)",
          transform: "translate(20%, -20%)",
        }}
      />
      <div className="container relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6 tracking-tight">
            You're running 5 locations and still pulling reports in Excel.{" "}
            <span className="text-primary">That ends now.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">
            EIP connects to Zenoti, Boulevard, or Mangomint and gives you cross-location revenue intelligence your booking system was never designed to provide. One view. Every center. Real answers&nbsp;&mdash;&nbsp;not more dashboards.
          </p>
        </div>

        {/* Inline calculator — the primary conversion surface */}
        <div
          className={`transition-all duration-700 ease-out delay-150 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <HeroCalculator />
        </div>

        {/* Supporting copy + tertiary link (not a competing button) */}
        <div
          className={`max-w-2xl mx-auto text-center mt-8 transition-all duration-700 ease-out delay-300 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="text-sm text-white/40 mb-4">
            20 minutes. We'll show you exactly what EIP would surface from your booking data.
            No pitch deck. No commitment.
          </p>
          <Link href="/how-it-works">
            <span className="text-sm text-white/60 hover:text-white underline-offset-4 hover:underline cursor-pointer">
              Or see how it works →
            </span>
          </Link>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-white/40 mt-8">
            <span>Revenue intelligence for multi-location med spas</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>Works with Zenoti, Boulevard &amp; Mangomint</span>
          </div>
        </div>
      </div>
    </section>
  );
}
