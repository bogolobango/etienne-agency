/**
 * Contact page - fallback for visitors who prefer a message over the free audit
 */

import { useEffect, useState, type FormEvent } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { trackCTAClick, trackFormSubmit } from "@/lib/analytics";
import FloatingDustMotes from "@/components/FloatingDustMotes";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  usePageView("Contact");
  useScrollTracking("Contact");
  useSEO("/contact");

  const [inView, setInView] = useState(false);
  useEffect(() => { setInView(true); }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading" || state === "success") return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setErrorMessage("Please enter your name.");
      setState("error");
      return;
    }
    if (!trimmedEmail || !/.+@.+\..+/.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      setState("error");
      return;
    }
    if (!trimmedMessage) {
      setErrorMessage("Please add a message.");
      setState("error");
      return;
    }

    setState("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "fetch",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Something went wrong." }));
        setErrorMessage(body.error || "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      setState("success");
      trackFormSubmit("Contact Form", { name: trimmedName });
    } catch {
      setErrorMessage("Network error. Please try again.");
      setState("error");
    }
  }

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero - dark */}
      <section className="relative pt-24 pb-12 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 section-dark overflow-hidden">
        <FloatingDustMotes particleCount={50} />
        <div className="container relative z-10">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
              Send Jim a note
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-4">
              The fastest path is the free Revenue Recovery Audit. Send a CSV, get a 4-page PDF back in 48 hours. No call required.
            </p>
            <p className="text-sm text-white/40">
              If you'd rather talk first, the form below goes straight to Jim.
            </p>
          </div>
        </div>
      </section>

      {/* Primary CTA + Form */}
      <section className="relative py-16 md:py-24 section-gradient-alt overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto">

            {/* Primary CTA */}
            <div
              className="text-center mb-14"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease",
              }}
            >
              <p className="text-sm text-muted-foreground mb-5">
                Most visitors start here. CSV in, PDF out, 48 hours.
              </p>
              <a href="/#early-adopter-section">
                <Button
                  className="rounded-full px-10 py-7 h-auto text-lg font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-xl shadow-primary/30 btn-primary-pill"
                  onClick={() => trackCTAClick("Get Your Free Audit", "Contact", "primary")}
                >
                  Get Your Free Audit <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-12">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground uppercase tracking-widest">or send a message</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Contact Form */}
            <div
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease",
                transitionDelay: "150ms",
              }}
            >
              {state === "success" ? (
                <div className="card-premium p-8 sm:p-10 text-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 border border-primary/30 mb-4 mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl text-foreground mb-3">Message received</h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Jim reads every note personally and will reply from{" "}
                    <span className="text-foreground">jim@etienneagency.com</span> within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card-premium p-8 sm:p-10 space-y-6" noValidate>
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      disabled={state === "loading"}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                      Your email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@yourmedspa.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      disabled={state === "loading"}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      placeholder="Tell Jim what's on your mind. How many locations, what you're seeing, what you want to figure out."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (state === "error") setState("idle");
                      }}
                      disabled={state === "loading"}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-colors resize-none"
                      required
                    />
                  </div>

                  {state === "error" && errorMessage && (
                    <p className="text-sm text-[#FCA5A5]">{errorMessage}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={state === "loading"}
                    className="w-full rounded-full py-4 h-auto text-base font-semibold bg-primary text-primary-foreground hover:bg-[#00BF99] shadow-lg shadow-primary/25 btn-primary-pill disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={() => trackCTAClick("Send Message", "Contact", "secondary")}
                  >
                    {state === "loading" ? "Sending..." : "Send message"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Jim replies personally from{" "}
                    <span className="text-foreground/70">jim@etienneagency.com</span>.
                    Usually within one business day.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
