/**
 * Contact Page - Technical Mono Design
 * Discovery call scheduling form with contact options
 * Typography: Sora for headlines, Inter for body
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
import { trackFormSubmit, trackFormFieldFocus } from "@/lib/analytics";

export default function Contact() {
  usePageView('Contact');
  useScrollTracking('Contact');

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
    document.title = "Book a Free Discovery Call | AI Scheduling Audit | Etienne Agency";
    setInView(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Track form submission
    trackFormSubmit('Discovery Call Form', {
      industry: formData.industry,
      locations: formData.locations,
      has_challenge: formData.challenge.length > 0
    });
    
    // Form submission logic would go here
    toast.success("Got it! We'll reach out within 2 hours to schedule your discovery call.");
    console.log("Form submitted:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const expectations = [
    {
      icon: MessageCircle,
      title: "Your lead response time",
      description: "How fast do you respond to missed calls, texts, and web forms? Where are leads falling through?"
    },
    {
      icon: CheckCircle2,
      title: "Quick ROI estimate",
      description: "Based on your call volume and no-show rate, how much revenue can smart scheduling recover?"
    },
    {
      icon: Clock,
      title: "Fit evaluation",
      description: "Does the 24/7 Revenue Recovery Framework match your business? Not every company is right for this."
    },
    {
      icon: ArrowRight,
      title: "Clear next steps",
      description: "If it makes sense, we'll show you the 4-week setup. If not, no hard feelings."
    }
  ];

  const faqs = [
    {
      question: "How long is the discovery call?",
      answer: "15 minutes. No more. We respect your time."
    },
    {
      question: "Is this a sales pitch?",
      answer: "No. We ask about your missed calls, lead response time, and no-show rates. Then we give you an honest take on whether our AI receptionist can help. If it can't, we'll say so."
    },
    {
      question: "What if I'm not ready to commit?",
      answer: "That's fine. Most people aren't after one call. You'll walk away knowing what appointment scheduling automation could do for your numbers."
    },
    {
      question: "What size business do you work with?",
      answer: "Multi-location service businesses with 3–25 locations. Smaller operations usually don't have the volume to justify the investment. Larger enterprises often have in-house teams already."
    },
    {
      question: "What does the virtual receptionist actually do?",
      answer: "It answers calls, texts, and web forms in under 60 seconds. It books appointments, sends automated reminders to reduce no-shows, and follows up with leads who don't book right away. All 24/7."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-background" />
        </div>

        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              Book a Free Call to Stop{" "}
              <span className="underline decoration-2 underline-offset-4">Missed Calls and Lost Revenue</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              15 minutes. No pitch deck. Find out how an AI receptionist and appointment scheduling automation can recover the revenue you're losing today.
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="relative py-12 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                What Happens on the <span className="underline decoration-2 underline-offset-4">Call</span>
              </h2>
              <p className="text-base sm:text-lg text-foreground/70">
                Here's exactly what your 15-minute discovery call covers:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-16">
              {expectations.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-card rounded-sm border border-border p-6 hover:shadow-sm transition-all duration-300"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-foreground mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/70">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="relative py-12 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-sm border border-border p-6 sm:p-8 md:p-12 shadow-sm">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Schedule Your Free Revenue Audit
                </h2>
                <p className="text-sm sm:text-base text-foreground/60">
                  Fill out the form. We respond within 2 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="John Smith"
                    className="bg-background/50"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="john@company.com"
                    className="bg-background/50"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    className="bg-background/50"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Your Company"
                    className="bg-background/50"
                  />
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => handleChange("industry", value)}
                    required
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
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

                {/* Number of Locations */}
                <div className="space-y-2">
                  <Label htmlFor="locations">Number of Locations *</Label>
                  <Select
                    value={formData.locations}
                    onValueChange={(value) => handleChange("locations", value)}
                    required
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select location count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2</SelectItem>
                      <SelectItem value="3-5">3-5</SelectItem>
                      <SelectItem value="6-10">6-10</SelectItem>
                      <SelectItem value="11-25">11-25</SelectItem>
                      <SelectItem value="25+">25+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Challenge */}
                <div className="space-y-2">
                  <Label htmlFor="challenge">What's your biggest challenge? (Optional)</Label>
                  <Textarea
                    id="challenge"
                    value={formData.challenge}
                    onChange={(e) => handleChange("challenge", e.target.value)}
                    placeholder="e.g. Missing calls after hours, high no-show rate, slow follow-up..."
                    rows={4}
                    className="bg-background/50 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-sm transition-all duration-300"
                >
                  Book My Free Discovery Call
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>

            {/* Alternative Contact */}
            <div className="mt-8 text-center">
              <p className="text-sm text-foreground/60 mb-2">
                Prefer to reach out directly?
              </p>
              <a
                href="mailto:jim@etienneagency.com"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                <Mail className="w-4 h-4" />
                jim@etienneagency.com
              </a>
              <p className="text-xs text-foreground/50 mt-2">
                We typically respond within 2 hours during business hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="relative py-12 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Common Questions About Our AI Receptionist <span className="underline decoration-2 underline-offset-4">Service</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card rounded-sm border border-border p-6 sm:p-8"
                >
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-12 md:py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Stop Losing Revenue to <span className="underline decoration-2 underline-offset-4">Slow Responses</span>
            </h2>
            <p className="text-base sm:text-lg text-foreground/70 mb-8">
              Every day without an instant response system is revenue walking out the door. Let's fix that.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-sm transition-all duration-300"
              onClick={() => {
                document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Fill Out the Form Above
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
