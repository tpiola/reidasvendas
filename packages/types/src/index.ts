export type LeadSource =
  | 'hero'
  | 'sticky'
  | 'exit'
  | 'footer'
  | 'template_catalog'
  | 'template_page'
  | 'template_price'
  | 'template_builder';

export type AbVariant = 'A' | 'B';

export const LEAD_SOURCES = [
  'hero',
  'sticky',
  'exit',
  'footer',
  'template_catalog',
  'template_page',
  'template_price',
  'template_builder',
] as const;

export const AB_VARIANTS = ['A', 'B'] as const;

export type LeadPayload = {
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  city?: string;
  source: LeadSource;
  variant: AbVariant;
  consent: boolean;
  utm?: Record<string, string | undefined>;
  context?: Record<string, unknown>;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function isLeadSource(value: unknown): value is LeadSource {
  return typeof value === 'string' && (LEAD_SOURCES as readonly string[]).includes(value);
}

export function isAbVariant(value: unknown): value is AbVariant {
  return typeof value === 'string' && (AB_VARIANTS as readonly string[]).includes(value);
}

export function parseLeadPayload(
  input: unknown,
): { ok: true; value: LeadPayload } | { ok: false; error: string } {
  if (!isObject(input)) return { ok: false, error: 'invalid_body' };

  const email = typeof input.email === 'string' ? input.email.trim() : '';
  const consent = typeof input.consent === 'boolean' ? input.consent : false;

  if (!email) return { ok: false, error: 'invalid_email' };
  if (!consent) return { ok: false, error: 'consent_required' };

  if (!isLeadSource(input.source)) return { ok: false, error: 'invalid_source' };
  if (!isAbVariant(input.variant)) return { ok: false, error: 'invalid_variant' };

  const utmRaw = isObject(input.utm) ? input.utm : undefined;
  const utm = utmRaw
    ? (Object.fromEntries(
        Object.entries(utmRaw).map(([k, v]) => [k, typeof v === 'string' ? v : undefined]),
      ) as Record<string, string | undefined>)
    : undefined;

  const context = isObject(input.context) ? input.context : undefined;

  return {
    ok: true,
    value: {
      email,
      name: typeof input.name === 'string' && input.name.trim() ? input.name.trim() : undefined,
      phone:
        typeof input.phone === 'string' && input.phone.trim() ? input.phone.trim() : undefined,
      company:
        typeof input.company === 'string' && input.company.trim() ? input.company.trim() : undefined,
      city: typeof input.city === 'string' && input.city.trim() ? input.city.trim() : undefined,
      source: input.source,
      variant: input.variant,
      consent,
      utm,
      context,
    },
  };
}

