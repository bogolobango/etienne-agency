/**
 * Revenue Gap Calculator — Interactive tool using the shared leakage
 * model at client/src/lib/leakage.ts. Every benchmark is sourced to
 * published industry data; see that file for full methodology.
 *
 * Displays results as RANGES (not point estimates), explicitly shows
 * which losses were deduplicated (no-show vs utilization overlap), and
 * cites sources inline.
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
  Phone,
  UserX,
  CalendarX2,
  Calculator as CalcIcon,
  Info,
} from "lucide-react";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { trackCTAClick, trackFormSubmit } from "@/lib/analytics";
import FloatingDustMotes from "@/components/FloatingDustMotes";
import GradientOrbs, { type OrbConfig } from "@/components/GradientOrbs";
import { computeLeakage, formatCurrency, BENCHMARKS, RECOVERY } from "@/lib/leakage";

const heroOrbs: OrbConfig[] = [
  { size: 480, color: "#00D4AA", x: "-6%", y: "-8%", opacity: 0.32, duration: 14, delay: 0, parallaxFactor: 50 },
  { size: 400, color: "#2D5BFF", x: "72%", y: "45%", opacity: 0.28, duration: 12, delay: 3, parallaxFactor: -30 },
];

const resultOrbs: OrbConfig[] = [
  { size: 420, color: "#00D4AA", x: "-6%", y: "15%", opacity: 0.2, duration: 13, delay: 1, parallaxFactor: 40 },
  { size: 360, color: "#2D5BFF", x: "80%", y: "60%", opacity: 0.18, duration: 11, delay: 5, parallaxFactor: -25 },
];

const fmt = formatCurrency;

export default function Calculator() {
  usePageView("Revenue Gap Calculator");
  useScrollTracking("Revenue Gap Calculator");
  useSEO("/calculator");

  const [inView, setInView] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Inputs — defaults chosen as industry medians so the result is meaningful
  // on first paint even before the visitor adjusts anything.
  const [locations, setLocations] = useState<number>(3);
  const [monthlyAppts, setMonthlyAppts] = useState<number>(250);
  const [avgTicket, setAvgTicket] = useState<number>(425);
  const [noShowPct, setNoShowPct] = useState<number>(18);
  const [utilizationPct, setUtilizationPct] = useState<number>(BENCHMARKS.utilization.median);
  const [rebookPct, setRebookPct] = useState<number>(BENCHMARKS.rebooking.median - 5);

  useEffect(() => {
    setInView(true);
  }, []);

  // ── Leakage model (shared source of truth — client/src/lib/leakage.ts)
  const result = computeLeakage({
    locations,
    monthlyApptsPerLocation: monthlyAppts,
    avgTicket,
    noShowPct,
    utilizationPct,
    rebookPct,
  });

  const totalRevenue = result.totalMonthlyRevenue;
  const totalLeakage = result.totalMonthlyGap;
  const annualLeakage = result.totalAnnualGap;
  const noShowLoss = result.noShowLoss;
  const utilGap = result.utilizationLoss;
  const rebookGap = result.rebookingLoss;
  const afterHoursLoss = result.missedCallLoss;
  const noShowCount = Math.round(
    locations * monthlyAppts * Math.max(0, noShowPct - BENCHMARKS.noShow.floor) / 100
  );
  const utilGapPct = Math.max(0, BENCHMARKS.utilization.median - utilizationPct);
  const rebookGapPct = Math.max(0, BENCHMARKS.rebooking.median - rebookPct);
  const recoverable = result.recoveryMonthly.expected;
  const recoverableAnnual = result.recoveryAnnual.expected;

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
      demand_loss_source: result.demandLossSource,
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

              {/* Leakage Cards — show the dedupe winner + rebooking + missed calls.
                  The "loser" of the no-show vs utilization overlap is hidden so the
                  total reads honestly. A note on the winning card explains the overlap. */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {result.demandLossSource === "utilization" ? (
                  <div className="card-on-alt p-5 text-center">
                    <div className="icon-container-lg mx-auto mb-3">
                      <TrendingDown className="w-5 h-5 text-amber-500" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">Utilization Gap</p>
                    <p className="font-display text-2xl text-foreground">{fmt(utilGap)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{utilGapPct}pts below {BENCHMARKS.utilization.median}% median</p>
                  </div>
                ) : (
                  <div className="card-on-alt p-5 text-center">
                    <div className="icon-container-lg mx-auto mb-3">
                      <CalendarX2 className="w-5 h-5 text-red-500" />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">No-Show Loss</p>
                    <p className="font-display text-2xl text-foreground">{fmt(noShowLoss)}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {noShowCount} excess no-shows/mo above {BENCHMARKS.noShow.floor}% floor
                    </p>
                  </div>
                )}

                <div className="card-on-alt p-5 text-center">
                  <div className="icon-container-lg mx-auto mb-3">
                    <UserX className="w-5 h-5 text-orange-500" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Rebooking Gap</p>
                  <p className="font-display text-2xl text-foreground">{fmt(rebookGap)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{rebookGapPct}pts below {BENCHMARKS.rebooking.median}% median</p>
                </div>

                <div className="card-on-alt p-5 text-center">
                  <div className="icon-container-lg mx-auto mb-3">
                    <Phone className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Missed-Call Loss</p>
                  <p className="font-display text-2xl text-foreground">{fmt(afterHoursLoss)}</p>
                  <p className="text-xs text-muted-foreground mt-1">After-hours + unanswered calls (Marchex data)</p>
                </div>
              </div>

              {/* Methodology notes — every loss we dropped or deduplicated is shown here */}
              {result.notes.length > 0 && (
                <div className="max-w-3xl mx-auto mb-12 rounded-xl border border-border/60 bg-white/60 p-4 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-muted-foreground/70" />
                    <div>
                      <p className="font-semibold text-foreground mb-1">How we computed this</p>
                      <ul className="space-y-1">
                        {result.notes.map((note, i) => (
                          <li key={i}>• {note}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Recovery + Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {/* Recovery — shown as a RANGE to avoid false precision */}
                <div className="card-on-alt p-6 sm:p-8 border-primary/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="icon-container-lg">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-xl text-foreground">Recovery range (annual)</h3>
                  </div>
                  <p className="font-display text-4xl text-primary mb-1">
                    {fmt(result.recoveryAnnual.low)}
                    <span className="text-muted-foreground/60 mx-2">–</span>
                    {fmt(result.recoveryAnnual.high)}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Expected case: <span className="font-semibold text-foreground">{fmt(recoverableAnnual)}/year</span>
                    {" · "}
                    {fmt(recoverable)}/month
                  </p>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Conservative ({Math.round(RECOVERY.low * 100)}% of gap)</span>
                      <span className="text-foreground">{fmt(result.recoveryMonthly.low)}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected ({Math.round(RECOVERY.expected * 100)}% of gap)</span>
                      <span className="text-foreground">{fmt(result.recoveryMonthly.expected)}/mo</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Upside ({Math.round(RECOVERY.high * 100)}% of gap)</span>
                      <span className="text-foreground">{fmt(result.recoveryMonthly.high)}/mo</span>
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
                      <span>Addressable monthly gap</span>
                      <span className="font-semibold text-red-500">-{fmt(totalLeakage)}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span>Gap as % of revenue</span>
                      <span className="font-semibold text-primary">
                        {result.gapAsPctOfRevenue.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-semibold text-foreground">Expected recovery / mo</span>
                      <span className="font-semibold text-primary">{fmt(recoverable)}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-muted-foreground/70 mt-4 leading-relaxed">
                    Benchmarks from AmSpa, Mindbody Wellness Index, Zenoti, and Marchex. Losses computed against industry median (not top-decile). No-show and utilization losses deduplicated to avoid double-counting.
                  </p>
                </div>
              </div>

              {/* CTA to Audit */}
              <div className="text-center">
                <p className="text-muted-foreground mb-6 text-lg">
                  These are estimates. Want to know your <span className="font-semibold text-foreground">actual</span> numbers from real booking data?
                </p>
                <a href="https://calendly.com/jim-etienneagency/30min" target="_blank" rel="noopener noreferrer">
                  <Button
                    className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
                    onClick={() => trackCTAClick("Book a Revenue Call", "Calculator Results", "primary")}
                  >
                    Book a Revenue Call — See Your Real Numbers
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <p className="text-sm text-muted-foreground mt-4">
                  20 minutes. We'll show you exactly what EIP would surface from your booking data.<br />
                  No pitch deck. No commitment.
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
