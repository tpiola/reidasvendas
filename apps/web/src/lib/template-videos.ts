import { PEXELS } from '@/lib/media';

/** Vídeo demo por template (amostras) */
export const TEMPLATE_DEMO_VIDEOS: Record<string, string> = {
  'estetica-lux': PEXELS.profDoctor,
  'odontologia-pro': PEXELS.profDoctor,
  'personal-prime': PEXELS.profFashion,
  'restaurante-chef': PEXELS.profRetail,
  'varejo-prime': PEXELS.profRetail,
  'imobiliaria-gold': PEXELS.heroLifestyle,
  'advocacia-soberana': PEXELS.profService,
  'educacao-master': PEXELS.profClassroom,
  'servicos-b2b': PEXELS.profService,
};

export function getTemplateDemoVideo(slug: string): string {
  return TEMPLATE_DEMO_VIDEOS[slug] ?? PEXELS.profCharts;
}
