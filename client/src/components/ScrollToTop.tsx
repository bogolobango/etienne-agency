import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollToTop() {
  const [path] = useLocation();
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [path]);
  return null;
}
