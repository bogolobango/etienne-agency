/**
 * SSR entry point for build-time prerendering.
 * Renders each route to static HTML so crawlers can index content
 * without executing JavaScript.
 */
import { renderToString } from "react-dom/server";
import { Router, Route, Switch } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";

// Direct imports — no lazy loading for SSR
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Industries from "./pages/Industries";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// Re-export SEO utilities so the prerender script can use them
// from the single SSR bundle without needing tsx or extra tooling.
export { getPageMeta, getBreadcrumbJsonLd, BASE_URL, OG_IMAGE, SITE_NAME } from "@shared/seoMeta";

/**
 * Render the app for a given URL path and return the HTML string.
 */
export function render(url: string): string {
  return renderToString(
    <Router ssrPath={url}>
      <ThemeProvider defaultTheme="light">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/industries" component={Industries} />
          <Route path="/med-spas" component={Industries} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
