/**
 * About Page - Tango Editorial Design
 * Company story, team background, and approach philosophy
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
  Zap,
  Link2,
  Target,
  MessageSquare,
  ArrowRight
} from "lucide-react";

export default function About() {
  usePageView('About');
  useScrollTracking('About');
  useCanonical('/about');

  const [inView, setInView] = useState(false);

  useEffect(() => {
    document.title = "The Team Behind the 24/7 Revenue Recovery Framework | Etienne Agency";
    setInView(true);
  }, []);

  const principles = [
    {
      icon: Zap,
      title: "Speed over perfection",
      description: "A working system in 4 weeks beats a perfect system in 6 months."
    },
    {
      icon: Link2,
      title: "Integration over replacement",
      description: "Your tools work. Let's make them work better."
    },
    {
      icon: Target,
      title: "ROI over features",
      description: "Every decision we make is about revenue recovery, not feature lists."
    },
    {
      icon: MessageSquare,
      title: "Honesty over sales",
      description: "If we're not the right fit, we'll tell you. We'd rather lose a sale than take on a client we can't help."
    }
  ];

  const strengths = [
    {
      title: "Enterprise AI, Built for Local Business",
      description: "Our founding team sold and ran AI systems for Fortune 500 companies. The same technology that large corporations pay millions for now powers your AI receptionist and automated follow-up system — through the 24/7 Revenue Recovery Framework."
    },
    {
      title: "Deep Integration, Not a Bolt-On",
      description: "Our technical team comes from data startups where integration is everything. This isn't a chatbot on your website. Your conversational AI connects to your CRM, scheduling software, phone system, and every communication channel — so nothing falls through the cracks."
    },
    {
      title: "Results-Obsessed Mindset",
      description: "Success isn't about the technology. It's about how much revenue you recover. If the numbers don't improve, nothing else matters. Every decision ties back to your bottom line."
    }
  ];

  return (
    <div id="main-content" className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-28 overflow-hidden section-gradient-hero">
        <div className="container relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1] mb-6">
              The team behind your{" "}
              <span className="highlight-purple">AI appointment scheduling</span>{" "}
              system
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
              Etienne Agency was built by operators who sold AI to Fortune 500 companies — and realized the same technology could stop missed calls and slow responses for local service businesses.
            </p>
            {/* Team photo */}
            <div className="max-w-2xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-white/60" style={{ aspectRatio: '16/7' }}>
                <img
                  src="/images/team-workspace.jpg"
                  alt="Etienne Agency team"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-alt">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Left: story text */}
              <div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-10">
                  Our Story
                </h2>
                <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    After years selling enterprise AI systems to Fortune 500 companies, I (Jim, founder of Etienne Agency) kept seeing the same pattern: the technology that large corporations pay millions for could solve real, urgent problems for local service businesses — missed calls, slow follow-up, no-shows.
                  </p>
                  <p>
                    But local businesses couldn't afford a $500,000 setup and a 12-month rollout. They needed a virtual receptionist that worked now. One that fit their current tools. One that delivered ROI in weeks — not years.
                  </p>
                  <p>
                    That's why I started Etienne Agency: to bring enterprise-grade AI to the businesses that need it most — med spas, dental practices, law firms, and property management companies losing revenue every single day to problems that technology solved years ago.
                  </p>
                  <p className="font-display text-2xl sm:text-3xl text-foreground italic text-center pt-4">
                    The technology exists. Now it's accessible.
                  </p>
                </div>
              </div>
              {/* Right: sidebar accent photo */}
              <div className="hidden md:block">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-border/30" style={{ aspectRatio: '4/5' }}>
                  <img
                    src="/images/about-story.jpg"
                    alt="Planning session"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Bring Section */}
      <section className="relative py-20 md:py-28 lg:py-36">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                What we bring to the{" "}
                <span className="highlight-coral">table</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {strengths.map((strength, index) => (
                <div
                  key={index}
                  className="card-premium p-6 sm:p-8 transition-all duration-500"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <h3 className="font-display text-xl sm:text-2xl text-foreground mb-4">
                    {strength.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {strength.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="relative py-20 md:py-28 lg:py-36 section-gradient-cta">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
                Our{" "}
                <span className="highlight-green">approach</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Four rules guide every project:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div
                    key={index}
                    className="card-on-alt p-6 sm:p-8 transition-all duration-500"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="icon-container-lg mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl text-foreground mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28 lg:py-36">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground mb-6">
              See if the 24/7 Revenue Recovery Framework{" "}
              <span className="highlight-purple">fits your business</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              No pressure. No pitch deck. 15 minutes to find out if we can recover the revenue you're losing to missed calls and slow responses.
            </p>
            <Link href="/contact">
              <Button
                className="rounded-full px-8 py-6 h-auto text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/30 btn-primary-pill"
              >
                Book a Free Discovery Call
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
