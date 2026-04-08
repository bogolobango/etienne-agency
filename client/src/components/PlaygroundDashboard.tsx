/**
 * PlaygroundDashboard — interactive version of the static bento
 * DashboardPreview. Recomputes live from:
 *   1. The visitor's calculator inputs (via CalculatorContext)
 *   2. A booking-system tab (Zenoti / Boulevard / Mangomint)
 *   3. A location-scale chip selector
 *
 * Tiles are click-expandable — clicking any tile reveals a drill-down
 * view inline. Always labeled "Illustrative — based on industry
 * benchmarks" to stay honest about the pre-pilot stage.
 */

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
  Area,
  AreaChart,
} from "recharts";
import { Sparkles, TrendingUp, TrendingDown, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useCalculator } from "@/context/CalculatorContext";
import { formatCurrencyCompact } from "@/lib/leakage";

type BookingSystem = "zenoti" | "boulevard" | "mangomint";

const BOOKING_SYSTEMS: { id: BookingSystem; label: string; accent: string }[] = [
  { id: "zenoti", label: "Zenoti", accent: "#A855F7" },
  { id: "boulevard", label: "Boulevard", accent: "#F59E0B" },
  { id: "mangomint", label: "Mangomint", accent: "#F97316" },
];

const LOCATION_CHIPS = [3, 5, 8, 12, 20] as const;

/** Generate five fake-but-deterministic location names/revenues scaled to count */
function generateLocations(count: number, apptsPerLocation: number, avgTicket: number) {
  const names = [
    "Williamsburg", "White Plains", "SoHo", "Midtown", "Tribeca",
    "Brooklyn", "Upper East", "Chelsea", "Long Island", "Jersey City",
    "Stamford", "Newark", "Garden City", "Hoboken", "Scarsdale",
    "Bronxville", "Greenwich", "Montclair", "Summit", "Westport",
  ];
  // Variation factors (fixed seed = reproducible across renders)
  const variations = [0.78, 0.94, 1.26, 1.08, 0.74, 1.12, 0.88, 1.02, 0.96, 1.18, 0.82, 1.06, 0.90, 1.14, 0.98, 1.04, 0.86, 1.20, 0.92, 1.10];
  return Array.from({ length: Math.min(count, names.length) }, (_, i) => {
    const revenue = Math.round((apptsPerLocation * avgTicket * variations[i % variations.length]) / 1000);
    const status = variations[i % variations.length] >= 1.1 ? "above" : variations[i % variations.length] <= 0.85 ? "below" : "at";
    return { name: names[i], revenue, status };
  });
}

function generateNoShowTrend(baseline: number) {
  return Array.from({ length: 12 }, (_, i) => ({
    week: i + 1,
    rate: baseline + Math.sin(i * 0.6) * 3 + (11 - i) * 0.25,
  }));
}

function colorForStatus(status: string): string {
  if (status === "above") return "#00D4AA";
  if (status === "below") return "#FF6B6B";
  return "#8B92A8";
}

