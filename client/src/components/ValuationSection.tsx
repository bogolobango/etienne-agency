/**
 * Valuation Section — "Recovered revenue is the small win. A higher exit multiple is the big one."
 *
 * Reframes Etienne's deliverables as exit-multiple lift, not just leakage recovery.
 * Placed between FounderSection (trust) and EarlyAdopterSection (offer) to hit the
 * PE-exit emotional trigger at peak attention.
 *
 * Chart: horizontal bar, 3 rows, Recharts — same pattern as ProblemSection.
 */

import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from "recharts";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

const BRAND_TEAL = "#00D4AA";
const MUTED_BAR = "#8B92A8";

const data = [
  { tier: "Single location", multiple: 5, range: "3 to 6x EBITDA" },
  { tier: "Multi-location, decentralized", multiple: 6, range: "5 to 7x EBITDA" },
  { tier: "Multi-location with centralized intelligence", multiple: 10, range: "8 to 12x EBITDA" },
];

export default function ValuationSection() {
  const { ref, inView } = useRevealAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      id="valuation-section"
      className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden"
    >
      <div className="container relative z-10">

        {/* Header */}
        <div
          className={`max-w-3xl mx-auto text-center mb-12 md:mb-16 transition-all duration-[var(--duration-reveal)] ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label">THE EXIT MATH</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
            Recovered revenue is the small win. The multiple is the big one.
          </h2>
        </div>

        {/* Body + chart — two-column on desktop, stacked on mobile */}
        <div
          className={`max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-10 transition-all duration-[var(--duration-reveal)] delay-100 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Left: body copy */}
          <div className="space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              A single-location medspa exits at 3 to 6x EBITDA. A multi-location group with centralized operations, consistent SOPs across sites, and a measurable operating cadence exits at 7 to 12x. Platform-quality groups clear 10 to 14x.
            </p>
            <p>
              If you run $2M of EBITDA, the gap between "5 locations on Zenoti" and "5 locations run on systems" is roughly $10M of personal wealth at exit. PE buyers don't pay a premium for booking software. They pay a premium for proof the business runs without you in the room.
            </p>
            <p>
              That proof doesn't come from a strategy document. It comes from a paper trail: a locked baseline, a fix log with owners and dates, weekly numbers showing each leak closed and staying closed, SOPs your managers actually follow. Everything the Exit Engine produces is built to sit in a data room. The same 90 days that recover $300K of leakage are the 90 days that move you from 5x to 9x when the buyer walks in.
            </p>
          </div>

          {/* Right: chart */}
          <div>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{ top: 4, right: 72, bottom: 4, left: 0 }}
                  barCategoryGap={18}
                >
                  <XAxis type="number" domain={[0, 14]} hide />
                  <YAxis
                    type="category"
                    dataKey="tier"
                    width={0}
                    hide
                  />
                  <Bar
                    dataKey="multiple"
                    radius={[0, 4, 4, 0]}
                    isAnimationActive={inView}
                    label={({ x, y, width, height, index }: { x: number; y: number; width: number; height: number; index: number }) => {
                      const row = data[index];
                      return (
                        <g>
                          <text
                            x={x + width + 8}
                            y={y + height / 2 - 7}
                            fill="#0A0F1C"
                            fontSize={12}
                            fontWeight={700}
                            dominantBaseline="middle"
                          >
                            {row.range}
                          </text>
                          <text
                            x={x + width + 8}
                            y={y + height / 2 + 9}
                            fill="#8B92A8"
                            fontSize={11}
                            dominantBaseline="middle"
                          >
                            {row.tier}
                          </text>
                        </g>
                      );
                    }}
                  >
                    {data.map((row, index) => (
                      <Cell
                        key={row.tier}
                        fill={index === data.length - 1 ? BRAND_TEAL : MUTED_BAR}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs italic text-muted-foreground/70 mt-4 leading-relaxed">
              Multiples sourced from Breakwater M&amp;A 2026 valuations and FOCUS Investment Banking medspa deal flow.
            </p>
          </div>
        </div>

        {/* Closing text link */}
        <div
          className={`max-w-5xl mx-auto transition-all duration-[var(--duration-reveal)] delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-base text-muted-foreground leading-relaxed">
            Curious where you sit on the curve?{" "}
            <a
              href="/#early-adopter-section"
              className="text-primary underline underline-offset-2 hover:text-[#00BF99] transition-colors"
            >
              The Exit Engine builds the paper trail that moves the number &rarr;
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
