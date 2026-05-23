import { HERO_POSTER, PEXELS } from '@/lib/media';

export const BRAND = {
  name: 'Rei das Vendas',
  domain: 'reidasvendas.com',
  email: 'hello@reidasvendas.com',
  phone: '5516992333344',
  whatsappText:
    'Olá! Vi o site e quero entender como colocar meu negócio para vender com mais previsibilidade.',
  whatsappLink:
    'https://wa.me/5516992333344?text=Ol%C3%A1!%20Vi%20o%20site%20e%20quero%20entender%20como%20colocar%20meu%20neg%C3%B3cio%20para%20vender%20com%20mais%20previsibilidade.',
  webhookSecretHeader: 'X-ReiDasVendas-Webhook-Secret',
  heroVideos: [PEXELS.heroSkyline, PEXELS.heroLifestyle, PEXELS.heroBusiness],
  heroVideoUrl: PEXELS.heroSkyline,
  heroPosterUrl: HERO_POSTER,
  inlineVideos: {
    manifesto: PEXELS.heroBusiness,
    performance: PEXELS.heroLifestyle,
  },
  baseCity: 'Franca / SP',
  mapsQuery: 'Franca SP',
  instagram: null as string | null,
  linkedin: null as string | null,
  facebook: null as string | null,
  twitter: null as string | null,
} as const;
