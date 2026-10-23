'use client';

import {
  sanitizeAttribution,
  sanitizeBillingCycle,
  sanitizeMachineValue,
  sanitizePath,
  sanitizePlanId,
  validEventId,
  type WhatsAppContext,
} from './whatsapp';

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
  'plan_view',
  'plan_select',
  'checkout_start',
  'calculator_start',
  'calculator_result',
  'click_cta_planos',
  'click_cta_diagnostico',
  'consent_updated',
  'faq_open',
  'service_view',
]);
// Revenue is authoritative only after a verified provider webhook, never a browser action.
export const SERVER_ONLY_EVENTS = [
  'purchase',
  'subscription_created',
  'subscription_renewal',
] as const;
export const EVENT_TAXONOMY = [...events, ...SERVER_ONLY_EVENTS] as const;
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
  'plan_id',
  'billing_cycle',
  'analytics_state',
  'marketing_state',
  'consent_version',
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
/** Meta reads document URL/referrer itself. Suppress it on free-form query context. */
export function canUseMetaPageContext(): boolean {
  for (const raw of [
    location.origin + location.pathname + (location.search || ''),
    document.referrer,
  ]) {
    if (!raw) continue;
    try {
      const url = new URL(raw);
      for (const [key, value] of url.searchParams) {
        if (
          [
            'utm_source',
            'utm_medium',
            'utm_campaign',
            'utm_content',
            'source',
            'medium',
            'campaign',
            'src',
          ].includes(key) &&
          sanitizeMachineValue(value)
        )
          continue;
        if (
          ['gclid', 'fbclid', 'gbraid', 'wbraid'].includes(key) &&
          /^[A-Za-z0-9_.-]{10,512}$/.test(value)
        )
          continue;
        if (['plan', 'plan_id', 'plano'].includes(key) && sanitizePlanId(value))
          continue;
        if (
          ['cycle', 'ciclo', 'billing_cycle'].includes(key) &&
          sanitizeBillingCycle(value)
        )
          continue;
        return false;
      }
    } catch {
      return false;
    }
  }
  return true;
}
function safeReferrer(): string {
  try {
    if (!document.referrer) return '';
    const url = new URL(document.referrer);
    return url.origin + url.pathname;
  } catch {
    return '';
  }
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
      page_referrer: safeReferrer(),
      ...gaCampaignFields(getAttribution()),
      allow_google_signals: value.marketing,
      allow_ad_personalization_signals: value.marketing,
    });
    script('rdv-ga', `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
    track('page_view', { page: location.pathname });
  }
  if (
    value.marketing &&
    PIXEL_ID &&
    /^\d+$/.test(PIXEL_ID) &&
    !metaLoaded &&
    canUseMetaPageContext()
  ) {
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
  const result = sanitizeAttribution({
    source: query.get('utm_source'),
    medium: query.get('utm_medium'),
    campaign: query.get('utm_campaign'),
  });
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
    if (saved && typeof saved === 'object' && !Array.isArray(saved))
      return sanitizeAttribution(saved as Record<string, unknown>);
  } catch {}
  return {};
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
  track('consent_updated', {
    analytics_state: analytics ? 'granted' : 'denied',
    marketing_state: marketing ? 'granted' : 'denied',
    consent_version: 1,
  });
  window.dispatchEvent(new CustomEvent('rdv:consent', { detail: value }));
  if ((old.analytics && !analytics) || (old.marketing && !marketing)) {
    deleteOptionalCookies();
    location.reload();
  }
  return value;
}
function gaCampaignFields(attribution: Record<string, string>) {
  return {
    ...(attribution.source ? { campaign_source: attribution.source } : {}),
    ...(attribution.medium ? { campaign_medium: attribution.medium } : {}),
    ...(attribution.campaign ? { campaign_name: attribution.campaign } : {}),
  };
}
const emittedConversions = new Set<string>();
export function track(
  name: string,
  params: Record<string, string | number> = {},
  metaEvent?: 'Lead' | 'Contact' | 'Schedule',
) {
  if (typeof window === 'undefined' || !events.has(name)) return;
  const clean = Object.fromEntries(
    Object.entries(params).flatMap<[string, string | number]>(
      ([key, value]) => {
        if (!safeKeys.has(key)) return [];
        if (key === 'plan_id') {
          const plan = sanitizePlanId(value);
          return plan ? [[key, plan]] : [];
        }
        if (key === 'billing_cycle') {
          const cycle = sanitizeBillingCycle(value);
          return cycle ? [[key, cycle]] : [];
        }
        if (key === 'event_id')
          return validEventId(value) ? [[key, value]] : [];
        if (key === 'analytics_state' || key === 'marketing_state')
          return value === 'granted' || value === 'denied'
            ? [[key, value]]
            : [];
        if (typeof value === 'number')
          return Number.isFinite(value) &&
            ['score', 'consent_version'].includes(key)
            ? [[key, value]]
            : [];
        if (key === 'page')
          return sanitizePath(value) === value ? [[key, value]] : [];
        const safe = sanitizeMachineValue(value, 100);
        return safe ? [[key, safe]] : [];
      },
    ),
  );
  // Never accept a conversion classification for an unrelated UI interaction.
  const expectedMeta =
    name === 'lead_created'
      ? 'Lead'
      : name === 'whatsapp_click'
        ? 'Contact'
        : name === 'schedule_booked'
          ? 'Schedule'
          : undefined;
  const eventId =
    typeof clean.event_id === 'string' ? clean.event_id : undefined;
  const conversionKey = eventId ? `${name}:${eventId}` : undefined;
  if (conversionKey && emittedConversions.has(conversionKey)) return;
  if (conversionKey) {
    emittedConversions.add(conversionKey);
    if (emittedConversions.size > 500)
      emittedConversions.delete(emittedConversions.values().next().value!);
  }
  if (current.analytics) {
    const attribution = getAttribution();
    const campaignFields = gaCampaignFields(attribution);
    if (Object.keys(campaignFields).length)
      window.gtag?.('set', campaignFields);
    window.gtag?.('event', name, {
      ...attribution,
      ...clean,
      page_location: location.origin + location.pathname,
    });
  }
  if (!current.marketing || !canUseMetaPageContext()) return;
  if (expectedMeta) {
    // Only confirmed conversion callers may select these standard events.
    if (metaEvent === expectedMeta && eventId)
      window.fbq?.('track', expectedMeta, clean, { eventID: eventId });
    return;
  }
  // PageView is owned by bootTracking/trackPageView. Consent choice is not a retargeting signal.
  if (name === 'page_view' || name === 'consent_updated') return;
  const standard =
    name === 'plan_view' || name === 'service_view'
      ? 'ViewContent'
      : name === 'checkout_start'
        ? 'InitiateCheckout'
        : undefined;
  if (standard) {
    if (eventId) window.fbq?.('track', standard, clean, { eventID: eventId });
    else window.fbq?.('track', standard, clean);
  } else window.fbq?.('trackCustom', name, clean);
}
export function whatsappHref(
  placement: string,
  page = typeof location !== 'undefined' ? location.pathname : '/',
  context: WhatsAppContext = {},
) {
  const eventId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : undefined;
  const params = new URLSearchParams({
    src: sanitizeMachineValue(placement) || 'body',
    page: sanitizePath(page),
  });
  if (eventId) params.set('event_id', eventId);
  const plan = sanitizePlanId(context.plan),
    cycle = sanitizeBillingCycle(context.cycle);
  if (plan) params.set('plan', plan);
  if (cycle) params.set('cycle', cycle);
  for (const [key, value] of Object.entries(getAttribution()))
    params.set(key, value);
  return `/go/whatsapp?${params}`;
}
export function trackWhatsapp(
  eventId: string,
  placement: string,
  page: string,
  context: WhatsAppContext = {},
) {
  const params: Record<string, string> = { placement, page, event_id: eventId };
  const plan = sanitizePlanId(context.plan),
    cycle = sanitizeBillingCycle(context.cycle);
  if (plan) params.plan_id = plan;
  if (cycle) params.billing_cycle = cycle;
  Object.assign(params, getAttribution());
  track('click_cta_whatsapp', {
    placement,
    page,
    ...(plan ? { plan_id: plan } : {}),
    ...(cycle ? { billing_cycle: cycle } : {}),
  });
  track('whatsapp_click', params, 'Contact');
}
/** The single delegated click entry point, called by Experience. Navigation is never cancelled. */
export function handleTrackedAction(target: HTMLElement, page: string) {
  const anchor = target instanceof HTMLAnchorElement ? target : null;
  const declared = target.dataset.event;
  const contextNode = target.closest<HTMLElement>('[data-plan-id]');
  const plan = sanitizePlanId(
    target.dataset.planId || contextNode?.dataset.planId,
  );
  const cycle = sanitizeBillingCycle(
    target.dataset.billingCycle ||
      target.closest<HTMLElement>('[data-billing-cycle]')?.dataset.billingCycle,
  );
  const params: Record<string, string> = { page: sanitizePath(page) };
  if (plan) params.plan_id = plan;
  if (cycle) params.billing_cycle = cycle;
  if (anchor) {
    const url = new URL(anchor.href, location.origin);
    if (url.origin === location.origin && url.pathname === '/go/whatsapp') {
      const eventId = crypto.randomUUID();
      const placement =
        sanitizeMachineValue(url.searchParams.get('src')) || 'body';
      url.searchParams.set('event_id', eventId);
      url.searchParams.set('page', sanitizePath(page));
      const queryPlan =
        plan ||
        sanitizePlanId(
          url.searchParams.get('plan') ||
            url.searchParams.get('plano') ||
            url.searchParams.get('plan_id'),
        );
      const queryCycle =
        cycle ||
        sanitizeBillingCycle(
          url.searchParams.get('cycle') || url.searchParams.get('ciclo'),
        );
      if (queryPlan) url.searchParams.set('plan', queryPlan);
      else url.searchParams.delete('plan');
      if (queryCycle) url.searchParams.set('cycle', queryCycle);
      else {
        url.searchParams.delete('cycle');
        url.searchParams.delete('ciclo');
      }
      for (const [key, value] of Object.entries(getAttribution()))
        url.searchParams.set(key, value);
      anchor.href = url.toString();
      trackWhatsapp(eventId, placement, page, {
        plan: queryPlan,
        cycle: queryCycle,
      });
    }
  }
  if (
    declared &&
    declared !== 'whatsapp_click' &&
    declared !== 'click_cta_whatsapp'
  )
    track(declared, params);
}

export function trackPageView(path: string) {
  track('page_view', { page: path });
  if (current.marketing && canUseMetaPageContext())
    window.fbq?.('track', 'PageView');
}
