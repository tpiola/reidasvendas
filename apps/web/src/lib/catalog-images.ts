/** Imagens do catálogo — todas locais, únicas por nicho, otimizadas para retina */
const LOCAL_IMAGES: Record<string, Record<string, string>> = {
  cover: {
    estetica: '/imagens/nicho-estetica-cover.webp',
    odonto: '/imagens/nicho-odontologia-cover.webp',
    fitness: '/imagens/nicho-personal-cover.webp',
    restaurante: '/imagens/nicho-restaurante-cover.webp',
    varejo: '/imagens/nicho-varejo-cover.webp',
    imob: '/imagens/nicho-imobiliaria-cover.webp',
    advocacia: '/imagens/nicho-advocacia-cover.webp',
    educacao: '/imagens/nicho-educacao-cover.webp',
    servicos: '/imagens/nicho-servicos-cover.webp',
  },
  gallery: {
    estetica: '/imagens/gallery-estetica.webp',
    odonto: '/imagens/gallery-odontologia.webp',
    fitness: '/imagens/gallery-personal.webp',
    restaurante: '/imagens/gallery-restaurante.webp',
    varejo: '/imagens/gallery-varejo.webp',
    imob: '/imagens/gallery-imobiliaria.webp',
    advocacia: '/imagens/gallery-advocacia.webp',
    educacao: '/imagens/gallery-educacao.webp',
    servicos: '/imagens/gallery-servicos.webp',
  },
  gallery2: {
    estetica: '/imagens/stock-clinic-reception.webp',
    odonto: '/imagens/stock-business-meeting.webp',
    fitness: '/imagens/stock-professional-team.webp',
    restaurante: '/imagens/stock-digital-marketing.webp',
    varejo: '/imagens/stock-sales-growth.webp',
    imob: '/imagens/stock-consulting-room.webp',
    advocacia: '/imagens/stock-law-firm.webp',
    educacao: '/imagens/stock-education-class.webp',
    servicos: '/imagens/stock-customer-service.webp',
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

export function catalogGallery2(key: string): string {
  return LOCAL_IMAGES.gallery2[key] ?? LOCAL_IMAGES.gallery[key] ?? LOCAL_IMAGES.cover[key] ?? `${key}`;
}
