// Node-only unit tests. No browser package is required for these consent invariants.
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

function browser(cookie = '') {
  const appended: Array<{ id?: string; src?: string; async?: boolean }> = [];
  const storage = new Map<string, string>();
  const win: Record<string, unknown> = {};
  const doc = {
    cookie,
    getElementById: () => null,
    createElement: () => ({}),
    head: {
      appendChild: (node: { id?: string; src?: string; async?: boolean }) =>
        appended.push(node),
    },
  };
  vi.stubGlobal('window', win);
  vi.stubGlobal('document', doc);
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => storage.get(key) || null,
    setItem: (key: string, value: string) => storage.set(key, value),
  });
  vi.stubGlobal('location', {
    origin: 'https://www.reidasvendas.com.br',
    pathname: '/diagnostico',
    hostname: 'www.reidasvendas.com.br',
    protocol: 'https:',
    reload: vi.fn(),
  });
  return { appended, win, doc, storage };
}
function preference(
  analytics: boolean,
  marketing: boolean,
  updatedAt = new Date().toISOString(),
) {
  return `rdv_consent=${encodeURIComponent(JSON.stringify({ version: 1, analytics, marketing, updatedAt }))}`;
}
beforeEach(() => {
  vi.resetModules();
  vi.stubEnv('NEXT_PUBLIC_GA4_ID', 'G-TEST123');
  vi.stubEnv('NEXT_PUBLIC_META_PIXEL_ID', '123456789');
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe('optional measurement consent', () => {
  it('keeps GA and Meta absent on a clean visit and defaults every optional category to denied', async () => {
    const env = browser();
    const m = await import('../lib/tracking');
    m.bootTracking();
    expect(env.appended).toEqual([]);
    const rows = (env.win.dataLayer as Array<ArrayLike<unknown>>).map((row) =>
      Array.from(row),
    );
    expect(rows[0]).toEqual([
      'consent',
      'default',
      expect.objectContaining({
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      }),
    ]);
    expect(m.readConsent().analytics).toBe(false);
  });
  it('loads only GA when analytics is granted and marketing remains denied', async () => {
    const env = browser(preference(true, false));
    const m = await import('../lib/tracking');
    m.bootTracking();
    expect(env.appended.map((s) => s.id)).toEqual(['rdv-ga']);
    expect(env.win.fbq).toBeUndefined();
    const rows = (env.win.dataLayer as Array<ArrayLike<unknown>>).map((row) =>
      Array.from(row),
    );
    expect(rows).toContainEqual([
      'consent',
      'update',
      expect.objectContaining({
        analytics_storage: 'granted',
        ad_storage: 'denied',
      }),
    ]);
  });
  it('loads only Meta when marketing alone is granted', async () => {
    const env = browser(preference(false, true));
    const m = await import('../lib/tracking');
    m.bootTracking();
    expect(env.appended.map((s) => s.id)).toEqual(['rdv-meta']);
  });
  it('rejects malformed, expired and future-dated consent', async () => {
    const env = browser('rdv_consent=not-json');
    const m = await import('../lib/tracking');
    expect(m.readConsent().updatedAt).toBe('');
    env.doc.cookie = preference(
      true,
      true,
      new Date(Date.now() - 181 * 86400000).toISOString(),
    );
    expect(m.readConsent().marketing).toBe(false);
    env.doc.cookie = preference(
      true,
      true,
      new Date(Date.now() + 86400000).toISOString(),
    );
    expect(m.readConsent().analytics).toBe(false);
  });
  it('drops free text, arbitrary event names and query strings from measurement parameters', async () => {
    const env = browser(preference(true, false));
    const m = await import('../lib/tracking');
    m.bootTracking();
    const rows = env.win.dataLayer as Array<ArrayLike<unknown>>;
    const before = rows.length;
    m.track('arbitrary_event', { name: 'Customer Name' });
    expect(rows.length).toBe(before);
    m.track('form_submit', {
      page: '/diagnostico?phone=16999999999',
      source: 'email@example.com',
      name: 'Customer Name',
      placement: 'diagnostico',
    });
    const event = Array.from(rows.at(-1)!);
    expect(event[0]).toBe('event');
    expect(event[1]).toBe('form_submit');
    expect(event[2]).toEqual({
      placement: 'diagnostico',
      page_location: 'https://www.reidasvendas.com.br/diagnostico',
    });
  });
});
