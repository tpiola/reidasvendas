/* ═══════════════════════════════════════════
   SEO-CONTENT.TS — Rei das Vendas
   JSON-LD, meta tags, Open Graph, Twitter Cards,
   FAQ Schema, Review Aggregate, LocalBusiness
═══════════════════════════════════════════ */

export const SEO = {
  /* ─── Empresa ─── */
  empresa: {
    nome: 'Rei das Vendas',
    nomeCurto: 'Rei das Vendas',
    slogan: 'Seu negócio local vendendo como as gigantes',
    telefone: '(16) 99999-0000',
    telefoneInternacional: '+55 16 99999-0000',
    email: 'contato@reidasvendas.com.br',
    endereco: {
      rua: 'Rua General Telles, 525',
      bairro: 'Centro',
      cidade: 'Franca',
      estado: 'SP',
      cep: '14400-100',
      pais: 'Brasil',
    },
    geo: {
      latitude: -20.5395,
      longitude: -47.4017,
    },
    url: 'https://reidasvendas.com.br',
    logo: 'https://reidasvendas.com.br/logo.png',
    fundacao: '2023',
    horario: [
      { dia: 'Segunda a Sexta', horas: '08:00-18:00' },
      { dia: 'Sábado', horas: '08:00-12:00' },
    ],
    redes: {
      instagram: 'https://www.instagram.com/reidasvendasoficial',
      facebook: 'https://www.facebook.com/reidasvendasoficial',
      linkedin: 'https://www.linkedin.com/company/reidasvendas',
      youtube: 'https://youtube.com/@reidasvendas',
      whatsapp: 'https://wa.me/5516999990000',
    },
  } as const,

  /* ─── LocalBusiness JSON-LD ─── */
  localBusinessLD (): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: this.empresa.nome,
      alternateName: 'Rei das Vendas',
      description:
        'Agência de criação de sites profissionais para negócios locais. Site + SEO + WhatsApp em 72 horas.',
      url: this.empresa.url,
      logo: this.empresa.logo,
      image: this.empresa.logo,
      telephone: this.empresa.telefoneInternacional,
      email: this.empresa.email,
      foundingDate: this.empresa.fundacao,
      slogan: this.empresa.slogan,
      address: {
        '@type': 'PostalAddress',
        streetAddress: this.empresa.endereco.rua,
        addressLocality: this.empresa.endereco.cidade,
        addressRegion: this.empresa.endereco.estado,
        postalCode: this.empresa.endereco.cep,
        addressCountry: this.empresa.endereco.pais,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: this.empresa.geo.latitude,
        longitude: this.empresa.geo.longitude,
      },
      openingHoursSpecification: this.empresa.horario.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.dia === 'Sábado' ? 'Saturday' : 'Monday, Tuesday, Wednesday, Thursday, Friday',
        opens: h.horas.split('-')[0],
        closes: h.horas.split('-')[1],
      })),
      sameAs: [
        this.empresa.redes.instagram,
        this.empresa.redes.facebook,
        this.empresa.redes.linkedin,
        this.empresa.redes.youtube,
      ],
      areaServed: {
        '@type': 'City',
        name: 'Franca',
        sameAs: 'https://pt.wikipedia.org/wiki/Franca',
      },
      priceRange: 'R$197 - R$697',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Planos de Site',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plano Start' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plano Profissional' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plano Enterprise' } },
        ],
      },
    };
  },

  /* ─── FAQ Schema ─── */
  faqLD (): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Quanto tempo leva para meu site ficar pronto?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Seu site fica pronto em até 72 horas úteis após a aprovação do briefing. A maioria dos projetos é entregue em 3 dias.',
          },
        },
        {
          '@type': 'Question',
          name: 'Preciso saber programação para gerenciar o site?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Não! Seu site vem com painel administrativo intuitivo. Você pode editar textos, imagens e promoções sem saber programar. É tão fácil quanto editar um documento.',
          },
        },
        {
          '@type': 'Question',
          name: 'Meu site vai aparecer no Google?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim! Todos os planos incluem SEO completo (On-Page, técnico e local). Seu site é otimizado para aparecer nas buscas do Google desde o primeiro dia. Em média, nossos clientes aparecem nas primeiras páginas em 2 a 4 semanas.',
          },
        },
        {
          '@type': 'Question',
          name: 'O site funciona no celular?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim, todos os sites são 100% responsivos. Funcionam perfeitamente em celulares, tablets e computadores. Mais de 70% dos nossos visitantes acessam pelo celular.',
          },
        },
        {
          '@type': 'Question',
          name: 'Vocês integram com WhatsApp?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sim! Todo site tem botão flutuante do WhatsApp, links diretos para conversa, e opção de formulário que envia lead direto para seu WhatsApp. Você conversa com o cliente em tempo real.',
          },
        },
      ],
    };
  },

  /* ─── Review Aggregate Schema ─── */
  reviewAggregateLD (): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: this.empresa.nome,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        bestRating: '5',
        ratingCount: '47',
        reviewCount: '47',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Dra. Carla Mendes' },
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          reviewBody:
            'Minhas vendas online aumentaram 340% em 2 meses. O site ficou lindo e aparece no Google.',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Roberto Alves' },
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          reviewBody:
            'Em uma semana meu site já estava no Google. Clientes novos chegam toda semana pelo WhatsApp.',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Marcos Oliveira' },
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          reviewBody:
            'O suporte é incrível, respondem em minutos. Meu site ficou profissional e agora recebo orçamentos toda semana.',
        },
      ],
    };
  },

  /* ─── Páginas ─── */
  paginas: {
    home: {
      title: 'Rei das Vendas — Site Profissional para seu Negócio Local em 72h',
      description:
        'Criamos sites profissionais para negócios locais em Franca e região. SEO completo + WhatsApp integrado + suporte vitalício. Seu negócio vendendo como as gigantes.',
      keywords:
        'criação de sites, site profissional, site para pequenas empresas, franca sp, seo local, site para comercio, site para padaria, site para farmacia, marketing digital',
      path: '/',
    },
    projetos: {
      title: 'Portfólio — Rei das Vendas | Sites que Transformam Negócios',
      description:
        'Conheça nossos projetos de sites profissionais para negócios locais. Farmácias, padarias, mecânicas, lojas e mais. Resultados reais de clientes reais.',
      keywords: 'portfolio de sites, sites criados, exemplos de sites profissionais, casos de sucesso',
      path: '/projetos',
    },
    blog: {
      title: 'Blog — Rei das Vendas | Dicas de Marketing Digital para Negócios Locais',
      description:
        'Aprenda como fazer seu negócio local vender mais na internet. Dicas de SEO, WhatsApp Business, marketing digital, criação de sites e muito mais.',
      keywords:
        'blog marketing digital, dicas seo, marketing para pequenas empresas, vendas online negocio local',
      path: '/blog',
    },
    contato: {
      title: 'Contato — Rei das Vendas | Solicite seu Orçamento Grátis',
      description:
        'Entre em contato com a Rei das Vendas. Solicite um orçamento gratuito para seu site profissional. Respondemos em até 2 horas pelo WhatsApp.',
      keywords: 'contato, orçamento site, criar site, fazer site, franca sp',
      path: '/contato',
    },
    planos: {
      title: 'Planos — Rei das Vendas | A partir de R$197/mês',
      description:
        'Escolha o plano ideal para seu negócio: Start (R$197/mês), Profissional (R$397/mês) ou Enterprise (R$697/mês). Todos com SEO, WhatsApp e suporte vitalício.',
      keywords: 'planos de site, precos site, criar site barato, site profissional preco',
      path: '/planos',
    },
  } as const,

  /* ─── Open Graph Tags ─── */
  openGraph (pagina: keyof typeof SEO['paginas']): Record<string, string> {
    const p = this.paginas[pagina];
    return {
      'og:title': p.title,
      'og:description': p.description,
      'og:url': `${this.empresa.url}${p.path}`,
      'og:type': pagina === 'home' ? 'website' : 'article',
      'og:site_name': this.empresa.nome,
      'og:locale': 'pt_BR',
      'og:image': `${this.empresa.url}/og-image.png`,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': `${this.empresa.nome} — ${p.title}`,
    };
  },

  /* ─── Twitter Cards ─── */
  twitterCard (pagina: keyof typeof SEO['paginas']): Record<string, string> {
    const p = this.paginas[pagina];
    return {
      'twitter:card': 'summary_large_image',
      'twitter:title': p.title,
      'twitter:description': p.description,
      'twitter:image': `${this.empresa.url}/twitter-card.png`,
      'twitter:site': '@reidasvendas',
      'twitter:creator': '@reidasvendas',
    };
  },

  /* ─── Meta Tags Helper ─── */
  metaTags (pagina: keyof typeof SEO['paginas']) {
    const p = this.paginas[pagina];
    const og = this.openGraph(pagina);
    const tw = this.twitterCard(pagina);
    return {
      title: p.title,
      meta: [
        { name: 'description', content: p.description },
        { name: 'keywords', content: p.keywords },
        { name: 'author', content: this.empresa.nome },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'pt-BR' },
        ...Object.entries(og).map(([property, content]) => ({ property, content })),
        ...Object.entries(tw).map(([name, content]) => ({ name, content })),
      ],
      jsonld: [this.localBusinessLD(), this.faqLD(), this.reviewAggregateLD()],
    };
  },

  /* ─── Gera string JSON-LD para injeção no <head> ─── */
  jsonLdScripts (pagina: keyof typeof SEO['paginas']): string {
    const schemas = this.metaTags(pagina).jsonld;
    return schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  },
} as const;

export default SEO;
