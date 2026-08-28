export type SolutionFamily =
  | 'presenca'
  | 'comercio'
  | 'atendimento'
  | 'produto'
  | 'distribuicao'
  | 'operacao';

export type MarketplaceItem = {
  title: string;
  description: string;
  family: SolutionFamily;
  format: string;
  outcome: string;
  solution: string;
};

export const FAMILY_LABELS: Record<SolutionFamily, string> = {
  presenca: 'Presença e autoridade',
  comercio: 'Venda e comércio',
  atendimento: 'Captação e atendimento',
  produto: 'Produtos digitais',
  distribuicao: 'Distribuição',
  operacao: 'Operação e evolução',
};

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    title: 'Site institucional premium',
    description: 'Uma presença própria que explica a oferta, sustenta confiança e conduz a uma próxima ação clara.',
    family: 'presenca',
    format: 'Site',
    outcome: 'Ser encontrado e entendido',
    solution: 'site-institucional-premium',
  },
  {
    title: 'Site para profissional liberal',
    description: 'Autoridade, especialidades, critérios de atendimento e contato organizados sem comunicação genérica.',
    family: 'presenca',
    format: 'Site',
    outcome: 'Transformar reputação em procura',
    solution: 'site-para-profissionais-liberais',
  },
  {
    title: 'Landing page de campanha',
    description: 'Uma oferta, uma decisão e mensuração por etapa para campanhas e lançamentos.',
    family: 'presenca',
    format: 'Landing page',
    outcome: 'Captar uma intenção específica',
    solution: 'landing-page',
  },
  {
    title: 'Portfólio e página de autoridade',
    description: 'Repertório, método e provas reais organizados para quem precisa decidir com segurança.',
    family: 'presenca',
    format: 'Portfólio',
    outcome: 'Aumentar confiança',
    solution: 'site-institucional-premium',
  },
  {
    title: 'E-commerce profissional',
    description: 'Loja preparada para catálogo, checkout, conteúdo, campanhas e evolução da operação comercial.',
    family: 'comercio',
    format: 'E-commerce',
    outcome: 'Vender online com controle',
    solution: 'ecommerce-profissional',
  },
  {
    title: 'Catálogo digital',
    description: 'Produtos pesquisáveis, atualizáveis e prontos para gerar um pedido ou orçamento contextual.',
    family: 'comercio',
    format: 'Catálogo',
    outcome: 'Substituir PDF e lista solta',
    solution: 'catalogo-digital',
  },
  {
    title: 'Catálogo para representantes',
    description: 'Linhas, referências, quantidades e cotação estruturada para venda consultiva B2B.',
    family: 'comercio',
    format: 'Catálogo B2B',
    outcome: 'Acelerar cotação e pedido',
    solution: 'catalogo-para-representantes',
  },
  {
    title: 'Cardápio, pedido e delivery',
    description: 'Uma jornada móvel para escolher, entender disponibilidade e iniciar o pedido com menos atrito.',
    family: 'comercio',
    format: 'Comércio local',
    outcome: 'Facilitar o pedido',
    solution: 'site-para-restaurantes',
  },
  {
    title: 'Diagnóstico e qualificação',
    description: 'Perguntas curtas que identificam intenção, prioridade e contexto antes do atendimento.',
    family: 'atendimento',
    format: 'Funil',
    outcome: 'Receber contatos melhores',
    solution: 'funil-de-qualificacao',
  },
  {
    title: 'Recepção comercial no WhatsApp',
    description: 'Resposta imediata, triagem e transferência para uma pessoa com o briefing já organizado.',
    family: 'atendimento',
    format: 'Atendimento',
    outcome: 'Responder sem recomeçar do zero',
    solution: 'automacao-whatsapp',
  },
  {
    title: 'Agendamento integrado',
    description: 'Serviço, unidade, preferência e disponibilidade reunidos antes da confirmação humana ou automática.',
    family: 'atendimento',
    format: 'Agendamento',
    outcome: 'Reduzir troca de mensagens',
    solution: 'agendamento-online',
  },
  {
    title: 'Orçamento guiado',
    description: 'Uma entrada comercial que coleta variáveis úteis e entrega uma solicitação pronta para responder.',
    family: 'atendimento',
    format: 'Cotação',
    outcome: 'Ganhar velocidade comercial',
    solution: 'funil-de-qualificacao',
  },
  {
    title: 'Aplicativo para a operação',
    description: 'Experiência móvel ou web para uma tarefa recorrente de clientes, equipe ou parceiros.',
    family: 'produto',
    format: 'Aplicativo',
    outcome: 'Transformar rotina em produto',
    solution: 'app-para-empresas',
  },
  {
    title: 'SaaS e produto recorrente',
    description: 'Validação, experiência, autenticação, cobrança e operação para um produto com receita recorrente.',
    family: 'produto',
    format: 'SaaS',
    outcome: 'Criar uma nova linha de receita',
    solution: 'desenvolvimento-saas',
  },
  {
    title: 'Portal e área do cliente',
    description: 'Acesso organizado a pedidos, documentos, serviços, suporte e informações de relacionamento.',
    family: 'produto',
    format: 'Portal',
    outcome: 'Dar autonomia ao cliente',
    solution: 'portal-do-cliente',
  },
  {
    title: 'Sistema sob medida',
    description: 'Um fluxo operacional específico transformado em software com regras e responsabilidades explícitas.',
    family: 'produto',
    format: 'Sistema',
    outcome: 'Reduzir trabalho manual',
    solution: 'sistema-sob-medida',
  },
  {
    title: 'SEO local e Google Business',
    description: 'Base técnica, serviços, páginas e sinais consistentes para busca local e perfil oficial da empresa.',
    family: 'distribuicao',
    format: 'Busca local',
    outcome: 'Ser encontrado com contexto',
    solution: 'seo-local-google-business',
  },
  {
    title: 'Estrutura multicanal',
    description: 'Site, busca, WhatsApp, e-mail e campanhas conectados a uma origem e a um próximo passo mensurável.',
    family: 'distribuicao',
    format: 'Aquisição',
    outcome: 'Capilarizar a presença',
    solution: 'distribuicao-multicanal',
  },
  {
    title: 'Páginas para campanhas',
    description: 'Rotas específicas para Google, Meta, TikTok, LinkedIn e conteúdo, alinhadas à mensagem de cada anúncio.',
    family: 'distribuicao',
    format: 'Campanhas',
    outcome: 'Preservar intenção do clique',
    solution: 'landing-page',
  },
  {
    title: 'Conteúdo e arquitetura de busca',
    description: 'Clusters úteis, comparativos e respostas autorais para pessoas e mecanismos de descoberta.',
    family: 'distribuicao',
    format: 'Conteúdo',
    outcome: 'Construir demanda acumulativa',
    solution: 'seo-local-google-business',
  },
  {
    title: 'Analytics e CRO',
    description: 'Eventos, funil e experimentos para localizar atrito e melhorar decisões sem métricas decorativas.',
    family: 'operacao',
    format: 'Mensuração',
    outcome: 'Evoluir por evidência',
    solution: 'analytics-e-cro',
  },
  {
    title: 'Automações e integrações',
    description: 'Conexões proporcionais entre formulários, atendimento, CRM e rotinas que já existem.',
    family: 'operacao',
    format: 'Automação',
    outcome: 'Eliminar repasse manual',
    solution: 'infraestrutura-digital',
  },
  {
    title: 'Performance e segurança',
    description: 'Hospedagem, proteção, monitoramento e recuperação tratados como parte da experiência comercial.',
    family: 'operacao',
    format: 'Infraestrutura',
    outcome: 'Manter a operação disponível',
    solution: 'infraestrutura-digital',
  },
  {
    title: 'Evolução contínua',
    description: 'Uma fila mensal de melhorias priorizada por uso, oportunidade e impacto operacional.',
    family: 'operacao',
    format: 'Assinatura',
    outcome: 'Não deixar o digital parar',
    solution: 'analytics-e-cro',
  },
  {
    title: 'Operação digital',
    description: 'Recepção no WhatsApp, painel de leads e ciclo mensal para o site continuar vendendo depois de publicar.',
    family: 'operacao',
    format: 'Assinatura',
    outcome: 'Fazer o digital continuar trabalhando',
    solution: 'operacao-digital',
  },
];

