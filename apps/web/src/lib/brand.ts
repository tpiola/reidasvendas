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
  whatsappText:
    'Olá! Vi o site e quero entender como colocar meu negócio para vender com mais previsibilidade.',
  whatsappLink:
    'https://wa.me/5516992333344?text=Ol%C3%A1!%20Vi%20o%20site%20e%20quero%20entender%20como%20colocar%20meu%20neg%C3%B3cio%20para%20vender%20com%20mais%20previsibilidade.',
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
    manifesto: PEXELS.profRevenue,
    performance: PEXELS.profCharts,
    salesTeam: PEXELS.salesTeam,
    salesFunnel: PEXELS.salesFunnel,
  },
  baseCity: 'Franca / SP',
  mapsQuery: 'Franca SP',
  instagram: null as string | null,
  linkedin: null as string | null,
  facebook: null as string | null,
  twitter: null as string | null,
} as const;
