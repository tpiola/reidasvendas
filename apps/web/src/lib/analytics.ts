type AnalyticsValue = string | number | boolean | undefined;
type AnalyticsPayload = Record<string, AnalyticsValue>;

const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid'] as const;
const ATTRIBUTION_KEY = 'rdv-acquisition-attribution';
export const MEASUREMENT_CONSENT_KEY = 'reidasvendas:cookie-consent';

function hasMeasurementConsent(): boolean {
  try {
    return window.localStorage.getItem(MEASUREMENT_CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
};

export function captureAttribution(): Attribution {
  if (typeof window === 'undefined') return {};

  let existing: Attribution = {};
  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) existing = JSON.parse(stored) as Attribution;
  } catch {
    existing = {};
  }

  const params = new URLSearchParams(window.location.search);
  const next: Attribution = {
    ...existing,
    landing_page: existing.landing_page || window.location.pathname,
    referrer: existing.referrer || document.referrer || undefined,
  };

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) next[key] = value.slice(0, 200);
  }

  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(next));
  } catch {
    // Navigation and lead collection must still work when browser storage is unavailable.
  }

  return next;
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}): void {
  if (typeof window === 'undefined') return;

  const attribution = captureAttribution();
  const detail = {
    event,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...attribution,
    ...payload,
  };

  const measurementAllowed = hasMeasurementConsent();

  if (measurementAllowed && typeof window.gtag === 'function') {
    window.gtag('event', event, detail);
  }

  if (measurementAllowed && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(detail);
  }

  window.dispatchEvent(new CustomEvent('rdv:analytics', { detail }));
}

export function diagnosticUrl(solution?: string, origin?: string): string {
  const params = new URLSearchParams();
  if (solution) params.set('solucao', solution);
  if (origin) params.set('origem', origin);
  const query = params.toString();
  return query ? `/diagnostico?${query}` : '/diagnostico';
}
