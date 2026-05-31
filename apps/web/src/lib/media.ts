/** Mídia curada (Pexels / Unsplash) — HD no hero mobile; UHD no desktop quando permitido */

/** Vídeo hero local (skyline ao entardecer ~10s, sem áudio) — servido pelo CDN, carregamento rápido */
export const LOCAL_HERO_VIDEO = {
  webm: "/videos/hero.webm",
  mp4: "/videos/hero.mp4",
  poster: "/videos/hero-poster.webp",
} as const;

export function pexelsHd(id: number): string {
  return `https://videos.pexels.com/video-files/${id}/${id}-hd_1920_1080_25fps.mp4`;
}

export function pexelsUhd(id: number, fps: 25 | 30 = 25): string {
  return `https://videos.pexels.com/video-files/${id}/${id}-uhd_2560_1440_${fps}fps.mp4`;
}

/** Clip único do hero Home — HD mobile / conexão lenta (equipe de vendas, footage real) */
export const HERO_HOME_VIDEO = pexelsHd(5377684);

/** Hero desktop — UHD quando a rede permitir */
export const HERO_HOME_VIDEO_UHD = pexelsUhd(5377684);

/**
 * Sequência cinematográfica (mantida para heros secundários) — footage 100% real.
 * O hero da Home usa o clipe local de skyline (prosperidade) para carregamento rápido.
 */
export const HERO_HOME_SEQUENCE_HD = [
  pexelsHd(5377684), // equipe de vendas em ação
  pexelsHd(4328609), // reunião de negócios / fechamento
  pexelsHd(7578652), // receita e crescimento
] as const;

export const HERO_HOME_SEQUENCE_UHD = [
  pexelsUhd(5377684), // equipe de vendas em ação
  pexelsUhd(4328609), // reunião de negócios / fechamento
  pexelsUhd(3571264, 30), // skyline ao entardecer — prosperidade
] as const;

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

/**
 * Poster do hero — frame local do skyline (prosperidade). Servido pelo CDN (WebP),
 * pré-carregado no index.html para um LCP rápido.
 */
export const HERO_POSTER_LCP = "/videos/hero-poster-1200.webp";

/** Poster alta definição — desktop retina */
export const HERO_POSTER_HD = "/videos/hero-poster.webp";

export const HERO_POSTER_SRCSET = [
  `${HERO_POSTER_LCP} 1200w`,
  `${HERO_POSTER_HD} 1920w`,
].join(", ");

/** Hero e seções premium */
export const HERO_POSTER = HERO_POSTER_HD;

/** Open Graph / Twitter — frame editorial (1200×630), URL absoluta para crawlers */
export const OG_SHARE_IMAGE =
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=630&q=88";

export function unsplashPhoto(id: string, w = 1600, h = 1200): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=85&fm=webp`;
}

/** Nichos — fotos reais WebP */
export const NICHE_PHOTOS = {
  saude: unsplashPhoto("photo-1576091160399-175737edbf78"),
  restaurante: unsplashPhoto("photo-1517248135467-4c7edcad34c4"),
  comercio: unsplashPhoto("photo-1441986300917-64674bd600d8"),
  servicos: unsplashPhoto("photo-1552664730-d307ca884978"),
  imobiliaria: unsplashPhoto("photo-1560518883-ce09059eeffa"),
  academia: unsplashPhoto("photo-1534438327276-14e5300c3a48"),
} as const;

/**
 * Pôsteres das faixas de vídeo — um por seção, todos distintos entre si e do hero,
 * para nunca repetir a mesma imagem na página. Tema: vendas / faturamento / prosperidade.
 */
export const SECTION_POSTERS = {
  /** Preview do funil em operação — gráficos/receita */
  demo: unsplashPhoto("photo-1554224155-6726b3fffa30", 1600, 900),
  /** Funil rodando — dashboard e métricas */
  funnel: unsplashPhoto("photo-1460925895917-afdab827c52f", 1600, 900),
  /** Do clique à venda — equipe analisando crescimento */
  growth: unsplashPhoto("photo-1551288049-bebda4e38f71", 1600, 900),
  /** Rodapé / institucional — reunião de equipe */
  team: unsplashPhoto("photo-1497366754035-f200968a6e72", 1600, 900),
  /** Contato / fechamento — aperto de mãos */
  handshake: unsplashPhoto("photo-1521791139204-a94e286c4c2e", 1600, 900),
} as const;
