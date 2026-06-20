import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Search, CheckCircle2, Shield, Zap, Globe,
  Heart, ShoppingBag, Stethoscope, Wrench, Sparkles, MessageCircle,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { PremiumButton } from '@/components/PremiumButton';
import { GoldParticles } from '@/components/GoldParticles';

/* ─── Categorias ─── */
const CATEGORIES = [
  { id: 'todos', label: 'Todos', icon: Sparkles },
  { id: 'saude', label: 'Saúde', icon: Heart },
  { id: 'calcados', label: 'Calçados', icon: ShoppingBag },
  { id: 'comercio', label: 'Comércio', icon: Search },
  { id: 'servicos', label: 'Serviços', icon: Wrench },
];

/* ─── Templates ─── */
const TEMPLATES = [
  {
    id: 1, name: 'Clínica Médica', category: 'saude',
    tags: ['Landing Page', 'Agendamento', 'Responsivo'],
    gradient: 'from-[#D6A84F]/15 to-[#030303]',
    accentColor: '#D6A84F',
    description: 'Template completo para clínicas médicas com agendamento online, galeria de profissionais e depoimentos.',
    preview: (
      <div className="flex h-40 items-center justify-center rounded-t-xl bg-gradient-to-br from-[#D6A84F]/10 to-[#080808] sm:h-48">
        <div className="text-center">
          <Heart className="mx-auto h-8 w-8 text-[#D6A84F]/40" />
          <p className="mt-2 text-xs text-[#71717A]">Clínica Médica</p>
        </div>
      </div>
    ),
  },
  {
    id: 2, name: 'Consultório Odontológico', category: 'saude',
    tags: ['Gallery', 'Serviços', 'Blog'],
    gradient: 'from-[#B88932]/15 to-[#030303]',
    accentColor: '#B88932',
    description: 'Design clean e profissional para dentistas com portfólio de casos, serviços e blog educativo.',
    preview: (
      <div className="flex h-40 items-center justify-center rounded-t-xl bg-gradient-to-br from-[#B88932]/10 to-[#080808] sm:h-48">
        <div className="text-center">
          <Stethoscope className="mx-auto h-8 w-8 text-[#B88932]/40" />
          <p className="mt-2 text-xs text-[#71717A]">Consultório Odontológico</p>
        </div>
      </div>
    ),
  },
  {
    id: 3, name: 'Fábrica de Calçados', category: 'calcados',
    tags: ['Catálogo', 'B2B', 'Portfólio'],
    gradient: 'from-[#D6A84F]/20 to-[#030303]',
    accentColor: '#D6A84F',
    description: 'Template industrial com catálogo de produtos, linha de produção e solicitação de orçamento.',
    preview: (
      <div className="flex h-40 items-center justify-center rounded-t-xl bg-gradient-to-br from-[#D6A84F]/10 to-[#080808] sm:h-48">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-8 w-8 text-[#D6A84F]/40" />
          <p className="mt-2 text-xs text-[#71717A]">Fábrica de Calçados</p>
        </div>
      </div>
    ),
  },
  {
    id: 4, name: 'Loja de Sapatos', category: 'calcados',
    tags: ['E-commerce', 'Vitrine', 'Carrinho'],
    gradient: 'from-[#F2D38A]/15 to-[#030303]',
    accentColor: '#F2D38A',
    description: 'E-commerce completo para lojas de calçados com vitrine virtual, carrinho e checkout integrado.',
    preview: (
      <div className="flex h-40 items-center justify-center rounded-t-xl bg-gradient-to-br from-[#F2D38A]/10 to-[#080808] sm:h-48">
        <div className="text-center">
          <Globe className="mx-auto h-8 w-8 text-[#F2D38A]/40" />
          <p className="mt-2 text-xs text-[#71717A]">Loja de Sapatos</p>
        </div>
      </div>
    ),
  },
  {
    id: 5, name: 'Mercado & Mercearia', category: 'comercio',
    tags: ['Delivery', 'Cardápio', 'Contato'],
    gradient: 'from-[#D6A84F]/15 to-[#030303]',
    accentColor: '#D6A84F',
    description: 'Template para comércios locais com cardápio digital, delivery integrado e WhatsApp direto.',
    preview: (
      <div className="flex h-40 items-center justify-center rounded-t-xl bg-gradient-to-br from-[#D6A84F]/10 to-[#080808] sm:h-48">
        <div className="text-center">
          <Search className="mx-auto h-8 w-8 text-[#D6A84F]/40" />
          <p className="mt-2 text-xs text-[#71717A]">Mercado & Mercearia</p>
        </div>
      </div>
    ),
  },
  {
    id: 6, name: 'Loja de Roupas', category: 'comercio',
    tags: ['E-commerce', 'Coleções', 'Blog'],
    gradient: 'from-[#B88932]/15 to-[#030303]',
    accentColor: '#B88932',
    description: 'Loja virtual com lookbook, coleções sazonais, blog de moda e integração com redes sociais.',
    preview: (
      <div className="flex h-40 items-center justify-center rounded-t-xl bg-gradient-to-br from-[#B88932]/10 to-[#080808] sm:h-48">
        <div className="text-center">
          <Heart className="mx-auto h-8 w-8 text-[#B88932]/40" />
          <p className="mt-2 text-xs text-[#71717A]">Loja de Roupas</p>
        </div>
      </div>
    ),
  },
  {
    id: 7, name: 'Escritório de Advocacia', category: 'servicos',
    tags: ['Profissional', 'Áreas de Atuação', 'Contato'],
    gradient: 'from-[#D6A84F]/20 to-[#030303]',
    accentColor: '#D6A84F',
    description: 'Site institucional para advogados com áreas de atuação, equipe, artigos e formulário de contato.',
    preview: (
      <div className="flex h-40 items-center justify-center rounded-t-xl bg-gradient-to-br from-[#D6A84F]/10 to-[#080808] sm:h-48">
        <div className="text-center">
          <Wrench className="mx-auto h-8 w-8 text-[#D6A84F]/40" />
          <p className="mt-2 text-xs text-[#71717A]">Escritório de Advocacia</p>
        </div>
      </div>
    ),
  },
  {
    id: 8, name: 'Agência de Marketing', category: 'servicos',
    tags: ['Portfólio', 'Cases', 'Orçamento'],
    gradient: 'from-[#F2D38A]/15 to-[#030303]',
    accentColor: '#F2D38A',
    description: 'Portfólio interativo para agências com cases de sucesso, timeline e formulário de orçamento.',
    preview: (
      <div className="flex h-40 items-center justify-center rounded-t-xl bg-gradient-to-br from-[#F2D38A]/10 to-[#080808] sm:h-48">
        <div className="text-center">
          <Zap className="mx-auto h-8 w-8 text-[#F2D38A]/40" />
          <p className="mt-2 text-xs text-[#71717A]">Agência de Marketing</p>
        </div>
      </div>
    ),
  },
  {
    id: 9, name: 'Personal Trainer', category: 'servicos',
    tags: ['Landing Page', 'Planos', 'Depoimentos'],
    gradient: 'from-[#D6A84F]/15 to-[#030303]',
    accentColor: '#D6A84F',
    description: 'Landing page para personal trainers com planos, grade de horários, depoimentos e agendamento.',
    preview: (
      <div className="flex h-40 items-center justify-center rounded-t-xl bg-gradient-to-br from-[#D6A84F]/10 to-[#080808] sm:h-48">
        <div className="text-center">
          <Heart className="mx-auto h-8 w-8 text-[#D6A84F]/40" />
          <p className="mt-2 text-xs text-[#71717A]">Personal Trainer</p>
        </div>
      </div>
    ),
  },
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState('todos');

  const filteredTemplates = activeCategory === 'todos'
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category === activeCategory);

  return (
    <main>
      <GoldParticles count={25} />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Marketplace de Templates</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Templates Premium para{' '}
              <span className="text-gradient-gold">Seu Negócio</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Escolha entre dezenas de templates prontos para usar. Cada um é personalizável
              e otimizado para conversão. Do clique ao site no ar em minutos.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PremiumButton href="/builder">
                Criar com IA <Sparkles className="h-4 w-4" />
              </PremiumButton>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold text-sm group inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-6 py-2.5 font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
              >
                Pedir Template Personalizado <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FILTRO DE CATEGORIAS ═══════ */}
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'border-[#D6A84F] bg-[rgba(214,168,79,0.12)] text-[#D6A84F] shadow-[0_0_20px_rgba(214,168,79,0.08)]'
                        : 'border-[rgba(255,255,255,0.08)] text-[#A1A1AA] hover:border-[rgba(214,168,79,0.2)] hover:text-[#D6A84F]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ GRID DE TEMPLATES ═══════ */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredTemplates.map((template) => {
                const Icon = CATEGORIES.find((c) => c.id === template.category)?.icon || Sparkles;
                return (
                  <motion.div
                    key={template.id}
                    layout
                    variants={staggerItem}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-card group flex flex-col rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden transition-all duration-500 hover:border-[rgba(214,168,79,0.25)] hover:bg-[rgba(214,168,79,0.02)]"
                  >
                    {/* Preview Area */}
                    {template.preview}

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[rgba(214,168,79,0.08)]">
                          <Icon className="h-3 w-3 text-[#D6A84F]" />
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D6A84F]">
                          {CATEGORIES.find((c) => c.id === template.category)?.label || template.category}
                        </span>
                      </div>

                      <h3 className="mt-3 font-serif text-lg font-bold text-white">{template.name}</h3>
                      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#A1A1AA]">
                        {template.description}
                      </p>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {template.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-[rgba(255,255,255,0.04)] px-2 py-0.5 text-[10px] text-[#71717A]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action */}
                      <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6A84F] transition-all duration-300 group-hover:gap-2.5">
                          Usar Template <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredTemplates.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-sm text-[#71717A]">Nenhum template encontrado para esta categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ CTA FINAL ═══════ */}
      <section className="relative overflow-hidden border-t border-[rgba(214,168,79,0.1)] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Precisa de Algo Único?</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Template Personalizado{' '}
              <span className="text-gradient-gold">Feito para Você</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
              Nossos designers criam um template exclusivo para sua marca, do zero.
              Briefing, protótipo, revisões e entrega — tudo incluído.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PremiumButton href="/contato">
                Solicitar Orçamento <ArrowRight className="h-4 w-4" />
              </PremiumButton>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold text-sm group inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-6 py-2.5 font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
              >
                Falar no WhatsApp <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#D6A84F]" /> Design Exclusivo
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#D6A84F]" /> 30 Dias de Garantia
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#D6A84F]" /> Entrega Rápida
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-[#D6A84F]" /> Suporte Incluso
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
