import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => ({
  validOrigin: vi.fn(),
  rateLimit: vi.fn(),
  serverConsent: vi.fn(),
  sendMetaConversion: vi.fn(),
  after: vi.fn(),
}));
vi.mock('../lib/server-events', () => ({
  ...mocks,
  cleanText: (value: unknown, max = 160) =>
    typeof value === 'string'
      ? value
          .replace(/[<>\x00-\x1f]/g, '')
          .trim()
          .slice(0, max)
      : '',
}));
vi.mock('next/server', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/server')>()),
  after: mocks.after,
}));
import { POST } from '../lib/api-lead';
import { GET } from '../lib/api-whatsapp';
const payload = {
  name: 'Pessoa Teste',
  phone: '16999990000',
  company: 'Empresa Teste',
  challenge: 'Melhorar o caminho do site',
  contactConsent: true,
  website: '',
  eventId: '12345678-1234-1234-1234-123456789012',
  page: '/diagnostico',
};
const request = (body: unknown, headers: Record<string, string> = {}) =>
  new NextRequest('https://www.reidasvendas.com.br/api/lead', {
    method: 'POST',
    headers: {
      origin: 'https://www.reidasvendas.com.br',
      'content-type': 'application/json',
      ...headers,
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
beforeEach(() => {
  vi.clearAllMocks();
  mocks.validOrigin.mockReturnValue(true);
  mocks.rateLimit.mockResolvedValue('allowed');
  mocks.serverConsent.mockReturnValue({ analytics: false, marketing: false });
  vi.stubEnv('CRM_API_URL', '');
  vi.stubEnv('CRM_API_KEY', '');
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
describe('lead submission safety', () => {
  it('rejects foreign origin without touching CRM or limiter', async () => {
    mocks.validOrigin.mockReturnValue(false);
    expect((await POST(request(payload))).status).toBe(403);
    expect(mocks.rateLimit).not.toHaveBeenCalled();
  });
  it('rejects unsupported types and oversized bodies', async () => {
    expect(
      (await POST(request(payload, { 'content-type': 'text/plain' }))).status,
    ).toBe(415);
    expect(
      (await POST(request(payload, { 'content-length': '12001' }))).status,
    ).toBe(413);
  });
  it('fails closed when production rate limiting is unavailable', async () => {
    mocks.rateLimit.mockResolvedValue('unavailable');
    expect((await POST(request(payload))).status).toBe(503);
    mocks.rateLimit.mockResolvedValue('limited');
    const response = await POST(request(payload));
    expect(response.status).toBe(429);
    expect(response.headers.get('retry-after')).toBe('600');
  });
  it('validates fields, contact consent and honeypot', async () => {
    const invalid = await POST(
      request({ ...payload, name: '', phone: '123', contactConsent: false }),
    );
    expect(invalid.status).toBe(422);
    expect((await invalid.json()).errors).toHaveProperty('contactConsent');
    expect((await POST(request({ ...payload, website: 'spam' }))).status).toBe(
      400,
    );
    expect((await POST(request('{broken'))).status).toBe(400);
  });
  it('never confirms a lead when CRM is absent or returns an unconfirmed success', async () => {
    expect((await POST(request(payload))).status).toBe(503);
    vi.stubEnv('CRM_API_URL', 'https://crm.example.test/leads');
    vi.stubEnv('CRM_API_KEY', 'test-only');
    const fetch = vi
      .fn()
      .mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetch);
    expect((await POST(request(payload))).status).toBe(502);
    expect(mocks.after).not.toHaveBeenCalled();
  });
  it('keeps attribution out of CRM without analytics consent and accepts only confirmed CRM creation', async () => {
    vi.stubEnv('CRM_API_URL', 'https://crm.example.test/leads');
    vi.stubEnv('CRM_API_KEY', 'test-only');
    const fetch = vi
      .fn()
      .mockResolvedValue(new Response('{"id":"test-lead"}', { status: 201 }));
    vi.stubGlobal('fetch', fetch);
    const response = await POST(
      request({ ...payload, attribution: { source: 'google', medium: 'cpc' } }),
    );
    expect(response.status).toBe(200);
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body.attribution).toEqual({});
    expect(body.phone).toBe('5516999990000');
    expect(body.consent.marketing).toBe(false);
    expect((await response.json()).eventId).toBe(payload.eventId);
    expect(mocks.after).toHaveBeenCalledOnce();
  });
});
describe('WhatsApp redirect safety', () => {
  it('ignores arbitrary redirect, message and page injection while staying usable without consent', async () => {
    const response = await GET(
      new NextRequest(
        'https://www.reidasvendas.com.br/go/whatsapp?url=https://attacker.test&src=https://attacker.test&page=//attacker.test&text=secret',
      ),
    );
    expect(response.status).toBe(302);
    const target = new URL(response.headers.get('location')!);
    expect(target.origin).toBe('https://wa.me');
    expect(target.pathname).toBe('/5516992333344');
    expect(target.searchParams.get('text')).not.toContain('secret');
    expect(response.headers.get('cache-control')).toBe('private, no-store');
    expect(mocks.after).not.toHaveBeenCalled();
  });
  it('does not emit server conversion for external referral', async () => {
    await GET(
      new NextRequest(
        `https://www.reidasvendas.com.br/go/whatsapp?event_id=${payload.eventId}`,
        { headers: { referer: 'https://attacker.test' } },
      ),
    );
    expect(mocks.after).not.toHaveBeenCalled();
  });
});
