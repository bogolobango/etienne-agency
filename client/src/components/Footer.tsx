/**
 * Footer Component - Technical Mono Design
 * Comprehensive footer with navigation and contact info
 */

import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 md:py-16 lg:py-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand column */}
          <div className="space-y-4">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="Etienne Agency"
                className="w-32 h-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI receptionist and appointment scheduling automation for multi-location service businesses. Powered by the 24/7 Revenue Recovery Framework.
            </p>
          </div>

          {/* Navigation column */}
          <div className="space-y-4">
            <h3 className="font-mono text-sm font-semibold text-foreground uppercase tracking-wider">
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
            <h3 className="font-mono text-sm font-semibold text-foreground uppercase tracking-wider">
              Industries We Serve
            </h3>
            <ul className="space-y-3">
              <li><Link href="/industries"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Med Spa Scheduling</span></Link></li>
              <li><Link href="/industries"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Dental Practice Automation</span></Link></li>
              <li><Link href="/industries"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Law Firm Lead Management</span></Link></li>
              <li><Link href="/industries"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Property Management</span></Link></li>
              <li><Link href="/industries"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Accounting Firm Scheduling</span></Link></li>
              <li><Link href="/industries"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Cleaning Companies</span></Link></li>
              <li><Link href="/industries"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Sports Facilities</span></Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <h3 className="font-mono text-sm font-semibold text-foreground uppercase tracking-wider">
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
                Response within 2 hours during business hours
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-mono text-muted-foreground">
              &copy; {currentYear} Etienne Agency. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
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
