import type { ComponentConfig } from '@measured/puck';
import { cn } from '@altiq/utils';

export type HeroProps = {
  headline: string;
  subtitle: string;
  /** Background video URL (optional) */
  videoUrl?: string;
  /** Background image fallback */
  fallbackImage?: string;
  /** Primary CTA */
  ctaPrimary: { label: string; href: string };
  /** Secondary CTA */
  ctaSecondary: { label: string; href: string };
  /** Alignment: center or left */
  align: 'center' | 'left';
  /** Show gold glow effects */
  showGlow: boolean;
  /** Show gradient text on headline */
  gradientHeadline: boolean;
  /** Max width for content container */
  maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

const maxWidthMap = {
  sm: 'max-w-2xl',
  md: 'max-w-3xl',
  lg: 'max-w-4xl',
  xl: 'max-w-5xl',
  full: 'max-w-none',
};

export const HeroBlock: ComponentConfig<HeroProps> = {
  label: 'Hero',
  fields: {
    headline: {
      type: 'text',
      label: 'Headline (suporta HTML básico)',
    },
    subtitle: {
      type: 'textarea',
      label: 'Subtítulo',
    },
    videoUrl: {
      type: 'text',
      label: 'URL do vídeo de fundo (MP4)',
    },
    fallbackImage: {
      type: 'text',
      label: 'Imagem fallback',
    },
    ctaPrimary: {
      type: 'object',
      label: 'CTA Primário',
      objectFields: {
        label: { type: 'text', label: 'Texto' },
        href: { type: 'text', label: 'Link' },
      },
    },
    ctaSecondary: {
      type: 'object',
      label: 'CTA Secundário',
      objectFields: {
        label: { type: 'text', label: 'Texto' },
        href: { type: 'text', label: 'Link' },
      },
    },
    align: {
      type: 'select',
      label: 'Alinhamento',
      options: [
        { label: 'Centro', value: 'center' },
        { label: 'Esquerda', value: 'left' },
      ],
    },
    showGlow: {
      type: 'radio',
      label: 'Efeito glow gold',
      options: [
        { label: 'Sim', value: true },
        { label: 'Não', value: false },
      ],
    },
    gradientHeadline: {
      type: 'radio',
      label: 'Headline com gradiente gold',
      options: [
        { label: 'Sim', value: true },
        { label: 'Não', value: false },
      ],
    },
    maxWidth: {
      type: 'select',
      label: 'Largura máxima do conteúdo',
      options: [
        { label: 'sm (42rem)', value: 'sm' },
        { label: 'md (48rem)', value: 'md' },
        { label: 'lg (56rem)', value: 'lg' },
        { label: 'xl (64rem)', value: 'xl' },
        { label: 'Full', value: 'full' },
      ],
    },
  },
  defaultProps: {
    headline: 'Sua <span class="text-gradient-premium">Infraestrutura Digital</span> de Vendas',
    subtitle: 'Tecnologia, design e estratégia — tudo sob medida para empresas que querem vender com mais estrutura.',
    videoUrl: '',
    fallbackImage: '',
    ctaPrimary: { label: 'Solicitar Diagnóstico', href: '/diagnostico' },
    ctaSecondary: { label: 'Ver Soluções', href: '/servicos' },
    align: 'center',
    showGlow: true,
    gradientHeadline: true,
    maxWidth: 'lg',
  },
  render: ({ headline, subtitle, videoUrl, fallbackImage, ctaPrimary, ctaSecondary, align, showGlow, gradientHeadline, maxWidth }) => {
    const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start';
    const headlineClass = gradientHeadline ? '' : '';

    return (
      <section className="rdv-hero relative flex min-h-[100dvh] items-center overflow-hidden bg-[#030303]">
        {/* Background layer */}
        <div className="absolute inset-0">
          {videoUrl && (
            <video
              className="absolute inset-0 h-full w-full object-cover opacity-30"
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
          {!videoUrl && fallbackImage && (
            <img className="absolute inset-0 h-full w-full object-cover opacity-30" src={fallbackImage} alt="" />
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(3,3,3,0.6)] via-[rgba(3,3,3,0.2)] to-[#030303]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          {/* Gold glows */}
          {showGlow && (
            <>
              <div className="absolute -left-[20%] -top-[20%] h-[60%] w-[60%] rounded-full bg-[rgba(214,168,79,0.06)] blur-[150px]" />
              <div className="absolute -bottom-[20%] -right-[20%] h-[50%] w-[50%] rounded-full bg-[rgba(214,168,79,0.04)] blur-[120px]" />
            </>
          )}
        </div>

        {/* Content */}
        <div className={cn('relative mx-auto w-full px-4 sm:px-6', maxWidthMap[maxWidth])}>
          <div className={cn('flex flex-col gap-6', alignClasses)}>
            {/* Section label */}
            <span className="section-label block text-[10px] font-bold uppercase tracking-[0.3em] text-[#D6A84F]">
              <span className="block mb-3 h-px w-6 bg-[#D6A84F] opacity-60" />
              REI DAS VENDAS
            </span>

            {/* Headline */}
            <h1
              className={cn(
                'font-serif text-[clamp(2.8rem,7.5vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white',
                gradientHeadline && 'text-gradient-premium'
              )}
              dangerouslySetInnerHTML={{ __html: headline }}
            />

            {/* Subtitle */}
            {subtitle && (
              <p className="max-w-[36rem] text-base sm:text-lg leading-relaxed text-[#A1A1AA]">
                {subtitle}
              </p>
            )}

            {/* CTAs */}
            <div className={cn('flex flex-wrap gap-4 pt-4', align === 'center' && 'justify-center')}>
              <a
                href={ctaPrimary.href}
                className="btn-gold inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] bg-[length:200%_auto] px-7 py-3 text-sm font-bold text-[#030303] transition-all duration-300 hover:bg-right hover:shadow-[0_0_40px_rgba(214,168,79,0.35),0_0_80px_rgba(214,168,79,0.12)] hover:scale-[1.02] active:scale-[0.98]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                {ctaPrimary.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={ctaSecondary.href}
                className="btn-outline-gold inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)] hover:shadow-[0_0_30px_rgba(214,168,79,0.1)] hover:-translate-y-px active:scale-[0.98]"
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                {ctaSecondary.label}
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  },
};
