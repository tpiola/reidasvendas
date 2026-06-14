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
    slug: 'site-para-farmacia-local',
    title: 'Site para farmácia local: como vender mais com presença digital',
    excerpt: 'Guia completo para farmácias de bairro criarem um site que atrai clientes e aumenta as vendas.',
    category: 'Site',
    publishedAt: '2026-06-05',
    readMinutes: 6,
    body: [
      'Farmácias locais enfrentam um desafio duplo: competir com grandes redes e atender uma base de clientes fiéis que espera praticidade. Um site bem feito resolve os dois problemas.',
      'Comece com informações essenciais: endereço, telefone, horário de funcionamento e se oferece delivery. Clientes locais buscam respostas rápidas antes de sair de casa.',
      'Catálogo de produtos com preços atualizados é um diferencial enorme. Integrar o site com sistema de gestão da farmácia mantém os valores corretos sem trabalho manual.',
      'Programa de fidelidade digital e notificação de promoções via WhatsApp fazem o cliente voltar. Uma farmácia de Franca aumentou 180% o contato via WhatsApp no primeiro mês de site.',
    ],
  },
  {
    slug: 'app-delivery-negocio-local',
    title: 'App de delivery próprio: saia das plataformas e controle suas vendas',
    excerpt: 'Por que criar seu próprio aplicativo de delivery pode ser mais barato e lucrativo que depender de iFood e afins.',
    category: 'App',
    publishedAt: '2026-06-08',
    readMinutes: 7,
    body: [
      'As taxas das plataformas de delivery podem chegar a 30% do valor do pedido. Para um restaurante que fatura R$ 50 mil por mês via aplicativo, isso representa até R$ 15 mil em taxas.',
      'Um aplicativo próprio elimina essa comissão. O investimento mensal é fixo e previsível. Além disso, você tem acesso direto aos dados dos seus clientes — nome, endereço, histórico de pedidos.',
      'Com um app próprio, você controla as promoções, cria programas de fidelidade e se comunica diretamente com quem já comprou de você. Sem intermediários, sem concorrentes aparecendo ao lado.',
      'Supermercado Nova Era, em Franca, lançou delivery próprio e faturou R$ 50 mil em vendas online no primeiro mês. Sem depender de terceiros e suas taxas abusivas.',
    ],
  },
  {
    slug: 'automacao-para-oficina-mecanica',
    title: 'Automação para oficina mecânica: agendamento e follow-up sem stress',
    excerpt: 'Como sistemas simples de automação podem transformar o atendimento e a gestão da sua oficina.',
    category: 'Automação',
    publishedAt: '2026-06-10',
    readMinutes: 5,
    body: [
      'Oficinas mecânicas perdem cliente por falta de organização no agendamento. Telefone ocupado, horário marcado que ninguém lembra, orçamento que fica dias na gaveta — tudo isso vira cliente que vai para a concorrência.',
      'Um sistema de agendamento online resolve o principal gargalo. O cliente vê os horários disponíveis, escolhe o melhor e recebe confirmação automática por WhatsApp. Sem telefonema, sem fila.',
      'O follow-up automático é o segundo passo. Uma mensagem 30 dias após o serviço perguntando se está tudo certo gera confiança e traz o cliente de volta para a próxima revisão.',
      'A Oficina do Povo, em Franca, implementou esse sistema e passou a ter agenda lotada 15 dias antes. Clientes marcam pelo site, sem fila e sem telefone ocupado.',
    ],
  },
  {
    slug: 'dashboard-para-fabrica',
    title: 'Dashboard para fábrica: indicadores em tempo real para decisões certeiras',
    excerpt: 'Como painéis de indicadores ajudam indústrias a enxergar gargalos e oportunidades com clareza.',
    category: 'Dashboard',
    publishedAt: '2026-06-12',
    readMinutes: 6,
    body: [
      'O empresário industrial toma decisão baseado em feeling porque não tem dados na mão. Planilhas desatualizadas, informações espalhadas em sistemas diferentes, relatórios que saem uma vez por mês.',
      'Um dashboard executivo centraliza os indicadores que realmente importam: produção diária, estoque crítico, vendas por período, inadimplência. Tudo atualizado em tempo real, acessível do celular.',
      'Além de enxergar o presente, o dashboard permite comparar períodos, identificar tendências e agir antes que o problema vire crise. O custo de um painel é mínimo perto do prejuízo de decisões erradas.',
      'Indústrias calçadistas de Franca já usam dashboards para acompanhar produção e vendas. O resultado é mais previsibilidade, menos desperdício e planejamento baseado em dados reais.',
    ],
  },
  {
    slug: 'mentoria-transformacao-digital',
    title: 'Mentoria em transformação digital: o que esperar e como escolher',
    excerpt: 'Guia para empresários que querem orientação especializada para digitalizar o negócio sem desperdiçar recursos.',
    category: 'Mentoria',
    publishedAt: '2026-06-14',
    readMinutes: 6,
    body: [
      'Transformação digital não é só ter site ou app. É repensar processos, atendimento, marketing e vendas com a tecnologia como aliada. Sem uma orientação clara, o dinheiro investido vira desperdício.',
      'Uma mentoria de qualidade começa com diagnóstico: como está seu negócio hoje, quais são seus gargalos, onde a tecnologia pode gerar mais resultado com menor investimento.',
      'O mentor não entrega soluções prontas — ele constrói com você o plano de ação. Acompanha a execução, ajusta rotas, evita erros comuns. É como ter um arquiteto digital para seu negócio.',
      'Empresários de Franca que passaram por mentoria reduziram em 60% o tempo de implementação de projetos digitais e aumentaram em 40% o retorno sobre o investimento em marketing digital.',
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
    slug: 'site-vs-landing-page',
    title: 'Site vs Landing Page: qual a melhor escolha para cada momento do seu negócio',
    excerpt: 'Entenda as diferenças e saiba quando investir em cada formato para maximizar seus resultados.',
    category: 'Site',
    publishedAt: '2026-06-15',
    readMinutes: 5,
    body: [
      'Muita gente acha que site e landing page são a mesma coisa. Não são. Cada um tem um objetivo diferente e serve a um momento específico do seu negócio.',
      'Landing page é uma página focada em um único objetivo: captar leads, vender um produto, inscrever para um evento. Sem menu, sem distrações. Ideal para campanhas e lançamentos.',
      'Site institucional é a casa digital do seu negócio. Várias páginas, informações completas, blog. Constrói credibilidade e é o destino principal de quem pesquisa seu negócio no Google.',
      'A estratégia inteligente é usar os dois: landing pages para campanhas específicas, site institucional como base de autoridade. Converse com um especialista para saber o que faz sentido agora.',
    ],
  },
  {
    slug: 'app-proprio-vs-plataforma',
    title: 'App próprio vs plataformas de mercado: quando vale a pena ter o seu',
    excerpt: 'Análise completa dos prós e contras de criar seu próprio aplicativo versus usar soluções prontas.',
    category: 'App',
    publishedAt: '2026-06-17',
    readMinutes: 7,
    body: [
      'A decisão entre app próprio e plataforma pronta depende de volume de vendas, margem e controle que você quer ter sobre o relacionamento com o cliente.',
      'Plataformas como iFood, Mercado Livre e Shopee são ótimas para começar. Dão visibilidade rápida, mas cobram comissões altas e você não tem acesso aos dados dos clientes.',
      'App próprio exige investimento maior no início, mas o custo mensal é fixo e você controla tudo: taxas, dados, comunicação. Para negócios com mais de 100 pedidos por mês, já compensa.',
      'O ideal é uma estratégia híbrida: use plataformas para captar novos clientes e tenha app próprio para fidelizar os que já compraram. Duas pontes, um mesmo castelo.',
    ],
  },
  {
    slug: 'extensao-estoque-automacao',
    title: 'Extensão de Chrome para controle de estoque: automação que cabe no navegador',
    excerpt: 'Como uma extensão simples pode resolver problemas complexos de gestão de estoque sem trocar de sistema.',
    category: 'Automação',
    publishedAt: '2026-06-19',
    readMinutes: 5,
    body: [
      'Trocar de sistema de gestão é caro, demorado e arriscado. Muitas empresas têm sistemas legados que funcionam, mas faltam integrações e automações pontuais.',
      'Uma extensão de Chrome sob medida pode preencher essas lacunas sem mexer no sistema principal. Exemplos: exportar relatórios automaticamente, sincronizar estoque entre plataformas, enviar alertas.',
      'A extensão roda direto no navegador do usuário, não precisa de servidor extra, e pode ser desenvolvida em dias. O custo é muito menor que um sistema novo.',
      'Empresas de Franca que adotaram extensões para automação reduziram em 70% o tempo gasto com tarefas manuais de estoque e relatórios. Tecnologia simples resolvendo problemas reais.',
    ],
  },
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
];

export function findBlogPost(slug: string | undefined): BlogPost | null {
  if (!slug) return null;
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}
