/**
 * Header Component - Tango Editorial Design
 * Minimal sticky nav with logo left, plain text links, pill CTA right
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
                  className="w-36 h-auto"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/how-it-works">
                <span
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  onClick={() => trackNavigationClick('How It Works', '/how-it-works', 'header')}
                >
                  How It Works
                </span>
              </Link>
              <Link href="/industries">
                <span
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  onClick={() => trackNavigationClick('Industries', '/industries', 'header')}
                >
                  Industries
                </span>
              </Link>
              <Link href="/about">
                <span
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  onClick={() => trackNavigationClick('About', '/about', 'header')}
                >
                  About
                </span>
              </Link>
              <Link href="/contact">
                <span
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  onClick={() => trackNavigationClick('Contact', '/contact', 'header')}
                >
                  Contact
                </span>
              </Link>
            </nav>

            {/* Desktop CTA Button — pill shape */}
            <Link href="/contact">
              <Button
                className="hidden md:inline-flex rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90"
                size="default"
                onClick={() => trackCTAClick('Get Started', 'Header', 'primary')}
              >
                Get Started
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
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
          {/* Mobile Menu Header */}
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

          {/* Mobile Navigation Links */}
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
          <div className="p-6 border-t border-border">
            <Link href="/contact" onClick={handleLinkClick}>
              <Button
                className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
                onClick={() => trackCTAClick('Get Started', 'Mobile Menu', 'primary')}
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
