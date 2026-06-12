/** Imagens do catálogo — imagens locais otimizadas para retina */

const LOCAL_IMAGES: Record<string, Record<string, string>> = {
  cover: {
    estetica: '/imagens/nicho-estetica-cover.png',
    odonto: '/imagens/nicho-odontologia-cover.png',
    fitness: '/imagens/nicho-personal-cover.png',
    restaurante: '/imagens/nicho-restaurante-cover.png',
    varejo: '/imagens/nicho-varejo-cover.png',
    imob: '/imagens/nicho-imobiliaria-cover.png',
    advocacia: '/images/project-advocacia.jpg',
    educacao: '/stock/digital-strategy.jpg',
    servicos: '/stock/business-meeting.jpg',
  },
  gallery: {
    estetica: '/stock/digital-strategy.jpg',
    odonto: '/stock/sales-growth.jpg',
    fitness: '/stock/business-meeting.jpg',
    restaurante: '/stock/customer-service.jpg',
    varejo: '/stock/sales-growth.jpg',
    imob: '/images/project-imobiliaria.jpg',
    advocacia: '/images/project-varejo.jpg',
    educacao: '/stock/customer-service.jpg',
    servicos: '/images/project-clinica.jpg',
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
