/**
 * Industries Page - Tango Editorial Design
 * Detailed breakdown of industries with editorial styling
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useCanonical } from "@/hooks/useCanonical";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Sparkles,
  Smile,
  Scale,
  Building2,
  Calculator,
  Sparkle,
  Trophy,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function Industries() {
  usePageView('Industries');
  useScrollTracking('Industries');
  useCanonical('/industries');

  const [inView, setInView] = useState(false);

  useEffect(() => {
    document.title = "AI for Your Industry | Med Spa · Dental · Law · Property | Etienne Agency";
    setInView(true);
  }, []);

  const industries = [
    {
      icon: Sparkles,
      name: "Med Spas & Aesthetic Clinics",
      problem: "A Botox client texts at 8pm. Your front desk closed at 6. By morning, she booked with your competitor.",
      stats: ["75% fewer no-shows with automated reminders", "46% of appointments booked online, 70% on mobile", "20% no-show rate costs the average med spa 14% of daily revenue"],
      solution: "Our AI receptionist responds to every inquiry instantly, books consultations with smart scheduling, and sends multi-channel reminders that keep your chairs full.",
      highlight: "$500+ per missed call",
    },
    {
      icon: Smile,
      name: "Dental Practices",
      problem: "New patient calls come in during procedures. Your front desk juggles check-ins, insurance, and the phone. Something gives — and it's the phone.",
      stats: ["New patient value: $350–$700 for first visit alone", "30–40% no-show reduction with automated reminder systems", "Manual scheduling has 10% error rate vs. under 1% with AI"],
      solution: "24/7 new patient intake, insurance verification triggers, and automated recall reminders. Your virtual receptionist keeps every hygiene chair full.",
      highlight: "$350 per no-show",
    },
    {
      icon: Scale,
      name: "Law Firms",
      problem: "Someone gets in an accident at 11pm. They call three firms. The first one to answer gets the case.",
      stats: ["30% more conversions with AI-assisted intake", "Response under 1 minute is critical for PI and immigration", "47% of immigration firms already use AI for intake"],
      solution: "After-hours intake that qualifies leads, captures case details, and routes urgent matters to your team — while protecting attorney-client confidentiality.",
      highlight: "First responder wins",
    },
    {
      icon: Building2,
      name: "Property Management",
      problem: "A prospective tenant inquires Saturday. Your leasing office is closed. They tour a competitor's unit Sunday and sign Monday.",
      stats: ["70% of rental inquiries can be handled by AI", "75% of leasing staff time saved on initial inquiry handling", "60% less vacancy time with instant response systems"],
      solution: "24/7 leasing inquiries, instant tour scheduling, and an automated follow-up system that fills vacancies faster than any front desk can.",
      highlight: "Hundreds per vacant day",
    },
    {
      icon: Calculator,
      name: "Accounting & CPA Firms",
      problem: "Tax season hits. Your phone rings nonstop. Your CPAs are buried in returns. New clients wait days for a callback.",
      stats: ["3x faster lead conversion with AI-driven intake", "Responding in under 1 minute doubles engagement", "Seasonal surges overwhelm traditional staffing every year"],
      solution: "Accounting firm scheduling that scales with demand. Instant inquiry response, consultation booking, and document collection — all automated.",
      highlight: "Tax season surge",
    },
    {
      icon: Sparkle,
      name: "Cleaning Companies",
      problem: "Someone searches 'house cleaning near me,' fills out three quote forms, and books with whoever responds first.",
      stats: ["67% of customers expect a response within 5 minutes", "30–40% of leads lost to slow response times", "$2,800 average customer lifetime value"],
      solution: "Instant quote responses, automated booking, and reminder sequences. Your AI receptionist turns first-time inquiries into repeat customers.",
      highlight: "$2,800 LTV",
    },
    {
      icon: Trophy,
      name: "Sports Facilities",
      problem: "Your front desk is buried in 'What time do you open?' calls. High-value corporate event inquiries go to voicemail.",
      stats: ["60% of routine inquiries handled automatically by AI", "15% no-show rate drains revenue from booked slots", "10,500+ hours/year spent answering repetitive FAQs"],
      solution: "24/7 booking across all channels. Smart scheduling handles routine requests. Intelligent escalation routes corporate inquiries to your team instantly.",
      highlight: "60% automation",
    }
  ];

  const idealFit = [
    { title: "3–25 locations", description: "Big enough to feel the pain of scaling. Nimble enough to move fast." },
    { title: "High-value appointments", description: "Each booking worth $100–$5,000+. Every missed call hurts." },
    { title: "High inquiry volume", description: "Enough leads that appointment scheduling automation creates real ROI." },
    { title: "Existing systems in place", description: "A CRM, scheduling tool, or booking platform our AI plugs into." }
  ];

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-gradient-hero overflow-hidden">
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
              AI appointment scheduling for industries where every{" "}
              <span className="highlight-coral">missed call has a dollar sign</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
              Our virtual receptionist handles calls, books appointments, and follows up — built for multi-location service businesses where slow responses cost real money.
            </p>
            {/* Industry photo collage strip */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { src: "/images/medspa.jpg", label: "Med Spa" },
                { src: "/images/dental.jpg", label: "Dental" },
                { src: "/images/law.jpg", label: "Law" },
                { src: "/images/property.jpg", label: "Property" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                    <img src={item.src} alt={item.label} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries Detail */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <div
                  key={index}
                  className="card-on-alt p-6 sm:p-8 md:p-10 transition-all duration-500"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.7s ease',
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="icon-container-xl flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl sm:text-3xl text-foreground mb-2">{industry.name}</h2>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-xs font-medium text-primary">{industry.highlight}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 font-sans">The Problem</p>
                      <p className="text-base text-muted-foreground leading-relaxed">{industry.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 font-sans">The Reality</p>
                      <ul className="space-y-2">
                        {industry.stats.map((stat, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{stat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2 font-sans">Our Solution</p>
                      <p className="text-base text-muted-foreground leading-relaxed">{industry.solution}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ideal Fit */}
      <section className="relative py-20 md:py-28 lg:py-36">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                Who the 24/7 Revenue Recovery Framework is{" "}
                <span className="highlight-green">best for</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">Multi-location service businesses that match these four criteria:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {idealFit.map((item, index) => (
                <div key={index} className="card-premium p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-4">Not sure if you're a fit?</h3>
              <p className="text-base text-muted-foreground mb-8 max-w-lg mx-auto">15-minute call. No commitment. We'll tell you if we can help — or point you somewhere better.</p>
              <Link href="/contact">
                <Button className="rounded-full px-8 py-6 h-auto text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/30 btn-primary-pill">
                  Book a Free Discovery Call
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
