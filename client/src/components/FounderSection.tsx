/**
 * FounderSection — direct-address from Jim. The only real face on the site.
 *
 * Designed to work gracefully whether or not the headshot image exists at
 * /images/jim-stephen.png — if it fails to load, we show an initials
 * fallback tile so the section stays visually complete.
 *
 * Copy was drafted from Jim's own notes and tightened for a multi-location
 * operator audience: concrete credentials, specific wife-introduced origin
 * story, clear statement of why this market instead of another.
 */

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { trackCTAClick } from "@/lib/analytics";

export default function FounderSection() {
  const [inView, setInView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const photoWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle scroll-driven scale on the photo (Apple-style)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const section = sectionRef.current;
        const photo = photoWrapRef.current;
        if (!section || !photo) {
          ticking = false;
          return;
        }
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = 1 - rect.bottom / (vh + rect.height);
        // Scale from 0.96 → 1.02 across travel
        const scale = 0.96 + Math.max(0, Math.min(1, progress)) * 0.06;
        photo.style.transform = `scale(${scale})`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="founder-section"
      className="relative py-24 md:py-32 lg:py-40 section-gradient-alt overflow-hidden"
    >
      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">
          {/* Photo — 2 cols, left */}
          <div
            className={`lg:col-span-2 transition-all duration-1000 ease-out ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div
              ref={photoWrapRef}
              className="relative max-w-sm mx-auto lg:max-w-none"
              style={{ willChange: "transform", transition: "transform 60ms linear" }}
            >
              {/* Soft ambient glow behind photo */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] blur-2xl opacity-60"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(0, 212, 170, 0.25) 0%, transparent 70%)",
                }}
              />

              <div className="relative rounded-[2rem] overflow-hidden border border-border/60 bg-gradient-to-br from-white to-[#F5FDFB] shadow-xl shadow-black/5 aspect-[4/5]">
                {!imageFailed ? (
                  <img
                    src="/images/jim-stephen.png"
                    alt="Jim Stephen, Founder of Etienne Agency"
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageFailed(true)}
                    className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ) : (
                  <InitialsFallback />
                )}

                {/* Name plate */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/90 backdrop-blur-sm border border-border/60 px-4 py-3 flex items-baseline justify-between">
                  <div>
                    <p className="font-display text-lg text-foreground leading-none">Jim Stephen</p>
                    <p className="text-[11px] text-primary font-semibold uppercase tracking-wider mt-1">Founder &amp; CEO</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Etienne</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy — 3 cols, right */}
          <div
            className={`lg:col-span-3 transition-all duration-1000 ease-out delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <p className="section-label mb-5">A NOTE FROM THE FOUNDER</p>
            <Quote className="w-8 h-8 text-primary/30 mb-4" aria-hidden="true" />

            <h2 className="font-display text-2xl sm:text-3xl md:text-[2.1rem] text-foreground leading-[1.25] tracking-tight mb-8">
              You'll talk to Jim. Every time.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              <p>
                I spent eight years selling revenue intelligence to Fortune 500 operators. President's Club, multiple years. I started Etienne after my wife's medspa providers couldn't tell her which location was bleeding cash on a Tuesday. The booking software they paid for couldn't tell them either.
              </p>
              <p>
                Every audit, every report, every recovery plan goes through me personally. I run the model. I write the report. I take the call. When you hire Etienne, you hire me. Not an account manager, not a customer success team, not a dashboard.
              </p>
            </div>

            <div className="mt-10 flex flex-col items-start">
              <MagneticButton className="inline-block">
                <a
                  href="https://calendly.com/jim-etienneagency/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="rounded-full px-8 py-6 h-auto text-base font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
                    onClick={() => trackCTAClick("Book 20 minutes with Jim", "Founder Section", "primary")}
                  >
                    Book 20 minutes with Jim
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </MagneticButton>
              <span className="text-xs text-muted-foreground mt-3">
                (no slide deck, just your data)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Fallback tile shown if the headshot image is missing. Uses monogram + branded gradient. */
function InitialsFallback() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #0A0F1C 0%, #141929 50%, #00D4AA 160%)",
      }}
    >
      <div className="text-center">
        <p
          className="font-display text-white leading-none tracking-tighter"
          style={{ fontSize: "clamp(5rem, 22vw, 10rem)" }}
        >
          JS
        </p>
        <p className="text-[11px] uppercase tracking-widest text-white/60 mt-4">
          Photo coming soon
        </p>
      </div>
    </div>
  );
}
