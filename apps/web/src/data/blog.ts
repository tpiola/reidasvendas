export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readMinutes: number;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'funil-whatsapp-negocio-local',
    title: 'Funil + WhatsApp: o par que salva o negócio local',
    excerpt: 'Por que página bonita sem resposta no timing certo ainda perde venda.',
    category: 'Funil',
    publishedAt: '2026-05-20',
    readMinutes: 5,
    body: [
      'O empreendedor local não perde só por falta de tráfego — perde quando o lead esfria no silêncio.',
      'Um funil bem desenhado conecta anúncio, landing, formulário e WhatsApp com mensagem alinhada ao que o cliente busca.',
      'O diagnóstico mapeia onde a conversa trava e qual automação destrava sem contratar equipe extra.',
    ],
  },
  {
    slug: 'site-rapido-converte-mais',
    title: 'Site lento é vitrine fechada no celular',
    excerpt: 'Velocidade, SEO técnico e copy curta — o trio que o Google e o cliente exigem.',
    category: 'Performance',
    publishedAt: '2026-05-15',
    readMinutes: 4,
    body: [
      'Mais da metade da busca acontece no celular. Se a página demora, o cliente some antes de ler sua oferta.',
      'Hospedagem moderna, imagens WebP e código enxuto entram no escopo — não como extra opcional.',
      'Primeira versão em até 72h após diagnóstico para você testar mercado com rapidez.',
    ],
  },
  {
    slug: 'automacao-n8n-sem-complicar',
    title: 'Automação com n8n sem virar refém de planilha',
    excerpt: 'Follow-up, etiquetas e lembretes enquanto você atende o balcão.',
    category: 'Automação',
    publishedAt: '2026-05-10',
    readMinutes: 6,
    body: [
      'CRM parado é dinheiro mensal jogado fora. A automação certa responde, registra e lembra — sem spam.',
      'Integrações com WhatsApp API e formulário mantêm o histórico em um lugar só.',
      'Cada fluxo nasce do seu processo comercial, não de template genérico copiado.',
    ],
  },
  {
    slug: 'seo-local-franca',
    title: 'SEO local: como aparecer no Google quando seus clientes buscam',
    excerpt: 'Estratégias práticas de SEO para negócios locais aparecerem nas buscas da sua região.',
    category: 'SEO',
    publishedAt: '2026-06-01',
    readMinutes: 7,
    body: [
      'Para o negócio local, a busca mais importante não é por palavras-chave genéricas — é por "perto de mim" e "em [sua cidade]". O Google prioriza resultados locais quando entende que o usuário quer algo próximo.',
      'O primeiro passo é ter um site rápido, responsivo e com informações claras de endereço, telefone e horário. O Google Meu Negócio bem configurado é tão importante quanto o site.',
      'Conteúdo local relevante — posts sobre eventos da cidade, parcerias com outros negócios locais, menções a bairros — sinaliza para o algoritmo que você faz parte da comunidade.',
      'Links de outros sites da região (câmaras, associações, imprensa local) fortalecem a autoridade. Mais importante que quantidade é a relevância regional desses links.',
    ],
  },
  {
    slug: 'lgpd-para-negocios-locais',
    title: 'LGPD para pequenos negócios: o que você precisa saber',
    excerpt: 'A Lei Geral de Proteção de Dados também vale para MEIs e pequenas empresas. Saiba como se adequar.',
    category: 'LGPD',
    publishedAt: '2026-05-28',
    readMinutes: 5,
    body: [
      'Muitos pequenos empresários acham que a LGPD só vale para grandes corporações. Não é verdade. Se você coleta nome, telefone ou e-mail de clientes, a lei se aplica ao seu negócio.',
      'Na prática, adequação simples significa: ter uma política de privacidade clara no site, pedir consentimento explícito ao capturar dados, e nunca compartilhar informações sem autorização.',
      'O formulário de contato deve informar para que os dados serão usados. O WhatsApp não pode ser usado para disparos em massa sem consentimento prévio.',
      'Manter um registro simples de quais dados você coleta, onde armazena e por quanto tempo retém já cobre a maior parte das exigências para negócios de pequeno porte.',
    ],
  },
  {
    slug: 'whatsapp-business-estrategia',
    title: 'WhatsApp Business como canal de vendas: guia prático',
    excerpt: 'Transforme o WhatsApp de simples atendimento em uma máquina de vendas para seu negócio local.',
    category: 'WhatsApp',
    publishedAt: '2026-05-25',
    readMinutes: 6,
    body: [
      'O WhatsApp é o canal mais usado pelo brasileiro — e também o mais mal aproveitado por negócios locais. A diferença entre um atendimento que vende e um que afasta está na organização.',
      'Comece separando números pessoais e profissionais. Use o WhatsApp Business com catálogo de produtos, respostas rápidas e etiquetas para organizar conversas por estágio do funil.',
      'Integrar o WhatsApp ao site é o mínimo: o botão "Fale conosco" deve abrir uma conversa pré-formatada com saudação e informação do produto/serviço que o cliente está vendo.',
      'Automação não significa robotizar. Um lembrete de follow-up 24h após o primeiro contato, ou uma mensagem de agradecimento pós-compra, mostra cuidado sem ser invasivo.',
    ],
  },
  {
    slug: 'como-escolher-site-profissional',
    title: 'Como escolher o site profissional ideal para seu negócio',
    excerpt: 'Site institucional, landing page ou e-commerce? Entenda qual formato atende cada fase do seu negócio.',
    category: 'Site',
    publishedAt: '2026-05-22',
    readMinutes: 5,
    body: [
      'A primeira dúvida de quem decide ter um site é: qual o tipo certo? A resposta depende do seu objetivo imediato e do estágio do seu negócio.',
      'Landing page: ideal para quem quer testar um serviço novo, lançar uma promoção ou captar leads de forma focada. Uma página, um objetivo, sem distrações.',
      'Site institucional: perfeito para negócios estabelecidos que precisam de credibilidade. Páginas de serviços, sobre, contato e blog. É a "casa digital" do seu negócio.',
      'E-commerce: para quem já tem demanda e quer vender online 24h. Exige mais investimento em operação e logística, mas o retorno pode ser rápido.',
      'Converse com um especialista antes de escolher. Às vezes uma landing page bem feita entrega mais resultado que um site completo — e custa menos.',
    ],
  },
];

export function findBlogPost(slug: string | undefined): BlogPost | null {
  if (!slug) return null;
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}
