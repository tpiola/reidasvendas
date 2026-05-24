/** Meta-tags unificadas — Home e fallback HTML */

import { OG_SHARE_IMAGE } from '@/lib/media';

export const SITE_NAME = 'Rei das Vendas';

export const HOME_SEO = {
  title: 'Rei das Vendas — Seu negócio vendendo como as gigantes | Franca-SP',
  description:
    'Site, funil, WhatsApp e automação para negócios locais. Primeira versão em até 72h. Orçamento em 24h.',
} as const;

/** Raster 1200×630 (frame editorial do hero) — melhor preview em redes */
export const DEFAULT_OG_IMAGE = OG_SHARE_IMAGE;

export const DEFAULT_OG_IMAGE_ALT = 'Rei das Vendas — Seu negócio local vendendo como as gigantes';

/** Fallback SVG local quando raster não carregar */
export const FALLBACK_OG_IMAGE_SVG = 'https://reidasvendas.com.br/og-image.svg';
