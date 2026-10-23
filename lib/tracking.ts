'use client';

export type Consent = {
  version: 1;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};
export const CONSENT_KEY = 'rdv-consent-v1';
export const CONSENT_COOKIE = 'rdv_consent';
export const deniedConsent: Consent = {
  version: 1,
  analytics: false,
  marketing: false,
  updatedAt: '',
};
type Tag = (...args: unknown[]) => void;
type Pixel = Tag & {
  callMethod?: Tag;
  queue?: unknown[][];
  push?: Tag;
  loaded?: boolean;
  version?: string;
};
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Tag;
    fbq?: Pixel;
    _fbq?: Pixel;
    __rdvBooted?: boolean;
  }
}
const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
let current = deniedConsent;
let gaLoaded = false;
let metaLoaded = false;
const events = new Set([
  'page_view',
  'view_hero',
  'click_cta_whatsapp',
  'whatsapp_click',
  'click_cta_secundario',
  'scroll_50',
  'scroll_90',
  'quiz_start',
  'quiz_complete',
  'calculator_use',
  'form_start',
  'form_submit',
  'lead_created',
  'contact_whatsapp',
  'schedule_booked',
  'resource_download',
]);
const safeKeys = new Set([
  'page',
  'placement',
  'service',
  'score',
  'resource',
  'event_id',
  'source',
  'medium',
  'campaign',
]);

