export type TemplateModule = {
  id: string;
  label: string;
  description: string;
  priceCents: number;
};

export const TEMPLATE_MODULES: TemplateModule[] = [
  {
    id: 'crm-inbox',
    label: 'Inbox + CRM leve',
    description: 'Captura centralizada, tags e pipeline básico para não perder lead.',
    priceCents: 69000,
  },
  {
    id: 'booking',
    label: 'Agendamento',
    description: 'Slots, confirmação e lembretes. Reduz no-show e aumenta conversão.',
    priceCents: 89000,
  },
  {
    id: 'payments',
    label: 'Pagamentos',
    description: 'Link de pagamento, checkout simples e acompanhamento de status.',
    priceCents: 99000,
  },
  {
    id: 'members',
    label: 'Área de membros',
    description: 'Conteúdo protegido e acesso por perfil. Ideal para programas e cursos.',
    priceCents: 129000,
  },
  {
    id: 'automation',
    label: 'Automações (Make/Zapier)',
    description: 'Sequências de follow-up, roteamento e enriquecimento do lead.',
    priceCents: 159000,
  },
  {
    id: 'analytics',
    label: 'Analytics + eventos',
    description: 'Tracking limpo e mensurável para decisões rápidas.',
    priceCents: 59000,
  },
  {
    id: 'seo',
    label: 'SEO técnico premium',
    description: 'Core Web Vitals, schema e estrutura editorial para ranquear com consistência.',
    priceCents: 79000,
  },
] as const;

