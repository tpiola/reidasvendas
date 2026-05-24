import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent, trackPageView } from '@/lib/analytics';

export function AnalyticsProvider() {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname + location.search;
    trackPageView(pagePath);
  }, [location.pathname, location.search]);

  return null;
}

export function trackConversion(eventName: string, payload?: Record<string, unknown>) {
  trackEvent(eventName, payload as Record<string, string | number | boolean | undefined>);
}
