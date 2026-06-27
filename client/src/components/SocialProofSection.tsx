/**
 * Sample Audit Section — Dark background, static PDF preview mockup.
 * Shows what the first page of the 4-page audit report looks like.
 * Replaces the old interactive PlaygroundDashboard / EIP showcase.
 */

import { TrendingDown, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import FloatingDustMotes from "@/components/FloatingDustMotes";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { IsometricIcon } from "@/components/ui/isometric-icon";

export default function SocialProofSection() {
  const { ref, inView } = useRevealAnimation<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={ref} id="product-section" className="relative py-20 md:py-28 lg:py-36 section-dark overflow-hidden">
      <FloatingDustMotes particleCount={40} />
      <div className="container relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-12 md:mb-16 transition-all duration-[var(--duration-reveal)] ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>SAMPLE AUDIT</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-6">
            Here is what the report looks like
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            A 4-page PDF. Dollar-quantified leaks ranked by size. A 60-day recovery roadmap.
            Yours to keep after a 5-minute CSV export.
          </p>
        </div>

        {/* PDF mockup */}
        <div
          className={`max-w-3xl mx-auto mb-12 transition-all duration-[var(--duration-reveal)] delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <AuditPDFPreview />
        </div>

        {/* Feature callouts */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { title: "No integration required", description: "A CSV export from your booking system is all we need. Nothing to install. No API access." },
            { title: "Benchmarked against real data", description: "We compare your numbers to AmSpa, Mindbody, and Zenoti industry benchmarks for your market segment." },
            { title: "Done for you", description: "You export the file. We do the analysis. You get a PDF with ranked, dollar-quantified findings." },
          ].map((f, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${400 + i * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                  <p className="text-sm text-white/60">{f.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`text-center transition-all duration-[var(--duration-reveal)] delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button
            asChild
            className="rounded-full px-8 py-4 text-base"
            onClick={() => trackCTAClick("Get Your Free Audit", "Sample Audit", "primary")}
          >
            <a href="#early-adopter-section">
              Get Your Free Audit
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Static mockup of Page 1 of the 4-page audit PDF */
function AuditPDFPreview() {
  const findings = [
    { rank: 1, label: "No-show rate at Williamsburg", impact: "$34K/mo", severity: "high", note: "28% vs. 14% group benchmark. Deposit policy gap." },
    { rank: 2, label: "Utilization below 60% on 3 locations", impact: "$21K/mo", severity: "high", note: "Tribeca, White Plains, and Midtown running under threshold." },
    { rank: 3, label: "Rebooking rate below 50%", impact: "$12K/mo", severity: "medium", note: "Industry leaders hit 65-70%. Post-visit follow-up gap." },
    { rank: 4, label: "Provider schedule gaps on Tuesdays", impact: "$7K/mo", severity: "medium", note: "Alex T. under 40% utilization for 3 consecutive weeks." },
  ];

  return (
    /* bg-white: intentional paper-document feel; departs from bg-background (#FAFBFD) by design */
    <div className="relative rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/60 overflow-hidden">
      {/* Document header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-border">
        <div className="flex items-center gap-3">
          <IsometricIcon name="report" className="w-9 h-9" />
          <div>
            <p className="text-xs font-semibold text-foreground">Revenue Leak Audit</p>
            <p className="text-[10px] text-muted-foreground">Confidential - Prepared by Etienne Agency</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground">Page 1 of 4</p>
          <p className="text-[10px] text-muted-foreground/60">Illustrative sample</p>
        </div>
      </div>

      {/* Hero number */}
      <div className="px-6 pt-6 pb-4 bg-white border-b border-border">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
          Total recoverable revenue identified
        </p>
        <div className="flex items-baseline gap-3">
          <p className="font-display text-5xl text-foreground leading-none">$74K</p>
          <p className="text-sm text-muted-foreground">per month across 5 locations</p>
        </div>
        <p className="text-xs text-muted-foreground/60 mt-2">
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
            <div key={f.rank} className="flex items-start gap-4 p-3 rounded-lg border border-border bg-white">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                /* high = destructive severity; medium = amber (no warning token in design system) */
                f.severity === "high" ? "bg-destructive/10 text-destructive" : "bg-amber-100 text-amber-600"
              }`}>
                {f.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className="text-xs font-semibold text-foreground leading-snug">{f.label}</p>
                  <p className={`text-xs font-bold flex-shrink-0 ${
                    f.severity === "high" ? "text-destructive" : "text-amber-600"
                  }`}>{f.impact}</p>
                </div>
                <p className="text-[10px] text-muted-foreground leading-snug">{f.note}</p>
              </div>
              <div className="flex-shrink-0">
                {f.severity === "high" ? (
                  <AlertCircle className="w-3.5 h-3.5 text-destructive" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground/60 mt-4 italic">
          Pages 2-4 include root-cause analysis per finding, benchmark comparisons, and a 60-day recovery roadmap.
        </p>
      </div>

      {/* Watermark overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center rotate-[-20deg] opacity-[0.04]">
        <p className="font-display text-7xl font-black text-foreground tracking-tight select-none">SAMPLE</p>
      </div>
    </div>
  );
}
