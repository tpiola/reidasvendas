/** Imagens do catálogo — todas locais, únicas por nicho, otimizadas para retina */
const LOCAL_IMAGES: Record<string, Record<string, string>> = {
  cover: {
    estetica: '/imagens/nicho-estetica-cover.png',
    odonto: '/imagens/nicho-odontologia-cover.png',
    fitness: '/imagens/nicho-personal-cover.png',
    restaurante: '/imagens/nicho-restaurante-cover.png',
    varejo: '/imagens/nicho-varejo-cover.png',
    imob: '/imagens/nicho-imobiliaria-cover.png',
    advocacia: '/imagens/nicho-advocacia-cover.png',
    educacao: '/imagens/nicho-educacao-cover.png',
    servicos: '/imagens/nicho-servicos-cover.png',
  },
  gallery: {
    estetica: '/imagens/stock-business-meeting.png',
    odonto: '/imagens/stock-customer-service.png',
    fitness: '/imagens/stock-professional-team.png',
    restaurante: '/imagens/stock-digital-strategy.png',
    varejo: '/imagens/stock-sales-growth.png',
    imob: '/imagens/stock-business-meeting.png',
    advocacia: '/imagens/stock-customer-service.png',
    educacao: '/imagens/stock-digital-strategy.png',
    servicos: '/imagens/stock-professional-team.png',
  },
};

export function catalogCover(key: string): string {
  return LOCAL_IMAGES.cover[key] ?? `${key}`;
}

export function catalogThumb(key: string): string {
  return LOCAL_IMAGES.cover[key] ?? `${key}`;
}

export function catalogGallery(key: string): string {
  return LOCAL_IMAGES.gallery[key] ?? LOCAL_IMAGES.cover[key] ?? `${key}`;
}
