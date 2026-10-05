import { afterEach, describe, expect, it, vi } from 'vitest';
import handler from '../../../../api/lead';

type CapturedResponse = {
  status: number;
  headers: Record<string, string>;
  body: unknown;
};

function responseCapture() {
  const captured: CapturedResponse = { status: 0, headers: {}, body: undefined };
  return {
    captured,
    response: {
      setHeader(key: string, value: string) {
        captured.headers[key] = value;
      },
      status(code: number) {
        captured.status = code;
        return {
          json(body: unknown) {
            captured.body = body;
          },
        };
      },
    },
  };
}

const validLead = {
  name: 'Pessoa de teste',
  email: 'teste@example.com',
  phone: '16999999999',
  company: 'Negócio local',
  problem: 'Organizar a entrada de novos contatos.',
  consent: true,
  website: '',
};

describe('API de diagnóstico', () => {
  afterEach(() => {
    delete process.env.LEAD_WEBHOOK_URL;
    delete process.env.N8N_WEBHOOK_URL;
    vi.unstubAllGlobals();
  });

  it('valida o lead e devolve handoff explícito quando não há webhook configurado', async () => {
    const { captured, response } = responseCapture();

    await handler({
      method: 'POST',
      headers: {
        origin: 'https://reidasvendas.com.br',
        'content-type': 'application/json',
        'x-forwarded-for': '203.0.113.10',
        'x-idempotency-key': 'lead-test-valid-0001',
      },
      body: validLead,
    }, response);

    expect(captured.status).toBe(202);
    expect(captured.body).toEqual(expect.objectContaining({
      ok: true,
      delivery: 'whatsapp_handoff',
    }));
  });

  it('bloqueia submissão sem consentimento antes de qualquer entrega externa', async () => {
    const { captured, response } = responseCapture();

    await handler({
      method: 'POST',
      headers: {
        origin: 'https://reidasvendas.com.br',
        'content-type': 'application/json',
        'x-forwarded-for': '203.0.113.11',
      },
      body: { ...validLead, consent: false },
    }, response);

    expect(captured.status).toBe(400);
    expect(captured.body).toEqual({ ok: false, error: 'consent_required' });
  });

  it('aceita e-mail vazio e preserva plano, cobrança e origem no webhook confirmado', async () => {
    process.env.LEAD_WEBHOOK_URL = 'https://example.com/test-intake';
    const delivery = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', delivery);
    const { captured, response } = responseCapture();
    await handler({ method: 'POST', headers: { 'x-forwarded-for': '203.0.113.12', 'x-idempotency-key': 'lead-optional-email' }, body: { ...validLead, email: '', plan: 'base', billing: 'anual', origin: 'planos' } }, response);
    expect(captured.status).toBe(202);
    expect(captured.body).toMatchObject({ delivery: 'webhook' });
    expect(captured.headers['Cache-Control']).toBe('no-store');
    expect(JSON.parse(delivery.mock.calls[0][1].body)).toMatchObject({ email: '', plan: 'base', billing: 'anual', origin: 'planos' });
    expect(delivery.mock.calls[0][1].headers['X-Idempotency-Key']).toBe('lead-optional-email');
    const duplicate = responseCapture();
    await handler({ method: 'POST', headers: { 'x-forwarded-for': '203.0.113.12', 'x-idempotency-key': 'lead-optional-email' }, body: { ...validLead, email: '', plan: 'base', billing: 'anual', origin: 'planos' } }, duplicate.response);
    expect(duplicate.captured.body).toMatchObject({ duplicate: true });
    expect(delivery).toHaveBeenCalledTimes(1);
    const conflict = responseCapture();
    await handler({ method: 'POST', headers: { 'x-forwarded-for': '203.0.113.12', 'x-idempotency-key': 'lead-optional-email' }, body: { ...validLead, name: 'Outro contexto' } }, conflict.response);
    expect(conflict.captured.status).toBe(409);
  });

  it('recusa origem de outro projeto Vercel', async () => {
    const { captured, response } = responseCapture();
    await handler({ method: 'POST', headers: { origin: 'https://unrelated.vercel.app' }, body: validLead }, response);
    expect(captured.status).toBe(403);
  });

  it('não confirma recebimento quando o webhook falha', async () => {
    process.env.LEAD_WEBHOOK_URL = 'https://example.com/test-intake';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    const { captured, response } = responseCapture();
    await handler({ method: 'POST', headers: { 'x-forwarded-for': '203.0.113.13' }, body: validLead }, response);
    expect(captured.status).toBe(502);
    expect(captured.body).toMatchObject({ ok: false });
  });
});
