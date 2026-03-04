/**
 * Free Revenue Audit Page — Conversion page with form + audit details
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  BarChart3,
  DollarSign,
  TrendingDown,
  Brain,
  Shield,
} from "lucide-react";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { trackCTAClick, trackFormSubmit, trackFormFieldFocus } from "@/lib/analytics";
import { getUTMParams } from "@/lib/utm";
import GradientOrbs, { type OrbConfig } from "@/components/GradientOrbs";

const contactHeroOrbs: OrbConfig[] = [
  { size: 480, color: "#00D4AA", x: "-6%", y: "-8%", opacity: 0.4, duration: 14, delay: 0, parallaxFactor: 50 },
  { size: 400, color: "#2D5BFF", x: "72%", y: "45%", opacity: 0.35, duration: 12, delay: 3, parallaxFactor: -30 },
  { size: 320, color: "#00D4AA", x: "78%", y: "-12%", opacity: 0.3, duration: 15, delay: 6, parallaxFactor: 35 },
];

const contactAuditOrbs: OrbConfig[] = [
  { size: 420, color: "#FF8C42", x: "-6%", y: "15%", opacity: 0.3, duration: 13, delay: 1, parallaxFactor: 40 },
  { size: 360, color: "#00D4AA", x: "80%", y: "60%", opacity: 0.3, duration: 11, delay: 5, parallaxFactor: -25 },
];

const contactFormOrbs: OrbConfig[] = [
  { size: 400, color: "#00D4AA", x: "70%", y: "5%", opacity: 0.3, duration: 14, delay: 2, parallaxFactor: 35 },
  { size: 350, color: "#2D5BFF", x: "-5%", y: "55%", opacity: 0.25, duration: 12, delay: 6, parallaxFactor: -30 },
];

export default function Contact() {
  usePageView('Free Revenue Audit');
  useScrollTracking('Free Revenue Audit');
  useSEO('/contact');

  const [inView, setInView] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    locations: "",
    platform: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setInView(true);
  }, []);

  const auditIncludes = [
    {
      icon: BarChart3,
      title: "Cross-Location Performance Comparison",
      description: "Every center ranked by revenue, utilization, no-show rate, and lead response time. See which location is your strongest and which needs attention.",
    },
    {
      icon: DollarSign,
      title: "Revenue Leakage Report",
      description: "Estimated dollar value of missed calls, delayed responses, and lost leads across all locations for the 14-day period \u2014 annualized projection included.",
    },
    {
      icon: TrendingDown,
      title: "No-Show Pattern Analysis",
      description: "Which days, times, providers, and service types have the highest no-show rates. Estimated revenue impact and recommended interventions.",
    },
    {
      icon: Brain,
      title: "AI Analyst Demo",
      description: "Live access to the AI Revenue Analyst with your actual data loaded. Ask any question about your business and see what cross-center intelligence looks like.",
    },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const utm = getUTMParams();
    trackFormSubmit('Free Revenue Audit', { locations: formData.locations, platform: formData.platform, ...utm });
    trackCTAClick('Start My Free Audit', 'Audit Form', 'primary');

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "fetch",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.business,
          industry: "medspa",
          locations: formData.locations,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-12 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-gradient-hero overflow-hidden">
        <GradientOrbs orbs={contactHeroOrbs} />
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
              See what your booking system{" "}
              <span className="highlight-coral">can't show you.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We'll connect to your booking data, run a 14-day analysis across all your locations, and deliver a revenue intelligence report showing exactly where money is slipping through the cracks. Free. No strings.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="relative py-16 md:py-24 section-gradient-alt overflow-hidden">
        <GradientOrbs orbs={contactAuditOrbs} />
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <p className="section-label">THE REVENUE AUDIT INCLUDES</p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                What you get
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {auditIncludes.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="card-on-alt p-6 transition-all duration-300"
                    style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.5s ease', transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="icon-container-lg mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* The Form */}
      <section id="audit-form" className="relative py-16 md:py-24 section-gradient-alt overflow-hidden">
        <GradientOrbs orbs={contactFormOrbs} />
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Start your free{" "}
                <span className="highlight-green">revenue audit</span>
              </h2>
            </div>

            {submitted ? (
              <div className="card-premium p-8 sm:p-10 text-center">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl text-foreground mb-3">We'll be in touch within 24 hours.</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  We'll reach out to set up the data connection. The audit takes 14 days of data, and we'll walk you through the results live.
                </p>
              </div>
            ) : (
              <div className="form-container p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Your name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => trackFormFieldFocus('Free Revenue Audit', 'name')}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => trackFormFieldFocus('Free Revenue Audit', 'email')}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      placeholder="jane@glowmedspa.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">Phone number</label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onFocus={() => trackFormFieldFocus('Free Revenue Audit', 'phone')}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="business" className="block text-sm font-medium text-foreground mb-2">Business name</label>
                    <input
                      id="business"
                      type="text"
                      required
                      value={formData.business}
                      onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                      onFocus={() => trackFormFieldFocus('Free Revenue Audit', 'business')}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                      placeholder="Glow Med Spa"
                    />
                  </div>
                  <div>
                    <label htmlFor="locations" className="block text-sm font-medium text-foreground mb-2">Number of locations</label>
                    <select
                      id="locations"
                      required
                      value={formData.locations}
                      onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                      onFocus={() => trackFormFieldFocus('Free Revenue Audit', 'locations')}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    >
                      <option value="">Select range</option>
                      <option value="1-2">1–2</option>
                      <option value="3-5">3–5</option>
                      <option value="6-10">6–10</option>
                      <option value="11-25">11–25</option>
                      <option value="25+">25+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="platform" className="block text-sm font-medium text-foreground mb-2">Booking platform</label>
                    <select
                      id="platform"
                      required
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      onFocus={() => trackFormFieldFocus('Free Revenue Audit', 'platform')}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    >
                      <option value="">Select your platform</option>
                      <option value="zenoti">Zenoti</option>
                      <option value="boulevard">Boulevard</option>
                      <option value="mangomint">Mangomint</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  {error && (
                    <p className="text-sm text-red-500 text-center">{error}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full py-6 h-auto text-base font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Start My Free Audit"}
                    {!submitting && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                    <Shield className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>Read-only data access. We never modify your booking system.</span>
                  </div>
                </form>
                <p className="text-center text-xs text-muted-foreground mt-6">
                  We'll reach out within 24 hours to set up the data connection. The audit takes 14 days of data, and we'll walk you through the results live. If the numbers don't surprise you, no hard feelings.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
