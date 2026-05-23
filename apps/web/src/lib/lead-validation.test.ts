import { describe, expect, it } from 'vitest';
import {
  suggestEmailFix,
  validateLeadEmail,
  validateLeadName,
  validateLeadPhone,
} from './lead-validation';

describe('lead-validation', () => {
  it('sugere correção de domínio com typo', () => {
    expect(suggestEmailFix('joao@gmial.com')).toBe('joao@gmail.com');
  });

  it('rejeita WhatsApp inválido', () => {
    expect(validateLeadPhone('11111111111')).toEqual({ message: 'Número inválido.' });
  });

  it('aceita nome e e-mail válidos', () => {
    expect(validateLeadName('Maria Silva')).toBeNull();
    expect(validateLeadEmail('maria@gmail.com')).toBeNull();
    expect(validateLeadPhone('(16) 99233-3344')).toBeNull();
  });
});
