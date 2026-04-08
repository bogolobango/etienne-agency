/**
 * CalculatorContext — site-wide persistence of the visitor's revenue-gap
 * inputs so every downstream section can show personalized numbers.
 *
 * Flow:
 *   1. HeroCalculator pushes updates here on every input change.
 *   2. ProblemSection, PlaygroundDashboard, EarlyAdopterSection, and
 *      TwoStepClose all read from this context to personalize copy.
 *   3. If the visitor never touches the calculator, downstream sections
 *      gracefully fall back to industry-median defaults.
 *
 * This turns the whole page into a 1:1 consultation instead of a pitch.
 */

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { computeLeakage, BENCHMARKS, type LeakageBreakdown } from "@shared/leakage";

interface CalculatorInputs {
  locations: number;
  apptsPerLocation: number;
  avgTicket: number;
  /** Has the visitor touched the calculator yet? Controls whether copy is personalized. */
  hasInteracted: boolean;
}

interface CalculatorContextValue extends CalculatorInputs {
  result: LeakageBreakdown;
  setInputs: (partial: Partial<CalculatorInputs>) => void;
}

const DEFAULTS: CalculatorInputs = {
  locations: 5,
  apptsPerLocation: 250,
  avgTicket: 425,
  hasInteracted: false,
};

const CalculatorCtx = createContext<CalculatorContextValue | null>(null);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [inputs, setInputsState] = useState<CalculatorInputs>(DEFAULTS);

  const result = useMemo(
    () =>
      computeLeakage({
        locations: inputs.locations,
        monthlyApptsPerLocation: inputs.apptsPerLocation,
        avgTicket: inputs.avgTicket,
        noShowPct: BENCHMARKS.noShow.median,
        utilizationPct: BENCHMARKS.utilization.median,
        rebookPct: BENCHMARKS.rebooking.median,
      }),
    [inputs.locations, inputs.apptsPerLocation, inputs.avgTicket]
  );

  function setInputs(partial: Partial<CalculatorInputs>) {
    setInputsState((prev) => ({
      ...prev,
      ...partial,
      // Any touch marks as interacted (unless explicitly reset)
      hasInteracted: partial.hasInteracted ?? true,
    }));
  }

  const value: CalculatorContextValue = {
    ...inputs,
    result,
    setInputs,
  };

  return <CalculatorCtx.Provider value={value}>{children}</CalculatorCtx.Provider>;
}

export function useCalculator(): CalculatorContextValue {
  const ctx = useContext(CalculatorCtx);
  if (!ctx) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return ctx;
}
