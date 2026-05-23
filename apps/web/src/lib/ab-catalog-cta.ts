/** A/B leve do CTA do catálogo na Home (persiste na sessão) */

export const CATALOG_CTA_VARIANTS = {
  premium: 'Catálogo completo · premium',
  nichos: 'Ver todos os nichos',
} as const;

export type CatalogCtaVariant = keyof typeof CATALOG_CTA_VARIANTS;

const STORAGE_KEY = 'rv-catalog-cta-variant';

function pickVariant(): CatalogCtaVariant {
  return Math.random() < 0.5 ? 'premium' : 'nichos';
}

export function resolveCatalogCtaVariant(): CatalogCtaVariant {
  if (typeof window === 'undefined') return 'premium';
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === 'premium' || stored === 'nichos') return stored;
    const next = pickVariant();
    sessionStorage.setItem(STORAGE_KEY, next);
    return next;
  } catch {
    return 'premium';
  }
}

export function getCatalogCtaLabel(variant: CatalogCtaVariant): string {
  return CATALOG_CTA_VARIANTS[variant];
}
