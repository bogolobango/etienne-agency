/**
 * UTM Parameter Capture
 * Captures UTM params from cold-email traffic (Apollo sequences)
 * and stores them in sessionStorage for attribution on form submission.
 */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const STORAGE_KEY = "etienne_utm";

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/** Call once on app mount to capture UTM params from the URL */
export function captureUTMParams(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  let hasUTM = false;

  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) {
      utm[key] = val;
      hasUTM = true;
    }
  }

  if (hasUTM) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  }
}

/** Retrieve stored UTM params (for attaching to form submissions / analytics) */
export function getUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
