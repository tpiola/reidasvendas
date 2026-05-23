import {
  HERO_POSTER,
  HERO_PROFESSION_VIDEOS_HD,
  HERO_PROFESSION_VIDEOS_UHD,
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
  heroVideoUrl: HERO_PROFESSION_VIDEOS_UHD[0],
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
