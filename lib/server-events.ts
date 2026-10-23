import 'server-only';
import { createHmac } from 'node:crypto';
import type { NextRequest } from 'next/server';

export function serverConsent(request: NextRequest): {
  analytics: boolean;
  marketing: boolean;
} {
  try {
    const raw = request.cookies.get('rdv_consent')?.value;
    const value: unknown = JSON.parse(decodeURIComponent(raw || 'null'));
    if (
      value &&
      typeof value === 'object' &&
      'version' in value &&
      value.version === 1 &&
      'updatedAt' in value &&
      typeof value.updatedAt === 'string'
    ) {
      const age = Date.now() - Date.parse(value.updatedAt);
      if (age >= 0 && age < 180 * 86400000)
        return {
          analytics: 'analytics' in value && value.analytics === true,
          marketing: 'marketing' in value && value.marketing === true,
        };
    }
  } catch {
    /* Missing, malformed or stale consent denies optional processing. */
  }
  return { analytics: false, marketing: false };
}
export function siteOrigin() {
  return new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.reidasvendas.com.br',
  ).origin;
}
export function validOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  const previewOrigins =
    process.env.VERCEL_ENV === 'preview'
      ? [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL]
          .filter(Boolean)
          .map((host) => `https://${host}`)
      : [];
  return (
    origin === siteOrigin() ||
    (!!origin && previewOrigins.includes(origin)) ||
    (process.env.NODE_ENV !== 'production' &&
      origin === new URL(request.url).origin)
  );
}
const devLimits = new Map<string, { count: number; until: number }>();
export async function rateLimit(
  request: NextRequest,
  action: string,
  limit = 5,
  seconds = 600,
): Promise<'allowed' | 'limited' | 'unavailable'> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  const salt = process.env.RATE_LIMIT_SALT;
  // Vercel sets x-forwarded-for. Do not place this app behind an untrusted forwarding proxy.
  const ip = (
    request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  ).trim();
  if (!salt && process.env.NODE_ENV === 'production') return 'unavailable';
  const key = `rdv:${action}:${createHmac(
    'sha256',
    salt || 'local-development-only',
  )
    .update(ip)
    .digest('hex')}`;
  if (!url || !token) {
    if (process.env.NODE_ENV === 'production') return 'unavailable';
    const entry = devLimits.get(key);
    const now = Date.now();
    if (!entry || entry.until < now) {
      devLimits.set(key, { count: 1, until: now + seconds * 1000 });
      return 'allowed';
    }
    entry.count++;
    return entry.count > limit ? 'limited' : 'allowed';
  }
  try {
    if (new URL(url).protocol !== 'https:') return 'unavailable';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        'EVAL',
        "local n=redis.call('INCR',KEYS[1]);if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end;return n",
        '1',
        key,
        String(seconds),
      ]),
      cache: 'no-store',
      signal: AbortSignal.timeout(2000),
    });
    if (!response.ok) return 'unavailable';
    const data = (await response.json()) as {
      result?: unknown;
      error?: string;
    };
    if (typeof data.result !== 'number') return 'unavailable';
    return data.result > limit ? 'limited' : 'allowed';
  } catch {
    return 'unavailable';
  }
}
export type ConversionName = 'Lead' | 'Contact' | 'Schedule';
export async function sendMetaConversion(
  request: NextRequest,
  eventName: ConversionName,
  eventId: string,
  path: string,
): Promise<'sent' | 'disabled' | 'failed'> {
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  const version = process.env.META_GRAPH_VERSION;
  if (
    !serverConsent(request).marketing ||
    !pixel ||
    !/^\d+$/.test(pixel) ||
    !token ||
    !version ||
    !/^v\d+\.\d+$/.test(version)
  )
    return 'disabled';
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim();
  const ua = request.headers.get('user-agent');
  if (!ip || !ua) return 'disabled';
  const userData: Record<string, string> = {
    client_ip_address: ip,
    client_user_agent: ua,
  };
  const fbp = request.cookies.get('_fbp')?.value;
  const fbc = request.cookies.get('_fbc')?.value;
  if (fbp && /^fb\.[\d.]+$/.test(fbp)) userData.fbp = fbp;
  if (fbc && /^fb\.\d+\.\d+\.[A-Za-z0-9_-]+$/.test(fbc)) userData.fbc = fbc;
  try {
    const response = await fetch(
      `https://graph.facebook.com/${version}/${pixel}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: [
            {
              event_name: eventName,
              event_time: Math.floor(Date.now() / 1000),
              event_id: eventId,
              action_source: 'website',
              event_source_url: new URL(
                path.startsWith('/') && !path.startsWith('//') ? path : '/',
                siteOrigin(),
              ).href,
              user_data: userData,
            },
          ],
          ...(process.env.META_CAPI_TEST_EVENT_CODE
            ? { test_event_code: process.env.META_CAPI_TEST_EVENT_CODE }
            : {}),
        }),
        cache: 'no-store',
        signal: AbortSignal.timeout(2500),
      },
    );
    return response.ok ? 'sent' : 'failed';
  } catch {
    return 'failed';
  }
}
export function cleanText(value: unknown, max = 160): string {
  return typeof value === 'string'
    ? value
        .replace(/[<>\x00-\x1f]/g, '')
        .trim()
        .slice(0, max)
    : '';
}
