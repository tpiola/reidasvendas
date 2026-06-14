export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readMinutes: number;
  body: string[];
  imageUrl: string;
  author: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'site-para-farmacia',
    title: 'Site profissional para farmacia local: como vender mais com presenca digital',
    excerpt: 'Guia completo para farmacias de bairro criarem um site que atrai clientes e aumenta as vendas em Franca-SP.',
    category: 'Negocios',
    publishedAt: '2026-06-05',
    readMinutes: 6,
    imageUrl: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1200&q=85',
    author: 'Equipe Rei das Vendas',
    body: [
      'Farmacias locais em Franca enfrentam um desafio duplo: competir com grandes redes e atender uma base de clientes fieis que espera praticidade. Um site profissional resolve os dois problemas ao mesmo tempo.',
      'Comece com informacoes essenciais: endereco, telefone, horario de funcionamento e se oferece delivery. Clientes locais buscam respostas rapidas antes de sair de casa. Uma farmacia em Franca aumentou 180% o contato via WhatsApp no primeiro mes de site.',
    ],
  },
  {
    slug: 'app-delivery-proprio',
    title: 'App de delivery proprio vs marketplace: quando vale a pena ter o seu',
    excerpt: 'Analise completa dos pros e contras de criar seu proprio aplicativo de delivery versus depender de iFood e similares.',
    category: 'Tecnologia',
    publishedAt: '2026-06-08',
    readMinutes: 7,
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85',
    author: 'Equipe Rei das Vendas',
    body: [
      'As taxas das plataformas de delivery podem chegar a 30% do valor do pedido. Para um restaurante que fatura R$ 50 mil por mes via aplicativo, isso representa ate R$ 15 mil em comissoes. Um aplicativo proprio elimina essa taxa e da acesso direto aos dados dos clientes.',
      'O Supermercado Nova Era, em Franca, lancou delivery proprio e faturou R$ 50 mil em vendas online no primeiro mes. Sem depender de terceiros, sem concorrentes aparecendo ao lado do seu produto. O investimento mensal e fixo e previsivel.',
    ],
  },
  {
    slug: 'automacao-oficina',
    title: 'Automacao que salvou 20h/semana da oficina mecanica',
    excerpt: 'Como sistemas simples de automacao transformaram o atendimento e a gestao de uma oficina em Franca.',
    category: 'Tecnologia',
    publishedAt: '2026-06-10',
    readMinutes: 5,
    imageUrl: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1200&q=85',
    author: 'Equipe Rei das Vendas',
    body: [
      'Oficinas mecanicas perdem cliente por falta de organizacao no agendamento. Telefone ocupado, horario marcado que ninguem lembra, orcamento que fica dias na gaveta. A Oficina do Povo, em Franca, resolvia tudo na base do papel e caneta — e perdia em media 5 clientes por semana.',
      'Com um sistema de agendamento online e follow-up automatico via WhatsApp, a oficina recuperou 20 horas por semana que antes eram gastas com telefonemas e remarcacoes. Hoje a agenda fica lotada 15 dias antes e o faturamento cresceu 40%.',
    ],
  },
  {
    slug: 'seo-local',
    title: 'SEO local: apareca no Google do seu bairro em Franca-SP',
    excerpt: 'Estrategias praticas de SEO para negocios locais aparecerem nas buscas da sua regiao sem gastar com anuncios.',
    category: 'SEO',
    publishedAt: '2026-06-01',
    readMinutes: 7,
    imageUrl: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=1200&q=85',
    author: 'Equipe Rei das Vendas',
    body: [
      'Para o negocio local em Franca, a busca mais importante nao e por palavras-chave genericas — e por "perto de mim" e "em Franca". O Google prioriza resultados locais quando entende que o usuario quer algo proximo. Um site rapido e com informacoes claras de endereco e horario e o primeiro passo.',
      'Conteudo local relevante — posts sobre eventos da cidade, parcerias com outros negocios de Franca, mencoes a bairros como Centro, Vila Nova e Jardim Brasil — sinaliza para o algoritmo que sua empresa faz parte da comunidade. Links de associacoes comerciais locais fortalecem a autoridade.',
    ],
  },
  {
    slug: 'dashboard-desperdicio',
    title: 'Dashboard que revelou R$ 15 mil em desperdicio na industria',
    excerpt: 'Como um painel de indicadores ajudou uma industria de Franca a enxergar gargalos e economizar milhares por mes.',
    category: 'Negocios',
    publishedAt: '2026-06-12',
    readMinutes: 6,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    author: 'Equipe Rei das Vendas',
    body: [
      'Uma industria calcadista de Franca descobriu R$ 15 mil em desperdicio mensal apenas com um dashboard bem estruturado. Antes, o empresario tomava decisoes baseado em feeling porque nao tinha dados na mao — planilhas desatualizadas e informacoes espalhadas em sistemas diferentes.',
      'O dashboard centralizou os indicadores que realmente importam: producao diaria, estoque critico, vendas por periodo e inadimplencia. Em tempo real, acessivel do celular. Em 30 dias, a industria identificou dois processos ineficientes que geravam desperdicio e corrigiu ambos.',
    ],
  },
  {
    slug: 'mentoria-resultados',
    title: 'Mentoria digital triplicou faturamento em 90 dias na regiao de Franca',
    excerpt: 'Caso real de um empreendedor de Franca que, com mentoria especializada, multiplicou os resultados do negocio digital.',
    category: 'Negocios',
    publishedAt: '2026-06-14',
    readMinutes: 6,
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=85',
    author: 'Equipe Rei das Vendas',
    body: [
      'Um empreendedor de Franca chegou ate nos com uma loja virtual que faturava R$ 8 mil por mes. Em 90 dias de mentoria digital, com ajustes no funil de vendas, integracao com WhatsApp e SEO local, o faturamento saltou para R$ 27 mil — mais que o triplo sem aumentar o orcamento de anuncios.',
      'A mentoria comecou com um diagnostico completo: como estava o negocio, quais eram os gargalos, onde a tecnologia poderia gerar mais resultado com menor investimento. O plano de acao personalizado e o acompanhamento semanal fizeram toda a diferenca.',
    ],
  },
  {
    slug: 'whatsapp-site',
    title: 'WhatsApp Business + Site: a combinacao que mais vende para negocios locais',
    excerpt: 'Transforme o WhatsApp de simples atendimento em uma maquina de vendas integrada ao seu site.',
    category: 'Marketing',
    publishedAt: '2026-05-25',
    readMinutes: 6,
    imageUrl: 'https://images.unsplash.com/photo-1571747142045-329e185408fb?auto=format&fit=crop&w=1200&q=85',
    author: 'Equipe Rei das Vendas',
    body: [
      'O WhatsApp e o canal mais usado pelo brasileiro — e tambem o mais mal aproveitado por negocios locais. Integrar o WhatsApp Business ao site e o minimo: o botao "Fale conosco" deve abrir uma conversa pre-formatada com saudacao e informacao do produto que o cliente esta vendo.',
      'Com respostas rapidas, catalogo de produtos e etiquetas para organizar conversas por estagio do funil, uma loja em Franca aumentou a taxa de conversao em 60%. Um lembrete de follow-up 24h apos o primeiro contato mostra cuidado sem ser invasivo.',
    ],
  },
  {
    slug: 'lgpd-pequenos-negocios',
    title: 'LGPD para pequenos negocios: o que voce precisa saber em Franca',
    excerpt: 'A Lei Geral de Protecao de Dados tambem vale para MEIs e pequenas empresas de Franca. Saiba como se adequar.',
    category: 'Negocios',
    publishedAt: '2026-05-28',
    readMinutes: 5,
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85',
    author: 'Equipe Rei das Vendas',
    body: [
      'Muitos pequenos empresarios de Franca acham que a LGPD so vale para grandes corporacoes. Nao e verdade. Se voce coleta nome, telefone ou e-mail de clientes, a lei se aplica ao seu negocio. Na pratica, adequacao simples significa ter uma politica de privacidade clara no site e pedir consentimento explicito.',
      'O formulario de contato deve informar para que os dados serao usados. O WhatsApp nao pode ser usado para disparos em massa sem consentimento previo. Manter um registro simples de quais dados voce coleta ja cobre a maior parte das exigencias para negocios de pequeno porte.',
    ],
  },
  {
    slug: 'site-vs-landing-page',
    title: 'Site institucional vs Landing Page: qual escolher para seu negocio',
    excerpt: 'Entenda as diferencas e saiba quando investir em cada formato para maximizar seus resultados em Franca.',
    category: 'Marketing',
    publishedAt: '2026-06-15',
    readMinutes: 5,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
    author: 'Equipe Rei das Vendas',
    body: [
      'Muita gente acha que site e landing page sao a mesma coisa. Nao sao. Landing page e uma pagina focada em um unico objetivo: captar leads, vender um produto, inscrever para um evento. Sem menu, sem distracoes. Ideal para campanhas e lancamentos de negocios em Franca.',
      'Site institucional e a casa digital do seu negocio. Varias paginas, informacoes completas, blog. Constroi credibilidade e e o destino principal de quem pesquisa seu negocio no Google. A estrategia inteligente e usar os dois: landing pages para campanhas, site como base de autoridade.',
    ],
  },
  {
    slug: 'app-proprio-barato',
    title: 'Aplicativo proprio nao precisa ser caro: opcoes para negocios de Franca',
    excerpt: 'Descubra como criar seu proprio aplicativo por um custo acessivel e competir com grandes players.',
    category: 'Tecnologia',
    publishedAt: '2026-06-17',
    readMinutes: 7,
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85',
    author: 'Equipe Rei das Vendas',
    body: [
      'Muitos comerciantes de Franca acreditam que ter um aplicativo proprio e algo para grandes empresas com orcamento de sobra. A verdade e que a tecnologia atual permite criar apps profissionais por valores que cabem no bolso do pequeno negocio. Um PWA ( Progressive Web App ) sai por uma fracao do custo de um app nativo.',
      'Um restaurante em Franca lancou seu app de delivery por menos de R$ 5 mil e em 60 dias ja tinha recuperado o investimento. Com notificacao push, catalogo de produtos e pedidos diretos, eliminou a dependencia de plataformas terceiras e suas comissoes abusivas.',
    ],
  },
  {
    slug: 'extensao-estoque',
    title: 'Extensao de Chrome que organiza seu estoque sem trocar de sistema',
    excerpt: 'Como uma extensao simples pode resolver problemas complexos de gestao de estoque sem migrar de plataforma.',
    category: 'Tecnologia',
    publishedAt: '2026-06-19',
    readMinutes: 5,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    author: 'Equipe Rei das Vendas',
    body: [
      'Trocar de sistema de gestao e caro, demorado e arriscado. Muitas empresas de Franca tem sistemas legados que funcionam, mas faltam integracoes e automacoes pontuais. Uma extensao de Chrome sob medida pode preencher essas lacunas sem mexer no sistema principal e sem custo de servidores extras.',
      'Empresas de Franca que adotaram extensoes para automacao reduziram em 70% o tempo gasto com tarefas manuais de estoque e relatorios. A extensao roda direto no navegador do usuario, pode ser desenvolvida em dias e o custo e muito menor que um sistema novo.',
    ],
  },
  {
    slug: 'escolher-plataforma',
    title: 'Como escolher a plataforma digital ideal para seu negocio em Franca',
    excerpt: 'Guia passo a passo para empreendedores de Franca escolherem as ferramentas digitais certas sem desperdicar dinheiro.',
    category: 'Negocios',
    publishedAt: '2026-06-20',
    readMinutes: 6,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
    author: 'Equipe Rei das Vendas',
    body: [
      'Com tantas opcoes de ferramentas digitais no mercado, o empreendedor de Franca pode se sentir perdido. Site, app, CRM, dashboard, automacao — por onde comecar? O erro mais comum e comprar tudo de uma vez ou, ao contrario, nao comprar nada por medo de errar, perdendo vendas todos os dias.',
      'O caminho inteligente e comecar com um diagnostico do negocio. Entender qual etapa do funil precisa de mais atencao: e divulgacao (site e SEO), e conversao (WhatsApp e landing page) ou e fidelizacao (app e CRM)? Cada negocio tem uma prioridade diferente. A plataforma ideal e a que resolve seu gargalo principal primeiro.',
    ],
  },
];

export function findBlogPost(slug: string | undefined): BlogPost | null {
  if (!slug) return null;
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}
