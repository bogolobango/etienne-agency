/**
 * Header Component - Kinetic Minimalism Design
 * Floating glassmorphic header with subtle backdrop blur
 * Typography: Sora for logo, Inter for nav items
 */

import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <img
                src="/images/logo.png"
                alt="Etienne Agency"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/how-it-works">
              <span className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
                How It Works
              </span>
            </Link>
            <Link href="/industries">
              <span className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
                Industries
              </span>
            </Link>
            <Link href="/about">
              <span className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
                About
              </span>
            </Link>
            <Link href="/contact">
              <span className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors cursor-pointer">
                Contact
              </span>
            </Link>
          </nav>

          {/* CTA Button */}
          <Button
            className="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            size="lg"
          >
            Schedule a Call
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
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
  );
}