export const DELIVERY_MODELS = [
  {
    id: 'entrega-individual',
    label: 'Entrega individual',
    title: 'Um projeto com começo, corte e publicação definidos.',
    description: 'Indicado para site, loja, catálogo, aplicativo, SaaS, portal, sistema ou automação com escopo fechado.',
    cadence: 'Diagnóstico → proposta → construção → publicação',
  },
  {
    id: 'operacao-base',
    label: 'Operação contínua',
    title: 'A base digital permanece rápida, segura e acompanhada.',
    description: 'Hospedagem, monitoramento, backup, atualizações e suporte com responsabilidade definida.',
    cadence: 'Rotina técnica + relatório de saúde',
  },
  {
    id: 'crescimento',
    label: 'Crescimento e capilaridade',
    title: 'O projeto evolui entre busca, conteúdo, campanhas e conversão.',
    description: 'SEO, páginas prioritárias, analytics, CRO e novos canais entram em ciclos mensuráveis.',
    cadence: 'Prioridade mensal + releases verificáveis',
  },
];

export const ACQUISITION_CHANNELS = [
  'Google Search',
  'Google Maps',
  'WhatsApp',
  'Instagram',
  'Meta Ads',
  'TikTok',
  'LinkedIn',
  'E-mail',
] as const;
