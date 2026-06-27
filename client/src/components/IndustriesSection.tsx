/**
 * Integration Section — "Works With Your Stack. Not Against It."
 * + Differentiation Section — "Not Another Booking Tool."
 * + Social Proof Section — "Built for Operators Who Run 3-25 Locations"
 */

import { useRevealAnimation } from "@/hooks/useRevealAnimation";
import { IsometricIcon } from "@/components/ui/isometric-icon";

export default function IndustriesSection() {
  const { ref, inView } = useRevealAnimation<HTMLElement>({ threshold: 0.1 });

  const integrations = [
    { name: "Zenoti", status: "Available" },
    { name: "Boulevard", status: "Available" },
    { name: "Mangomint", status: "Available" },
    { name: "Pabau", status: "Coming Soon" },
    { name: "Google Calendar", status: "Available" },
    { name: "Twilio", status: "Available" },
  ];

  const credibility = [
    "Built specifically for multi-location medspa operators on Zenoti, Boulevard, and Mangomint. No enterprise consultants. No integrations. No learning curve.",
    "Designed for multi-location operators managing $1M-$20M in annual revenue across 3-25 centers.",
    "Works with the booking systems 30,000+ med spas already use: Zenoti, Boulevard, Mangomint.",
  ];

  return (
    <>
      {/* Integration Section */}
      <section ref={ref} id="who-section" className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div
            className={`max-w-3xl mx-auto text-center mb-12 md:mb-16 transition-all duration-[var(--duration-reveal)] ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="section-label">INTEGRATIONS</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1] mb-6">
              Works with your stack. Not against it.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We work with your Zenoti, Boulevard, or Mangomint data. You share a CSV or drop an API key, and your data starts flowing. We read your data. We never change it.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            {integrations.map((item, i) => (
              <div
                key={i}
                className={`card-premium p-4 sm:p-5 text-center transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${100 + i * 80}ms` }}
              >
                <p className="font-display text-base sm:text-lg text-foreground mb-1">{item.name}</p>
                <p className={`text-xs font-semibold ${item.status === "Connected" ? "text-primary" : item.status === "Available" ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                  {item.status}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            Works across your booking systems, whatever the mix. Running Boulevard at 3 locations and Zenoti at 2? We see them all.
          </p>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="relative py-20 md:py-28 lg:py-36 section-dark overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1]">
                Not another booking tool.
              </h2>
            </div>
            <div className="space-y-6 text-base sm:text-lg text-white/70 leading-relaxed">
              <p>
                Your booking software shows you what happened. It tells you there were 47 appointments at SoHo last Tuesday and 3 no-shows.
              </p>
              <p>
                Etienne tells you <span className="text-white font-semibold">why it happened and what to do next</span>. Your no-show rate at SoHo is 60% higher on Tuesdays than on Fridays, driven by one provider whose patients cancel at 2x the practice average. Implementing a tiered deposit for that provider's Tuesday slots would recover an estimated $4,200/month.
              </p>
              <p className="text-primary font-semibold">
                That's the difference between data and intelligence.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Zenoti HyperConnect", desc: "Great at phone capture and SMS follow-up, but only if you're on Zenoti" },
                { label: "Eva AI", desc: "Voice-only, single-location focus" },
                { label: "Your CRM's reporting", desc: "Canned reports that show metrics without context. You still have to figure out what to do" },
                { label: "Etienne", desc: "Cross-location revenue patterns surfaced by a real analyst. We deliver the report. You don't learn a new tool.", highlight: true },
              ].map((item, i) => (
                <div key={i} className={`p-4 rounded-xl border ${item.highlight ? "border-primary/40 bg-primary/5" : "border-white/10 bg-white/5"}`}>
                  <p className={`text-sm font-semibold mb-1 ${item.highlight ? "text-primary" : "text-white/80"}`}>{item.label}</p>
                  <p className="text-xs text-white/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Credibility Section */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <p className="section-label">CREDIBILITY</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1]">
              Built for operators who run 3-25 locations
            </h2>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {credibility.map((text, i) => (
              <div key={i} className="card-premium p-6 sm:p-8">
                <IsometricIcon name="verified" className="w-12 h-12 mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Founder quote */}
          <div className="max-w-3xl mx-auto">
            <blockquote className="card-premium p-8 sm:p-10 text-center">
              <p className="font-display text-lg sm:text-xl md:text-2xl text-foreground leading-relaxed mb-4 italic">
                &ldquo;The average 5-location med spa is running with a 15 to 23% no-show rate and has no idea which provider, day, or location is driving it. Etienne is built to find that answer in days, not spreadsheets.&rdquo;
              </p>
              <footer className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Jim Stephen</span>, Founder
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}
