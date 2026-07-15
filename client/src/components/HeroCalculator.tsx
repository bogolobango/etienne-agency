/**
 * HeroCalculator — Compact inline revenue-gap estimator for the hero section.
 *
 * 3 inputs → instant range output. Uses the same shared leakage model as
 * the full /calculator page (client/src/lib/leakage.ts) so the two surfaces
 * can never disagree.
 *
 * UX decisions:
 *  - Inputs default to industry-median values so the result is non-zero on
 *    first paint, giving visitors an immediate anchor.
 *  - Result is a RANGE ($X–$Y/yr recovery) to signal honesty about
 *    uncertainty. Point estimates read as false precision.
 *  - Primary CTA changes copy once the visitor has personalized their
 *    number: pre-interact is "Get Your Free Leakage Map", post-interact
 *    is "Claim Your Free Map". The dollar figure is no longer in the
 *    CTA text.
 *  - Secondary link goes to the full /calculator page, not another marketing
 *    page — keeps the funnel tight.
 *  - Mobile: inputs stack vertically, result + CTA compress below.
 */

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";
import { Link } from "wouter";
import { trackCTAClick, trackFormSubmit } from "@/lib/analytics";
import {
  computeLeakage,
  formatCurrencyCompact,
  BENCHMARKS,
} from "@shared/leakage";
import { useCalculator } from "@/context/CalculatorContext";
import MagneticButton from "@/components/MagneticButton";
import { CALENDLY_URL } from "@/const";

export default function HeroCalculator() {
  const { locations, apptsPerLocation, avgTicket, hasInteracted, setInputs } = useCalculator();

  const result = useMemo(
    () =>
      computeLeakage({
        locations,
        monthlyApptsPerLocation: apptsPerLocation,
        avgTicket,
        // Hero calculator uses median defaults (user can refine on full calc)
      }),
    [locations, apptsPerLocation, avgTicket]
  );

  function handleInteraction(patch: Partial<{ locations: number; apptsPerLocation: number; avgTicket: number }>) {
    setInputs({ ...patch });
    if (!hasInteracted) {
      trackFormSubmit("Hero Calculator Interaction", {
        locations: String(locations),
        appts_per_location: String(apptsPerLocation),
        avg_ticket: String(avgTicket),
      });
    }
  }

  const annualLow = result.recoveryAnnual.low;
  const annualHigh = result.recoveryAnnual.high;
  const ctaLabel = hasInteracted
    ? "Claim Your Free Map"
    : "Get Your Free Leakage Map";

  return (
    <div
      className="max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-7 shadow-2xl shadow-black/30"
      data-testid="hero-calculator"
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Where we'd start
        </p>
        <span className="text-[10px] text-white/40 uppercase tracking-wide">
          Industry-benchmark model
        </span>
      </div>

      {/* Inputs — 3-column on sm+, stacked on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <Field
          label="Locations"
          id="hc-locations"
          value={locations}
          min={1}
          max={100}
          onChange={(v) => handleInteraction({ locations: v })}
        />
        <Field
          label="Appts / location / mo"
          id="hc-appts"
          value={apptsPerLocation}
          min={1}
          max={5000}
          onChange={(v) => handleInteraction({ apptsPerLocation: v })}
        />
        <Field
          label="Avg ticket ($)"
          id="hc-ticket"
          value={avgTicket}
          min={1}
          max={5000}
          onChange={(v) => handleInteraction({ avgTicket: v })}
        />
      </div>

      {/* Result — range-based to avoid false precision */}
      <div className="rounded-xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.02] border border-primary/20 p-5 mb-5">
        <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
          Estimated recoverable revenue
        </p>
        <p className="font-display text-3xl sm:text-4xl text-white leading-tight">
          <span className="text-primary">{formatCurrencyCompact(annualLow)}</span>
          <span className="text-white/40 mx-2">to</span>
          <span className="text-primary">{formatCurrencyCompact(annualHigh)}</span>
          <span className="text-base sm:text-lg text-white/60 ml-2">/year</span>
        </p>
        <p className="text-xs text-white/50 mt-2 flex items-start gap-1.5">
          <Info className="w-3 h-3 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            Based on AmSpa, Zenoti, Mindbody, and Marchex industry benchmarks.
            Range reflects 25-45% of total addressable gap. Your actuals depend
            on specific operations.
          </span>
        </p>
        <p className="text-xs text-white/60 mt-3">
          That's the annual leak. At a 7x multiple, it's also roughly the lift to your exit price.
        </p>
        <p className="text-xs text-white/60 mt-3 border-t border-white/10 pt-3">
          And it's an estimate. Send us one CSV and we'll show you the exact number, broken down by location, provider, and day of week. Free.
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <MagneticButton className="w-full sm:w-auto sm:flex-1">
          <div className="flex flex-col items-center gap-1 w-full">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button
                className="w-full rounded-full px-6 py-6 h-auto text-base sm:text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
                onClick={() => trackCTAClick(ctaLabel, "Hero Calculator", "primary")}
              >
                {ctaLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <span className="text-xs text-white/50">Jim takes 4 Maps per week. 2 slots left this week.</span>
          </div>
        </MagneticButton>
        <Link href="/calculator">
          <span
            className="text-sm text-white/60 hover:text-white underline-offset-4 hover:underline cursor-pointer whitespace-nowrap"
            onClick={() => trackCTAClick("See full breakdown", "Hero Calculator", "secondary")}
          >
            See the full breakdown
          </span>
        </Link>
      </div>

      <p className="text-[11px] text-white/40 mt-4 text-center">
        Defaults: {BENCHMARKS.noShow.median}% no-show · {BENCHMARKS.utilization.median}% utilization · {BENCHMARKS.rebooking.median}% rebooking (industry medians). Refine on the full calculator.
      </p>
    </div>
  );
}

interface FieldProps {
  label: string;
  id: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

function Field({ label, id, value, min, max, onChange }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-medium text-white/60 uppercase tracking-wide mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const parsed = parseInt(e.target.value, 10);
          if (!Number.isNaN(parsed)) {
            onChange(Math.max(min, Math.min(max, parsed)));
          }
        }}
        className="w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-white text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors"
      />
    </div>
  );
}
