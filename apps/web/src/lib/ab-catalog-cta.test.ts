import { describe, expect, it } from 'vitest';
import { CATALOG_CTA_VARIANTS, getCatalogCtaLabel } from './ab-catalog-cta';

describe('ab-catalog-cta', () => {
  it('retorna labels das variantes', () => {
    expect(getCatalogCtaLabel('premium')).toBe(CATALOG_CTA_VARIANTS.premium);
    expect(getCatalogCtaLabel('nichos')).toBe(CATALOG_CTA_VARIANTS.nichos);
  });
});
