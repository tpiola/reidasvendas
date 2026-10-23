// Node-only unit tests. No browser package is required for these consent invariants.
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
vi.mock('server-only', () => ({}));
vi.mock('next/server', async (original) => ({
  ...(await original<typeof import('next/server')>()),
  after: vi.fn(),
}));

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

describe('subscription event boundaries and dimensions', () => {
  it('normalizes only approved plans and cycles; drops invented IDs and PII', async () => {
    const env = browser(preference(true, false));
    const m = await import('../lib/tracking');
    m.bootTracking();
    const rows = env.win.dataLayer as Array<ArrayLike<unknown>>;
    m.track('plan_select', {
      plan_id: 'profissional',
      billing_cycle: 'annual',
      page: '/planos',
      source: 'google',
      campaign: '16992333344',
      company: 'Private Company',
    });
    expect(Array.from(rows.at(-1)!)[2]).toEqual({
      plan_id: 'profissional',
      billing_cycle: 'anual',
      page: '/planos',
      source: 'google',
      page_location: 'https://www.reidasvendas.com.br/diagnostico',
    });
    m.track('plan_select', {
      plan_id: 'inventado',
      billing_cycle: 'vitalicio',
    });
    expect(Array.from(rows.at(-1)!)[2]).toEqual({
      page_location: 'https://www.reidasvendas.com.br/diagnostico',
    });
  });
  it('never turns a CTA or thank-you visit into a purchase or subscription', async () => {
    const env = browser(preference(true, true));
    const m = await import('../lib/tracking');
    m.bootTracking();
    const rows = env.win.dataLayer as Array<ArrayLike<unknown>>;
    const before = rows.length;
    m.track('purchase', { event_id: crypto.randomUUID() });
    m.track('subscription_created', { event_id: crypto.randomUUID() });
    m.track('subscription_renewal', { event_id: crypto.randomUUID() });
    expect(rows).toHaveLength(before);
    m.trackPageView('/obrigado');
    expect(Array.from(rows.at(-1)!)[1]).toBe('page_view');
    const pixel = env.win.fbq as { queue: unknown[][] };
    expect(
      pixel.queue.filter(
        (row) => row[1] === 'Purchase' || row[1] === 'Subscribe',
      ),
    ).toHaveLength(0);
  });
  it('deduplicates confirmed conversions by event ID and rejects unrelated Meta Lead classification', async () => {
    const env = browser(preference(true, true));
    const m = await import('../lib/tracking');
    m.bootTracking();
    const id = crypto.randomUUID();
    m.track(
      'whatsapp_click',
      { event_id: id, plan_id: 'essencial' },
      'Contact',
    );
    m.track(
      'whatsapp_click',
      { event_id: id, plan_id: 'essencial' },
      'Contact',
    );
    m.track('plan_view', { event_id: crypto.randomUUID() }, 'Lead');
    const pixel = env.win.fbq as { queue: unknown[][] };
    expect(pixel.queue.filter((row) => row[1] === 'Contact')).toHaveLength(1);
    expect(pixel.queue.filter((row) => row[1] === 'Lead')).toHaveLength(0);
    const contact = pixel.queue.find((row) => row[1] === 'Contact')!;
    expect(contact[3]).toEqual({ eventID: id });
  });
  it('does not retain attribution without analytics permission', async () => {
    browser();
    const storage = { getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn() };
    vi.stubGlobal('sessionStorage', storage);
    const m = await import('../lib/tracking');
    m.bootTracking();
    expect(m.getAttribution()).toEqual({});
    expect(storage.getItem).not.toHaveBeenCalled();
    expect(storage.setItem).not.toHaveBeenCalled();
  });
});

