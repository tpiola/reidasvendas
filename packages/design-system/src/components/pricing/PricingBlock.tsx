import type { ComponentConfig } from '@measured/puck';
import { cn } from '@altiq/utils';

export type PricingProps = {
  label: string;
  headline: string;
  description: string;
  plans: Array<{
    name: string;
    description: string;
    price: string;
    period: 'monthly' | 'yearly' | 'one-time';
    featured: boolean;
    features: string[];
    cta: { label: string; href: string };
    highlightColor?: 'gold' | 'blue' | 'none';
  }>;
  /** Show annual/monthly toggle */
  showToggle: boolean;
};

export const PricingBlock: ComponentConfig<PricingProps> = {
  label: 'Pricing',
  fields: {
    label: { type: 'text', label: 'Rótulo' },
    headline: { type: 'text', label: 'Título' },
    description: { type: 'textarea', label: 'Descrição' },
    plans: {
      type: 'array',
      label: 'Planos',
      arrayFields: {
        name: { type: 'text', label: 'Nome do plano' },
        description: { type: 'text', label: 'Descrição curta' },
        price: { type: 'text', label: 'Preço (ex: "R$ 997")' },
        period: {
          type: 'select',
          label: 'Período',
          options: [
            { label: 'Mensal', value: 'monthly' },
            { label: 'Anual', value: 'yearly' },
            { label: 'Único', value: 'one-time' },
          ],
        },
        featured: { type: 'radio', label: 'Destaque (mais popular)', options: [{ label: 'Sim', value: true }, { label: 'Não', value: false }] },
        features: {
          type: 'array',
          label: 'Features',
          arrayFields: {
            label: { type: 'text', label: 'Feature' },
          },
        },
        cta: {
          type: 'object',
          label: 'CTA',
          objectFields: {
            label: { type: 'text', label: 'Texto' },
            href: { type: 'text', label: 'Link' },
          },
        },
        highlightColor: {
          type: 'select',
          label: 'Cor de destaque',
          options: [
            { label: 'Gold', value: 'gold' },
            { label: 'Blue', value: 'blue' },
            { label: 'Nenhum', value: 'none' },
          ],
        },
      },
      defaultItemProps: {
        name: 'Plano',
        description: 'Descrição do plano',
        price: 'R$ 997',
        period: 'monthly',
        featured: false,
        features: [{ label: 'Feature 1' }, { label: 'Feature 2' }],
        cta: { label: 'Começar', href: '/contato' },
        highlightColor: 'gold',
      },
    },
    showToggle: { type: 'radio', label: 'Exibir toggle mensal/anual', options: [{ label: 'Sim', value: true }, { label: 'Não', value: false }] },
  },
  defaultProps: {
    label: 'INVESTIMENTO',
    headline: 'Planos que se adaptam ao seu negócio',
    description: 'Escolha o plano ideal para sua empresa. Todos incluem suporte dedicado.',
    plans: [
      {
        name: 'Essencial',
        description: 'Para quem está começando',
        price: 'R$ 1.997',
        period: 'monthly',
        featured: false,
        features: ['Site institucional', 'Landing page', 'Formulário de lead', 'Suporte por email'],
        cta: { label: 'Contratar', href: '/contato' },
        highlightColor: 'none',
      },
      {
        name: 'Profissional',
        description: 'Mais popular',
        price: 'R$ 4.997',
        period: 'monthly',
        featured: true,
        features: ['Tudo do Essencial', 'Dashboard personalizado', 'Automação de marketing', 'Suporte prioritário', 'SEO avançado'],
        cta: { label: 'Solicitar Proposta', href: '/contato' },
        highlightColor: 'gold',
      },
      {
        name: 'Enterprise',
        description: 'Sob medida para grandes operações',
        price: 'Sob consulta',
        period: 'one-time',
        featured: false,
        features: ['Tudo do Profissional', 'Infraestrutura dedicada', 'Sistema completo', 'Mentoria mensal', 'SLA 24h'],
        cta: { label: 'Falar com Consultor', href: '/contato' },
        highlightColor: 'none',
      },
    ],
    showToggle: false,
  },
  render: ({ label, headline, description, plans, showToggle }) => {
    return (
      <section className="rdv-pricing relative py-20 sm:py-32 section-spacing">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Header */}
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="section-label block text-[10px] font-bold uppercase tracking-[0.3em] text-[#D6A84F]">
              <span className="mx-auto mb-3 block h-px w-6 bg-[#D6A84F] opacity-60" />
              {label}
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold text-white">{headline}</h2>
            {description && <p className="mt-4 text-base sm:text-lg text-[#A1A1AA]">{description}</p>}
          </div>

          {/* Plans grid */}
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={cn(
                  'relative flex flex-col rounded-2xl border p-6 sm:p-8 transition-all duration-300',
                  plan.featured
                    ? 'border-[rgba(214,168,79,0.35)] bg-[rgba(214,168,79,0.03)] shadow-[0_0_40px_rgba(214,168,79,0.06)] scale-[1.02] md:scale-[1.04] z-10'
                    : 'border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.024)] backdrop-blur-[32px] hover:border-[rgba(214,168,79,0.22)] hover:shadow-[rgba(0,0,0,0.85)_0_16px_60px,rgba(214,168,79,0.06)_0_0_40px]'
                )}
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                {/* Featured badge */}
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] px-4 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#030303]">
                    Mais Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  {plan.description && <p className="mt-1 text-sm text-[#8A8A92]">{plan.description}</p>}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white">{plan.price}</span>
                  <span className="ml-1 text-sm text-[#8A8A92]">
                    {plan.period === 'monthly' ? '/mês' : plan.period === 'yearly' ? '/ano' : ''}
                  </span>
                </div>

                {/* Features */}
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feat, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-sm text-[#A1A1AA]">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#D6A84F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={plan.cta.href}
                  className={cn(
                    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 text-center',
                    plan.featured
                      ? 'bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] bg-[length:200%_auto] text-[#030303] hover:bg-right hover:shadow-[0_0_40px_rgba(214,168,79,0.35)] hover:scale-[1.02]'
                      : 'border border-[rgba(214,168,79,0.22)] text-white hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]'
                  )}
                  style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
                >
                  {plan.cta.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
};
