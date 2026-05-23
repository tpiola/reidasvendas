/** URLs de mídia curadas (Pexels / Unsplash) — qualidade alta, carregamento lazy onde aplicável */

export const PEXELS = {
  heroSkyline:
    'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
  heroLifestyle:
    'https://videos.pexels.com/video-files/5377684/5377684-uhd_2560_1440_25fps.mp4',
  heroBusiness:
    'https://videos.pexels.com/video-files/4328609/4328609-uhd_2560_1440_25fps.mp4',
} as const;

export const HERO_POSTER =
  'https://images.unsplash.com/photo-1486406146926-c627a92cc1b1?auto=format&fit=crop&w=1920&q=92&fm=webp';

/** Fotos 1600×1200 WebP — nichos e editorial */
export function nichePhoto(unsplashId: string): string {
  return `https://images.unsplash.com/${unsplashId}?auto=format&fit=crop&w=1600&h=1200&q=92&fm=webp`;
}

export const NICHE_PHOTOS = {
  saude: nichePhoto('photo-1576091160399-175737edbf78'),
  restaurante: nichePhoto('photo-1517248135467-4c7edcad34c4'),
  comercio: nichePhoto('photo-1441986300917-64674bd600d8'),
  servicos: nichePhoto('photo-1552664730-d307ca884978'),
  imobiliaria: nichePhoto('photo-1560518883-ce09059eeffa'),
  academia: nichePhoto('photo-1534438327276-14e5300c3a48'),
  governanca: nichePhoto('photo-1454165804603-cf9644fcdf5c'),
  digital: nichePhoto('photo-1460925895917-afdab827c52f'),
} as const;
