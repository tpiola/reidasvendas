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
];

export function findBlogPost(slug: string | undefined): BlogPost | null {
  if (!slug) return null;
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}
