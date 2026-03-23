/**
 * Revenue Gap Calculator — Interactive tool aligned with the EIP
 * dashboard leakage model (leakage-model.ts, GapAnalysis.tsx,
 * revenue-opportunities.ts).
 *
 * Leakage categories:
 *   1. No-Show Loss        = noShowRate × avgTicket × monthlyAppointments
 *   2. Utilization Gap      = totalRevenue × ((benchmarkUtil - actualUtil) / benchmarkUtil) × 0.4
 *   3. Rebooking Gap        = totalRevenue × 0.06
 *   4. After-Hours Loss     = totalRevenue × 0.08
 *
 * Recovery (90-day estimate from GapAnalysis.tsx):
 *   recovered = (noShowLoss × 0.30) + (utilGap × 0.25) + (totalRevenue × 0.02)
 */

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  DollarSign,
  TrendingDown,
  Target,
  Clock,
  UserX,
  CalendarX2,
  Calculator as CalcIcon,
} from "lucide-react";
import { Link } from "wouter";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { trackCTAClick, trackFormSubmit } from "@/lib/analytics";
import FloatingDustMotes from "@/components/FloatingDustMotes";
import GradientOrbs, { type OrbConfig } from "@/components/GradientOrbs";

const heroOrbs: OrbConfig[] = [
  { size: 480, color: "#00D4AA", x: "-6%", y: "-8%", opacity: 0.4, duration: 14, delay: 0, parallaxFactor: 50 },
  { size: 400, color: "#2D5BFF", x: "72%", y: "45%", opacity: 0.35, duration: 12, delay: 3, parallaxFactor: -30 },
];

const resultOrbs: OrbConfig[] = [
  { size: 420, color: "#FF8C42", x: "-6%", y: "15%", opacity: 0.25, duration: 13, delay: 1, parallaxFactor: 40 },
  { size: 360, color: "#00D4AA", x: "80%", y: "60%", opacity: 0.25, duration: 11, delay: 5, parallaxFactor: -25 },
];

// Benchmark constants (from benchmark-engine.ts / leakage-model.ts)
const BENCHMARK_UTILIZATION = 80; // top-quartile target
const REBOOKING_GAP_FACTOR = 0.06; // 6% of revenue (from GapAnalysis.tsx)
const AFTER_HOURS_FACTOR = 0.08; // 8% of revenue (from RevenueScorecard.tsx)
const UTILIZATION_WEIGHT = 0.4; // from RevenueScorecard.tsx

// Recovery coefficients (from GapAnalysis.tsx estimatedRecovery formula)
const NOSHOW_RECOVERY = 0.30;
const UTIL_RECOVERY = 0.25;
const BASELINE_RECOVERY_FACTOR = 0.02;

