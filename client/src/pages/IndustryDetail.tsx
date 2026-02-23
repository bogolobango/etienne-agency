/**
 * Industry Detail Page - Tango Editorial Design
 * Template component for industry-specific landing pages.
 * Reads :slug from URL and renders customized content from a data map.
 */

import { useEffect, useState } from "react";
import { useParams, Link, Redirect } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useCanonical } from "@/hooks/useCanonical";

interface IndustryPageData {
  name: string;
  title: string;
  metaDescription: string;
  heroH1Prefix: string;
  heroH1Highlight: string;
  heroSub: string;
  problem: string;
  stats: string[];
  solution: string;
  image: string;
}

const industryData: Record<string, IndustryPageData> = {
  medspa: {
    name: "Med Spas & Aesthetic Clinics",
    title: "AI Scheduling for Med Spas | Reduce No-Shows 75% | Etienne Agency",
    metaDescription: "Med spas lose $500+ per missed call. The 24/7 Revenue Recovery Framework responds to every inquiry instantly, books consultations, and cuts no-shows by 75%. See how in 15 minutes.",
    heroH1Prefix: "Stop losing",
    heroH1Highlight: "$500+ per missed Botox call",
    heroSub: "Your clients text at 8pm. Your front desk closed at 6. By morning, they've booked with your competitor. We fix that with AI that responds instantly, 24/7.",
    problem: "A Botox client texts at 8pm. Your front desk closed at 6. By morning, she booked with your competitor.",
    stats: ["75% fewer no-shows with automated reminders", "46% of appointments booked online, 70% on mobile", "20% no-show rate costs the average med spa 14% of daily revenue"],
    solution: "Our AI receptionist responds to every inquiry instantly, books consultations with smart scheduling, and sends multi-channel reminders that keep your chairs full.",
    image: "/images/medspa.jpg",
  },
  dental: {
    name: "Dental Practices",
    title: "AI Scheduling for Dental Practices | Reduce No-Shows 40% | Etienne Agency",
    metaDescription: "New patient calls come in during procedures. Your front desk can't keep up. The 24/7 Revenue Recovery Framework automates intake, booking, and reminders in 4 weeks.",
    heroH1Prefix: "Stop losing",
    heroH1Highlight: "$350 per dental no-show",
    heroSub: "New patient calls come in during procedures. Your front desk juggles check-ins, insurance, and the phone. Something gives — and it's the phone.",
    problem: "New patient calls come in during procedures. Your front desk juggles check-ins, insurance, and the phone. Something gives — and it's the phone.",
    stats: ["New patient value: $350–$700 for first visit alone", "30–40% no-show reduction with automated reminder systems", "Manual scheduling has 10% error rate vs. under 1% with AI"],
    solution: "24/7 new patient intake, insurance verification triggers, and automated recall reminders. Your virtual receptionist keeps every hygiene chair full.",
    image: "/images/dental.jpg",
  },
  law: {
    name: "Law Firms",
    title: "AI Intake for Law Firms | Never Miss a Case Again | Etienne Agency",
    metaDescription: "Someone gets in an accident at 11pm and calls three firms. The first to answer gets the case. Our AI intake system responds in under 60 seconds, 24/7.",
    heroH1Prefix: "The first firm to answer",
    heroH1Highlight: "wins the case",
    heroSub: "Someone gets in an accident at 11pm. They call three firms. The first one to answer gets the case. Make sure that's you.",
    problem: "Someone gets in an accident at 11pm. They call three firms. The first one to answer gets the case.",
    stats: ["30% more conversions with AI-assisted intake", "Response under 1 minute is critical for PI and immigration", "47% of immigration firms already use AI for intake"],
    solution: "After-hours intake that qualifies leads, captures case details, and routes urgent matters to your team — while protecting attorney-client confidentiality.",
    image: "/images/law.jpg",
  },
  property: {
    name: "Property Management",
    title: "AI Leasing Assistant for Property Management | Fill Vacancies 60% Faster | Etienne Agency",
    metaDescription: "A prospective tenant inquires Saturday. Your leasing office is closed. They tour a competitor's unit Sunday and sign Monday. Our AI responds 24/7 and books tours instantly.",
    heroH1Prefix: "Stop losing tenants to",
    heroH1Highlight: "weekend silence",
    heroSub: "A prospective tenant inquires Saturday. Your leasing office is closed. They tour a competitor's unit Sunday and sign Monday. We make sure that doesn't happen.",
    problem: "A prospective tenant inquires Saturday. Your leasing office is closed. They tour a competitor's unit Sunday and sign Monday.",
    stats: ["70% of rental inquiries can be handled by AI", "75% of leasing staff time saved on initial inquiry handling", "60% less vacancy time with instant response systems"],
    solution: "24/7 leasing inquiries, instant tour scheduling, and an automated follow-up system that fills vacancies faster than any front desk can.",
    image: "/images/property.jpg",
  },
  accounting: {
    name: "Accounting & CPA Firms",
    title: "AI Scheduling for Accounting Firms | Scale Through Tax Season | Etienne Agency",
    metaDescription: "Tax season hits. Your phone rings nonstop. New clients wait days for a callback. Our AI handles intake and scheduling 24/7 so your CPAs can focus on returns.",
    heroH1Prefix: "Stop drowning in calls during",
    heroH1Highlight: "tax season",
    heroSub: "Tax season hits. Your phone rings nonstop. Your CPAs are buried in returns. New clients wait days for a callback. We fix that.",
    problem: "Tax season hits. Your phone rings nonstop. Your CPAs are buried in returns. New clients wait days for a callback.",
    stats: ["3x faster lead conversion with AI-driven intake", "Responding in under 1 minute doubles engagement", "Seasonal surges overwhelm traditional staffing every year"],
    solution: "Accounting firm scheduling that scales with demand. Instant inquiry response, consultation booking, and document collection — all automated.",
    image: "/images/accounting.jpg",
  },
  cleaning: {
    name: "Cleaning Companies",
    title: "AI Booking for Cleaning Companies | Respond First, Win the Job | Etienne Agency",
    metaDescription: "67% of customers expect a response within 5 minutes. With an average $2,800 lifetime value per customer, every slow response costs you thousands. Our AI responds instantly.",
    heroH1Prefix: "Respond first and",
    heroH1Highlight: "win the $2,800 customer",
    heroSub: "Someone searches 'house cleaning near me,' fills out three quote forms, and books with whoever responds first. Make sure that's you.",
    problem: "Someone searches 'house cleaning near me,' fills out three quote forms, and books with whoever responds first.",
    stats: ["67% of customers expect a response within 5 minutes", "30–40% of leads lost to slow response times", "$2,800 average customer lifetime value"],
    solution: "Instant quote responses, automated booking, and reminder sequences. Your AI receptionist turns first-time inquiries into repeat customers.",
    image: "/images/cleaning.jpg",
  },
  sports: {
    name: "Sports Facilities",
    title: "AI Receptionist for Sports Facilities | Automate 60% of Inquiries | Etienne Agency",
    metaDescription: "Your front desk is buried in 'What time do you open?' calls. High-value corporate event inquiries go to voicemail. Our AI handles routine questions and routes the big deals to your team.",
    heroH1Prefix: "Stop burying",
    heroH1Highlight: "corporate deals under FAQ calls",
    heroSub: "Your front desk is buried in 'What time do you open?' calls. High-value corporate event inquiries go to voicemail. We fix that.",
    problem: "Your front desk is buried in 'What time do you open?' calls. High-value corporate event inquiries go to voicemail.",
    stats: ["60% of routine inquiries handled automatically by AI", "15% no-show rate drains revenue from booked slots", "10,500+ hours/year spent answering repetitive FAQs"],
    solution: "24/7 booking across all channels. Smart scheduling handles routine requests. Intelligent escalation routes corporate inquiries to your team instantly.",
    image: "/images/sports.jpg",
  },
};

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? industryData[slug] : undefined;

  usePageView(industry ? `Industry - ${industry.name}` : "Industry - Unknown");
  useScrollTracking(industry ? `Industry - ${industry.name}` : "Industry - Unknown");
  useCanonical(`/industries/${slug || ""}`);

  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!industry) return;

    document.title = industry.title;

    // Inject or update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", industry.metaDescription);

    setInView(true);
  }, [industry, slug]);

  // Redirect to /industries if slug doesn't match any industry
  if (!industry) {
    return <Redirect to="/industries" />;
  }

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-gradient-hero overflow-hidden">
        {/* Background image with subtle opacity */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `url('${industry.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.05,
            filter: "blur(2px)",
          }}
        />
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left: headline and subtitle */}
              <div>
                <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-6">
                  {industry.heroH1Prefix}{" "}
                  <span className="highlight-coral">{industry.heroH1Highlight}</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  {industry.heroSub}
                </p>
                <Link href={`/contact?industry=${slug}`}>
                  <Button className="rounded-full px-8 py-6 h-auto text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/30 btn-primary-pill">
                    See How It Works for {industry.name}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              {/* Right: industry image */}
              <div className="hidden md:block">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-white/60" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt">
        <div className="container">
          <div
            className="max-w-4xl mx-auto transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "100ms",
            }}
          >
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                The <span className="highlight-coral">problem</span>
              </h2>
            </div>
            <div className="card-on-alt p-8 sm:p-10 md:p-12">
              <p className="font-display text-xl sm:text-2xl md:text-3xl text-foreground leading-relaxed text-center italic">
                "{industry.problem}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 md:py-28 lg:py-36">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                The <span className="highlight-purple">reality</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                The numbers behind the missed revenue in {industry.name.toLowerCase()}.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {industry.stats.map((stat, index) => (
                <div
                  key={index}
                  className="card-premium p-6 sm:p-8 transition-all duration-500"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                      {stat}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt">
        <div className="container">
          <div
            className="max-w-4xl mx-auto transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
              transitionDelay: "200ms",
            }}
          >
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                Our <span className="highlight-green">solution</span>
              </h2>
            </div>
            <div className="card-on-alt p-8 sm:p-10 md:p-12">
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-center">
                {industry.solution}
              </p>
              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 font-sans text-center">
                  What you get with the 24/7 Revenue Recovery Framework
                </p>
                <ul className="space-y-3 max-w-xl mx-auto">
                  {[
                    "Instant response to every inquiry — calls, texts, web, and social",
                    "Smart scheduling that syncs with your existing calendar",
                    "Multi-channel reminders that cut no-shows dramatically",
                    "Live in 4 weeks with zero disruption to your current operations",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28 lg:py-36">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
              See what AI scheduling can do for{" "}
              <span className="highlight-purple">{industry.name.toLowerCase()}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              15-minute call. No commitment. We'll show you exactly how the 24/7 Revenue Recovery Framework works for your industry — and what it could recover for your business.
            </p>
            <Link href={`/contact?industry=${slug}`}>
              <Button className="rounded-full px-10 py-7 h-auto text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/30 btn-primary-pill">
                Book a Free Discovery Call
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
