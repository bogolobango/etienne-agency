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
            Multi-location medspas are leaking $200K to $500K a year.{" "}
            <span className="text-primary">We find it and recover it in 60 days.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-6">
            Built for owners of 5 to 25 location medspas running Zenoti, Boulevard, or Mangomint. We pull your data, build the report your booking system won't, and run the recovery playbook with you. Done-for-you, not done-by-you.
          </p>

          <div className="flex flex-col items-center gap-2 mb-10">
            <a
              href="https://calendly.com/jim-etienneagency/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="rounded-full px-8 py-4 text-base sm:text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill transition-colors">
                Get Your Free Revenue Audit
              </button>
            </a>
            <p className="text-xs text-white/50">
              No call required. Send a CSV from your booking system, get a 4-page report back in 48 hours.
            </p>
          </div>
        </div>

        {/* Calculator section headline + inline calculator */}
        <div
          className={`transition-all duration-700 ease-out delay-150 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="max-w-2xl mx-auto text-center mb-5">
            <h2 className="font-display text-2xl sm:text-3xl text-white mb-2">
              Estimate what you're leaking in 30 seconds.
            </h2>
            <p className="text-sm text-white/60">
              Three numbers from your last 30 days. Real benchmarks, not industry fluff.
            </p>
          </div>
          <HeroCalculator />
        </div>

        {/* Supporting copy + tertiary link (not a competing button) */}
        <div
          className={`max-w-2xl mx-auto text-center mt-8 transition-all duration-700 ease-out delay-300 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Link href="/sample-audit">
            <span className="text-sm text-white/60 hover:text-white underline-offset-4 hover:underline cursor-pointer">
              See what a Recovery Audit looks like
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
