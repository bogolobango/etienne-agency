/**
 * Sample Leakage Map Page - /sample-audit
 *
 * Shows a visitor the actual Leakage Map format across 4 pages
 * populated with clearly-labeled SAMPLE data (Sample Medspa Co.).
 * Conversion goal: visitor understands exactly what they get before
 * committing to sending a CSV.
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  AlertCircle,
  TrendingDown,
  CheckCircle2,
  FileText,
  BarChart3,
  Map,
  Compass,
} from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";
import FloatingDustMotes from "@/components/FloatingDustMotes";
import { CALENDLY_URL } from "@/const";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function SampleBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 border border-amber-200">
      SAMPLE
    </span>
  );
}

function PageLabel({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Page {num} of 4
      </span>
      <span className="text-muted-foreground/40 text-[10px]">&middot;</span>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page 1 - Executive Summary
// ---------------------------------------------------------------------------

function Page1ExecutiveSummary() {
  const findings = [
    {
      rank: 1,
      label: "Thursday utilization collapse at 4 of 7 locations",
      impact: "$184K",
      severity: "high",
      complexity: "Low complexity",
      note: "Thursdays average 41% utilization vs. 68% Wednesday benchmark. Scheduling gap, not demand problem.",
    },
    {
      rank: 2,
      label: "After-hours call answer miss rate",
      impact: "$112K",
      severity: "high",
      complexity: "Medium complexity",
      note: "38% of inbound calls between 6-8 PM go unanswered. Industry median: 22%. Each missed call = ~$340 lost appointment.",
    },
    {
      rank: 3,
      label: "No-show rate above 15% median",
      impact: "$58K",
      severity: "high",
      complexity: "Low complexity",
      note: "Group average 23% vs. 15% peer median. No deposit or reminder SMS policy in place.",
    },
    {
      rank: 4,
      label: "Cross-location rebooking variance",
      impact: "$33K",
      severity: "medium",
      complexity: "Medium complexity",
      note: "Memphis rebooks 61% of visits; Nashville 31%. Same protocols on paper. Staff coaching gap identified.",
    },
  ];

  return (
    <div className="relative rounded-2xl border border-border bg-white shadow-lg overflow-hidden">
      {/* Document header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Leakage Map</p>
            <p className="text-[10px] text-muted-foreground">Confidential - Prepared by Etienne Agency</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <SampleBadge />
          <p className="text-[10px] text-muted-foreground">Page 1 of 4</p>
        </div>
      </div>

      {/* Client header */}
      <div className="px-6 pt-5 pb-3 bg-white border-b border-border">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
          Prepared for
        </p>
        <p className="text-sm font-bold text-foreground">Sample Medspa Co.</p>
        <p className="text-[10px] text-muted-foreground">7 locations &middot; Zenoti &middot; Illustrative data only</p>
      </div>

      {/* Hero number */}
      <div className="px-6 pt-6 pb-4 bg-white border-b border-border">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
          Total recoverable revenue identified
        </p>
        <div className="flex items-baseline gap-3">
          <p
            className="text-5xl text-foreground leading-none font-bold"
            style={{ fontFamily: "Playfair Display, Georgia, serif" }}
          >
            $387,000
          </p>
          <p className="text-sm text-muted-foreground">estimated annual</p>
        </div>
        <p className="text-xs text-amber-600 mt-1 font-medium">
          Illustrative - this number is replaced with your real data once submitted
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          Benchmark sources: AmSpa 2024 State of the Industry, Mindbody Wellness Index, Zenoti Medspa Report
        </p>
      </div>

      {/* Findings table */}
      <div className="px-6 py-5">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-4">
          Findings ranked by revenue impact
        </p>
        <div className="space-y-3">
          {findings.map((f) => (
            <div
              key={f.rank}
              className="flex items-start gap-4 p-3 rounded-lg border border-border bg-white"
            >
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  f.severity === "high"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                {f.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5 flex-wrap">
                  <p className="text-xs font-semibold text-foreground leading-snug">{f.label}</p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[9px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
                      {f.complexity}
                    </span>
                    <p
                      className={`text-xs font-bold ${
                        f.severity === "high" ? "text-destructive" : "text-amber-600"
                      }`}
                    >
                      {f.impact}
                    </p>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground leading-snug">{f.note}</p>
              </div>
              <div className="flex-shrink-0">
                {f.severity === "high" ? (
                  <AlertCircle className="w-3.5 h-3.5 text-destructive" aria-hidden="true" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground/60 mt-4 italic">
          Pages 2-4 include location-level breakdowns, benchmark comparisons, and a prioritized fix queue.
        </p>
      </div>

      {/* Watermark */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.035]"
        style={{ transform: "rotate(-20deg)" }}
        aria-hidden="true"
      >
        <p
          className="text-7xl font-black text-foreground tracking-tight select-none"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          SAMPLE
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page 2 - Leakage Map
// ---------------------------------------------------------------------------

function Page2LeakageMap() {
  const rows = [
    { type: "Provider schedule gap", where: "Thursday PM, all locations", impact: "$184K/yr", complexity: "Low" },
    { type: "After-hours call miss", where: "Memphis, Plano, Nashville", impact: "$112K/yr", complexity: "Medium" },
    { type: "No-show without deposit", where: "Group-wide", impact: "$58K/yr", complexity: "Low" },
    { type: "Rebooking variance", where: "Nashville vs. Memphis delta", impact: "$33K/yr", complexity: "Medium" },
  ];

  const locationSummary = [
    { name: "Memphis", leaks: 3, topLeak: "Utilization", estImpact: "$162K" },
    { name: "Plano", leaks: 3, topLeak: "Call miss rate", estImpact: "$98K" },
    { name: "Nashville", leaks: 4, topLeak: "Rebooking gap", estImpact: "$127K" },
  ];

  return (
    <div className="relative rounded-2xl border border-border bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Map className="w-4 h-4 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Leakage Map</p>
            <p className="text-[10px] text-muted-foreground">Confidential - Prepared by Etienne Agency</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <SampleBadge />
          <p className="text-[10px] text-muted-foreground">Page 2 of 4</p>
        </div>
      </div>

      <div className="px-6 py-5">
        <PageLabel num="2" label="Leakage Map" />

        {/* Leakage table */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">
            Leak type breakdown
          </p>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Leak Type</th>
                  <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Where It Shows Up</th>
                  <th className="text-right px-3 py-2 font-semibold text-muted-foreground">$ Impact</th>
                  <th className="text-right px-3 py-2 font-semibold text-muted-foreground">Complexity</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-3 py-2 font-medium text-foreground">{r.type}</td>
                    <td className="px-3 py-2 text-muted-foreground">{r.where}</td>
                    <td className="px-3 py-2 text-right font-bold text-destructive">{r.impact}</td>
                    <td className="px-3 py-2 text-right">
                      <span
                        className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold ${
                          r.complexity === "Low"
                            ? "bg-green-500/10 text-green-700"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {r.complexity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Per-location summary */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">
            Per-location summary (3 of 7 locations shown)
          </p>
          <div className="grid grid-cols-3 gap-3">
            {locationSummary.map((loc, i) => (
              <div key={i} className="rounded-lg border border-border p-3 bg-white">
                <p className="text-xs font-bold text-foreground mb-1">{loc.name}</p>
                <p className="text-[10px] text-muted-foreground mb-0.5">{loc.leaks} leak types found</p>
                <p className="text-[10px] text-muted-foreground mb-1">Top: {loc.topLeak}</p>
                <p className="text-sm font-bold text-destructive">{loc.estImpact}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground/60 mt-3 italic">
            Full Map includes all 7 locations with provider-level drill-down per finding.
          </p>
        </div>
      </div>

      {/* Watermark */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.035]"
        style={{ transform: "rotate(-20deg)" }}
        aria-hidden="true"
      >
        <p
          className="text-7xl font-black text-foreground tracking-tight select-none"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          SAMPLE
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page 3 - Benchmark Comparison
// ---------------------------------------------------------------------------

function Page3BenchmarkComparison() {
  const metrics = [
    { name: "No-show rate", yours: "23%", median: "15%", direction: "lower-better", status: "below" },
    { name: "Provider utilization", yours: "54%", median: "62%", direction: "higher-better", status: "below" },
    { name: "Rebooking at checkout", yours: "41%", median: "48%", direction: "higher-better", status: "below" },
    { name: "Inbound call answer rate", yours: "62%", median: "78%", direction: "higher-better", status: "below" },
    { name: "Cross-location variance", yours: "30 pts", median: "12 pts", direction: "lower-better", status: "below" },
  ];

  return (
    <div className="relative rounded-2xl border border-border bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Leakage Map</p>
            <p className="text-[10px] text-muted-foreground">Confidential - Prepared by Etienne Agency</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <SampleBadge />
          <p className="text-[10px] text-muted-foreground">Page 3 of 4</p>
        </div>
      </div>

      <div className="px-6 py-5">
        <PageLabel num="3" label="Benchmark Comparison" />
        <p className="text-xs font-semibold text-foreground mb-4">
          Sample Medspa Co. vs. Industry Median
        </p>

        <div className="rounded-lg border border-border overflow-hidden mb-4">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-3 py-2 font-semibold text-muted-foreground">Metric</th>
                <th className="text-right px-3 py-2 font-semibold text-muted-foreground">Your Number</th>
                <th className="text-right px-3 py-2 font-semibold text-muted-foreground">Industry Median</th>
                <th className="text-right px-3 py-2 font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, i) => {
                const isAbove = m.status === "above";
                const statusColor = isAbove ? "text-green-700" : "text-destructive";
                const statusBg = isAbove ? "bg-green-500/10" : "bg-destructive/10";
                const statusLabel = isAbove ? "Above median" : "Below median";

                return (
                  <tr key={i} className="border-t border-border">
                    <td className="px-3 py-2.5 font-medium text-foreground">{m.name}</td>
                    <td className={`px-3 py-2.5 text-right font-bold ${statusColor}`}>{m.yours}</td>
                    <td className="px-3 py-2.5 text-right text-muted-foreground">{m.median}</td>
                    <td className="px-3 py-2.5 text-right">
                      <span
                        className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-semibold ${statusBg} ${statusColor}`}
                      >
                        {statusLabel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-[10px] text-muted-foreground/60 italic">
          Benchmark sources: AmSpa 2024 State of the Industry, Mindbody Wellness Index, Zenoti Medspa Report.
          Industry median calculated from operators with 5 to 25 locations.
        </p>
      </div>

      {/* Watermark */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.035]"
        style={{ transform: "rotate(-20deg)" }}
        aria-hidden="true"
      >
        <p
          className="text-7xl font-black text-foreground tracking-tight select-none"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          SAMPLE
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page 4 - Recovery Roadmap
// ---------------------------------------------------------------------------

function Page4RecoveryRoadmap() {
  const leaks = [
    {
      title: "Thursday utilization collapse",
      impact: "$184K/yr",
      steps: [
        "Pull provider availability data for Thursday 12-7 PM across all locations.",
        "Identify which rooms are blocked vs. which providers are unscheduled.",
        "Add one promotional appointment block per room on Thursdays for 30 days. Measure fill rate.",
      ],
    },
    {
      title: "After-hours call miss rate",
      impact: "$112K/yr",
      steps: [
        "Enable after-hours voicemail-to-text in Zenoti. Route to front desk lead daily at 8 AM.",
        "Add an auto-reply SMS: \"We're closed but will call back by 10 AM tomorrow.\"",
        "Track inbound call answer rate weekly. Target: 78% within 60 days.",
      ],
    },
    {
      title: "No-show rate above 15%",
      impact: "$58K/yr",
      steps: [
        "Add a $50 deposit policy for all new appointments over $200. Implement via Zenoti deposit flow.",
        "Enable 24-hour SMS reminder for all appointments. Current setting is 48-hour email only.",
        "Review cancellation window. Recommend 24-hour minimum with deposit forfeit.",
      ],
    },
  ];

  const paths = [
    {
      num: "01",
      label: "Self-serve",
      price: "Free",
      title: "Use this Map with your team",
      description:
        "This Map is yours to keep. Run the fixes with your VP of Operations using the steps above. No additional engagement required.",
      featured: false,
    },
    {
      num: "02",
      label: "Exit Engine",
      price: "$7,500 + 15%",
      title: "We run the system with your team for 90 days",
      description:
        "We lock the baseline, write the fixes, and check the Monday numbers. Performance fee only on dollars we can show against baseline. Every artifact sits in your future data room.",
      featured: true,
    },
    {
      num: "03",
      label: "Operator's Desk",
      price: "$3,500/mo, group-wide",
      title: "Continuity after the Engine",
      description:
        "Weekly numbers, monthly review with Jim, quarterly exit-readiness refresh. Available only to groups that have run the Engine.",
      featured: false,
    },
  ];

  return (
    <div className="relative rounded-2xl border border-border bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Compass className="w-4 h-4 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">Leakage Map</p>
            <p className="text-[10px] text-muted-foreground">Confidential - Prepared by Etienne Agency</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <SampleBadge />
          <p className="text-[10px] text-muted-foreground">Page 4 of 4</p>
        </div>
      </div>

      <div className="px-6 py-5">
        <PageLabel num="4" label="Recovery Roadmap" />

        {/* Top 3 leaks with action steps */}
        <div className="space-y-4 mb-6">
          {leaks.map((leak, i) => (
            <div key={i} className="rounded-lg border border-border p-4 bg-white">
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="text-xs font-bold text-foreground">{leak.title}</p>
                <span className="text-xs font-bold text-destructive flex-shrink-0">{leak.impact}</span>
              </div>
              <ol className="space-y-1.5">
                {leak.steps.map((step, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/15 text-primary text-[9px] font-bold flex items-center justify-center mt-0.5">
                      {j + 1}
                    </span>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        {/* 3 Paths */}
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-3">
          Choose your path forward
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {paths.map((path, i) => (
            <div
              key={i}
              className={`rounded-lg border p-3 ${
                path.featured
                  ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                  : "border-border bg-white"
              }`}
            >
              {path.featured && (
                <p className="text-[9px] font-bold uppercase tracking-widest text-primary mb-1.5">
                  Most popular
                </p>
              )}
              <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
                Path {path.num} &middot; {path.label}
              </p>
              <p className="text-xs font-bold text-foreground mb-0.5">{path.price}</p>
              <p className="text-[10px] font-semibold text-foreground mb-1">{path.title}</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{path.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Watermark */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.035]"
        style={{ transform: "rotate(-20deg)" }}
        aria-hidden="true"
      >
        <p
          className="text-7xl font-black text-foreground tracking-tight select-none"
          style={{ fontFamily: "Playfair Display, Georgia, serif" }}
        >
          SAMPLE
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page export
// ---------------------------------------------------------------------------

export default function SampleAudit() {
  usePageView("Sample Audit");
  useScrollTracking("Sample Audit");
  useSEO("/sample-audit");

  // Hero is above the fold - reveal immediately, no scroll gate
  const inView = true;
  const { ref: previewRef, inView: previewInView } = useRevealAnimation();
  const { ref: sendRef, inView: sendInView } = useRevealAnimation();
  const { ref: closingRef, inView: closingInView } = useRevealAnimation();

  const previewSections = [
    {
      icon: FileText,
      label: "Page 1 of 4",
      title: "Executive Summary",
      description:
        "The top page of every Map. Total estimated annual revenue leak, four ranked findings with dollar impacts, and complexity ratings.",
      preview: <Page1ExecutiveSummary />,
    },
    {
      icon: Map,
      label: "Page 2 of 4",
      title: "Leakage Map",
      description:
        "Every leak type matched to the location where it appears. A per-location summary so you know where to start.",
      preview: <Page2LeakageMap />,
    },
    {
      icon: BarChart3,
      label: "Page 3 of 4",
      title: "Benchmark Comparison",
      description:
        "Your five key metrics stacked against the industry median for multi-location operators. Red means money on the table.",
      preview: <Page3BenchmarkComparison />,
    },
    {
      icon: Compass,
      label: "Page 4 of 4",
      title: "Recovery Roadmap",
      description:
        "A prioritized fix queue with named steps, owners, and a choice of three paths forward: self-serve, Exit Engine, or Operator's Desk.",
      preview: <Page4RecoveryRoadmap />,
    },
  ];

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero - dark */}
      <section className="relative pt-24 pb-12 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={45} />
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)",
            transform: "translate(20%, -20%)",
          }}
        />
        <div className="container relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-[var(--duration-reveal)] ease-out ${
              inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* SAMPLE label */}
            <div className="flex justify-center mb-5">
              <span className="inline-flex items-center rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 border border-amber-400/30">
                SAMPLE LEAKAGE MAP
              </span>
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6 tracking-tight"
            >
              This is what a Leakage Map looks like.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">
              Below is a sample using illustrative numbers. Yours arrives within 48 hours of sending your CSV, with your actual data.
            </p>

            <div className="flex flex-col items-center gap-3">
              <a href="/#early-adopter-section">
                <Button
                  className="rounded-full px-8 py-4 text-base sm:text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill transition-colors"
                  onClick={() => trackCTAClick("Get Your Free Leakage Map", "Sample Map", "primary")}
                >
                  Get Your Free Leakage Map
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <span className="text-xs text-white/50">No call required. 48-hour delivery.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4-page preview sections - light */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          {/* Section intro */}
          <div
            ref={previewRef}
            className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-[var(--duration-reveal)] ${
              previewInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              ALL 4 PAGES
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-4"
            >
              Every Leakage Map follows this format. Yours in 48 hours.
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Dollar-quantified findings. Benchmark comparisons. A prioritized fix queue. The only thing that changes is your data.
            </p>
          </div>

          {/* Preview cards */}
          <div className="max-w-4xl mx-auto space-y-24 md:space-y-28">
            {previewSections.map((section, i) => {
              const Icon = section.icon;
              return (
                <div
                  key={i}
                  style={{
                    opacity: previewInView ? 1 : 0,
                    transform: previewInView ? "translateY(0)" : "translateY(30px)",
                    transition: "all 0.7s ease",
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  {/* Section label */}
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          {section.label}
                        </p>
                        <h3
                          className="font-display text-xl sm:text-2xl text-foreground"
                        >
                          {section.title}
                        </h3>
                      </div>
                    </div>
                    <SampleBadge />
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                    {section.description}
                  </p>

                  {/* Paper-like preview card */}
                  {section.preview}

                  {/* Mid-page CTA after page 1 */}
                  {i === 0 && (
                    <div className="text-center mt-10">
                      <a href="/#early-adopter-section">
                        <Button
                          className="rounded-full px-8 py-4 h-auto text-base font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
                          onClick={() =>
                            trackCTAClick("Get Your Free Leakage Map", "Sample Map", "primary")
                          }
                        >
                          Get Your Free Leakage Map
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                      <p className="text-xs text-muted-foreground mt-3">
                        Send a CSV. Get pages 1-4 back in 48 hours. No call required.
      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What you are sending section - light callout */}
      <section className="py-16 md:py-20 bg-primary/5 border-y border-primary/10">
        <div className="container">
          <div
            ref={sendRef}
            className={`max-w-3xl mx-auto transition-all duration-[var(--duration-reveal)] ${
              sendInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2
              className="font-display text-2xl sm:text-3xl text-foreground mb-6 text-center"
            >
              What you send us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "A CSV export",
                  body: "Last 90 days of appointment data from Zenoti, Boulevard, or Mangomint. A 2-minute export. We have a Loom showing exactly which fields to include.",
                },
                {
                  step: "2",
                  title: "Nothing else",
                  body: "No API access. No integration. No login. Just the file. We handle everything from there.",
                },
                {
                  step: "3",
                  title: "You get this back",
                  body: "Your Leakage Map within 48 hours. The same format you see on this page, populated with your actual numbers.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/15 text-primary text-sm font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA - dark */}
      <section className="relative py-20 md:py-28 lg:py-36 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={40} />
        <div className="container relative z-10">
          <div
            ref={closingRef}
            className={`max-w-3xl mx-auto text-center transition-all duration-[var(--duration-reveal)] ${
              closingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-4"
            >
              Want yours?
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
              Send your CSV. Get the exact same format back in 48 hours, with your actual data. No commitment, no call required.
            </p>
            <div className="flex flex-col items-center gap-3">
              <a href="/#early-adopter-section">
                <Button
                  className="rounded-full px-10 py-6 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
                  onClick={() =>
                    trackCTAClick("Get Your Free Leakage Map", "Sample Map", "primary")
                  }
                >
                  Get Your Free Leakage Map
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
              <p className="text-xs text-white/40">
                If you want to talk through the numbers first, grab a 20-minute call below.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="ghost"
                  className="rounded-full px-6 py-4 h-auto text-sm font-medium text-white/60 hover:text-white hover:bg-white/10"
                  onClick={() =>
                    trackCTAClick("Schedule a 20-minute call", "Sample Audit", "secondary")
                  }
                >
                  Schedule a 20-minute call
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
