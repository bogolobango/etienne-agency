/**
 * Hero Component — Revenue Intelligence positioning, dark background
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { trackCTAClick } from "@/lib/analytics";
import FloatingDustMotes from "@/components/FloatingDustMotes";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 overflow-hidden section-dark">
      <FloatingDustMotes particleCount={60} />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(0, 212, 170, 0.06) 0%, transparent 70%)",
          transform: "translate(20%, -20%)",
        }}
      />
      <div className="container relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
            Your Locations Are Leaking Revenue.{" "}
            <span className="text-primary">EIP Shows You Exactly Where.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">
            The Etienne Intelligence Platform connects to your booking system, Zenoti, Boulevard, or Mangomint, and surfaces the revenue gaps hiding across your locations. We don't replace any software you're using. We provide answers they're not focused on sharing.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10">
            <Link href="/contact">
              <Button
                className="rounded-full px-8 py-6 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill"
                onClick={() => trackCTAClick('Get Your Free Revenue Audit', 'Hero Section', 'primary')}
              >
                Get Your Free Revenue Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 h-auto text-base border-2 border-white/20 text-white hover:bg-white/10 transition-all duration-200 bg-transparent"
                onClick={() => trackCTAClick('See the Platform', 'Hero Section', 'secondary')}
              >
                See the Platform
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-white/50">
            <span>Revenue intelligence for multi-location med spas</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>Works with Zenoti, Boulevard &amp; Mangomint</span>
          </div>
        </div>
      </div>
    </section>
  );
}
