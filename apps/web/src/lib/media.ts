/** Mídia curada (Pexels / Unsplash) — HD no hero mobile; UHD no desktop quando permitido */

export function pexelsHd(id: number): string {
  return `https://videos.pexels.com/video-files/${id}/${id}-hd_1920_1080_25fps.mp4`;
}

export function pexelsUhd(id: number, fps: 25 | 30 = 25): string {
  return `https://videos.pexels.com/video-files/${id}/${id}-uhd_2560_1440_${fps}fps.mp4`;
}

export const PEXELS = {
  heroSkyline: pexelsUhd(3571264, 30),
  heroLifestyle: pexelsUhd(5377684),
  heroBusiness: pexelsUhd(4328609),
  /** Profissionais locais — consulta, obra, varejo, ensino (planos/fechados quando possível) */
  profDoctor: pexelsHd(7579341),
  profEngineer: pexelsHd(3129671),
  profRetail: pexelsHd(3255277),
  profFashion: pexelsHd(6614978),
  profHardware: pexelsHd(5473967),
  profService: pexelsHd(5494297),
  profClassroom: pexelsHd(7161750),
  profCharts: pexelsHd(3943445),
  profRevenue: pexelsHd(7578652),
  salesFunnel: pexelsHd(4328609),
  salesTeam: pexelsHd(5377684),
} as const;

/** Sequência do hero — profissionais locais + editorial (HD = LCP rápido) */
export const HERO_PROFESSION_VIDEOS_HD = [
  PEXELS.profDoctor,
  PEXELS.profEngineer,
  PEXELS.profFashion,
  PEXELS.profHardware,
  PEXELS.profService,
  PEXELS.profClassroom,
  PEXELS.profCharts,
  pexelsHd(5377684),
  pexelsHd(4328609),
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

export const HERO_POSTER =
  'https://images.unsplash.com/photo-1486406146926-c627a92cc1b1?auto=format&fit=crop&w=1920&q=85&fm=webp';

/** Open Graph / Twitter — mesmo frame editorial do hero (1200×630) */
export const OG_SHARE_IMAGE =
  'https://images.unsplash.com/photo-1486406146926-c627a92cc1b1?auto=format&fit=crop&w=1200&h=630&q=88';

export function unsplashPhoto(id: string, w = 1600, h = 1200): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85&fm=webp`;
}

/** Nichos — fotos reais WebP */
export const NICHE_PHOTOS = {
  saude: unsplashPhoto('photo-1576091160399-175737edbf78'),
  restaurante: unsplashPhoto('photo-1517248135467-4c7edcad34c4'),
  comercio: unsplashPhoto('photo-1441986300917-64674bd600d8'),
  servicos: unsplashPhoto('photo-1552664730-d307ca884978'),
  imobiliaria: unsplashPhoto('photo-1560518883-ce09059eeffa'),
  academia: unsplashPhoto('photo-1534438327276-14e5300c3a48'),
} as const;

/** Vendas, faturamento, lucro — editorial */
export const SALES_PHOTOS = {
  revenue: unsplashPhoto('photo-1554224155-6726b3fffa30', 1200, 900),
  profit: unsplashPhoto('photo-1460925895917-afdab827c52f', 1200, 900),
  growth: unsplashPhoto('photo-1611974789855-9f2a0a3e1a4f', 1200, 900),
  handshake: unsplashPhoto('photo-1521791139204-a94e286c4c2e', 1200, 900),
} as const;
