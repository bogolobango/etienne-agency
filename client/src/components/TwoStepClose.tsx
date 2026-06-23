/**
 * TwoStepClose — the home-page final CTA.
 *
 * Two-step micro-commitment:
 *   1. Visitor enters their email to get their free 4-page Revenue Recovery Audit.
 *   2. Success screen reveals the Calendly link + 5-step "what happens next" walkthrough.
 *
 * The walkthrough is scroll-revealed at the bottom either way.
 *
 * Uses CalculatorContext so the audit reflects whatever the visitor
 * entered in the hero calculator. If they never touched it, the report
 * uses industry-median defaults.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Mail, Calendar, Sparkles, FileText, Video } from "lucide-react";
import { useCalculator } from "@/context/CalculatorContext";
import { formatCurrencyCompact } from "@shared/leakage";
import FloatingDustMotes from "@/components/FloatingDustMotes";
import MagneticButton from "@/components/MagneticButton";
import { trackCTAClick, trackFormSubmit } from "@/lib/analytics";
import { CALENDLY_URL } from "@/const";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function TwoStepClose() {
  const { locations, apptsPerLocation, avgTicket, result } = useCalculator();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [stepsInView, setStepsInView] = useState(false);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStepsInView(true);
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading" || state === "success") return;

    const trimmed = email.trim();
    if (!trimmed || !/.+@.+\..+/.test(trimmed)) {
      setErrorMessage("Please enter a valid email address.");
      setState("error");
      return;
    }

    setState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/revenue-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "fetch",
        },
        body: JSON.stringify({
          email: trimmed,
          locations,
          apptsPerLocation,
          avgTicket,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Something went wrong." }));
        setErrorMessage(body.error || "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setState("success");
      trackFormSubmit("Revenue Audit Request", {
        locations: String(locations),
        appts_per_location: String(apptsPerLocation),
        avg_ticket: String(avgTicket),
      });
    } catch {
      setErrorMessage("Network error. Please try again.");
      setState("error");
    }
  }

  return (
    <section
      id="final-cta-section"
      className="relative py-24 md:py-32 lg:py-40 section-dark overflow-hidden"
    >
      <FloatingDustMotes particleCount={40} />
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="section-label mb-5" style={{ color: "rgba(94, 236, 200, 0.85)" }}>
            FREE REVENUE AUDIT
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 tracking-tight">
            {state === "success"
              ? "Audit on its way. Book 20 minutes with Jim."
              : "Get your 4-page Revenue Recovery Audit."}
          </h2>

          {state !== "success" && (
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
              Enter your email. We send a 2-minute Loom showing you how to export your booking data, you send it back, and we deliver a 4-page audit PDF in 48 hours. No sales call required.
            </p>
          )}

          {state === "success" ? (
            <SuccessPanel result={result} />
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto mb-10"
              noValidate
            >
              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="you@yourmedspa.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (state === "error") setState("idle");
                    }}
                    disabled={state === "loading"}
                    className="w-full pl-11 pr-4 py-4 rounded-full bg-white/[0.05] border border-white/15 text-white text-base placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors"
                    aria-label="Your email"
                    required
                  />
                </div>
                <MagneticButton className="w-full sm:w-auto">
                  <Button
                    type="submit"
                    disabled={state === "loading"}
                    className="w-full rounded-full px-8 py-4 h-auto text-base font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                    onClick={() => trackCTAClick("Get My Free Audit", "TwoStepClose", "primary")}
                  >
                    {state === "loading" ? (
                      <>Sending…</>
                    ) : (
                      <>
                        Get My Free Audit
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </MagneticButton>
              </div>
              {state === "error" && errorMessage && (
                <p className="mt-3 text-sm text-[#FCA5A5]">{errorMessage}</p>
              )}
              <p className="mt-4 text-xs text-white/40 text-center">
                We'll email you the Loom from{" "}
                <span className="text-white/60">jim@etienneagency.com</span>.
                No spam. No list. One email.
              </p>
            </form>
          )}

          {/* 5-step walkthrough — scroll-revealed either way */}
          <div ref={stepsRef} className="pt-10 border-t border-white/10">
            <p className="text-[11px] uppercase tracking-widest text-white/40 mb-8">
              What happens next
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left max-w-5xl mx-auto">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={i}
                    className={`transition-all duration-[var(--duration-reveal)] ease-out ${
                      stepsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-lg text-white leading-snug mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    icon: Mail,
    title: "Submit your email",
    description:
      "Enter your work email above. That's the only thing we ask right now.",
  },
  {
    icon: Video,
    title: "We send a 2-min Loom",
    description:
      "A short screen recording showing exactly how to export your booking data CSV from your software.",
  },
  {
    icon: FileText,
    title: "You email back the CSV",
    description:
      "One file, one reply. Takes about 2 minutes on your end.",
  },
  {
    icon: Sparkles,
    title: "Audit PDF in 48 hours",
    description:
      "A 4-page Revenue Recovery Audit lands in your inbox. Real numbers, real gaps, real recommendations.",
  },
  {
    icon: Calendar,
    title: "Optional: book 20 min with Jim",
    description:
      "Walk through the audit live. Jim himself, no BDR, no pitch deck. You decide what to do next.",
  },
];

function SuccessPanel({ result }: { result: ReturnType<typeof useCalculator>["result"] }) {
  return (
    <div className="max-w-xl mx-auto mb-10">
      <div className="rounded-2xl border border-primary/30 bg-primary/[0.04] p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 border border-primary/30 mb-4 mx-auto">
          <CheckCircle2 className="w-6 h-6 text-primary" />
        </div>
        <p className="text-base sm:text-lg text-white/90 mb-2">
          Loom on its way.
        </p>
        <p className="text-sm text-white/60">
          Check your inbox. We'll send a 2-minute Loom showing how to export your CSV. Reply with the file and your 4-page audit arrives within 48 hours.
        </p>
        {result.recoveryAnnual.expected > 0 && (
          <div className="mt-5 pt-5 border-t border-white/10 text-center">
            <p className="text-[11px] uppercase tracking-wider text-white/40 mb-1">Your estimated recovery</p>
            <p className="font-display text-2xl text-primary">
              {formatCurrencyCompact(result.recoveryAnnual.low)} to {formatCurrencyCompact(result.recoveryAnnual.high)}
              <span className="text-base text-white/60 ml-2">/year</span>
            </p>
          </div>
        )}
      </div>

      <MagneticButton className="inline-block">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            className="rounded-full px-8 py-6 h-auto text-base font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
            onClick={() => trackCTAClick("Book 20 minutes with Jim", "TwoStepClose", "primary")}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Book 20 minutes with Jim
          </Button>
        </a>
      </MagneticButton>
    </div>
  );
}
