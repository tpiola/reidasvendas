/** Mídia local — todas as imagens são locais, otimizadas para retina */

/** Vídeo hero local (10–15 s, sem áudio) — coloque em public/videos/ */
export const LOCAL_HERO_VIDEO = {
  webm: '/videos/hero.webm',
  mp4: '/videos/hero.mp4',
  poster: '/imagens/hero-slide-1.png',
} as const;

export function pexelsHd(id: number): string {
  return `https://videos.pexels.com/video-files/${id}/${id}-hd_1920_1080_25fps.mp4`;
}

export function pexelsUhd(id: number, fps: 25 | 30 = 25): string {
  return `https://videos.pexels.com/video-files/${id}/${id}-uhd_2560_1440_${fps}fps.mp4`;
}

/** Clip único do hero Home — HD mobile / conexão lenta */
export const HERO_HOME_VIDEO = pexelsHd(4270175);
export const HERO_HOME_VIDEO_UHD = pexelsUhd(4270175);

export const PEXELS = {
  heroSkyline: pexelsUhd(3571264, 30),
  heroLifestyle: pexelsUhd(5377684),
  heroBusiness: pexelsUhd(4328609),
  profDoctor: pexelsHd(7579341),
  profEngineer: pexelsHd(3129671),
  profRetail: pexelsHd(3255277),
  profFashion: pexelsHd(6614978),
  profHardware: pexelsHd(5473967),
  profService: pexelsHd(5494297),
  profClassroom: pexelsHd(7161750),
  dubaiSkyline: pexelsHd(4270175),
  dubaiNight: pexelsHd(4197969),
  dubaiLuxury: pexelsHd(3443903),
  profCharts: pexelsHd(3943445),
  profRevenue: pexelsHd(7578652),
  goldCoins: pexelsHd(7578652),
  salesFunnel: pexelsHd(4328609),
  salesTeam: pexelsHd(5377684),
} as const;

export const HERO_PROFESSION_VIDEOS_HD = [
  PEXELS.dubaiSkyline,
  PEXELS.profRevenue,
  PEXELS.profCharts,
  pexelsHd(4197969),
  pexelsHd(3571264),
] as const;

export const HERO_PROFESSION_VIDEOS_UHD = [
  PEXELS.profDoctor,
  PEXELS.profEngineer,
  PEXELS.profFashion,
  PEXELS.profHardware,
  PEXELS.profService,
  PEXELS.profClassroom,
  PEXELS.profCharts,
  PEXELS.heroLifestyle,
  PEXELS.heroBusiness,
  PEXELS.heroSkyline,
] as const;

/** Poster local — LCP rápido */
export const HERO_POSTER_LCP = '/imagens/hero-slide-1.png';

/** Poster alta definição — desktop retina */
export const HERO_POSTER_HD = '/imagens/hero-slide-1.png';

export const HERO_POSTER_SRCSET = `${HERO_POSTER_LCP} 1200w, ${HERO_POSTER_HD} 1920w`;

/** Hero e seções premium */
export const HERO_POSTER = HERO_POSTER_HD;

/** Open Graph / Twitter — local */
export const OG_SHARE_IMAGE = '/og-image.svg';

/** Vitrine — todas locais */
export const NICHE_PHOTOS: Record<string, string> = {
  saude: '/imagens/nicho-estetica-cover.png',
  restaurante: '/imagens/nicho-restaurante-cover.png',
  comercio: '/imagens/nicho-varejo-cover.png',
  servicos: '/imagens/nicho-servicos-cover.png',
  imobiliaria: '/imagens/nicho-imobiliaria-cover.png',
  academia: '/imagens/nicho-personal-cover.png',
} as const;

/** Vendas, faturamento, lucro */
export const SALES_PHOTOS: Record<string, string> = {
  revenue: '/imagens/stock-sales-growth.png',
  profit: '/imagens/stock-digital-strategy.png',
  growth: '/imagens/stock-business-meeting.png',
  handshake: '/imagens/stock-customer-service.png',
} as const;