describe('deterministic WhatsApp destination', () => {
  it('uses a fixed number and safe plan/cycle language without claiming payment', async () => {
    const m = await import('../lib/whatsapp');
    const url = m.whatsappDestination({
      src: 'obrigado',
      page: '/obrigado',
      plan: 'escala',
      cycle: 'monthly',
      source: 'google',
      campaign: 'private-value',
    });
    expect(url.origin + url.pathname).toBe('https://wa.me/5516992333344');
    expect(url.searchParams.get('text')).toContain(
      'plano Escala, com cobrança mensal',
    );
    expect(url.searchParams.get('text')).toContain('Google');
    expect(url.searchParams.get('text')).not.toContain('private-value');
    expect(url.searchParams.get('text')).not.toMatch(
      /pagamento confirmado|assinatura confirmada/i,
    );
  });
  it('does not reflect malicious page/src/cycle or raw campaign into the message', async () => {
    const m = await import('../lib/whatsapp');
    const url = m.whatsappDestination({
      src: 'https://attacker.test',
      page: '//attacker.test?phone=123',
      plan: '<script>',
      cycle: 'vitalicio',
      campaign: 'email@example.com',
    });
    expect(url.origin + url.pathname).toBe('https://wa.me/5516992333344');
    expect(url.searchParams.get('text')).not.toMatch(
      /attacker|script|vitalicio|example|123/,
    );
    expect(
      m.sanitizeAttribution({
        source: 'google',
        medium: 'cpc',
        campaign: 'site-franca',
        email: 'private@example.com',
      }),
    ).toEqual({ source: 'google', medium: 'cpc', campaign: 'site-franca' });
    expect(
      m.sanitizeAttribution({
        source: '16992333344',
        medium: 'a@b.com',
        campaign: 'cliente 123',
      }),
    ).toEqual({});
  });
});

describe('WhatsApp HTTP route degrades without blocking contact', () => {
  it('redirects safely without Redis or tracking consent, including hostile redirect parameters', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('RATE_LIMIT_SALT', '');
    const { NextRequest, after } = await import('next/server');
    const { GET } = await import('../app/go/whatsapp/route');
    const response = await GET(
      new NextRequest(
        'https://www.reidasvendas.com.br/go/whatsapp?plan=profissional&ciclo=annual&redirect=https://attacker.test&source=google',
      ),
    );
    expect(response.status).toBe(302);
    const target = new URL(response.headers.get('location')!);
    expect(target.origin + target.pathname).toBe('https://wa.me/5516992333344');
    expect(target.searchParams.get('text')).toContain(
      'plano Profissional, com cobrança anual',
    );
    expect(response.headers.get('cache-control')).toContain('no-store');
    expect(after).not.toHaveBeenCalled();
  });
  it('skips optional CAPI when durable rate limiter is unavailable, while keeping the redirect', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    vi.stubEnv('RATE_LIMIT_SALT', '');
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    const { NextRequest, after } = await import('next/server');
    vi.mocked(after).mockClear();
    const { GET } = await import('../app/go/whatsapp/route');
    const response = await GET(
      new NextRequest(
        `https://www.reidasvendas.com.br/go/whatsapp?src=planos&event_id=${crypto.randomUUID()}`,
        {
          headers: {
            referer: 'https://www.reidasvendas.com.br/planos',
            cookie: preference(false, true),
          },
        },
      ),
    );
    expect(response.status).toBe(302);
    expect(after).toHaveBeenCalledTimes(1);
    const job = vi.mocked(after).mock.calls[0][0];
    if (typeof job === 'function') await job();
    expect(fetch).not.toHaveBeenCalled();
  });
});

