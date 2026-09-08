/**
 * Slugs das guias de intenção — lista leve para o router.
 * Mantida fora de growth.ts para não puxar SOLUTIONS/SEO no chunk principal.
 * growth.test.ts garante paridade com GUIDES.
 */
export const GUIDE_SLUGS = [
  "quanto-custa-um-site-profissional",
  "quanto-custa-criar-um-app",
  "quanto-custa-um-saas",
  "site-ou-instagram",
  "landing-page-ou-site",
  "catalogo-digital-ou-pdf",
] as const;

export type GuideSlug = (typeof GUIDE_SLUGS)[number];
