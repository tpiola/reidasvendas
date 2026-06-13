import {
    HERO_POSTER,
    HERO_HOME_VIDEO,
    HERO_HOME_VIDEO_UHD,
    HERO_PROFESSION_VIDEOS_HD,
    HERO_PROFESSION_VIDEOS_UHD,
    LOCAL_HERO_VIDEO,
    PEXELS,
} from '@/lib/media';

export const BRAND = {
    name: 'Rei das Vendas',
    domain: 'reidasvendas.com.br',
    email: 'contato@reidasvendas.com.br',
    phone: '5516992333344',
    whatsappText: 'Ol\u00e1! Vi o site da Rei das Vendas e quero um or\u00e7amento.',
    whatsappLink:
          'https://wa.me/5516992333344?text=Ol%C3%A1!%20Vi%20o%20site%20da%20Rei%20das%20Vendas%20e%20quero%20um%20or%C3%A7amento.',
    webhookSecretHeader: 'X-ReiDasVendas-Webhook-Secret',
    heroVideosHd: [...HERO_PROFESSION_VIDEOS_HD],
    heroVideosUhd: [...HERO_PROFESSION_VIDEOS_UHD],
    heroLocalMp4: LOCAL_HERO_VIDEO.mp4,
    heroVideoWebm: LOCAL_HERO_VIDEO.webm,
    heroVideoUrl: HERO_HOME_VIDEO,
    heroHomeVideo: HERO_HOME_VIDEO,
    heroHomeVideoUhd: HERO_HOME_VIDEO_UHD,
    heroPosterUrl: HERO_POSTER,
    inlineVideos: {
          // Cada canal usa um v\u00eddeo \u00fanico — sem repeti\u00e7\u00e3o entre p\u00e1ginas
      manifesto: PEXELS.profRevenue,        // Home CinematicBand — 4328609 executivos/receita
          performance: PEXELS.profCharts,       // Home StoryVideoBand / Negocios — 3943445 gr\u00e1ficos
          salesTeam: PEXELS.salesTeam,          // Time comercial — 3205574 (novo)
          salesFunnel: PEXELS.salesFunnel,      // Solucoes / Planos — 6774814 (novo)
    },
    baseCity: 'Franca / SP',
    mapsQuery: 'Franca SP',
    instagram: '#', // Em breve
    linkedin: '#', // Em breve
    facebook: null as string | null,
    twitter: null as string | null,
} as const;