function fmt(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Calculator() {
  usePageView("Revenue Gap Calculator");
  useScrollTracking("Revenue Gap Calculator");
  useSEO("/calculator");

  const [inView, setInView] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Inputs
  const [locations, setLocations] = useState(3);
  const [monthlyAppts, setMonthlyAppts] = useState(250);
  const [avgTicket, setAvgTicket] = useState(425);
  const [noShowPct, setNoShowPct] = useState(18);
  const [utilizationPct, setUtilizationPct] = useState(62);
  const [rebookPct, setRebookPct] = useState(58);

  useEffect(() => {
    setInView(true);
  }, []);

  // ── Leakage Model (matches leakage-model.ts) ──────────────────────
  const totalAppts = monthlyAppts * locations;
  const totalRevenue = totalAppts * avgTicket;

  // 1. No-Show Loss = noShowRate × avgTicket × appointments
  const noShowCount = Math.round(totalAppts * (noShowPct / 100));
  const noShowLoss = noShowCount * avgTicket;

  // 2. Utilization Gap = revenue × ((benchmark - actual) / benchmark) × weight
  const utilGapPct = Math.max(0, BENCHMARK_UTILIZATION - utilizationPct);
  const utilGap = Math.round(totalRevenue * (utilGapPct / BENCHMARK_UTILIZATION) * UTILIZATION_WEIGHT);

  // 3. Rebooking Gap = revenue × 0.06 (scaled by how far below benchmark)
  const BENCHMARK_REBOOK = 72;
  const rebookGapPct = Math.max(0, BENCHMARK_REBOOK - rebookPct);
  const rebookGap = Math.round(totalRevenue * REBOOKING_GAP_FACTOR * (rebookGapPct / BENCHMARK_REBOOK));

  // 4. After-Hours / Slow Response Loss = revenue × 0.08
  const afterHoursLoss = Math.round(totalRevenue * AFTER_HOURS_FACTOR);

  // Total leakage
  const totalLeakage = noShowLoss + utilGap + rebookGap + afterHoursLoss;
  const annualLeakage = totalLeakage * 12;

  // Recovery estimate (from GapAnalysis.tsx)
  const recoverable = Math.round(
    (noShowLoss * NOSHOW_RECOVERY) + (utilGap * UTIL_RECOVERY) + (totalRevenue * BASELINE_RECOVERY_FACTOR)
  );
  const recoverableAnnual = recoverable * 12;

  // Theoretical capacity
  const theoreticalRevenue = totalRevenue + totalLeakage;

  function handleCalculate() {
    setShowResults(true);
    trackFormSubmit("Revenue Gap Calculator", {
      locations: String(locations),
      monthly_appointments: String(monthlyAppts),
      avg_ticket: String(avgTicket),
      no_show_pct: String(noShowPct),
      utilization_pct: String(utilizationPct),
      rebook_pct: String(rebookPct),
      total_monthly_gap: String(totalLeakage),
    });
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-12 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={50} />
        <GradientOrbs orbs={heroOrbs} />
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <CalcIcon className="w-4 h-4" />
              Free Revenue Gap Calculator
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              How much revenue is{" "}
              <span className="text-primary">slipping away?</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
              Plug in your numbers. The same leakage model EIP uses on real booking data will estimate how much no-shows, utilization gaps, and missed rebookings are costing you each month.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="relative py-16 md:py-24 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="form-container p-8 sm:p-10">
              <div className="space-y-6">
                {/* Locations */}
                <div>
                  <label htmlFor="locations" className="block text-sm font-medium text-foreground mb-2">
                    Number of locations
                  </label>
                  <input
                    id="locations"
                    type="number"
                    min={1}
                    max={100}
                    value={locations}
                    onChange={(e) => setLocations(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>

                {/* Monthly Appointments */}
                <div>
                  <label htmlFor="appts" className="block text-sm font-medium text-foreground mb-2">
                    Monthly appointments per location
                  </label>
                  <input
                    id="appts"
                    type="number"
                    min={1}
                    value={monthlyAppts}
                    onChange={(e) => setMonthlyAppts(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Total completed + no-showed appointments</p>
                </div>

                {/* Average Ticket Price */}
                <div>
                  <label htmlFor="ticket" className="block text-sm font-medium text-foreground mb-2">
                    Average ticket price ($)
                  </label>
                  <input
                    id="ticket"
                    type="number"
                    min={1}
                    value={avgTicket}
                    onChange={(e) => setAvgTicket(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Average revenue per appointment (industry avg: $350–$500)</p>
                </div>

                {/* No-Show Rate */}
                <div>
                  <label htmlFor="noshow-pct" className="block text-sm font-medium text-foreground mb-2">
                    No-show rate: <span className="font-semibold text-primary">{noShowPct}%</span>
                  </label>
                  <input
                    id="noshow-pct"
                    type="range"
                    min={5}
                    max={40}
                    step={1}
                    value={noShowPct}
                    onChange={(e) => setNoShowPct(parseInt(e.target.value))}
                    className="w-full accent-primary h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5%</span>
                    <span>Industry avg: 15–28%</span>
                    <span>40%</span>
                  </div>
                </div>

                {/* Utilization Rate */}
                <div>
                  <label htmlFor="util-pct" className="block text-sm font-medium text-foreground mb-2">
                    Room/provider utilization: <span className="font-semibold text-primary">{utilizationPct}%</span>
                  </label>
                  <input
                    id="util-pct"
                    type="range"
                    min={30}
                    max={85}
                    step={1}
                    value={utilizationPct}
                    onChange={(e) => setUtilizationPct(parseInt(e.target.value))}
                    className="w-full accent-primary h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>30%</span>
                    <span>Top quartile: 80%</span>
                    <span>85%</span>
                  </div>
                </div>

                {/* Rebooking Rate */}
                <div>
                  <label htmlFor="rebook-pct" className="block text-sm font-medium text-foreground mb-2">
                    Rebooking rate: <span className="font-semibold text-primary">{rebookPct}%</span>
                  </label>
                  <input
                    id="rebook-pct"
                    type="range"
                    min={20}
                    max={80}
                    step={1}
                    value={rebookPct}
                    onChange={(e) => setRebookPct(parseInt(e.target.value))}
                    className="w-full accent-primary h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>20%</span>
                    <span>Benchmark: 72%</span>
                    <span>80%</span>
                  </div>
                </div>

                <Button
                  onClick={handleCalculate}
                  className="w-full rounded-full py-6 h-auto text-base font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
                >
                  Calculate My Revenue Gap
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      {showResults && (
        <section id="results" className="relative py-16 md:py-24 section-gradient-alt overflow-hidden">
          <GradientOrbs orbs={resultOrbs} />
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <p className="section-label">YOUR REVENUE LEAKAGE</p>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                  You're leaving{" "}
                  <span className="text-primary">{fmt(totalLeakage)}/mo</span>{" "}
                  on the table.
                </h2>
                <p className="text-muted-foreground text-lg">
                  That's <span className="font-semibold text-foreground">{fmt(annualLeakage)}/year</span> across your {locations} location{locations !== 1 ? "s" : ""}.
                </p>
              </div>

              {/* Leakage Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                <div className="card-on-alt p-5 text-center">
                  <div className="icon-container-lg mx-auto mb-3">
                    <CalendarX2 className="w-5 h-5 text-red-500" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">No-Show Loss</p>
                  <p className="font-display text-2xl text-foreground">{fmt(noShowLoss)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{noShowCount} no-shows/mo</p>
                </div>

                <div className="card-on-alt p-5 text-center">
                  <div className="icon-container-lg mx-auto mb-3">
                    <TrendingDown className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Utilization Gap</p>
                  <p className="font-display text-2xl text-foreground">{fmt(utilGap)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{utilGapPct}pts below benchmark</p>
                </div>

                <div className="card-on-alt p-5 text-center">
                  <div className="icon-container-lg mx-auto mb-3">
                    <UserX className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Rebooking Gap</p>
                  <p className="font-display text-2xl text-foreground">{fmt(rebookGap)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{rebookGapPct}pts below 72% benchmark</p>
                </div>

                <div className="card-on-alt p-5 text-center">
                  <div className="icon-container-lg mx-auto mb-3">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">After-Hours Loss</p>
                  <p className="font-display text-2xl text-foreground">{fmt(afterHoursLoss)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Missed after-hours inquiries</p>
                </div>
              </div>

              {/* Recovery + Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Recovery */}
                <div className="card-on-alt p-6 sm:p-8 border-primary/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="icon-container-lg">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-xl text-foreground">90-Day Recovery Estimate</h3>
                  </div>
                  <p className="font-display text-4xl text-primary mb-1">{fmt(recoverable)}<span className="text-lg">/mo</span></p>
                  <p className="text-sm text-muted-foreground mb-4">{fmt(recoverableAnnual)} annualized</p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>No-show recovery (30% recapture)</span>
                      <span className="text-foreground">{fmt(Math.round(noShowLoss * NOSHOW_RECOVERY))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Utilization improvement (25%)</span>
                      <span className="text-foreground">{fmt(Math.round(utilGap * UTIL_RECOVERY))}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Baseline operational gains</span>
                      <span className="text-foreground">{fmt(Math.round(totalRevenue * BASELINE_RECOVERY_FACTOR))}</span>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="card-on-alt p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="icon-container-lg">
                      <DollarSign className="w-5 h-5 text-foreground" />
                    </div>
                    <h3 className="font-display text-xl text-foreground">Revenue Breakdown</h3>
                  </div>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex justify-between border-b border-border pb-2">
                      <span>Actual monthly revenue</span>
                      <span className="font-semibold text-foreground">{fmt(totalRevenue)}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span>Total monthly leakage</span>
                      <span className="font-semibold text-red-500">-{fmt(totalLeakage)}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span>Theoretical capacity</span>
                      <span className="font-semibold text-foreground">{fmt(theoreticalRevenue)}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-semibold text-primary">Leakage as % of revenue</span>
                      <span className="font-semibold text-primary">
                        {totalRevenue > 0 ? ((totalLeakage / totalRevenue) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA to Audit */}
              <div className="text-center">
                <p className="text-muted-foreground mb-6 text-lg">
                  These are estimates. Want to know your <span className="font-semibold text-foreground">actual</span> numbers from real booking data?
                </p>
                <Link href="/contact">
                  <Button
                    className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
                    onClick={() => trackCTAClick("Get Your Free Revenue Audit", "Calculator Results", "primary")}
                  >
                    Get Your Free Revenue Audit — See Real Numbers
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-4">
                  We connect to Zenoti, Boulevard, or Mangomint and run the full leakage analysis on your actual data. Free. No strings.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
