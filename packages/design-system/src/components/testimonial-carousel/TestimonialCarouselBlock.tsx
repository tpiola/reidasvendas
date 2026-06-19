import type { ComponentConfig } from '@measured/puck';
import { cn } from '@altiq/utils';

export type TestimonialCarouselProps = {
  label: string;
  headline: string;
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
    company: string;
    avatarUrl?: string;
    rating: 1 | 2 | 3 | 4 | 5;
  }>;
  /** Autoplay interval in ms */
  autoplaySpeed: number;
  /** Variant */
  variant: 'glass-cards' | 'minimal';
};

export const TestimonialCarouselBlock: ComponentConfig<TestimonialCarouselProps> = {
  label: 'Testimonial Carousel',
  fields: {
    label: { type: 'text', label: 'Rótulo (ex: "DEPOIMENTOS")' },
    headline: { type: 'text', label: 'Título' },
    testimonials: {
      type: 'array',
      label: 'Depoimentos',
      arrayFields: {
        quote: { type: 'textarea', label: 'Depoimento' },
        author: { type: 'text', label: 'Nome do autor' },
        role: { type: 'text', label: 'Cargo' },
        company: { type: 'text', label: 'Empresa' },
        avatarUrl: { type: 'text', label: 'URL do avatar' },
        rating: {
          type: 'select',
          label: 'Avaliação',
          options: [
            { label: '1 estrela', value: 1 },
            { label: '2 estrelas', value: 2 },
            { label: '3 estrelas', value: 3 },
            { label: '4 estrelas', value: 4 },
            { label: '5 estrelas', value: 5 },
          ],
        },
      },
      defaultItemProps: {
        quote: 'Excelente trabalho!',
        author: 'João Silva',
        role: 'CEO',
        company: 'Empresa',
        avatarUrl: '',
        rating: 5,
      },
    },
    autoplaySpeed: {
      type: 'number',
      label: 'Velocidade do autoplay (ms, 0 = desligado)',
      min: 0,
      max: 15000,
    },
    variant: {
      type: 'select',
      label: 'Variante',
      options: [
        { label: 'Glass Cards', value: 'glass-cards' },
        { label: 'Minimal', value: 'minimal' },
      ],
    },
  },
  defaultProps: {
    label: 'DEPOIMENTOS',
    headline: 'O que nossos clientes dizem',
    testimonials: [],
    autoplaySpeed: 5000,
    variant: 'glass-cards',
  },
  render: ({ label, headline, testimonials, autoplaySpeed, variant }) => {
    return (
      <section className="rdv-testimonial-carousel relative overflow-hidden py-20 sm:py-32 section-spacing">
        {/* Background ambient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* Header */}
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="section-label block text-[10px] font-bold uppercase tracking-[0.3em] text-[#D6A84F]">
              <span className="mx-auto mb-3 block h-px w-6 bg-[#D6A84F] opacity-60" />
              {label}
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-bold text-white">{headline}</h2>
          </div>

          {/* Testimonials grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={cn(
                  'group rounded-2xl p-6 sm:p-8 transition-all duration-300',
                  variant === 'glass-cards'
                    ? 'bg-[rgba(255,255,255,0.024)] border border-[rgba(255,255,255,0.06)] backdrop-blur-[32px] hover:bg-[rgba(255,255,255,0.043)] hover:border-[rgba(214,168,79,0.22)] hover:shadow-[rgba(0,0,0,0.85)_0_16px_60px,rgba(255,255,255,0.08)_0_1px_inset,rgba(214,168,79,0.06)_0_0_40px]'
                    : 'border border-[rgba(214,168,79,0.08)] bg-transparent hover:border-[rgba(214,168,79,0.2)]'
                )}
                style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
              >
                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }, (_, s) => (
                    <svg
                      key={s}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={s < t.rating ? '#D6A84F' : 'rgba(255,255,255,0.12)'}
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mb-6 text-sm leading-relaxed text-[#A1A1AA]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(214,168,79,0.15)] text-sm font-bold text-[#D6A84F]">
                    {t.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.author}</p>
                    <p className="text-xs text-[#8A8A92]">
                      {t.role}
                      {t.company && ` · ${t.company}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
};
