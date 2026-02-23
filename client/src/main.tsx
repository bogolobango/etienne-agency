import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Global error reporting (catches errors outside React tree)
if (import.meta.env.PROD) {
  const reportError = (payload: Record<string, unknown>) => {
    fetch("/api/error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, url: window.location.href, timestamp: new Date().toISOString() }),
    }).catch(() => {});
  };

  window.addEventListener("error", (e) => {
    reportError({ message: e.message, stack: e.error?.stack, source: "window.onerror" });
  });

  window.addEventListener("unhandledrejection", (e) => {
    reportError({ message: String(e.reason), source: "unhandledrejection" });
  });
}

createRoot(document.getElementById("root")!).render(
  <>
    <a href="#main-content" className="skip-to-content">
      Skip to main content
    </a>
    <App />
  </>
);
