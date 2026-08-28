import { afterEach, describe, expect, it } from 'vitest';
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
});
