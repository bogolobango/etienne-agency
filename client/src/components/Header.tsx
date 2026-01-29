/**
 * Header Component - Kinetic Minimalism Design
 * Floating glassmorphic header with subtle backdrop blur and mobile menu
 * Typography: Sora for logo, Inter for nav items
 */

import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { trackNavigationClick, trackCTAClick } from "@/lib/analytics";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" onClick={handleLinkClick}>
              <div className="flex items-center gap-3 cursor-pointer group">
                <img
                  src="/images/logo.png"
                  alt="Etienne Agency"
                  className="w-44 h-auto transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/how-it-works">
                <span 
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                  onClick={() => trackNavigationClick('How It Works', '/how-it-works', 'header')}
                >
                  How It Works
                </span>
              </Link>
              <Link href="/industries">
                <span 
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                  onClick={() => trackNavigationClick('Industries', '/industries', 'header')}
                >
                  Industries
                </span>
              </Link>
              <Link href="/about">
                <span 
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                  onClick={() => trackNavigationClick('About', '/about', 'header')}
                >
                  About
                </span>
              </Link>
              <Link href="/contact">
                <span 
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                  onClick={() => trackNavigationClick('Contact', '/contact', 'header')}
                >
                  Contact
                </span>
              </Link>
            </nav>

            {/* Desktop CTA Button */}
            <Button
              className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              size="lg"
              onClick={() => trackCTAClick('Schedule a Call', 'Header', 'primary')}
            >
              Schedule a Call
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl z-[70] transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <Link href="/" onClick={handleLinkClick}>
              <img
                src="/images/logo.png"
                alt="Etienne Agency"
                className="h-10 w-auto"
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:bg-muted"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" onClick={() => { handleLinkClick(); trackNavigationClick('How It Works', '/how-it-works', 'mobile_menu'); }}>
                  <span className="block px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer">
                    How It Works
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/industries" onClick={() => { handleLinkClick(); trackNavigationClick('Industries', '/industries', 'mobile_menu'); }}>
                  <span className="block px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer">
                    Industries
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => { handleLinkClick(); trackNavigationClick('About', '/about', 'mobile_menu'); }}>
                  <span className="block px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer">
                    About
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => { handleLinkClick(); trackNavigationClick('Contact', '/contact', 'mobile_menu'); }}>
                  <span className="block px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Footer with CTA */}
          <div className="p-6 border-t border-border/50">
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
              size="lg"
              onClick={() => { handleLinkClick(); trackCTAClick('Schedule a Call', 'Mobile Menu', 'primary'); }}
            >
              Schedule a Call
            </Button>
            <p className="text-xs text-center text-foreground/60 mt-4">
              15-minute call • No pitch deck
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