export function readConsent(): Consent {
  if (typeof window === 'undefined') return deniedConsent;
  try {
    const raw = document.cookie
      .split('; ')
      .find((v) => v.startsWith(`${CONSENT_COOKIE}=`))
      ?.split('=')
      .slice(1)
      .join('=');
    const value: unknown = JSON.parse(
      raw
        ? decodeURIComponent(raw)
        : localStorage.getItem(CONSENT_KEY) || 'null',
    );
    if (
      value &&
      typeof value === 'object' &&
      'version' in value &&
      value.version === 1 &&
      'analytics' in value &&
      typeof value.analytics === 'boolean' &&
      'marketing' in value &&
      typeof value.marketing === 'boolean' &&
      'updatedAt' in value &&
      typeof value.updatedAt === 'string' &&
      Date.now() - Date.parse(value.updatedAt) >= 0 &&
      Date.now() - Date.parse(value.updatedAt) < 180 * 86400000
    )
      return value as Consent;
  } catch {
    /* Storage can be blocked; optional tags stay denied. */
  }
  return deniedConsent;
}
function script(id: string, src: string) {
  if (document.getElementById(id)) return;
  const node = document.createElement('script');
  node.id = id;
  node.src = src;
  node.async = true;
  document.head.appendChild(node);
}
export function bootTracking() {
  if (typeof window === 'undefined' || window.__rdvBooted) return;
  window.__rdvBooted = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // Google gtag command queue uses an Arguments object.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    security_storage: 'granted',
  });
  window.gtag('set', 'ads_data_redaction', true);
  applyConsent(readConsent());
}
export function applyConsent(value: Consent) {
  current = value;
  window.gtag?.('consent', 'update', {
    analytics_storage: value.analytics ? 'granted' : 'denied',
    ad_storage: value.marketing ? 'granted' : 'denied',
    ad_user_data: value.marketing ? 'granted' : 'denied',
    ad_personalization: value.marketing ? 'granted' : 'denied',
  });
  if (value.analytics && GA_ID && /^G-[A-Z0-9]+$/.test(GA_ID) && !gaLoaded) {
    gaLoaded = true;
    window.gtag?.('js', new Date());
    window.gtag?.('config', GA_ID, {
      send_page_view: false,
      page_location: location.origin + location.pathname,
      allow_google_signals: value.marketing,
      allow_ad_personalization_signals: value.marketing,
    });
    script('rdv-ga', `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
    track('page_view', { page: location.pathname });
  }
  if (value.marketing && PIXEL_ID && /^\d+$/.test(PIXEL_ID) && !metaLoaded) {
    metaLoaded = true;
    const fb: Pixel = (...args: unknown[]) => {
      if (fb.callMethod) fb.callMethod(...args);
      else fb.queue?.push(args);
    };
    fb.queue = [];
    fb.push = fb;
    fb.loaded = true;
    fb.version = '2.0';
    window.fbq = fb;
    window._fbq = fb;
    fb('consent', 'revoke');
    fb('set', 'autoConfig', false, PIXEL_ID);
    fb('init', PIXEL_ID);
    fb('consent', 'grant');
    script('rdv-meta', 'https://connect.facebook.net/en_US/fbevents.js');
    fb('track', 'PageView');
  }
  window.fbq?.('consent', value.marketing ? 'grant' : 'revoke');
}
export function getAttribution(): Record<string, string> {
  if (typeof window === 'undefined' || !readConsent().analytics) return {};
  const query = new URLSearchParams(location.search);
  const result: Record<string, string> = {};
  for (const [queryKey, key] of [
    ['utm_source', 'source'],
    ['utm_medium', 'medium'],
    ['utm_campaign', 'campaign'],
  ] as const) {
    const value = query.get(queryKey);
    if (value && /^[a-zA-Z0-9_-]{1,100}$/.test(value)) result[key] = value;
  }
  if (Object.keys(result).length) {
    try {
      sessionStorage.setItem('rdv-attribution-v1', JSON.stringify(result));
    } catch {}
    return result;
  }
  try {
    const saved: unknown = JSON.parse(
      sessionStorage.getItem('rdv-attribution-v1') || '{}',
    );
    if (saved && typeof saved === 'object') {
      for (const key of ['source', 'medium', 'campaign']) {
        const value = (saved as Record<string, unknown>)[key];
        if (typeof value === 'string' && /^[a-zA-Z0-9_-]{1,100}$/.test(value))
          result[key] = value;
      }
    }
  } catch {}
  return result;
}
function deleteOptionalCookies() {
  const names = document.cookie
    .split(';')
    .map((v) => v.trim().split('=')[0])
    .filter((v) => /^(_ga|_gid|_gat|_fbp|_fbc)/.test(v));
  const hostParts = location.hostname.split('.');
  for (const name of names)
    for (const domain of [
      '',
      ...hostParts.map((_, i) => `.${hostParts.slice(i).join('.')}`),
    ])
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ''}${location.protocol === 'https:' ? '; Secure' : ''}`;
}
export function saveConsent(analytics: boolean, marketing: boolean) {
  const old = current;
  const value: Consent = {
    version: 1,
    analytics,
    marketing,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    /* Cookie fallback below. */
  }
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=15552000; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  applyConsent(value);
  if (value.analytics) getAttribution();
  else {
    try {
      sessionStorage.removeItem('rdv-attribution-v1');
    } catch {}
  }
  window.dispatchEvent(new CustomEvent('rdv:consent', { detail: value }));
  if ((old.analytics && !analytics) || (old.marketing && !marketing)) {
    deleteOptionalCookies();
    location.reload();
  }
  return value;
}
export function track(
  name: string,
  params: Record<string, string | number> = {},
  metaEvent?: 'Lead' | 'Contact' | 'Schedule',
) {
  if (typeof window === 'undefined' || !events.has(name)) return;
  const clean = Object.fromEntries(
    Object.entries(params).filter(([key, value]) => {
      if (!safeKeys.has(key)) return false;
      if (typeof value === 'number') return Number.isFinite(value);
      if (key === 'page') return /^\/(?!\/)[A-Za-z0-9/_-]{0,199}$/.test(value);
      return /^[A-Za-z0-9][A-Za-z0-9._/-]{0,99}$/.test(value);
    }),
  );
  // Callers pass pathnames, never query strings, names, phones, messages or emails.
  if (current.analytics)
    window.gtag?.('event', name, {
      ...clean,
      page_location: location.origin + location.pathname,
    });
  if (current.marketing && metaEvent)
    window.fbq?.('track', metaEvent, {}, { eventID: params.event_id });
}
export function whatsappHref(
  placement: string,
  page = typeof location !== 'undefined' ? location.pathname : '/',
) {
  const eventId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `/go/whatsapp?${new URLSearchParams({ src: placement, page, event_id: eventId })}`;
}
export function trackWhatsapp(
  eventId: string,
  placement: string,
  page: string,
) {
  track('click_cta_whatsapp', { placement, page });
  track('whatsapp_click', { placement, page, event_id: eventId }, 'Contact');
}

export function trackPageView(path: string) {
  track('page_view', { page: path });
  if (current.marketing) window.fbq?.('track', 'PageView');
}
