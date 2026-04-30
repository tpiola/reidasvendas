import { describe, expect, it } from 'vitest';

import { isAbVariant, isLeadSource, parseLeadPayload } from './index';

describe('types', () => {
  it('valida LeadSource e AbVariant', () => {
    expect(isLeadSource('hero')).toBe(true);
    expect(isLeadSource('popup')).toBe(false);
    expect(isAbVariant('A')).toBe(true);
    expect(isAbVariant('C')).toBe(false);
  });

  it('parseia LeadPayload válido', () => {
    const parsed = parseLeadPayload({
      email: '  a@b.com  ',
      consent: true,
      source: 'hero',
      variant: 'B',
      utm: { utm_source: 'google', utm_term: 123 },
      context: { foo: 'bar' },
    });

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    expect(parsed.value.email).toBe('a@b.com');
    expect(parsed.value.source).toBe('hero');
    expect(parsed.value.variant).toBe('B');
    expect(parsed.value.utm?.utm_source).toBe('google');
    expect(parsed.value.utm?.utm_term).toBe(undefined);
    expect(parsed.value.context?.foo).toBe('bar');
  });

  it('rejeita body inválido e campos obrigatórios', () => {
    expect(parseLeadPayload(null)).toEqual({ ok: false, error: 'invalid_body' });
    expect(parseLeadPayload({ email: 'a@b.com' })).toEqual({ ok: false, error: 'consent_required' });
    expect(
      parseLeadPayload({ email: 'a@b.com', consent: true, variant: 'A' }),
    ).toEqual({ ok: false, error: 'invalid_source' });
    expect(
      parseLeadPayload({ email: 'a@b.com', consent: true, source: 'hero', variant: 'C' }),
    ).toEqual({ ok: false, error: 'invalid_variant' });
  });
});

