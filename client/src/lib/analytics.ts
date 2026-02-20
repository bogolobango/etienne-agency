/**
 * Analytics Tracking Utility
 * Tracks form submissions, button clicks, and page views
 * Compatible with Google Analytics, Mixpanel, and other analytics platforms
 */

// Event types for type safety
export type AnalyticsEvent = 
  | 'page_view'
  | 'button_click'
  | 'form_submit'
  | 'form_field_focus'
  | 'cta_click'
  | 'navigation_click'
  | 'scroll_depth'
  | 'section_view';

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Track an analytics event
 * Sends to both Google Analytics (gtag) and custom analytics endpoint
 */
export function trackEvent(
  eventName: AnalyticsEvent,
  properties?: EventProperties
) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, properties);
  }

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }

  // Send to custom analytics endpoint if available
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(eventName, properties);
  }

  // You can also send to your own backend analytics endpoint
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ event: eventName, properties, timestamp: Date.now() })
  // }).catch(console.error);
}

/**
 * Track page view
 */
export function trackPageView(pageName: string, path: string) {
  trackEvent('page_view', {
    page_name: pageName,
    page_path: path,
    timestamp: Date.now()
  });
}

/**
 * Track button click
 */
export function trackButtonClick(
  buttonName: string,
  buttonLocation: string,
  additionalProps?: EventProperties
) {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation,
    ...additionalProps
  });
}

/**
 * Track CTA click (special type of button for conversion tracking)
 */
export function trackCTAClick(
  ctaText: string,
  ctaLocation: string,
  ctaType: 'primary' | 'secondary' = 'primary'
) {
  trackEvent('cta_click', {
    cta_text: ctaText,
    cta_location: ctaLocation,
    cta_type: ctaType,
    timestamp: Date.now()
  });
}

/**
 * Track form submission
 */
export function trackFormSubmit(
  formName: string,
  formData?: EventProperties
) {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData,
    timestamp: Date.now()
  });
}

/**
 * Track form field interaction
 */
export function trackFormFieldFocus(
  formName: string,
  fieldName: string
) {
  trackEvent('form_field_focus', {
    form_name: formName,
    field_name: fieldName
  });
}

/**
 * Track navigation click
 */
export function trackNavigationClick(
  linkText: string,
  linkDestination: string,
  navigationType: 'header' | 'footer' | 'mobile_menu' = 'header'
) {
  trackEvent('navigation_click', {
    link_text: linkText,
    link_destination: linkDestination,
    navigation_type: navigationType
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number, pageName: string) {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
    page_name: pageName
  });
}

/**
 * Track section visibility (when user scrolls to a section)
 */
export function trackSectionView(sectionName: string, pageName: string) {
  trackEvent('section_view', {
    section_name: sectionName,
    page_name: pageName
  });
}

/**
 * Dynamically load the Umami analytics script if env vars are configured.
 * Call this once at app startup (e.g. in main.tsx).
 */
export function initUmamiAnalytics() {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

  if (endpoint && websiteId && typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.defer = true;
    script.src = `${endpoint}/umami`;
    script.dataset.websiteId = websiteId;
    document.body.appendChild(script);
  }
}

/**
 * Hook to track page views automatically
 */
export function usePageTracking(pageName: string, path: string) {
  if (typeof window !== 'undefined') {
    // Track on mount
    trackPageView(pageName, path);
  }
}
