/**
 * Product Preview Section — Dark background, EIP dashboard showcase
 * Replaces the old SocialProofSection with the product preview per spec.
 */

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import FloatingDustMotes from "@/components/FloatingDustMotes";

export default function SocialProofSection() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    const el = document.getElementById("product-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const features = [
    { title: "Command Center", description: "Every AI conversation across all channels, one inbox." },
    { title: "Revenue Intelligence", description: "See exactly how much revenue your AI recovered, by location." },
    { title: "AI Analyst", description: "Ask questions about your business in plain English. Get answers backed by your data." },
  ];

  return (
    <section id="product-section" className="relative py-20 md:py-28 lg:py-36 section-dark overflow-hidden">
      <FloatingDustMotes particleCount={40} />
      <div className="container relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center mb-12 md:mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label" style={{ color: "rgba(255,255,255,0.5)" }}>THE PLATFORM</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-6">
            The intelligence layer your booking system is missing
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
            EIP (Etienne Intelligence Platform) gives multi-location med spa owners
            a single view of recovered revenue, AI conversation performance,
            and operational intelligence across every location.
          </p>
        </div>

        {/* Product screenshot placeholder */}
        <div
          className={`max-w-4xl mx-auto mb-16 transition-all duration-700 delay-200 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-black/40">
            {/* Minimal browser chrome */}
            <div className="bg-[#1E2436] px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
                <div className="w-3 h-3 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white/5 rounded-md px-3 py-1 text-xs text-white/40 text-center">
                  app.etienneagency.com/dashboard
                </div>
              </div>
            </div>
            {/* Dashboard demo */}
            <div className="bg-[#0A0F1C]">
              <video
                src="/images/eip-dashboard.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>

        {/* Feature callouts */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
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
      </div>
    </section>
  );
}
