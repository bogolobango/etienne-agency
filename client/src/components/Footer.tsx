/**
 * Footer Component - Kinetic Minimalism Design
 * Comprehensive footer with navigation and contact info
 * Typography: Sora for logo, Inter for content
 */

import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/20 border-t border-border/50">
      <div className="container py-12 md:py-16 lg:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="Etienne Agency"
                className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-sm text-foreground/60 leading-relaxed max-w-xs">
              24/7 Revenue Recovery Framework for multi-location service
              businesses.
            </p>
          </div>

          {/* Navigation column */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/how-it-works">
                  <span className="text-sm text-foreground/60 hover:text-primary transition-colors cursor-pointer">
                    How It Works
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/industries">
                  <span className="text-sm text-foreground/60 hover:text-primary transition-colors cursor-pointer">
                    Industries
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-sm text-foreground/60 hover:text-primary transition-colors cursor-pointer">
                    About
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-sm text-foreground/60 hover:text-primary transition-colors cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries column */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
              Industries
            </h3>
            <ul className="space-y-3">
              <li className="text-sm text-foreground/60">Med Spas</li>
              <li className="text-sm text-foreground/60">Dental Practices</li>
              <li className="text-sm text-foreground/60">Law Firms</li>
              <li className="text-sm text-foreground/60">Property Management</li>
              <li className="text-sm text-foreground/60">Accounting & CPA</li>
              <li className="text-sm text-foreground/60">Cleaning Companies</li>
              <li className="text-sm text-foreground/60">Sports Facilities</li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:jim@etienneagency.com"
                  className="text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  jim@etienneagency.com
                </a>
              </li>
              <li className="text-sm text-foreground/60">
                Response within 2 hours during business hours
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Etienne Agency. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy">
                <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
