/**
 * For Multi-Location Med Spas — ICP-specific landing page
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import FloatingDustMotes from "@/components/FloatingDustMotes";

export default function Industries() {
  usePageView("Med Spas");
  useScrollTracking("Med Spas");
  useSEO("/med-spas");

  const [inView, setInView] = useState(false);
  useEffect(() => { setInView(true); }, []);

  const problems = [
    {
      title: "The Multi-Location Visibility Gap",
      problem: "Your booking platform shows you one location at a time. You toggle between centers, export CSVs, and paste into spreadsheets. By the time you've compared performance across all 5 locations, the data is a week old, and you've burned half a Sunday.",
      solution: "One dashboard, all centers, real-time. Compare any metric across any location instantly. Ask the AI Analyst, \"Which center is underperforming?\" and get a ranked table with dollar impact in 30 seconds.",
    },
    {
      title: "Revenue Leaking Between the Cracks",
      problem: "Missed calls during the lunch rush. Web inquiries that sat for 6 hours. A $2,400 injectable package lead who called twice, got voicemail both times, and booked with the med spa down the street. Your booking system logged the appointment that DID happen. It has no idea about the three that didn't.",
      solution: "Every inbound inquiry — phone, text, web, or social — is captured, responded to, and tracked. See the full AI conversation that converted an 11 pm inquiry into a morning booking. See exactly which leads slipped through and what they were worth.",
    },
    {
      title: "No-Shows Eating Your Revenue",
      problem: "A 5-location med spa with a 15% no-show rate and an average ticket of $450 is losing $40,000/month to empty chairs. But your booking platform shows you the no-show rate as a number — it doesn't tell you that 60% of your no-shows happen on Tuesdays, that one provider accounts for 35% of them, or that a simple tiered deposit policy would cut the rate in half.",
      solution: "Pattern analysis that identifies why no-shows happen, which segments are highest risk, and specific interventions with estimated dollar impact.",
    },
    {
      title: "PE Reporting and Multi-Location Ops",
      problem: "If you're PE-backed or managing for an investor group, you need consolidated performance data across every center. Revenue per square foot, provider utilization, new client acquisition cost, and lifetime value by center. Getting this from your booking platform means a weekly spreadsheet exercise.",
      solution: "Investor-grade analytics and on-demand reporting. Ask the AI Analyst for any metric across any combination of centers and get a formatted response in seconds.",
    },
  ];

  const isFor = [
    "Med spa groups running 3\u201325 locations on Zenoti, Boulevard, or Mangomint",
    "Owners, COOs, and Operations Directors who want intelligence, not more dashboards",
    "PE-backed aesthetics practices that need consolidated cross-center reporting",
    "Regional chains growing through acquisition that need to compare performance across newly integrated locations",
  ];

  const isNotFor = [
    "Single-location practices (you don't need cross-center intelligence yet)",
    "Businesses looking to replace their booking system (we sit on top, not instead of)",
    "Anyone who thinks their missed call problem is solved (it's not \u2014 but that's just the start)",
  ];

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero — dark */}
      <section className="relative pt-24 pb-12 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={50} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" aria-hidden="true"
          style={{ background: "radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)", transform: "translate(20%,-20%)" }}
        />
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              Built for Med Spa Operators Running 3&ndash;25 Locations.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">
              You didn't build a multi-location practice to spend Sundays pulling reports. EIP gives you cross-center intelligence that your booking system is not designed to provide.
            </p>
            <Link href="/calculator">
              <Button className="rounded-full px-8 py-6 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill">
                Get Your Free Revenue Audit <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problems We Solve */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <p className="section-label">THE PROBLEMS WE SOLVE</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
            {problems.map((item, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="font-display text-2xl md:text-3xl text-foreground mb-6">{item.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card-on-alt p-6 sm:p-8 border-l-4 border-l-[#FF6B6B]">
                    <p className="text-xs font-semibold text-[#FF6B6B] uppercase tracking-wider mb-3">The Problem</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.problem}</p>
                  </div>
                  <div className="card-on-alt p-6 sm:p-8 border-l-4 border-l-primary">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">EIP Gives You</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For / Not For */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <p className="section-label">IDEAL CLIENT</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[1.1]">
                Who this is for
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-premium p-6 sm:p-8">
                <h3 className="font-display text-xl text-foreground mb-4">EIP is built for:</h3>
                <ul className="space-y-3">
                  {isFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-premium p-6 sm:p-8">
                <h3 className="font-display text-xl text-foreground mb-4">EIP is NOT for:</h3>
                <ul className="space-y-3">
                  {isNotFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-[#FF6B6B] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="relative py-20 md:py-28 lg:py-36 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={40} />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white leading-[1.1] mb-6">
              How much revenue are your locations missing?
            </h2>
            <p className="text-base sm:text-lg text-white/70 mb-10">
              We'll connect to your booking data, run a 7-day analysis, and show you exactly where the gaps are. If there aren't any, we'll tell you that too.
            </p>
            <Link href="/calculator">
              <Button className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill">
                Get Your Free Revenue Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
