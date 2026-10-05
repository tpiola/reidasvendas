type AnalyticsValue = string | number | boolean | undefined;
type AnalyticsPayload = Record<string, AnalyticsValue>;

const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid'] as const;
const ATTRIBUTION_KEY = 'rdv-acquisition-attribution';
export const MEASUREMENT_CONSENT_KEY = 'reidasvendas:cookie-consent';

export function hasMeasurementConsent(): boolean {
  try {
    return window.localStorage.getItem(MEASUREMENT_CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

let measurementInitialized = false;
let activeProvider: 'gtm' | 'ga4' | undefined;
let lastPageView = '';

function cleanPath(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value, window.location.origin);
    return `${url.origin}${url.pathname}`;
  } catch { return undefined; }
}

export function initializeMeasurement(): void {
  if (typeof window === 'undefined' || measurementInitialized || !hasMeasurementConsent()) return;
  const gtm = import.meta.env.VITE_GTM_ID?.trim();
  const ga4 = import.meta.env.VITE_GA4_ID?.trim();
  activeProvider = gtm && /^GTM-[A-Z0-9]+$/.test(gtm) ? 'gtm'
    : ga4 && /^G-[A-Z0-9]+$/.test(ga4) ? 'ga4' : undefined;
  if (!activeProvider) return;
  measurementInitialized = true;
  window.dataLayer = window.dataLayer || [];
  const script = document.createElement('script');
  script.id = 'rdv-measurement';
  script.async = true;
  if (activeProvider === 'gtm') {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtm}`;
  } else {
    // GA commands and custom GTM events take different paths to avoid duplicates.
    window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
    window.gtag('js', new Date());
    window.gtag('config', ga4, { send_page_view: false, page_location: `${window.location.origin}${window.location.pathname}`, page_referrer: cleanPath(document.referrer) });
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4}`;
  }
  document.head.appendChild(script);
}

export function startMeasurement(): void {
  initializeMeasurement();
  const consentChanged = () => {
    if (hasMeasurementConsent()) {
      lastPageView = '';
      trackEvent('page_view', { page_title: document.title });
    } else if (measurementInitialized) {
      // Reload clears already loaded trackers; consent stays rejected.
      window.location.reload();
    }
  };
  window.addEventListener('rdv:consent', consentChanged);
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
  // Only explicit business dimensions are sent; never names, email or query strings.
  const allowedKeys = new Set(['page_title', 'form', 'step', 'service', 'plan', 'billing', 'investment', 'segment', 'delivery', 'position', 'origin', 'destination', 'project', 'category', 'guide', 'tool', 'solution', 'segmento', 'boundary']);
  const safePayload = Object.fromEntries(Object.entries(payload).filter(([key]) => allowedKeys.has(key)));
  const detail = {
    event,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...attribution,
    landing_page: cleanPath(attribution.landing_page),
    referrer: cleanPath(attribution.referrer),
    page_location: `${window.location.origin}${window.location.pathname}`,
    ...safePayload,
  };

  const measurementAllowed = hasMeasurementConsent();
  if (measurementAllowed) initializeMeasurement();
  const pageKey = `${window.location.pathname}:${String(payload.page_title || document.title)}`;
  if (event === 'page_view' && measurementAllowed && activeProvider) {
    if (lastPageView === pageKey) return;
    lastPageView = pageKey;
  }
  if (measurementAllowed && activeProvider === 'ga4' && typeof window.gtag === 'function') {
    window.gtag('event', event, detail);
  } else if (measurementAllowed && activeProvider === 'gtm' && Array.isArray(window.dataLayer)) {
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
