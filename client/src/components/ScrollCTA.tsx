import { useEffect, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCTAClick } from "@/lib/analytics";
import { useLocation } from "wouter";

export default function ScrollCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [path] = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem("scrollCTADismissed")) {
      setDismissed(true);
      return;
    }

    // Reset visibility on route change
    setVisible(false);

    let triggered = false;

    function show() {
      if (!triggered) {
        triggered = true;
        setVisible(true);
      }
    }

    // 8-second dwell timer — fires even on short pages that never reach 60% scroll
    const timer = setTimeout(show, 8000);

    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrollPct = window.scrollY / scrollable;
      if (scrollPct >= 0.6) {
        show();
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [path]);

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
        <div className="container py-3 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-sm text-foreground font-medium text-center sm:text-left">
            Get your free Leakage Map. 48-hour delivery.
          </p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a href="#hero-calculator">
              <Button
                className="rounded-full px-4 py-2 h-auto text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm inline-flex items-center gap-1.5"
                onClick={() => trackCTAClick('Start', 'ScrollCTA', 'primary')}
              >
                Start
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </a>
            <button
              onClick={handleDismiss}
              className="p-2.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
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
