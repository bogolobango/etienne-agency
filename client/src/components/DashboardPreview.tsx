/**
 * DashboardPreview — Static bento grid showing what the EIP dashboard
 * surfaces, rendered with real chart primitives (not screenshots).
 *
 * IMPORTANT: all numbers below are ILLUSTRATIVE and drawn from published
 * industry benchmarks (AmSpa, Zenoti, Mindbody, Marchex). This is labeled
 * as "illustrative" in the UI to stay honest about the pre-pilot stage.
 * Never present these as customer data.
 */

import { BarChart, Bar, Cell, LineChart, Line, ResponsiveContainer, XAxis, YAxis, LabelList } from "recharts";
import { Sparkles, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

/** Five-location revenue heat-bar (illustrative). */
const LOCATION_REVENUE = [
  { name: "Williamsburg", revenue: 412, status: "below" },
  { name: "White Plains", revenue: 487, status: "at" },
  { name: "SoHo", revenue: 625, status: "above" },
  { name: "Midtown", revenue: 534, status: "at" },
  { name: "Tribeca", revenue: 391, status: "below" },
] as const;

/** 12-week no-show trend (illustrative). */
const NOSHOW_TREND = Array.from({ length: 12 }, (_, i) => ({
  week: i + 1,
  rate: 22 + Math.sin(i * 0.6) * 3 + (11 - i) * 0.3,
}));

function colorForStatus(status: string): string {
  if (status === "above") return "#00D4AA";
  if (status === "below") return "#FF6B6B";
  return "#8B92A8";
}

export default function DashboardPreview() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#0F1524] to-[#141929] p-4 sm:p-6 shadow-2xl shadow-black/40 overflow-hidden">
      {/* Browser chrome */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          </div>
          <div className="ml-3 px-3 py-1 rounded-md bg-white/5 text-[11px] text-white/50 font-mono">
            EIP Dashboard · Revenue Intelligence
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-white/30 hidden sm:inline">
          Illustrative — based on industry benchmarks
        </span>
      </div>

      {/* Bento grid — 6 columns on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        {/* Cross-location revenue — 4 cols, tall */}
        <Tile className="md:col-span-4 md:row-span-2" header="Monthly revenue by location" subheader="vs. $500K target">
          <div className="h-[168px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={LOCATION_REVENUE as unknown as Array<{ name: string; revenue: number; status: string }>}
                layout="vertical"
                margin={{ top: 4, right: 46, bottom: 4, left: 0 }}
                barCategoryGap={8}
              >
                <XAxis type="number" domain={[0, 750]} hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={98}
                  tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]} isAnimationActive={false}>
                  {LOCATION_REVENUE.map((row) => (
                    <Cell key={row.name} fill={colorForStatus(row.status)} />
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
        </Tile>

        {/* AI Insight — 2 cols */}
        <Tile className="md:col-span-2" header="AI Insight" icon={Sparkles}>
          <p className="text-[13px] text-white/80 leading-snug">
            Williamsburg rebooking is{" "}
            <span className="text-[#FF6B6B] font-semibold">down 12% WoW</span>.
            Primary driver: provider Sarah K. left the rotation 3 weeks ago.
          </p>
          <p className="text-[11px] text-white/40 mt-2">
            Revenue impact: <span className="text-white/70 font-semibold">-$18K/mo</span>
          </p>
        </Tile>

        {/* Utilization gauge — 2 cols */}
        <Tile className="md:col-span-2" header="Utilization" subheader="Group avg vs 80% top-decile">
          <div className="flex items-end gap-3">
            <div>
              <p className="font-display text-3xl text-white leading-none">62%</p>
              <p className="text-[11px] text-[#FF6B6B] flex items-center gap-1 mt-1">
                <TrendingDown className="w-3 h-3" />
                18pts to top-decile
              </p>
            </div>
            <div className="flex-1 h-2 rounded-full bg-white/5 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-primary rounded-full" style={{ width: "62%" }} />
              <div className="absolute inset-y-0 w-px bg-white/40" style={{ left: "80%" }} />
            </div>
          </div>
        </Tile>

        {/* No-show sparkline — 3 cols */}
        <Tile className="md:col-span-3" header="No-show rate" subheader="Last 12 weeks">
          <div className="flex items-center gap-3">
            <div>
              <p className="font-display text-2xl text-white leading-none">23%</p>
              <p className="text-[11px] text-primary flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                4pts above benchmark
              </p>
            </div>
            <div className="flex-1 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={NOSHOW_TREND} margin={{ top: 4, right: 2, bottom: 4, left: 2 }}>
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#00D4AA"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Tile>

        {/* Alert card — 3 cols */}
        <Tile className="md:col-span-3" header="Needs attention" icon={AlertCircle}>
          <ul className="space-y-1.5 text-[12px] text-white/70">
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[#FF6B6B] mt-1.5 flex-shrink-0" />
              <span>Tribeca utilization dropped 9% last week</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[#FFB547] mt-1.5 flex-shrink-0" />
              <span>3 providers have &gt; 40% open slots next week</span>
            </li>
          </ul>
        </Tile>
      </div>

      {/* Footer disclaimer (always visible, not just on sm+) */}
      <p className="text-[10px] uppercase tracking-widest text-white/30 mt-4 text-center sm:hidden">
        Illustrative — based on industry benchmarks
      </p>
    </div>
  );
}

interface TileProps {
  children: React.ReactNode;
  className?: string;
  header: string;
  subheader?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

function Tile({ children, className = "", header, subheader, icon: Icon }: TileProps) {
  return (
    <div className={`rounded-xl border border-white/5 bg-white/[0.02] p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          {Icon && <Icon className="w-3 h-3 text-primary" />}
          <p className="text-[10px] uppercase tracking-wider text-white/40 font-medium">{header}</p>
        </div>
        {subheader && (
          <p className="text-[10px] text-white/30">{subheader}</p>
        )}
      </div>
      {children}
    </div>
  );
}
