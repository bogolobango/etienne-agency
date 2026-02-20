import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initUmamiAnalytics } from "./lib/analytics";

// Dynamically load Umami analytics if env vars are configured
initUmamiAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
