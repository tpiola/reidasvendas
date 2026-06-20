import { Quote, Star, Sparkles, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionLabel, Reveal, staggerContainer, staggerItem } from '@/hooks/useAnimation';

const testimonials = [
  {
    quote: 'Transformou completamente nossa presença digital. O site é rápido, bonito e gerou um aumento de 40% nos pedidos pelo WhatsApp.',
    name: 'Carlos Mendes',
    role: 'CEO',
    company: 'Farmácia Premium Dracena',
    rating: 5,
    highlight: '+40% pedidos WhatsApp',
  },
  {
    quote: 'A plataforma que construíram para clínica é impressionante. Agendamento online, prontuário digital — tudo integrado. Reduziu faltas em 60%.',
    name: 'Dra. Fernanda Lima',
    role: 'Diretora Clínica',
    company: 'Clínica Bem-Estar',
    rating: 5,
    highlight: '-60% faltas',
  },
  {
    quote: 'O dashboard em tempo real mudou a forma como tomamos decisões. Agora vemos vendas, estoque e margem em um só lugar, atualizado a cada segundo.',
    name: 'Ricardo Oliveira',
    role: 'COO',
    company: 'Grupo Oliveira Indústria',
    rating: 5,
    highlight: 'Decisões em tempo real',
  },
];

export function TestimonialsTrust() {
  return (
    <SectionWrapper dark id="testimonials">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <SectionLabel>Trust & Results</SectionLabel>
          <h2 className="font-serif mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Quem já usa,{' '}
            <span className="text-gradient-gold">confirma</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Empresas que confiaram no Rei das Vendas para construir sua infraestrutura digital premium.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="group relative rounded-2xl border border-[rgba(212,175,55,0.1)] bg-gradient-to-br from-[rgba(212,175,55,0.02)] to-[rgba(10,22,40,0.1)] p-6 sm:p-7 transition-all duration-500 hover:border-[#D4AF37]/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.08)]"
            >
              {/* Gold border accent */}
              <div className="absolute inset-0 rounded-2xl border border-[rgba(212,175,55,0.15)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[rgba(212,175,55,0.08)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

              <div className="relative z-10">
                {/* Quote icon */}
                <Quote className="mb-4 h-8 w-8 text-[rgba(212,175,55,0.15)]" />

                {/* Rating */}
                <div className="mb-3 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm leading-relaxed text-[#A1A1AA]">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Result highlight */}
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[rgba(212,175,55,0.08)] px-3 py-1 text-[10px] font-bold text-[#D4AF37]">
                  <Sparkles className="h-2.5 w-2.5" />
                  {t.highlight}
                </div>

                {/* Author */}
                <div className="mt-5 flex items-center gap-3 border-t border-[rgba(212,175,55,0.06)] pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[rgba(212,175,55,0.15)] to-[rgba(212,175,55,0.05)] text-sm font-bold text-[#D4AF37]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-[#71717A]">
                      {t.role}, {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust indicators row */}
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#71717A]">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
              Franca-SP
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
              12+ Projetos Entregues
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5 text-[#D4AF37]" />
              Suporte Premium 24/7
            </span>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
