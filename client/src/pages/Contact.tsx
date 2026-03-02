/**
 * Contact Page - Tango Editorial Design
 * Discovery call scheduling via Calendly with editorial styling
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  Clock,
  MessageCircle,
  Mail,
  ArrowRight
} from "lucide-react";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import GradientOrbs, { type OrbConfig } from "@/components/GradientOrbs";

const contactHeroOrbs: OrbConfig[] = [
  { size: 480, color: "#00D4AA", x: "-6%", y: "-8%", opacity: 0.4, duration: 14, delay: 0, parallaxFactor: 50 },
  { size: 400, color: "#2D5BFF", x: "72%", y: "45%", opacity: 0.35, duration: 12, delay: 3, parallaxFactor: -30 },
  { size: 320, color: "#00D4AA", x: "78%", y: "-12%", opacity: 0.3, duration: 15, delay: 6, parallaxFactor: 35 },
];

const contactExpectOrbs: OrbConfig[] = [
  { size: 420, color: "#FF8C42", x: "-6%", y: "15%", opacity: 0.3, duration: 13, delay: 1, parallaxFactor: 40 },
  { size: 360, color: "#00D4AA", x: "80%", y: "60%", opacity: 0.3, duration: 11, delay: 5, parallaxFactor: -25 },
];

const contactCalendlyOrbs: OrbConfig[] = [
  { size: 400, color: "#00D4AA", x: "70%", y: "5%", opacity: 0.3, duration: 14, delay: 2, parallaxFactor: 35 },
  { size: 350, color: "#2D5BFF", x: "-5%", y: "55%", opacity: 0.25, duration: 12, delay: 6, parallaxFactor: -30 },
];

const contactFaqOrbs: OrbConfig[] = [
  { size: 400, color: "#2D5BFF", x: "-5%", y: "10%", opacity: 0.3, duration: 14, delay: 2, parallaxFactor: 40 },
  { size: 350, color: "#00D4AA", x: "78%", y: "60%", opacity: 0.3, duration: 11, delay: 5, parallaxFactor: -30 },
];

const contactCtaOrbs: OrbConfig[] = [
  { size: 400, color: "#FF8C42", x: "65%", y: "-10%", opacity: 0.35, duration: 13, delay: 1, parallaxFactor: 40 },
  { size: 350, color: "#00D4AA", x: "-5%", y: "50%", opacity: 0.3, duration: 15, delay: 5, parallaxFactor: -30 },
];

// Calendly embed — uses the standard calendly-inline-widget class so
// widget.js auto-detects and sizes the iframe correctly.
// ---------------------------------------------------------------------------
const CALENDLY_URL =
  "https://calendly.com/jim-etienneagency/30min" +
  "?background_color=ffffff" +
  "&text_color=111827" +
  "&primary_color=7c3aed" +
  "&hide_gdpr_banner=1";

const faqs = [
  { question: "How long is the discovery call?", answer: "15 minutes. No more. We respect your time." },
  { question: "Is this a sales pitch?", answer: "No. We ask about your missed calls, lead response time, and no-show rates. Then we give you an honest take on whether our AI receptionist can help. If it can't, we'll say so." },
  { question: "What if I'm not ready to commit?", answer: "That's fine. Most people aren't after one call. You'll walk away knowing what appointment scheduling automation could do for your numbers." },
  { question: "What size business do you work with?", answer: "Multi-location service businesses with 3–25 locations. Smaller operations usually don't have the volume to justify the investment. Larger enterprises often have in-house teams already." },
  { question: "What does the virtual receptionist actually do?", answer: "It answers calls, texts, and web forms in under 60 seconds. It books appointments, sends automated reminders to reduce no-shows, and follows up with leads who don't book right away. All 24/7." }
];

export default function Contact() {
  usePageView('Contact');
  useScrollTracking('Contact');
  useSEO('/contact');

  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);

    // Inject FAQPage JSON-LD for rich results
    if (!document.getElementById("json-ld-faq")) {
      const script = document.createElement("script");
      script.id = "json-ld-faq";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      });
      document.head.appendChild(script);
    }

    // Load Calendly widget script
    if (!document.querySelector('script[src*="assets.calendly.com"]')) {
      const calendlyScript = document.createElement("script");
      calendlyScript.src = "https://assets.calendly.com/assets/external/widget.js";
      calendlyScript.async = true;
      document.head.appendChild(calendlyScript);
    }
  }, []);

  const expectations = [
    { icon: MessageCircle, title: "Your lead response time", description: "How fast do you respond to missed calls, texts, and web forms? Where are leads falling through?" },
    { icon: CheckCircle2, title: "Quick ROI estimate", description: "Based on your call volume and no-show rate, how much revenue can smart scheduling recover?" },
    { icon: Clock, title: "Fit evaluation", description: "Does the 24/7 Revenue Recovery Framework match your business? Not every company is right for this." },
    { icon: ArrowRight, title: "Clear next steps", description: "If it makes sense, we'll show you the 4-week setup. If not, no hard feelings." }
  ];

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-gradient-hero overflow-hidden">
        <GradientOrbs orbs={contactHeroOrbs} />
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
              Book a free call to stop{" "}
              <span className="highlight-coral">missed calls and lost revenue</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              15 minutes. No pitch deck. Find out how an AI receptionist and appointment scheduling automation can recover the revenue you're losing today.
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="relative py-16 md:py-24 section-gradient-alt overflow-hidden">
        <GradientOrbs orbs={contactExpectOrbs} />
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                What happens on the{" "}
                <span className="highlight-teal">call</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">Here's exactly what your 15-minute discovery call covers:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {expectations.map((item, index) => {
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

      {/* Calendly Booking + Photo/Trust Sidebar */}
      <section id="booking" className="relative py-16 md:py-24 section-gradient-alt overflow-hidden">
        <GradientOrbs orbs={contactCalendlyOrbs} />
        <div className="container relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              Schedule your free{" "}
              <span className="highlight-green">revenue audit</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Pick a time that works. No back-and-forth.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              {/* Left: Calendly widget */}
              <div className="lg:col-span-3">
                <div
                  className="calendly-inline-widget rounded-2xl"
                  data-url={CALENDLY_URL}
                  style={{ minWidth: 320, height: 700 }}
                />
              </div>

              {/* Right: Photo + trust signals */}
              <div className="hidden lg:flex flex-col gap-6 lg:col-span-2">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-border/30" style={{ aspectRatio: '3/4' }}>
                  <img
                    src="/images/contact-office.jpg"
                    alt="Discovery call"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="card-premium p-5 space-y-3">
                  <p className="text-sm font-semibold text-foreground">What you'll get</p>
                  {[
                    "Honest assessment of your lead flow",
                    "Quick ROI estimate for your business",
                    "Clear next steps — no pressure",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Prefer email?</p>
                  <a href="mailto:jim@etienneagency.com" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-sm">
                    <Mail className="w-4 h-4" />
                    jim@etienneagency.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative py-16 md:py-24 section-gradient-alt overflow-hidden">
        <GradientOrbs orbs={contactFaqOrbs} />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
                Common questions about our{" "}
                <span className="highlight-green">AI receptionist</span>
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="card-on-alt p-6 sm:p-8">
                  <h3 className="font-display text-lg sm:text-xl text-foreground mb-3">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 md:py-24 section-gradient-alt overflow-hidden">
        <GradientOrbs orbs={contactCtaOrbs} />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
              Stop losing revenue to{" "}
              <span className="highlight-coral">slow responses</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">Every day without an instant response system is revenue walking out the door. Let's fix that.</p>
            <Button
                className="rounded-full px-8 py-6 h-auto text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/30 btn-primary-pill"
              onClick={() => { document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Book Your Discovery Call
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
