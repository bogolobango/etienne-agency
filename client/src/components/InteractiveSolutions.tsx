/**
 * InteractiveSolutions — the three EIP modules presented as an
 * interactive tabbed explorer instead of three static cards.
 *
 * The "AI Revenue Analyst" tab has an example prompt that is GATED
 * behind a "Show example" button (explicit consent to see illustrative
 * output — keeps us honest about the fact that it's a demo, not a live
 * customer query).
 */

import { useState } from "react";
import { Brain, BarChart3, CalendarDays, Sparkles, ArrowRight, Play } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface Module {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
  description: string;
}

const modules: Module[] = [
  {
    id: "analyst",
    icon: Brain,
    label: "AI Revenue Analyst",
    title: "Ask your business questions in plain English",
    description:
      'Natural-language access to everything sitting inside your booking system. "Why did revenue drop at SoHo this month?" "Which provider has the worst rebooking rate?" "Compare no-show rates across all locations." Real analysis backed by your actual data — not a canned report.',
  },
  {
    id: "benchmarking",
    icon: BarChart3,
    label: "Cross-Location Benchmarking",
    title: "Every metric, every location, one screen",
    description:
      "No-show rate, utilization, rebooking, revenue per visit — EIP compares them across all your locations simultaneously. Know which center is your strongest and which is dragging the average down, with dollar impact attached to every gap.",
  },
  {
    id: "scheduling",
    icon: CalendarDays,
    label: "Smart Scheduling Intelligence",
    title: "See the empty rooms before they stay empty",
    description:
      "Utilization rates by room, by provider, by center. Spot the treatment room that's been empty every Tuesday afternoon for three months. Get alerts when a provider's schedule is 40% unfilled next week. Scheduling goes from reactive to predictive.",
  },
];

