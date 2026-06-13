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
    estetica: '/imagens/stock-clinic-reception.png',
    odonto: '/imagens/stock-business-meeting.png',
    fitness: '/imagens/stock-professional-team.png',
    restaurante: '/imagens/stock-digital-marketing.png',
    varejo: '/imagens/stock-sales-growth.png',
    imob: '/imagens/stock-consulting-room.png',
    advocacia: '/imagens/stock-law-firm.png',
    educacao: '/imagens/stock-education-class.png',
    servicos: '/imagens/stock-customer-service.png',
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
