/**
 * Footer Component - Tango Editorial Design
 * Clean, minimal footer with navigation and contact
 */

import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container py-16 md:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="Etienne Agency"
                className="w-28 h-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI receptionist and appointment scheduling automation for multi-location service businesses.
            </p>
          </div>

          {/* Navigation column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground font-sans">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/how-it-works">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    How It Works
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/industries">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Industries
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    About
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground font-sans">
              Industries
            </h3>
            <ul className="space-y-3">
              <li><Link href="/industries"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Med Spas</span></Link></li>
              <li><Link href="/industries"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Dental Practices</span></Link></li>
              <li><Link href="/industries"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Law Firms</span></Link></li>
              <li><Link href="/industries"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Property Management</span></Link></li>
              <li><Link href="/industries"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Accounting Firms</span></Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground font-sans">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:jim@etienneagency.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  jim@etienneagency.com
                </a>
              </li>
              <li className="text-sm text-muted-foreground">
                Response within 2 hours
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Etienne Agency. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Privacy
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Terms
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
