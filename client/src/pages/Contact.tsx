/**
 * Contact Page - Tango Editorial Design
 * Discovery call scheduling form with editorial styling
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  Clock,
  MessageCircle,
  Mail,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useCanonical } from "@/hooks/useCanonical";
import { trackFormSubmit } from "@/lib/analytics";

export default function Contact() {
  usePageView('Contact');
  useScrollTracking('Contact');
  useCanonical('/contact');

  const [inView, setInView] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    locations: "",
    challenge: ""
  });

  useEffect(() => {
    document.title = "Book Your Free Revenue Audit | 15 Minutes, No Pitch | Etienne Agency";
    setInView(true);
  }, []);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Requested-With": "fetch" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Something went wrong. Please try again.");
        return;
      }

      trackFormSubmit('Discovery Call Form', {
        industry: formData.industry,
        locations: formData.locations,
        has_challenge: formData.challenge.length > 0
      });
      toast.success("Got it! We'll reach out within 2 hours to schedule your discovery call.");
      setFormData({ name: "", email: "", phone: "", company: "", industry: "", locations: "", challenge: "" });
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const expectations = [
    { icon: MessageCircle, title: "Your lead response time", description: "How fast do you respond to missed calls, texts, and web forms? Where are leads falling through?" },
    { icon: CheckCircle2, title: "Quick ROI estimate", description: "Based on your call volume and no-show rate, how much revenue can smart scheduling recover?" },
    { icon: Clock, title: "Fit evaluation", description: "Does the 24/7 Revenue Recovery Framework match your business? Not every company is right for this." },
    { icon: ArrowRight, title: "Clear next steps", description: "If it makes sense, we'll show you the 4-week setup. If not, no hard feelings." }
  ];

  const faqs = [
    { question: "How long is the discovery call?", answer: "15 minutes. No more. We respect your time." },
    { question: "Is this a sales pitch?", answer: "No. We ask about your missed calls, lead response time, and no-show rates. Then we give you an honest take on whether our AI receptionist can help. If it can't, we'll say so." },
    { question: "What if I'm not ready to commit?", answer: "That's fine. Most people aren't after one call. You'll walk away knowing what appointment scheduling automation could do for your numbers." },
    { question: "What size business do you work with?", answer: "Multi-location service businesses with 3–25 locations. Smaller operations usually don't have the volume to justify the investment. Larger enterprises often have in-house teams already." },
    { question: "What does the virtual receptionist actually do?", answer: "It answers calls, texts, and web forms in under 60 seconds. It books appointments, sends automated reminders to reduce no-shows, and follows up with leads who don't book right away. All 24/7." }
  ];

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-gradient-hero overflow-hidden">
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
      <section className="relative py-16 md:py-24 section-gradient-alt">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                What happens on the{" "}
                <span className="highlight-purple">call</span>
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

      {/* Calendly Booking — Primary CTA */}
      <section className="relative py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-4">
              Pick a time that{" "}
              <span className="highlight-green">works</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">
              Book your 15-minute discovery call directly. No back-and-forth.
            </p>
            {/* TODO: Replace with Calendly embed. Get embed code from https://calendly.com */}
            {/* <div className="calendly-inline-widget" data-url="https://calendly.com/jim-etienneagency/discovery" style={{ minWidth: '320px', height: '630px' }} /> */}
            <div className="card-premium p-8 sm:p-12 text-center">
              <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
              <p className="font-display text-xl text-foreground mb-2">Calendar booking coming soon</p>
              <p className="text-sm text-muted-foreground">Use the form below to request your discovery call and we'll send you a booking link.</p>
            </div>
            <div className="mt-8">
              <div className="flex items-center gap-4 max-w-xs mx-auto">
                <div className="flex-1 h-px bg-border" />
                <p className="text-sm text-muted-foreground">or use the form</p>
                <div className="flex-1 h-px bg-border" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="relative py-16 md:py-24">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-start">
              {/* Left sidebar: photo + trust signals */}
              <div className="hidden md:flex flex-col gap-6 md:col-span-2">
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
              </div>
              {/* Right: form */}
              <div className="md:col-span-3">
            <div className="card-premium p-6 sm:p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground mb-3">Schedule your free revenue audit</h2>
                <p className="text-sm text-muted-foreground">Fill out the form. We respond within 2 hours.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-sans text-sm">Name *</Label>
                  <Input id="name" type="text" required value={formData.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="John Smith" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-sans text-sm">Email *</Label>
                  <Input id="email" type="email" required value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="john@company.com" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-sans text-sm">Phone *</Label>
                  <Input id="phone" type="tel" required value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="(555) 123-4567" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="font-sans text-sm">Company Name *</Label>
                  <Input id="company" type="text" required value={formData.company} onChange={(e) => handleChange("company", e.target.value)} placeholder="Your Company" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="font-sans text-sm">Industry *</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)} required>
                    <SelectTrigger className="rounded-lg"><SelectValue placeholder="Select your industry" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medspa">Med Spa</SelectItem>
                      <SelectItem value="dental">Dental</SelectItem>
                      <SelectItem value="law">Law Firm</SelectItem>
                      <SelectItem value="property">Property Management</SelectItem>
                      <SelectItem value="accounting">Accounting</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="sports">Sports Facility</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locations" className="font-sans text-sm">Number of Locations *</Label>
                  <Select value={formData.locations} onValueChange={(value) => handleChange("locations", value)} required>
                    <SelectTrigger className="rounded-lg"><SelectValue placeholder="Select location count" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2</SelectItem>
                      <SelectItem value="3-5">3-5</SelectItem>
                      <SelectItem value="6-10">6-10</SelectItem>
                      <SelectItem value="11-25">11-25</SelectItem>
                      <SelectItem value="25+">25+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="challenge" className="font-sans text-sm">What's your biggest challenge? (Optional)</Label>
                  <Textarea id="challenge" value={formData.challenge} onChange={(e) => handleChange("challenge", e.target.value)} placeholder="e.g. Missing calls after hours, high no-show rate, slow follow-up..." rows={4} className="rounded-lg resize-none" />
                </div>
                <Button type="submit" disabled={submitting} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 py-6 h-auto text-base disabled:opacity-60">
                  {submitting ? "Sending..." : "Book My Free Discovery Call"}
                  {!submitting && <ArrowRight className="ml-2 w-4 h-4" />}
                </Button>
              </form>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-2">Prefer to reach out directly?</p>
              <a href="mailto:jim@etienneagency.com" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-sm">
                <Mail className="w-4 h-4" />
                jim@etienneagency.com
              </a>
              <p className="text-xs text-muted-foreground mt-2">We typically respond within 2 hours during business hours.</p>
            </div>
              </div>{/* end right col */}
            </div>{/* end grid */}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative py-16 md:py-24 section-gradient-alt">
        <div className="container">
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
      <section className="relative py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
              Stop losing revenue to{" "}
              <span className="highlight-coral">slow responses</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8">Every day without an instant response system is revenue walking out the door. Let's fix that.</p>
            <Button
                className="rounded-full px-8 py-6 h-auto text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/30 btn-primary-pill"
              onClick={() => { document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Fill Out the Form Above
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
