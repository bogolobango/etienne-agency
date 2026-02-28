/**
 * Footer Component — Teal Accent Design
 * Product, Company, Connect columns
 */

import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="Etienne Agency"
                className="w-28 h-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI-powered revenue recovery for multi-location med spas.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground font-sans">Product</h3>
            <ul className="space-y-3">
              <li><Link href="/how-it-works"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">How It Works</span></Link></li>
              <li><Link href="/med-spas"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Med Spas</span></Link></li>
              <li><Link href="/contact"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Book a Demo</span></Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground font-sans">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">About</span></Link></li>
              <li><Link href="/contact"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Contact</span></Link></li>
              <li><span className="text-sm text-muted-foreground">Blog (coming soon)</span></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground font-sans">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:jim@etienneagency.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  jim@etienneagency.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Etienne Agency. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span></Link>
              <Link href="/terms"><span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Terms of Service</span></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
