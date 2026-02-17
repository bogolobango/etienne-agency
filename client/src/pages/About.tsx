/**
 * About Page - Technical Mono Design
 * Company story, team background, and approach philosophy
 * Typography: Sora for headlines, Inter for body
 */

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePageView } from "@/hooks/usePageView";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { Button } from "@/components/ui/button";
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
  
  const [inView, setInView] = useState(false);

  useEffect(() => {
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
      title: "Enterprise AI Experience, Applied to Your Business",
      description: "Our founding team has sold and implemented AI solutions for some of the largest companies in the world. We've seen what actually works at scale—and more importantly, what doesn't. We took that knowledge and distilled it into something practical: the 24/7 Revenue Recovery Framework."
    },
    {
      title: "Deep Integration Architecture",
      description: "Our technical team comes from data startups where integration is everything. We don't just bolt a chatbot onto your website. We connect deeply with your existing CRM, scheduling software, phone system, and communication channels—so everything flows seamlessly."
    },
    {
      title: "Results-Obsessed Mindset",
      description: "We don't measure success by how cool the technology is. We measure it by how much revenue we help you recover. Period. If the numbers don't work, nothing else matters."
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
              We've Seen What Works{" "}
              <span className="underline decoration-2 underline-offset-4">(And What Doesn't)</span>{" "}
              at the Highest Levels
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              Etienne Agency was built by operators who spent years selling AI solutions to Fortune 500 companies—and realized the same technology could transform local service businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-sm border border-border p-6 sm:p-8 md:p-12 lg:p-16 shadow-xl">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 md:mb-8">
                Our Story
              </h2>
              
              <div className="space-y-6 text-base sm:text-lg text-foreground/80 leading-relaxed">
                <p>
                  We didn't start by building software. We started by watching small businesses bleed money.
                </p>
                
                <p>
                  After years of selling enterprise AI systems to massive corporations, we noticed something: the same technology that Fortune 500 companies pay millions for could solve problems that local businesses face every day. Missed calls. Slow follow-up. No-shows. Overwhelmed front desks.
                </p>
                
                <p>
                  The difference? Those businesses couldn't afford a $500,000 implementation and a 12-month rollout. They needed something that worked now, fit their existing systems, and actually delivered ROI in weeks—not years.
                </p>
                
                <p className="text-foreground font-semibold text-xl sm:text-2xl">
                  So we built it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Bring Section */}
      <section className="relative py-12 md:py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                What We Bring to the <span className="underline decoration-2 underline-offset-4">Table</span>
              </h2>
            </div>

            <div className="space-y-6">
              {strengths.map((strength, index) => (
                <div
                  key={index}
                  className="bg-card rounded-sm border border-border p-6 sm:p-8 hover:shadow-sm transition-all duration-500"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {strength.title}
                  </h3>
                  <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                    {strength.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="relative py-12 md:py-20 lg:py-28">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                Our <span className="underline decoration-2 underline-offset-4">Approach</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-foreground/70">
                We believe in:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div
                    key={index}
                    className="group bg-card rounded-sm border border-border p-6 sm:p-8 hover:shadow-sm transition-all duration-500"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <div className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center text-foreground mb-4 group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
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
      <section className="relative py-12 md:py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-sm border border-border p-8 md:p-12 lg:p-16 shadow-sm text-center">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6">
                Let's See If We Can <span className="underline decoration-2 underline-offset-4">Help</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                No pressure, no pitch deck. Just an honest conversation about your business and whether our approach makes sense for you.
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-sm transition-all duration-300"
              >
                Schedule a Call
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
