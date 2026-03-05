/**
 * Revenue Gap Calculator — Interactive calculator showing estimated annual revenue leakage
 */

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

const formatCurrency = (n: number) =>
  "$" + Math.round(n).toLocaleString("en-US");

/* ─── Slider ─────────────────────────────────────────────────── */

interface SliderProps {
  label: string;
  sublabel?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}

function CalcSlider({ label, sublabel, min, max, step, value, onChange, format }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-2">
        <div>
          <div className="text-sm font-semibold text-foreground tracking-wide">{label}</div>
          {sublabel && <div className="text-xs text-muted-foreground mt-0.5">{sublabel}</div>}
        </div>
        <div className="font-mono font-bold text-base text-primary bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">
          {format ? format(value) : value}
        </div>
      </div>
      <div className="relative h-1.5 bg-border rounded-full">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-[width] duration-100"
          style={{ width: `${pct}%`, background: "linear-gradient(90deg, var(--primary), #00BF99)" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute top-1/2 left-0 w-full -translate-y-1/2 opacity-0 cursor-pointer h-6 m-0"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4.5 h-4.5 rounded-full bg-white border-2 border-primary pointer-events-none transition-[left] duration-100"
          style={{
            left: `${pct}%`,
            transform: "translate(-50%, -50%)",
            width: "18px",
            height: "18px",
            boxShadow: "0 1px 4px rgba(0, 212, 170, 0.25)",
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[0.7rem] text-muted-foreground/60">{format ? format(min) : min}</span>
        <span className="text-[0.7rem] text-muted-foreground/60">{format ? format(max) : max}</span>
      </div>
    </div>
  );
}

/* ─── Metric Card ────────────────────────────────────────────── */

interface MetricCardProps {
  label: string;
  value: string;
  sublabel?: string;
  highlight?: boolean;
}

function MetricCard({ label, value, sublabel, highlight }: MetricCardProps) {
  return (
    <div
      className={
        highlight
          ? "rounded-xl p-5 shadow-lg"
          : "bg-card rounded-xl p-5 border border-border shadow-sm"
      }
      style={
        highlight
          ? { background: "linear-gradient(135deg, var(--primary) 0%, #00BF99 100%)", boxShadow: "0 8px 24px rgba(0, 212, 170, 0.2)" }
          : undefined
      }
    >
      <div
        className={`text-[0.72rem] font-semibold tracking-widest uppercase mb-1 ${
          highlight ? "text-white/75" : "text-muted-foreground"
        }`}
      >
        {label}
      </div>
      <div
        className={`font-mono font-bold leading-tight ${
          highlight ? "text-[1.5rem] text-primary-foreground" : "text-2xl text-foreground"
        }`}
      >
        {value}
      </div>
      {sublabel && (
        <div
          className={`text-[0.72rem] mt-1 ${
            highlight ? "text-white/65" : "text-muted-foreground"
          }`}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
}

/* ─── Benchmarks ─────────────────────────────────────────────── */

const benchmarks: [string, string, string][] = [
  ["No-show rate", "Avg 20% \u00B7 NYC up to 40%", "AmSpa / Workee 2025"],
  ["After-hours bookings", "46% arrive outside hours", "Phorest, 5,000+ locations"],
  ["Utilization target", "80\u201385% for top performers", "Financial Models Lab"],
  ["Revenue leakage", "Up to 30% of potential revenue", "AmSpa / Coverwell"],
];

/* ─── Main Component ─────────────────────────────────────────── */

export default function RevenueGapCalculator() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.1 },
    );
    const el = document.getElementById("revenue-gap-calculator");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Slider state
  const [locations, setLocations] = useState(5);
  const [avgTicket, setAvgTicket] = useState(490);
  const [visitsPerMonth, setVisitsPerMonth] = useState(283);
  const [noShowRate, setNoShowRate] = useState(20);
  const [noShowVariance, setNoShowVariance] = useState(8);
  const [afterHoursPct, setAfterHoursPct] = useState(35);
  const [afterHoursConversion, setAfterHoursConversion] = useState(35);
  const [rooms, setRooms] = useState(4);
  const [utilizationGap, setUtilizationGap] = useState(15);

  // Animation pulse on change
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(t);
  }, [locations, avgTicket, visitsPerMonth, noShowRate, noShowVariance, afterHoursPct, afterHoursConversion, utilizationGap, rooms]);

  // ── Calculations (do not alter the math) ──
  const noShowLossPerLocation = (visitsPerMonth * (noShowRate / 100)) * avgTicket * 12;
  const totalNoShowLoss = noShowLossPerLocation * locations;

  const varianceLossPerPair = (visitsPerMonth * (noShowVariance / 100)) * avgTicket * 12;
  const totalVarianceLoss = varianceLossPerPair * Math.floor(locations / 2);

  const monthlyInquiries = visitsPerMonth * 0.3;
  const afterHoursInquiries = monthlyInquiries * (afterHoursPct / 100);
  const lostAfterHours = afterHoursInquiries * (1 - afterHoursConversion / 100) * avgTicket * 12;
  const totalAfterHoursLoss = lostAfterHours * locations;

  const revenuePerRoomAtTarget = (rooms * 6 * 5 * 48) * avgTicket;
  const utilizationLossPerLocation = revenuePerRoomAtTarget * (utilizationGap / 100);
  const totalUtilizationLoss = utilizationLossPerLocation * locations;

  const totalLoss = totalNoShowLoss + totalVarianceLoss + totalAfterHoursLoss + totalUtilizationLoss;
  const lossPerLocation = totalLoss / locations;
  const pctRevenue = ((totalLoss / (visitsPerMonth * avgTicket * 12 * locations)) * 100).toFixed(1);

  const handleCTA = useCallback(() => {
    trackCTAClick("Get My Diagnostic", "Revenue Gap Calculator", "primary");
    window.open("https://etienneagency.com/diagnostic", "_blank");
  }, []);

  return (
    <section id="revenue-gap-calculator" className="relative pt-28 sm:pt-32 md:pt-36 pb-20 md:pb-28 lg:pb-36 section-gradient-alt overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div
          className={`max-w-3xl mx-auto text-center mb-12 md:mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label">Etienne Intelligence Platform</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
            Revenue Gap Calculator
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            How much revenue is leaking across your locations right now? Adjust the inputs below to see your estimated annual gap.
          </p>
        </div>

        {/* Two-column layout: inputs left, results right */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT — Inputs */}
          <div
            className={`space-y-6 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Practice Profile */}
            <div className="card-premium p-6">
              <div className="section-label !mb-4">Practice Profile</div>
              <CalcSlider label="Number of locations" min={2} max={30} step={1} value={locations} onChange={setLocations} />
              <CalcSlider label="Average appointment value" min={200} max={1200} step={10} value={avgTicket} onChange={setAvgTicket} format={(v) => "$" + v} />
              <CalcSlider label="Patient visits / month" sublabel="Per location" min={100} max={600} step={10} value={visitsPerMonth} onChange={setVisitsPerMonth} />
            </div>

            {/* No-Show & Variance */}
            <div className="card-premium p-6">
              <div className="section-label !mb-4">No-Show &amp; Variance</div>
              <CalcSlider label="Average no-show rate" sublabel="Industry avg: 20% | NYC avg: 40%" min={5} max={45} step={1} value={noShowRate} onChange={setNoShowRate} format={(v) => v + "%"} />
              <CalcSlider label="Cross-location variance" sublabel="Gap between best and worst location" min={2} max={20} step={1} value={noShowVariance} onChange={setNoShowVariance} format={(v) => "\u00B1" + v + "%"} />
            </div>

            {/* After-Hours Inquiry Leakage */}
            <div className="card-premium p-6">
              <div className="section-label !mb-4">After-Hours Inquiry Leakage</div>
              <CalcSlider label="Inquiries arriving after hours" sublabel="Industry benchmark: 46% (Phorest, 5,000+ locations)" min={10} max={70} step={1} value={afterHoursPct} onChange={setAfterHoursPct} format={(v) => v + "%"} />
              <CalcSlider label="Current after-hours conversion rate" sublabel="How many you're actually capturing" min={5} max={80} step={1} value={afterHoursConversion} onChange={setAfterHoursConversion} format={(v) => v + "%"} />
            </div>

            {/* Provider & Room Utilization */}
            <div className="card-premium p-6">
              <div className="section-label !mb-4">Provider &amp; Room Utilization</div>
              <CalcSlider label="Treatment rooms per location" min={1} max={10} step={1} value={rooms} onChange={setRooms} />
              <CalcSlider label="Utilization gap vs. target" sublabel="Target: 80\u201385% | Gap = how far below you are" min={2} max={35} step={1} value={utilizationGap} onChange={setUtilizationGap} format={(v) => v + "%"} />
            </div>
          </div>

          {/* RIGHT — Results (sticky on desktop) */}
          <div
            className={`lg:sticky lg:top-6 lg:self-start space-y-6 transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Results card */}
            <div className="card-premium p-6 shadow-lg">
              <div className="text-[0.7rem] font-bold tracking-widest uppercase text-muted-foreground mb-5">
                Your Estimated Annual Revenue Gap
              </div>

              {/* Total hero number */}
              <div className="section-dark rounded-xl p-6 mb-4 text-center">
                <div className="text-[0.72rem] text-white/50 tracking-widest uppercase mb-2">
                  Total across {locations} location{locations !== 1 ? "s" : ""}
                </div>
                <div
                  className="font-mono font-bold text-4xl sm:text-5xl text-white leading-none transition-opacity duration-300"
                  style={{ opacity: animated ? 1 : 0.4 }}
                >
                  {formatCurrency(totalLoss)}
                </div>
                <div className="inline-block mt-3 bg-primary/20 border border-primary/40 rounded-full px-3 py-0.5 text-xs font-semibold text-primary">
                  &asymp; {pctRevenue}% of potential annual revenue
                </div>
              </div>

              {/* Breakdown grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <MetricCard label="No-show leakage" value={formatCurrency(totalNoShowLoss)} sublabel="Across all locations" />
                <MetricCard label="Cross-location variance" value={formatCurrency(totalVarianceLoss)} sublabel="Best vs. worst gap" highlight />
                <MetricCard label="After-hours leakage" value={formatCurrency(totalAfterHoursLoss)} sublabel="Missed inquiry revenue" />
                <MetricCard label="Utilization gap" value={formatCurrency(totalUtilizationLoss)} sublabel="Below 80\u201385% target" />
              </div>

              {/* Per-location callout */}
              <div className="bg-secondary rounded-lg p-4 border-l-3" style={{ borderLeftWidth: "3px", borderLeftColor: "var(--primary)" }}>
                <div className="text-[0.72rem] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  Per location / per year
                </div>
                <div className="font-mono font-bold text-xl text-foreground">
                  {formatCurrency(lossPerLocation)}
                </div>
              </div>
            </div>

            {/* Benchmarks */}
            <div className="card-premium p-6">
              <div className="text-[0.72rem] font-bold text-primary tracking-widest uppercase mb-3">
                Industry benchmarks used
              </div>
              {benchmarks.map(([k, v, src]) => (
                <div key={k} className="flex justify-between items-start py-2 border-b border-border/50 last:border-0">
                  <div>
                    <div className="text-[0.78rem] font-semibold text-foreground">{k}</div>
                    <div className="text-[0.7rem] text-muted-foreground">{v}</div>
                  </div>
                  <div className="text-[0.65rem] text-muted-foreground/60 text-right max-w-[100px]">{src}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg, var(--primary) 0%, #00BF99 100%)" }}>
              <div className="text-primary-foreground/80 text-sm mb-2 leading-relaxed">
                Want to see the actual breakdown for your locations?
              </div>
              <div className="text-primary-foreground font-bold text-base mb-4">
                Request a free revenue gap diagnostic.
              </div>
              <Button
                onClick={handleCTA}
                className="w-full rounded-lg px-6 py-5 h-auto text-sm font-bold bg-white text-primary hover:bg-white/90 shadow-md"
              >
                Get My Diagnostic
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <div className="text-[0.68rem] text-primary-foreground/50 mt-2">
                No commitment. 15 minutes. Real numbers.
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted-foreground/50 italic mt-10 leading-relaxed max-w-2xl mx-auto">
          Estimates based on published industry benchmarks (AmSpa, Zenoti, Mangomint, Phorest, Boulevard).
          Actual revenue gaps vary by market, service mix, and operational maturity.
          &copy; Etienne Agency &mdash; Etienne Intelligence Platform
        </p>
      </div>
    </section>
  );
}
