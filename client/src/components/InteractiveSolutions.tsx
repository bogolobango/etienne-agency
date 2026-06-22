/**
 * InteractiveSolutions — three-step walkthrough of the Free Audit process.
 * Replaces the old EIP platform-feature tab explorer.
 *
 * Step 1: Export the CSV
 * Step 2: We analyze + benchmark
 * Step 3: Get the 4-page PDF
 */

import { Download, BarChart3, FileText, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";

interface Step {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
  description: string;
  timeframe: string;
}

const steps: Step[] = [
  {
    id: "export",
    icon: Download,
    label: "Step 1: Export the CSV",
    title: "Export the CSV in 5 minutes",
    description:
      "We send you a 2-minute Loom showing exactly where the export button is in your booking system. Zenoti, Boulevard, Mangomint, or Mindbody. You do not install anything. No API keys. No integration. Just a CSV.",
    timeframe: "5 minutes",
  },
  {
    id: "analyze",
    icon: BarChart3,
    label: "Step 2: We analyze + benchmark",
    title: "We run your numbers against industry benchmarks",
    description:
      "Within 48 hours we analyze your data against multi-location medspa benchmarks from AmSpa, Mindbody, and Zenoti. We find the leaks worth chasing: no-show rate gaps, utilization holes, rebooking rate drops. Every finding is dollar-quantified.",
    timeframe: "48 hours",
  },
  {
    id: "pdf",
    icon: FileText,
    label: "Step 3: Get the 4-page PDF",
    title: "You get a 4-page PDF report",
    description:
      "The report is yours to keep. It shows your revenue leaks ranked by size, what is driving each one, and a 60-day recovery roadmap. No dashboard to log into. No subscription to start. Just a document you can act on.",
    timeframe: "Delivered same day",
  },
];

export default function InteractiveSolutions() {
  return (
    <section id="solution-section" className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <p className="section-label">HOW THE FREE AUDIT WORKS</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.05] mb-6">
            Three steps. 48 hours. A PDF with your revenue leaks ranked by size.
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            No integration. No demo call to unlock it. No software to learn.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="export" className="w-full">
            <TabsList className="w-full h-auto grid grid-cols-1 sm:grid-cols-3 gap-2 bg-white/60 p-2 rounded-2xl border border-border/60">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <TabsTrigger
                    key={s.id}
                    value={s.id}
                    className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-semibold">{s.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="mt-8">
              {steps.map((s) => (
                <TabsContent key={s.id} value={s.id}>
                  <StepPanel step={s} />
                </TabsContent>
              ))}
            </div>
          </Tabs>

          <div className="mt-10 text-center">
            <Button
              asChild
              className="rounded-full px-8 py-4 text-base"
              onClick={() => trackCTAClick("Get Your Free Audit", "Interactive Solutions", "primary")}
            >
              <a href="#early-adopter-section">
                Get Your Free Audit
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepPanel({ step }: { step: Step }) {
  const Icon = step.icon;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
      <div className="lg:col-span-2">
        <h3 className="font-display text-2xl sm:text-3xl text-foreground leading-tight mb-4">
          {step.title}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {step.description}
        </p>
      </div>
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-border/60 bg-white shadow-sm overflow-hidden min-h-[320px] flex flex-col items-center justify-center p-10 text-center bg-gradient-to-br from-white to-[#F5FDFB]">
          <div className="icon-container-lg mb-5">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-3 font-semibold">
            Timeframe
          </p>
          <p className="font-display text-3xl sm:text-4xl text-foreground mb-4">
            {step.timeframe}
          </p>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            {step.id === "export" && "From sending you the Loom to us having your CSV in hand."}
            {step.id === "analyze" && "From receiving your CSV to delivering the completed PDF."}
            {step.id === "pdf" && "No recurring charge. No follow-up required to claim it."}
          </p>
        </div>
      </div>
    </div>
  );
}