export default function InteractiveSolutions() {
  return (
    <section id="solution-section" className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <p className="section-label">THE INTELLIGENCE LAYER</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.05] mb-6">
            Three modules that live on top of your booking system.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            EIP doesn't replace Zenoti, Boulevard, or Mangomint. It turns the data they're already collecting into answers.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="analyst" className="w-full">
            <TabsList className="w-full h-auto grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white/60 p-2 rounded-2xl border border-border/60">
              {modules.map((m) => {
                const Icon = m.icon;
                return (
                  <TabsTrigger
                    key={m.id}
                    value={m.id}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-semibold">{m.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="mt-8">
              <TabsContent value="analyst">
                <ModulePanel module={modules[0]}>
                  <AIAnalystDemo />
                </ModulePanel>
              </TabsContent>
              <TabsContent value="benchmarking">
                <ModulePanel module={modules[1]}>
                  <BenchmarkingDemo />
                </ModulePanel>
              </TabsContent>
              <TabsContent value="scheduling">
                <ModulePanel module={modules[2]}>
                  <SchedulingDemo />
                </ModulePanel>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

function ModulePanel({ module, children }: { module: Module; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
      <div className="lg:col-span-2">
        <h3 className="font-display text-2xl sm:text-3xl text-foreground leading-tight mb-4">
          {module.title}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {module.description}
        </p>
      </div>
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-border/60 bg-white shadow-sm overflow-hidden min-h-[320px]">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── AI Analyst demo (gated) ──────────────────────────────────── */

const EXAMPLE_PROMPT = "Why is SoHo revenue down 14% this month?";
const EXAMPLE_LINES = [
  "Cross-referencing SoHo vs. group average for Feb 1 – Feb 28…",
  "Utilization at SoHo: 58% (group avg: 68%) — 10pts below baseline.",
  "Primary driver: provider Sarah K. left Feb 8. Her book was 82% of SoHo's weekday afternoons.",
  "Secondary driver: no-show rate rose from 17% → 24% in the same window — clients who booked with Sarah didn't rebook with replacements.",
  "Revenue impact: ~$34K in Feb. Recommended action: prioritize replacing Sarah's weekday-afternoon slots; audit rebooking flow for Sarah's former clients.",
];

function AIAnalystDemo() {
  const [revealed, setRevealed] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);

  function startDemo() {
    setRevealed(true);
    setLineIndex(0);
    EXAMPLE_LINES.forEach((_, i) => {
      setTimeout(() => setLineIndex(i + 1), 600 + i * 750);
    });
  }

  if (!revealed) {
    return (
      <div className="h-full min-h-[320px] p-10 flex flex-col items-center justify-center text-center bg-gradient-to-br from-white to-[#F5FDFB]">
        <div className="icon-container-lg mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Example prompt</p>
        <p className="text-lg font-display text-foreground mb-6 max-w-md">
          "{EXAMPLE_PROMPT}"
        </p>
        <Button
          onClick={startDemo}
          variant="outline"
          className="rounded-full border-primary/40 text-primary hover:bg-primary/5"
        >
          <Play className="w-3.5 h-3.5 mr-2" />
          See the example response
        </Button>
        <p className="text-[11px] text-muted-foreground/70 mt-4 max-w-sm">
          Illustrative output. Real responses use your actual data.
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-6 bg-[#0A0F1C] h-full min-h-[320px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
        </div>
        <span className="ml-3 text-[11px] font-mono text-white/40">eip · analyst</span>
        <span className="ml-auto text-[10px] uppercase tracking-widest text-white/30">Illustrative</span>
      </div>
      <div className="font-mono text-[13px] leading-relaxed flex-1">
        <p className="text-primary mb-3">
          <span className="text-white/40">›</span> {EXAMPLE_PROMPT}
        </p>
        <div className="space-y-2">
          {EXAMPLE_LINES.slice(0, lineIndex).map((line, i) => (
            <p
              key={i}
              className={i === EXAMPLE_LINES.length - 1 ? "text-primary/90" : "text-white/75"}
              style={{
                animation: "eip-fade-in 380ms ease-out forwards",
              }}
            >
              {line}
            </p>
          ))}
          {lineIndex < EXAMPLE_LINES.length && (
            <span className="inline-block w-2 h-4 bg-primary/70 animate-pulse align-middle" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Benchmarking demo (static visual) ────────────────────────── */

function BenchmarkingDemo() {
  const rows = [
    { name: "Williamsburg", noShow: 28, util: 54, rebook: 41, flag: "bad" },
    { name: "White Plains", noShow: 19, util: 64, rebook: 52, flag: "avg" },
    { name: "SoHo", noShow: 12, util: 78, rebook: 67, flag: "good" },
    { name: "Midtown", noShow: 17, util: 66, rebook: 55, flag: "avg" },
    { name: "Tribeca", noShow: 25, util: 58, rebook: 46, flag: "bad" },
  ];
  const flagColor = (f: string) =>
    f === "bad" ? "text-[#FF6B6B]" : f === "good" ? "text-primary" : "text-foreground/60";
  const barColor = (f: string) =>
    f === "bad" ? "bg-[#FF6B6B]" : f === "good" ? "bg-primary" : "bg-muted-foreground/40";

  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          Cross-location comparison
        </p>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">Illustrative</span>
      </div>
      <div className="space-y-2.5">
        {rows.map((row) => (
          <div key={row.name} className="grid grid-cols-12 items-center gap-3 text-xs">
            <span className={`col-span-3 font-medium ${flagColor(row.flag)}`}>{row.name}</span>
            <div className="col-span-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                <div className={`h-full ${barColor(row.flag)}`} style={{ width: `${row.noShow * 2.5}%` }} />
              </div>
              <span className="text-muted-foreground w-8 text-right">{row.noShow}%</span>
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                <div className={`h-full ${barColor(row.flag)}`} style={{ width: `${row.util}%` }} />
              </div>
              <span className="text-muted-foreground w-8 text-right">{row.util}%</span>
            </div>
            <div className="col-span-3 flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                <div className={`h-full ${barColor(row.flag)}`} style={{ width: `${row.rebook}%` }} />
              </div>
              <span className="text-muted-foreground w-8 text-right">{row.rebook}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-3 mt-4 pt-3 border-t border-border/60 text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">
        <span className="col-span-3">Location</span>
        <span className="col-span-3">No-show</span>
        <span className="col-span-3">Utilization</span>
        <span className="col-span-3">Rebooking</span>
      </div>
      <div className="mt-5 pt-4 border-t border-border/60 flex items-start gap-2.5">
        <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-foreground/80">
          <span className="font-semibold">Williamsburg</span> and{" "}
          <span className="font-semibold">Tribeca</span> are your two worst performers on all three metrics. Estimated monthly impact:{" "}
          <span className="text-primary font-semibold">$34K</span>.
        </p>
      </div>
    </div>
  );
}

/* ─── Scheduling demo (gantt-style heatmap) ────────────────────── */

function SchedulingDemo() {
  const providers = ["Dr. M", "Dr. K", "Sarah L", "Alex T", "Nina R"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Utilization per provider per day (0-1)
  const data: number[][] = [
    [0.92, 0.85, 0.88, 0.91, 0.83, 0.76],
    [0.78, 0.62, 0.55, 0.71, 0.68, 0.82],
    [0.84, 0.91, 0.87, 0.45, 0.52, 0.74],
    [0.45, 0.38, 0.42, 0.51, 0.48, 0.55],
    [0.88, 0.82, 0.79, 0.85, 0.80, 0.71],
  ];
  const color = (v: number) => {
    if (v > 0.8) return "bg-primary";
    if (v > 0.6) return "bg-primary/50";
    if (v > 0.4) return "bg-[#FFB547]/60";
    return "bg-[#FF6B6B]/60";
  };

  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          Next-week provider utilization
        </p>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60">Illustrative</span>
      </div>
      <div className="space-y-1.5">
        <div className="grid grid-cols-[60px_repeat(6,1fr)] gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1">
          <span />
          {days.map((d) => (
            <span key={d} className="text-center">{d}</span>
          ))}
        </div>
        {providers.map((p, rowIdx) => (
          <div key={p} className="grid grid-cols-[60px_repeat(6,1fr)] gap-1.5 items-center">
            <span className="text-xs text-foreground/80 font-medium">{p}</span>
            {data[rowIdx].map((v, colIdx) => (
              <div
                key={colIdx}
                className={`h-6 rounded ${color(v)} transition-all duration-200 hover:scale-105`}
                title={`${Math.round(v * 100)}% utilized`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-border/60 flex items-start gap-2.5">
        <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-foreground/80">
          <span className="font-semibold">Alex T</span> has 3 days next week below 50%. Opening 6 afternoon slots could capture{" "}
          <span className="text-primary font-semibold">~$7.2K</span> in new appointments.
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-muted-foreground/70">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-primary" />&gt;80%</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-primary/50" />60–80%</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-[#FFB547]/60" />40–60%</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded bg-[#FF6B6B]/60" />&lt;40%</span>
      </div>
    </div>
  );
}
