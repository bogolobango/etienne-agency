/**
 * Contact Page - Kinetic Minimalism Design
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
    toast.success("Thank you! We'll be in touch within 2 hours.");
    console.log("Form submitted:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const expectations = [
    {
      icon: MessageCircle,
      title: "Your current situation",
      description: "How are leads coming in? Where are the gaps?"
    },
    {
      icon: CheckCircle2,
      title: "Quick ROI assessment",
      description: "Based on your numbers, what's the potential recovery?"
    },
    {
      icon: Clock,
      title: "Fit evaluation",
      description: "Are we the right solution for your specific situation?"
    },
    {
      icon: ArrowRight,
      title: "Next steps (if any)",
      description: "If it makes sense, we'll discuss what comes next. If not, no hard feelings."
    }
  ];

  const faqs = [
    {
      question: "How long is the call?",
      answer: "15 minutes. We respect your time."
    },
    {
      question: "Is this a sales pitch?",
      answer: "No. It's a conversation. We'll ask about your business, share what we've seen work, and give you an honest assessment of whether we can help. If we can't, we'll tell you."
    },
    {
      question: "What if I'm not ready to commit?",
      answer: "That's fine. Most people aren't after one call. We're happy to answer questions and let you decide on your timeline."
    },
    {
      question: "What size business do you work with?",
      answer: "We're best for service businesses with 3-25 locations. Smaller operations usually don't have enough volume to justify the investment. Larger enterprises typically have in-house teams."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
        </div>

        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              Let's Talk About{" "}
              <span className="text-primary">Your Business</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              15 minutes. No pitch deck. Just an honest conversation about whether we can help.
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
                What to <span className="text-primary">Expect</span>
              </h2>
              <p className="text-base sm:text-lg text-foreground/70">
                When you schedule a call, here's what we'll cover:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-16">
              {expectations.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border/50 p-6 hover:shadow-xl transition-all duration-300"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
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
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-background via-muted/10 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card/70 backdrop-blur-xl rounded-3xl border border-border/50 p-6 sm:p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Schedule Your Discovery Call
                </h2>
                <p className="text-sm sm:text-base text-foreground/60">
                  Fill out the form below and we'll be in touch within 2 hours
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
                  <Label htmlFor="challenge">What's your biggest challenge right now? (Optional)</Label>
                  <Textarea
                    id="challenge"
                    value={formData.challenge}
                    onChange={(e) => handleChange("challenge", e.target.value)}
                    placeholder="Tell us about your current situation..."
                    rows={4}
                    className="bg-background/50 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Schedule My Call
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
                Quick <span className="text-primary">FAQs</span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border/50 p-6 sm:p-8"
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
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-background via-primary/5 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Ready When <span className="text-primary">You Are</span>
            </h2>
            <p className="text-base sm:text-lg text-foreground/70 mb-8">
              Pick a time that works for you. We'll take it from there.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => {
                // Scroll to form
                document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Calendar & Book
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
