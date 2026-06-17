import type { ComponentConfig } from '@measured/puck';
import { cn } from '@altiq/utils';

export type FeatureGridProps = {
  label: string;
  headline: string;
  description: string;
  columns: 2 | 3 | 4;
  features: Array<{
    icon: 'code' | 'chart' | 'zap' | 'shield' | 'globe' | 'smartphone' | 'paintbrush' | 'rocket' | 'users' | 'settings';
    title: string;
    description: string;
    goldAccent?: boolean;
  }>;
  /** Visual variant */
  variant: 'glass' | 'bordered' | 'minimal';
};

const iconMap = {
  code: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6-1.6 1.6a1 1 0 0 0 1.4 1.4l2.3-2.3a1 1 0 0 0 0-1.4l-2.3-2.3a1 1 0 0 0-1.4 0zm-5.4 0a1 1 0 0 0-1.4 0L5.6 8.6a1 1 0 0 0 0 1.4l2.3 2.3a1 1 0 0 0 1.4-1.4L7.7 9.3l1.6-1.6a1 1 0 0 0 0-1.4z',
  chart: 'M3 13h4v8H3zm7-6h4v14h-4zm7-4h4v18h-4z',
  zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  globe: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
  smartphone: 'M17 1H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm-5 19a1 1 0 1 1 0-2 1 1 0 0 1 0 2z',
  paintbrush: 'M20.71 4.63l-1.34-1.34a2 2 0 0 0-2.83 0L9 10.83V14h3.17l7.54-7.54a2 2 0 0 0 0-2.83zM7 15l-3.29 3.29c-.39.39-.39 1.02 0 1.41.18.18.43.3.71.3h1.71A1.59 1.59 0 0 0 8 18.59V15H7z',
  rocket: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v.5L8 9l6 4.5V14c0 1.1-.9 2-2 2H4zm16 2c0 4.4-3.6 8-8 8s-8-3.6-8-8',
  users: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  settings: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z',
};

const variantStyles = {
  glass: 'bg-[rgba(255,255,255,0.024)] border border-[rgba(255,255,255,0.06)] backdrop-blur-[32px] saturate-[160%] shadow-[rgba(0,0,0,0.8)_0_8px_40px,rgba(255,255,255,0.06)_0_1px_inset] hover:bg-[rgba(255,255,255,0.043)] hover:border-[rgba(214,168,79,0.22)] hover:shadow-[rgba(0,0,0,0.85)_0_16px_60px,rgba(255,255,255,0.08)_0_1px_inset,rgba(214,168,79,0.06)_0_0_40px]',
  bordered: 'border border-[rgba(214,168,79,0.1)] bg-transparent hover:border-[rgba(214,168,79,0.25)] hover:bg-[rgba(214,168,79,0.03)]',
  minimal: 'bg-transparent hover:bg-[rgba(255,255,255,0.02)]',
};

export const FeatureGridBlock: ComponentConfig<FeatureGridProps> = {
  label: 'Feature Grid',
  fields: {
    label: { type: 'text', label: 'Rótulo da seção (ex: "SERVIÇOS")' },
    headline: { type: 'text', label: 'Título principal' },
    description: { type: 'textarea', label: 'Descrição' },
    columns: {
      type: 'select',
      label: 'Colunas',
      options: [
        { label: '2 colunas', value: 2 },
        { label: '3 colunas', value: 3 },
        { label: '4 colunas', value: 4 },
      ],
    },
    features: {
      type: 'array',
      label: 'Features',
      arrayFields: {
        title: { type: 'text', label: 'Título' },
        description: { type: 'textarea', label: 'Descrição' },
        icon: {
          type: 'select',
          label: 'Ícone',
          options: [
            { label: 'Código', value: 'code' },
            { label: 'Gráfico', value: 'chart' },
            { label: 'Raio', value: 'zap' },
            { label: 'Escudo', value: 'shield' },
            { label: 'Globo', value: 'globe' },
            { label: 'Smartphone', value: 'smartphone' },
            { label: 'Pincel', value: 'paintbrush' },
            { label: 'Foguete', value: 'rocket' },
            { label: 'Usuários', value: 'users' },
            { label: 'Config', value: 'settings' },
          ],
        },
        goldAccent: { type: 'radio', label: 'Destaque gold', options: [{ label: 'Sim', value: true }, { label: 'Não', value: false }] },
      },
      defaultItemProps: {
        title: 'Feature',
        description: 'Descrição da feature',
        icon: 'zap',
        goldAccent: false,
      },
    },
    variant: {
      type: 'select',
      label: 'Variante visual',
      options: [
        { label: 'Glass (padrão)', value: 'glass' },
        { label: 'Borda gold', value: 'bordered' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
  },
  defaultProps: {
    label: 'SERVIÇOS',
    headline: 'Soluções digitais que transformam vendas',
    description: 'Da landing page ao sistema completo — tecnologia sob medida para o seu negócio.',
    columns: 3,
    features: [
      { icon: 'code', title: 'Sites & Landing Pages', description: 'Páginas de alta conversão com design premium e performance máxima.', goldAccent: true },
      { icon: 'smartphone', title: 'Aplicativos', description: 'Apps nativos e híbridos para iOS e Android com experiência fluida.', goldAccent: false },
      { icon: 'zap', title: 'Automações', description: 'Workflows inteligentes que eliminam tarefas manuais repetitivas.', goldAccent: false },
    ],
    variant: 'glass',
  },
  render: ({ label, headline, description, columns, features, variant }) => {
    const gridCols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' };

    return (
      <section className="rdv-feature-grid relative py-20 sm:py-32 section-spacing">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />

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

          {/* Features grid */}
          <div className={cn('grid gap-6 md:gap-8', gridCols[columns])}>
            {features.map((feature, i) => (
              <div
                key={i}
                className={cn(
                  'group rounded-2xl p-6 sm:p-8 transition-all duration-300',
                  variantStyles[variant],
                  feature.goldAccent && 'relative'
                )}
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                {feature.goldAccent && (
                  <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(214,168,79,0.6), rgba(242,211,138,0.3), rgba(214,168,79,0.6), rgba(184,137,50,0.4), rgba(214,168,79,0.6))',
                      backgroundSize: '300% 300%',
                      mask: 'linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)',
                      padding: '1px',
                    }}
                  />
                )}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.1)]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D6A84F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={iconMap[feature.icon]} />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-[#D6A84F] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#A1A1AA]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
};