export default function PlaygroundDashboard() {
  const { apptsPerLocation, avgTicket, hasInteracted, locations: contextLocations } = useCalculator();
  const [system, setSystem] = useState<BookingSystem>("zenoti");
  // If visitor hasn't set locations via calculator, default to 5-location chip for best visual
  const [locations, setLocations] = useState<number>(5);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Sync the local locations state when visitor uses the hero calculator
  useMemo(() => {
    if (hasInteracted) {
      // Snap to nearest chip value to keep the chip selector in sync
      const nearest = LOCATION_CHIPS.reduce((acc, v) =>
        Math.abs(v - contextLocations) < Math.abs(acc - contextLocations) ? v : acc
      , LOCATION_CHIPS[0] as number);
      setLocations(nearest);
    }
  }, [contextLocations, hasInteracted]);

  const locationData = useMemo(
    () => generateLocations(locations, apptsPerLocation, avgTicket),
    [locations, apptsPerLocation, avgTicket]
  );

  const totalMonthlyRevenue = useMemo(
    () => locationData.reduce((sum, l) => sum + l.revenue * 1000, 0),
    [locationData]
  );

  // Worst performer for AI insight
  const worst = useMemo(
    () => [...locationData].sort((a, b) => a.revenue - b.revenue)[0],
    [locationData]
  );

  const noShowTrend = useMemo(() => generateNoShowTrend(22), []);

  function toggleExpand(id: string) {
    setExpanded((prev) => (prev === id ? null : id));
  }

  return (
    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#0F1524] to-[#141929] p-4 sm:p-6 shadow-2xl shadow-black/40 overflow-hidden">
      {/* Control row: booking system tabs + location chips */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5 pb-4 border-b border-white/5">
        <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/10 rounded-full p-1">
          {BOOKING_SYSTEMS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSystem(s.id)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all ${
                system === s.id
                  ? "bg-white text-[#0A0F1C] shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-white/40 mr-1 hidden sm:inline">Locations</span>
          {LOCATION_CHIPS.map((n) => (
            <button
              key={n}
              onClick={() => setLocations(n)}
              className={`min-w-[32px] h-7 rounded-full text-[11px] font-semibold transition-all ${
                locations === n
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/[0.03] text-white/60 hover:text-white border border-white/10"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-white/40">eip · {system}</span>
          <span className="text-[11px] text-white/30">·</span>
          <span className="text-[11px] text-white/50">{formatCurrencyCompact(totalMonthlyRevenue)}/mo across {locations} locations</span>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-white/30 hidden sm:inline">
          Illustrative — industry benchmarks
        </span>
      </div>

      {/* Bento grid — 6 cols on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        {/* Revenue by location — large tile */}
        <ExpandableTile
          id="revenue"
          expanded={expanded === "revenue"}
          onToggle={toggleExpand}
          className="md:col-span-4 md:row-span-2"
          header="Monthly revenue by location"
          subheader={`${system === "zenoti" ? "Zenoti" : system === "boulevard" ? "Boulevard" : "Mangomint"} data`}
        >
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={locationData}
                layout="vertical"
                margin={{ top: 4, right: 48, bottom: 4, left: 0 }}
                barCategoryGap={6}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={98}
                  tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]} isAnimationActive={true} animationDuration={700}>
                  {locationData.map((row, i) => (
                    <Cell key={i} fill={colorForStatus(row.status)} />
                  ))}
                  <LabelList
                    dataKey="revenue"
                    position="right"
                    formatter={(v: number) => `$${v}K`}
                    style={{ fill: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: 600 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {expanded === "revenue" && (
            <div className="mt-4 pt-4 border-t border-white/5 text-[12px] text-white/70 space-y-2">
              <p className="text-primary font-semibold text-xs uppercase tracking-wider">Drill-down</p>
              <p>
                Your group average is <span className="font-semibold text-white">${Math.round(locationData.reduce((s, l) => s + l.revenue, 0) / locationData.length)}K/mo</span>.
                Underperformers ({locationData.filter((l) => l.status === "below").length} locations) are pulling the average down by ~14%.
              </p>
              <p>
                Top performer: <span className="text-primary font-semibold">{[...locationData].sort((a, b) => b.revenue - a.revenue)[0].name}</span> at ${[...locationData].sort((a, b) => b.revenue - a.revenue)[0].revenue}K.
              </p>
            </div>
          )}
        </ExpandableTile>

        {/* AI Insight */}
        <ExpandableTile
          id="insight"
          expanded={expanded === "insight"}
          onToggle={toggleExpand}
          className="md:col-span-2"
          header="AI Insight"
          icon={Sparkles}
        >
          <p className="text-[13px] text-white/80 leading-snug">
            {worst.name} rebooking is{" "}
            <span className="text-[#FF6B6B] font-semibold">down 12% WoW</span>.
            Primary driver: provider left the rotation 3 weeks ago.
          </p>
          <p className="text-[11px] text-white/40 mt-2">
            Revenue impact: <span className="text-white/70 font-semibold">-$18K/mo</span>
          </p>
          {expanded === "insight" && (
            <p className="text-[11px] text-white/60 mt-3 pt-3 border-t border-white/5">
              Recommended action: prioritize replacing the vacated weekday-afternoon slots; audit rebooking flow for former clients.
            </p>
          )}
        </ExpandableTile>

        {/* Utilization */}
        <ExpandableTile
          id="util"
          expanded={expanded === "util"}
          onToggle={toggleExpand}
          className="md:col-span-2"
          header="Utilization"
          subheader="Group avg vs 80% top-decile"
        >
          <div className="flex items-end gap-3">
            <div>
              <p className="font-display text-3xl text-white leading-none">62%</p>
              <p className="text-[11px] text-[#FF6B6B] flex items-center gap-1 mt-1">
                <TrendingDown className="w-3 h-3" />
                18pts to top-decile
              </p>
            </div>
            <div className="flex-1 h-2 rounded-full bg-white/5 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-700" style={{ width: "62%" }} />
              <div className="absolute inset-y-0 w-px bg-white/40" style={{ left: "80%" }} />
            </div>
          </div>
          {expanded === "util" && (
            <p className="text-[11px] text-white/60 mt-3 pt-3 border-t border-white/5">
              Moving from 62% → 70% utilization across {locations} locations would unlock ~{formatCurrencyCompact(totalMonthlyRevenue * 0.12)}/mo in incremental revenue.
            </p>
          )}
        </ExpandableTile>

        {/* No-show sparkline */}
        <ExpandableTile
          id="noshow"
          expanded={expanded === "noshow"}
          onToggle={toggleExpand}
          className="md:col-span-3"
          header="No-show rate"
          subheader="Last 12 weeks"
        >
          <div className="flex items-center gap-3">
            <div>
              <p className="font-display text-2xl text-white leading-none">23%</p>
              <p className="text-[11px] text-primary flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                4pts above benchmark
              </p>
            </div>
            <div className="flex-1 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={noShowTrend} margin={{ top: 4, right: 2, bottom: 4, left: 2 }}>
                  <defs>
                    <linearGradient id="noshow-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00D4AA" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#00D4AA" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="rate"
                    stroke="#00D4AA"
                    strokeWidth={2}
                    fill="url(#noshow-grad)"
                    isAnimationActive={true}
                    animationDuration={900}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          {expanded === "noshow" && (
            <div className="mt-3 pt-3 border-t border-white/5">
              <p className="text-[11px] text-white/60 mb-2">Weekly breakdown</p>
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={noShowTrend} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                    <Line type="monotone" dataKey="rate" stroke="#00D4AA" strokeWidth={2} dot={{ r: 2, fill: "#00D4AA" }} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </ExpandableTile>

        {/* Alerts */}
        <ExpandableTile
          id="alerts"
          expanded={expanded === "alerts"}
          onToggle={toggleExpand}
          className="md:col-span-3"
          header="Needs attention"
          icon={AlertCircle}
        >
          <ul className="space-y-1.5 text-[12px] text-white/70">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[#FF6B6B] mt-1.5 flex-shrink-0" />
              <span>{worst.name} utilization dropped 9% last week</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[#FFB547] mt-1.5 flex-shrink-0" />
              <span>3 providers have &gt; 40% open slots next week</span>
            </li>
          </ul>
          {expanded === "alerts" && (
            <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-white/60 space-y-1">
              <p>Estimated combined impact if unaddressed: <span className="text-white font-semibold">{formatCurrencyCompact(totalMonthlyRevenue * 0.04)}/mo</span></p>
            </div>
          )}
        </ExpandableTile>
      </div>

      <p className="text-[10px] uppercase tracking-widest text-white/30 mt-4 text-center sm:hidden">
        Illustrative — industry benchmarks
      </p>
    </div>
  );
}

interface ExpandableTileProps {
  id: string;
  expanded: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
  className?: string;
  header: string;
  subheader?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

function ExpandableTile({
  id,
  expanded,
  onToggle,
  children,
  className = "",
  header,
  subheader,
  icon: Icon,
}: ExpandableTileProps) {
  return (
    <div
      className={`rounded-xl border bg-white/[0.02] p-4 transition-all duration-300 cursor-pointer ${
        expanded ? "border-primary/30 bg-white/[0.04]" : "border-white/5 hover:border-white/15 hover:bg-white/[0.03]"
      } ${className}`}
      onClick={() => onToggle(id)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          {Icon && <Icon className="w-3 h-3 text-primary" />}
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">{header}</p>
        </div>
        <div className="flex items-center gap-2">
          {subheader && (
            <p className="text-[10px] text-white/30 hidden sm:inline">{subheader}</p>
          )}
          {expanded ? (
            <ChevronUp className="w-3 h-3 text-white/40" />
          ) : (
            <ChevronDown className="w-3 h-3 text-white/40" />
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
