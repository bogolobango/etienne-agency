/**
 * Header Component — Teal Accent Design
 * Minimal sticky nav: Logo | How It Works · Med Spas · About | [Book a Revenue Audit]
 */

import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { trackNavigationClick, trackCTAClick } from "@/lib/analytics";

// Pages whose hero section has a dark (section-dark) background
const DARK_HERO_ROUTES = ["/", "/how-it-works", "/med-spas"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const hasDarkHero = DARK_HERO_ROUTES.some(
    (path) => location === path || (path !== "/" && location.startsWith(path))
  );

  // White logo / nav only when NOT scrolled AND on a page with a dark hero
  const overDark = !scrolled && hasDarkHero;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

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
            ? "bg-background/95 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <Link href="/" onClick={handleLinkClick}>
              <div className="flex items-center gap-3 cursor-pointer">
                <img
                  src="/images/logo.png"
                  alt="Etienne Agency"
                  className={`w-36 h-auto transition-all duration-300 ${
                    overDark ? "brightness-0 invert" : ""
                  }`}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/how-it-works">
                <span
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    overDark
                      ? "text-white/70 hover:text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => trackNavigationClick('How It Works', '/how-it-works', 'header')}
                >
                  How It Works
                </span>
              </Link>
              <Link href="/med-spas">
                <span
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    overDark
                      ? "text-white/70 hover:text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => trackNavigationClick('Med Spas', '/med-spas', 'header')}
                >
                  Med Spas
                </span>
              </Link>
              <Link href="/about">
                <span
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    overDark
                      ? "text-white/70 hover:text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => trackNavigationClick('About', '/about', 'header')}
                >
                  About
                </span>
              </Link>
            </nav>

            {/* Desktop CTA Button */}
            <Link href="/contact">
              <Button
                className="hidden md:inline-flex rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                size="default"
                onClick={() => trackCTAClick('Book a Revenue Audit', 'Header', 'primary')}
              >
                Book a Revenue Audit
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 transition-colors ${overDark ? "text-white" : "text-foreground"}`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
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
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 z-[60] transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background z-[70] transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Link href="/" onClick={handleLinkClick}>
              <img
                src="/images/logo.png"
                alt="Etienne Agency"
                className="h-8 w-auto"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-1">
              <li>
                <Link href="/how-it-works" onClick={() => { handleLinkClick(); trackNavigationClick('How It Works', '/how-it-works', 'mobile_menu'); }}>
                  <span className="block px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer">
                    How It Works
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/med-spas" onClick={() => { handleLinkClick(); trackNavigationClick('Med Spas', '/med-spas', 'mobile_menu'); }}>
                  <span className="block px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer">
                    Med Spas
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
            </ul>
          </nav>

          <div className="p-6 border-t border-border">
            <Link href="/contact" onClick={handleLinkClick}>
              <Button
                className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                size="lg"
                onClick={() => trackCTAClick('Book a Revenue Audit', 'Mobile Menu', 'primary')}
              >
                Book a Revenue Audit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
