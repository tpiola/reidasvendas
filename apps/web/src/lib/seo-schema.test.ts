import { describe, expect, it } from 'vitest';
import { buildHomeJsonLd } from './seo-schema';

describe('buildHomeJsonLd', () => {
  it('inclui LocalBusiness, FAQ e Reviews no grafo', () => {
    const json = buildHomeJsonLd(
      [{ id: 'a', question: 'Prazo?', answer: 'Até 72h.' }],
      [{ id: 'r1', author: 'Cliente', reviewBody: 'Ótimo.', ratingValue: 5 }],
    );

    expect(json['@context']).toBe('https://schema.org');
    const graph = json['@graph'] as { '@type': string | string[] }[];
    const types = graph.flatMap((n) => (Array.isArray(n['@type']) ? n['@type'] : [n['@type']]));
    expect(types).toContain('FAQPage');
    expect(types).toContain('Review');
    expect(types).toContain('AggregateRating');
    expect(types.some((t) => t === 'LocalBusiness' || types.join().includes('LocalBusiness'))).toBe(true);
  });
});
