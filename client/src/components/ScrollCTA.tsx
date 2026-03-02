import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, X } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

export default function ScrollCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("scrollCTADismissed")) {
      setDismissed(true);
      return;
    }

    const startTime = Date.now();
    let hasScrolled = false;

    function handleScroll() {
      const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const elapsed = Date.now() - startTime;

      if (scrollPct >= 0.6 && elapsed >= 8000 && !hasScrolled) {
        hasScrolled = true;
        setVisible(true);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed) return null;

  function handleDismiss() {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem("scrollCTADismissed", "1");
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-500 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-card/95 backdrop-blur-md border-t border-border shadow-lg">
        <div className="container py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-foreground font-medium">
            See where your locations are leaking revenue.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/contact">
              <button
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                onClick={() => trackCTAClick('Get Free Revenue Audit', 'Scroll CTA', 'primary')}
              >
                Get your free revenue audit
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
