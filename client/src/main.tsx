import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <a href="#main-content" className="skip-to-content">
      Skip to main content
    </a>
    <App />
  </>
);
