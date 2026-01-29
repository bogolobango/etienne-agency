/**
 * Hook to automatically track page views
 */

import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '@/lib/analytics';

export function usePageView(pageName: string) {
  const [location] = useLocation();

  useEffect(() => {
    trackPageView(pageName, location);
  }, [pageName, location]);
}
