/**
 * Problem Section — "You Have the Data. You Don't Have the Answers."
 *
 * This revision replaces the three bare stat cards with small comparison
 * charts that visualize each gap against published industry benchmarks.
 * The rule: if we claim a number, show the number. Static stat cards
 * are table stakes for a revenue-intelligence product — charts signal
 * "we actually handle data."
 */

import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from "recharts";
import { BENCHMARKS, formatCurrencyCompact } from "@shared/leakage";
import { useCalculator } from "@/context/CalculatorContext";
import CountUp from "@/components/CountUp";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

interface ComparisonStat {
  label: string;
  /** Representative "average med spa" value (from industry research). */
  typical: number;
  /** Top-performer value — what's possible. */
  topPerformer: number;
  /** Unit suffix, e.g. "%" */
  unit: string;
  /** Optional red tint for the "typical" bar (bad number). */
  typicalIsBad: boolean;
  /** One-line description of why this gap matters. */
  description: string;
}

const stats: ComparisonStat[] = [
  {
    label: "No-show rate",
    typical: 23,
    topPerformer: BENCHMARKS.noShow.floor,
    unit: "%",
    typicalIsBad: true,
    description:
      "Industry-average no-show rate. A 5-location practice at $425/visit loses ~$40K/month to empty chairs.",
  },
  {
    label: "Room utilization",
    typical: BENCHMARKS.utilization.median,
    topPerformer: BENCHMARKS.utilization.topDecile,
    unit: "%",
    typicalIsBad: false,
    description:
      "Median treatment-room utilization vs. top-decile operators. The gap is invisible without cross-location data.",
  },
  {
    label: "Rebooking rate",
    typical: BENCHMARKS.rebooking.median,
    topPerformer: BENCHMARKS.rebooking.topQuartile,
    unit: "%",
    typicalIsBad: false,
    description:
      "Industry median rebooking rate vs. top-quartile groups. A 20-point gap on $5M+ in visits is worth finding.",
  },
];

export default function ProblemSection() {
  const { ref, inView } = useRevealAnimation<HTMLElement>({ threshold: 0.2 });
  const { hasInteracted, result, locations } = useCalculator();

  return (
    <section ref={ref} id="problem-section" className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
      <div className="container relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-12 md:mb-16 transition-all duration-[var(--duration-reveal)] ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label">THE INTELLIGENCE GAP</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
            You have the data. You don't have the answers.
          </h2>
        </div>

        <div
          className={`max-w-3xl mx-auto mb-16 transition-all duration-[var(--duration-reveal)] delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              Your booking platform tracks every appointment, every no-show, and every invoice. But when you want to know why Williamsburg is underperforming, or how much your White Plains no-show rate is actually costing you, or which provider has the worst rebooking rate — you're pulling reports from three different screens, exporting to Excel, and spending your Sunday doing math.
            </p>
            <p>
              The data exists. It's sitting inside Zenoti, Boulevard, or Mangomint right now. But no one is connecting it across locations, quantifying what it's costing you, or telling you what to do about it.
            </p>
            <p className="font-semibold text-foreground">
              You don't have a software problem. You have an intelligence problem.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((s, i) => (
            <ComparisonCard
              key={s.label}
              stat={s}
              visible={inView}
              delayMs={300 + i * 120}
            />
          ))}
        </div>

        {/* Personalized projection line — only shown if the visitor has actually
            touched the hero calculator. Otherwise we don't fabricate a number. */}
        {hasInteracted && result.totalAnnualGap > 0 && (
          <div className="max-w-3xl mx-auto mt-10 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-primary/30 bg-primary/[0.04]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <p className="text-sm sm:text-base text-foreground">
                For a {locations}-location group like yours, we project roughly{" "}
                <CountUp
                  value={result.totalAnnualGap}
                  format={(n) => formatCurrencyCompact(n)}
                  className="font-display text-lg sm:text-xl text-primary font-semibold"
                />
                <span className="text-muted-foreground"> /year of addressable leakage.</span>
              </p>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground/60 italic mt-8 max-w-2xl mx-auto">
          Benchmarks sourced from AmSpa, Mindbody Wellness Index, and Zenoti industry data. Typical values are the median of published ranges; top-performer values reflect top-decile or top-quartile operators.
        </p>
      </div>
    </section>
  );
}

interface ComparisonCardProps {
  stat: ComparisonStat;
  visible: boolean;
  delayMs: number;
}

function ComparisonCard({ stat, visible, delayMs }: ComparisonCardProps) {
  // Build the two-row dataset; bar color is keyed off the row type.
  const data = [
    { kind: "typical", label: "Typical", value: stat.typical },
    { kind: "top", label: "Top performer", value: stat.topPerformer },
  ];

  const typicalColor = stat.typicalIsBad ? "#FF6B6B" : "#8B92A8";
  const topColor = "#00D4AA";
  const domainMax = Math.max(stat.typical, stat.topPerformer) * 1.25;

  return (
    <div
      className={`stat-card !p-6 flex flex-col gap-4 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          {stat.label}
        </p>
        <p className="font-display text-2xl sm:text-3xl text-foreground leading-tight">
          <span className={stat.typicalIsBad ? "text-[#FF6B6B]" : "text-foreground"}>
            {stat.typical}
            {stat.unit}
          </span>
          <span className="text-muted-foreground/50 text-lg sm:text-xl mx-2">vs</span>
          <span className="text-primary">
            {stat.topPerformer}
            {stat.unit}
          </span>
        </p>
      </div>

      <div className="h-[88px] -ml-1 -mr-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 2, right: 40, bottom: 2, left: 0 }}
            barCategoryGap={10}
          >
            <XAxis type="number" domain={[0, domainMax]} hide />
            <YAxis
              type="category"
              dataKey="label"
              width={90}
              tick={{ fill: "#4A5568", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={visible}>
              {data.map((row) => (
                <Cell
                  key={row.kind}
                  fill={row.kind === "typical" ? typicalColor : topColor}
                />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(v: number) => `${v}${stat.unit}`}
                style={{ fill: "#0A0F1C", fontSize: 12, fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {stat.description}
      </p>
    </div>
  );
}
