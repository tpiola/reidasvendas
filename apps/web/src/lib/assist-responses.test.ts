import { describe, expect, it } from 'vitest';
import { buildAssistGreeting, matchAssistReply } from './assist-responses';

describe('assist-responses', () => {
  it('saúda com nome quando disponível', () => {
    expect(buildAssistGreeting('Ana')).toContain('Ana');
  });

  it('encaminha perguntas de preço para planos', () => {
    const r = matchAssistReply('quanto custa o plano?');
    expect(r.links?.some((l) => l.href === '/planos')).toBe(true);
  });
});
