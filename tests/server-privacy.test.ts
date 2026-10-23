import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
vi.mock('server-only', () => ({}));
import {
  rateLimit,
  sendMetaConversion,
  serverConsent,
  validOrigin,
} from '../lib/server-events';
const origin = 'https://www.reidasvendas.com.br';
const consentCookie = (marketing: boolean, age = 0) =>
  `rdv_consent=${encodeURIComponent(JSON.stringify({ version: 1, analytics: false, marketing, updatedAt: new Date(Date.now() - age).toISOString() }))}`;
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
describe('server privacy boundaries', () => {
  it('denies missing, stale or malformed optional consent', () => {
    for (const cookie of [
      '',
      'rdv_consent=broken',
      consentCookie(true, 181 * 86400000),
    ])
      expect(
        serverConsent(new NextRequest(origin, { headers: { cookie } })),
      ).toEqual({ analytics: false, marketing: false });
    expect(
      serverConsent(
        new NextRequest(origin, { headers: { cookie: consentCookie(true) } }),
      ),
    ).toEqual({ analytics: false, marketing: true });
  });
  it('requires exact production origin and disallows absent/foreign origins', () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', origin);
    expect(validOrigin(new NextRequest(origin, { headers: { origin } }))).toBe(
      true,
    );
    expect(
      validOrigin(
        new NextRequest(origin, {
          headers: { origin: 'https://reidasvendas.com.br.attacker.test' },
        }),
      ),
    ).toBe(false);
    expect(validOrigin(new NextRequest(origin))).toBe(false);
  });
  it('fails closed in production without durable limiter secrets', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('RATE_LIMIT_SALT', '');
    vi.stubEnv('UPSTASH_REDIS_REST_URL', '');
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '');
    expect(await rateLimit(new NextRequest(origin), 'lead')).toBe(
      'unavailable',
    );
  });
  it('stores only a salted address digest in short-lived limiter keys', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('RATE_LIMIT_SALT', 'unit-test-only');
    vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://redis.example.test');
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'unit-test-only');
    const fetch = vi.fn().mockResolvedValue(new Response('{"result":1}'));
    vi.stubGlobal('fetch', fetch);
    expect(
      await rateLimit(
        new NextRequest(origin, {
          headers: { 'x-forwarded-for': '192.0.2.10' },
        }),
        'lead',
      ),
    ).toBe('allowed');
    const serialized = fetch.mock.calls[0][1].body as string;
    expect(serialized).not.toContain('192.0.2.10');
    expect(serialized).toContain('EXPIRE');
  });
  it('never sends CAPI without advertising consent even with configured credentials', async () => {
    vi.stubEnv('NEXT_PUBLIC_META_PIXEL_ID', '1234567890');
    vi.stubEnv('META_CAPI_ACCESS_TOKEN', 'unit-test-only');
    vi.stubEnv('META_GRAPH_VERSION', 'v99.0');
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    expect(
      await sendMetaConversion(
        new NextRequest(origin, {
          headers: {
            'x-forwarded-for': '192.0.2.10',
            'user-agent': 'Test',
            cookie: consentCookie(false),
          },
        }),
        'Contact',
        'test-event-id',
        '/contato',
      ),
    ).toBe('disabled');
    expect(fetch).not.toHaveBeenCalled();
  });
});
