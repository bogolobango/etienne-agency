/**
 * Analytics Tracking Utility
 * Tracks form submissions, button clicks, and page views
 * Uses Vercel Analytics (hardcoded) with optional Google Analytics fallback
 */

import { track } from "@vercel/analytics";

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
 * Sends to Vercel Analytics and Google Analytics (if available)
 */
export function trackEvent(
  eventName: AnalyticsEvent,
  properties?: EventProperties
) {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', eventName, properties);
  }

  // Send to Vercel Analytics
  track(eventName, properties as Record<string, string | number | boolean>);

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
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
 * Hook to track page views automatically
 */
export function usePageTracking(pageName: string, path: string) {
  if (typeof window !== 'undefined') {
    // Track on mount
    trackPageView(pageName, path);
  }
}