describe('Meta page-context privacy', () => {
  it('holds the Pixel on a free-form/PII query while allowing controlled ad labels', async () => {
    const env = browser(preference(false, true));
    vi.stubGlobal('location', {
      origin: 'https://www.reidasvendas.com.br',
      pathname: '/planos',
      search: '?email=private@example.com',
      protocol: 'https:',
      hostname: 'www.reidasvendas.com.br',
    });
    const m = await import('../lib/tracking');
    m.bootTracking();
    expect(m.canUseMetaPageContext()).toBe(false);
    expect(env.appended).toEqual([]);
    vi.stubGlobal('location', {
      origin: 'https://www.reidasvendas.com.br',
      pathname: '/planos',
      search:
        '?utm_source=meta&utm_campaign=sites-franca&plan=essencial&cycle=annual',
      protocol: 'https:',
      hostname: 'www.reidasvendas.com.br',
    });
    expect(m.canUseMetaPageContext()).toBe(true);
  });
});

describe('consented Meta funnel events', () => {
  it('sends no standard or custom marketing events while optional consent is denied', async () => {
    const env = browser();
    const fbq = vi.fn();
    env.win.fbq = fbq;
    const m = await import('../lib/tracking');
    m.bootTracking();
    for (const name of [
      'plan_view',
      'service_view',
      'checkout_start',
      'plan_select',
      'quiz_complete',
      'calculator_result',
    ])
      m.track(name, { plan_id: 'essencial', score: 2 });
    m.track('whatsapp_click', { event_id: crypto.randomUUID() }, 'Contact');
    expect(
      fbq.mock.calls.filter(
        ([command]) => command === 'track' || command === 'trackCustom',
      ),
    ).toEqual([]);
    expect(env.appended).toEqual([]);
  });
  it('dispatches approved standards and safe custom signals without revenue or duplicate PageView', async () => {
    const env = browser(preference(false, true));
    const m = await import('../lib/tracking');
    m.bootTracking();
    const pixel = env.win.fbq as { queue: unknown[][] };
    m.track('plan_view', {
      plan_id: 'profissional',
      billing_cycle: 'annual',
      page: '/planos',
      email: 'private@example.com',
    });
    m.track('service_view', { service: 'seo-local', page: '/seo-local' });
    // Called by checkout UI only after its API has returned a validated hosted Checkout URL.
    m.track('checkout_start', {
      plan_id: 'profissional',
      billing_cycle: 'anual',
      page: '/checkout',
    });
    m.track('plan_select', { plan_id: 'profissional', billing_cycle: 'anual' });
    m.track('quiz_complete', {
      score: 3,
      name: 'Private Name',
      campaign: 'private@example.com',
    });
    m.track('calculator_result', { score: 2 });
    m.track('page_view', { page: '/planos' });
    m.track('purchase', { event_id: crypto.randomUUID() });
    m.track('subscription_created', { event_id: crypto.randomUUID() });
    expect(
      pixel.queue.filter(
        (row) => row[0] === 'track' && row[1] === 'ViewContent',
      ),
    ).toHaveLength(2);
    expect(pixel.queue).toContainEqual([
      'track',
      'InitiateCheckout',
      { plan_id: 'profissional', billing_cycle: 'anual', page: '/checkout' },
    ]);
    expect(pixel.queue).toContainEqual([
      'trackCustom',
      'plan_select',
      { plan_id: 'profissional', billing_cycle: 'anual' },
    ]);
    expect(pixel.queue).toContainEqual([
      'trackCustom',
      'quiz_complete',
      { score: 3 },
    ]);
    expect(pixel.queue).toContainEqual([
      'trackCustom',
      'calculator_result',
      { score: 2 },
    ]);
    expect(pixel.queue.filter((row) => row[1] === 'PageView')).toHaveLength(1);
    expect(JSON.stringify(pixel.queue)).not.toMatch(
      /private@example|Private Name|Purchase|subscription_created/,
    );
    const count = pixel.queue.length;
    vi.stubGlobal('location', {
      origin: 'https://www.reidasvendas.com.br',
      pathname: '/planos',
      search: '?email=private@example.com',
    });
    m.track('plan_view', { plan_id: 'essencial' });
    m.track('quiz_complete', { score: 3 });
    expect(pixel.queue).toHaveLength(count);
  });
});
