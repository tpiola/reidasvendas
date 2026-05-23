/** Validação de lead — reduzir typos e dados inválidos */

const EMAIL_DOMAIN_FIXES: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'hotmial.com': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outllok.com': 'outlook.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'iclod.com': 'icloud.com',
  'icloud.con': 'icloud.com',
};

const DISPOSABLE_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'guerrillamail.com',
  '10minutemail.com',
  'yopmail.com',
]);

function hasExcessiveRepeats(value: string): boolean {
  return /(.)\1{4,}/i.test(value);
}

export function suggestEmailFix(email: string): string | null {
  const trimmed = email.trim().toLowerCase();
  const at = trimmed.lastIndexOf('@');
  if (at < 1) return null;
  const local = trimmed.slice(0, at);
  let domain = trimmed.slice(at + 1);
  if (domain.endsWith('.con')) domain = `${domain.slice(0, -3)}com`;
  if (domain.endsWith('.comm')) domain = `${domain.slice(0, -4)}com`;
  const fixedDomain = EMAIL_DOMAIN_FIXES[domain] ?? domain;
  if (fixedDomain !== domain || trimmed.includes('.con')) {
    return `${local}@${fixedDomain}`;
  }
  return null;
}

export type FieldError = { message: string; suggestion?: string };

export function validateLeadName(name: string): FieldError | null {
  const n = name.trim();
  if (n.length < 3) return { message: 'Informe seu nome completo.' };
  if (n.length > 80) return { message: 'Nome muito longo.' };
  if (/\d/.test(n)) return { message: 'Nome não pode conter números.' };
  if (hasExcessiveRepeats(n)) return { message: 'Confira se o nome está correto.' };
  if (!/^[\p{L}\s'.-]+$/u.test(n)) return { message: 'Use apenas letras no nome.' };
  const letters = n.replace(/[^\p{L}]/gu, '');
  if (letters.length < 2) return { message: 'Informe um nome válido.' };
  return null;
}

export function validateLeadEmail(email: string): FieldError | null {
  const e = email.trim().toLowerCase();
  if (!e) return { message: 'E-mail obrigatório.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)) {
    return { message: 'E-mail inválido.' };
  }
  const domain = e.split('@')[1];
  if (domain && DISPOSABLE_DOMAINS.has(domain)) {
    return { message: 'Use um e-mail profissional ou pessoal fixo.' };
  }
  const suggestion = suggestEmailFix(e);
  if (suggestion && suggestion !== e) {
    return { message: 'Confira o domínio do e-mail.', suggestion: `Quis dizer ${suggestion}?` };
  }
  return null;
}

export function normalizeBrazilPhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (digits.startsWith('55') && digits.length >= 12) return digits.slice(2);
  return digits;
}

export function validateLeadPhone(phone: string): FieldError | null {
  const digits = normalizeBrazilPhone(phone);
  if (!digits) return { message: 'WhatsApp obrigatório.' };
  if (digits.length < 10 || digits.length > 11) {
    return { message: 'WhatsApp com DDD — 10 ou 11 dígitos.' };
  }
  if (/^(\d)\1+$/.test(digits)) return { message: 'Número inválido.' };
  const ddd = parseInt(digits.slice(0, 2), 10);
  if (ddd < 11 || ddd > 99) return { message: 'DDD inválido.' };
  return null;
}

export function formatPhoneDisplay(digits: string): string {
  const d = normalizeBrazilPhone(digits);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7, 11)}`;
}
