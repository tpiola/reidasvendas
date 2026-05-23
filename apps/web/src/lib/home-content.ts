/** Copy e dados estruturados da Home — Fábrica Digital de Performance */

export const HOME_FAQ = [
  {
    id: 'prazo',
    question: 'Em quanto tempo a primeira versão fica no ar?',
    answer:
      'Projetos de funil e landing costumam ter primeira versão publicada em até 72 horas úteis, após diagnóstico. Aplicativos e extensões dependem do escopo — sempre com marcos claros e entrega incremental, nunca “surpresa” no fim do prazo.',
  },
  {
    id: 'dados',
    question: 'Como vocês tratam segurança de dados e LGPD?',
    answer:
      'Seguimos princípios de minimização de dados, consentimento explícito nos formulários, criptografia em trânsito (HTTPS) e política de privacidade alinhada à LGPD e orientações da ANPD. Integrações (CRM, WhatsApp, n8n) são configuradas com credenciais server-side, nunca expostas no front-end.',
  },
  {
    id: 'google',
    question: 'O site fica alinhado às políticas do Google e Core Web Vitals?',
    answer:
      'Sim. Performance, acessibilidade e SEO técnico fazem parte do escopo: código enxuto, imagens WebP, lazy load, meta-tags consistentes, JSON-LD e páginas rápidas — requisitos para ranquear bem e ser citado em buscas tradicionais e em motores generativos (GEO).',
  },
  {
    id: 'ia-humano',
    question: 'A IA substitui a equipe humana de vocês?',
    answer:
      'Não. Usamos inteligência artificial para acelerar desenvolvimento, copy, automações e análises — com revisão e validação humana em cada entrega crítica. O objetivo é velocidade com responsabilidade, não conteúdo genérico em escala.',
  },
  {
    id: 'escopo',
    question: 'O que exatamente vocês entregam?',
    answer:
      'Sites e landing pages ultra-rápidas, aplicativos e extensões sob medida, funis de vendas, automações (WhatsApp, CRM, n8n), tráfego pago integrado a IA, dashboards, playbooks comerciais e social media com engenharia de performance — tudo conectado a métricas reais.',
  },
] as const;

export const PAIN_POINTS = [
  {
    title: 'Equipe lenta, processo manual',
    desc: 'Follow-up esquecido, planilha duplicada e oportunidade morrendo no WhatsApp pessoal.',
  },
  {
    title: 'Anúncio sem contexto',
    desc: 'Tráfego pago que chega em página genérica — sem mensagem, sem prova, sem próximo passo claro.',
  },
  {
    title: 'CRM abandonado',
    desc: 'Ferramenta cara que ninguém alimenta; funil existe no slide, não na operação.',
  },
  {
    title: 'Site que não converte',
    desc: 'Bonito no mockup, lento no celular, invisível para o Google e para as IAs que citam concorrentes.',
  },
] as const;

export const DELIVERY_PILLARS = [
  {
    num: '01',
    title: 'IA para Captar',
    desc: 'Landing pages ultra-rápidas, tráfego pago nativo integrado a IA e captação de dados contextuais para qualificar antes do primeiro contato humano.',
  },
  {
    num: '02',
    title: 'IA para Vender',
    desc: 'Extensões personalizadas, automações inteligentes de atendimento e fluxos de comunicação que respondem no timing certo — sem robô frio.',
  },
  {
    num: '03',
    title: 'IA para Treinar',
    desc: 'Centrais de microtreinamento, playbooks dinâmicos e simulações para equipes comerciais operarem o mesmo script com autonomia.',
  },
  {
    num: '04',
    title: 'IA para Operar',
    desc: 'Dashboards, inteligência analítica de CRM e velocidade máxima em testes de novos produtos, públicos e ofertas — decisão com dado, não com achismo.',
  },
] as const;

export const VIDEO_SHOWCASE = [
  {
    id: 'funil',
    caption: 'Engenharia de funil · do clique ao CRM',
    srcKey: 'manifesto' as const,
  },
  {
    id: 'automacao',
    caption: 'Automação e fluxos · bastidores técnicos',
    srcKey: 'performance' as const,
  },
  {
    id: 'performance',
    caption: 'Core Web Vitals · performance em produção',
    srcKey: 'heroBusiness' as const,
  },
] as const;

export const CASE_PLACEHOLDERS = [
  {
    id: 'case-a',
    segment: 'Varejo local',
    problem: '[Problema real autorizado — a inserir]',
    intervention: '[Intervenção tecnológica — a inserir]',
    outcome: '[Mudança observada — a inserir]',
    timeline: '[Tempo de implementação — a inserir]',
  },
  {
    id: 'case-b',
    segment: 'Serviços B2B',
    problem: '[Problema real autorizado — a inserir]',
    intervention: '[Intervenção tecnológica — a inserir]',
    outcome: '[Mudança observada — a inserir]',
    timeline: '[Tempo de implementação — a inserir]',
  },
  {
    id: 'case-c',
    segment: 'Saúde & estética',
    problem: '[Problema real autorizado — a inserir]',
    intervention: '[Intervenção tecnológica — a inserir]',
    outcome: '[Mudança observada — a inserir]',
    timeline: '[Tempo de implementação — a inserir]',
  },
] as const;
