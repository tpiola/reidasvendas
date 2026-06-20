import { motion } from 'framer-motion';
import {
  ArrowRight, Sparkles, MessageCircle, MousePointerClick, Globe,
  CheckCircle2, Zap, Palette, Layout, Smartphone, Search, Shield,
  Bot, Wifi,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { PremiumButton } from '@/components/PremiumButton';
import { FeatureCard } from '@/components/PremiumComponents';
import { GoldParticles } from '@/components/GoldParticles';

/* ─── Fluxo do Builder ─── */
const FLOW = [
  {
    icon: MessageCircle, step: '01', title: 'Entrevista de Marca',
    desc: 'Você responde algumas perguntas sobre seu negócio — público-alvo, objetivo, estilo visual. Nosso AI aprende sua marca em minutos.',
  },
  {
    icon: Sparkles, step: '02', title: 'Geração por IA',
    desc: 'A inteligência artificial cria um site completo com design, copy e estrutura otimizados para conversão. Em segundos, não em semanas.',
  },
  {
    icon: MousePointerClick, step: '03', title: 'Customização Drag-and-Drop',
    desc: 'Arrume, troque cores, ajuste textos e imagens com o editor visual mais intuitivo do mercado. Sem precisar escrever uma linha de código.',
  },
  {
    icon: Globe, step: '04', title: 'Publicação com 1 Clique',
    desc: 'Seu site no ar com domínio próprio, SSL grátis, CDN global e SEO otimizado. Tudo incluso, sem surpresas.',
  },
];

/* ─── Templates Gerados por IA ─── */
const AI_TEMPLATES = [
  {
    name: 'Clínica Odontológica',
    category: 'Saúde',
    gradient: 'from-[#D6A84F]/20 via-[#B88932]/10 to-[#F2D38A]/5',
    borderColor: 'rgba(214,168,79,0.3)',
    accentColor: '#D6A84F',
    tag: 'Alta Conversão',
    preview: (
      <div className="flex h-44 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6A84F]/10 to-[#030303] sm:h-52">
        <div className="text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-[rgba(214,168,79,0.15)] flex items-center justify-center">
            <span className="text-lg font-bold text-[#D6A84F]">+</span>
          </div>
          <p className="text-xs text-[#A1A1AA]">Template • Saúde</p>
          <p className="text-sm font-semibold text-white">Dr. Carlos Silva</p>
        </div>
      </div>
    ),
  },
  {
    name: 'Loja de Calçados',
    category: 'Calçados',
    gradient: 'from-[#B88932]/20 via-[#D6A84F]/10 to-[#F2D38A]/5',
    borderColor: 'rgba(184,137,50,0.3)',
    accentColor: '#B88932',
    tag: 'E-commerce',
    preview: (
      <div className="flex h-44 items-center justify-center rounded-xl bg-gradient-to-br from-[#B88932]/10 to-[#030303] sm:h-52">
        <div className="text-center">
          <div className="mx-auto mb-3 flex gap-1">
            <div className="h-8 w-6 rounded bg-[rgba(184,137,50,0.15)]" />
            <div className="h-8 w-6 rounded bg-[rgba(184,137,50,0.2)]" />
            <div className="h-8 w-6 rounded bg-[rgba(184,137,50,0.15)]" />
          </div>
          <p className="text-xs text-[#A1A1AA]">Template • Calçados</p>
          <p className="text-sm font-semibold text-white">Sapataria Premium</p>
        </div>
      </div>
    ),
  },
  {
    name: 'Consultoria Empresarial',
    category: 'Serviços',
    gradient: 'from-[#F2D38A]/20 via-[#D6A84F]/10 to-[#B88932]/5',
    borderColor: 'rgba(242,211,138,0.3)',
    accentColor: '#F2D38A',
    tag: 'Landing Page',
    preview: (
      <div className="flex h-44 items-center justify-center rounded-xl bg-gradient-to-br from-[#F2D38A]/10 to-[#030303] sm:h-52">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-10 w-28 items-center justify-center rounded-lg border border-[rgba(242,211,138,0.2)] bg-[rgba(242,211,138,0.06)]">
            <span className="text-[10px] font-semibold text-[#F2D38A]">LOGOMARCA</span>
          </div>
          <p className="text-xs text-[#A1A1AA]">Template • Serviços</p>
          <p className="text-sm font-semibold text-white">Mentoria & Resultados</p>
        </div>
      </div>
    ),
  },
];

/* ─── Features do Builder ─── */
const BUILDER_FEATURES = [
  {
    icon: <Bot className="h-5 w-5" />,
    title: 'AI que Conhece sua Marca',
    description: 'Nosso algoritmo analisa seu negócio, segmento e concorrência para gerar um site que realmente representa sua marca.',
  },
  {
    icon: <Layout className="h-5 w-5" />,
    title: 'Editor Visual Completo',
    description: 'Drag-and-drop intuitivo com dezenas de componentes. Altere cores, fontes, imagens e layout em tempo real.',
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: '100% Responsivo',
    description: 'Seu site fica perfeito em qualquer dispositivo — celular, tablet e desktop. Teste e ajuste cada visualização.',
  },
  {
    icon: <Search className="h-5 w-5" />,
    title: 'SEO Inteligente',
    description: 'Meta tags, sitemap, structured data e otimização de performance aplicados automaticamente pela IA.',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Velocidade Ultrarápida',
    description: 'CDN global, imagens otimizadas e código enxuto. Seu site carrega em menos de 1 segundo em qualquer lugar.',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'SSL & Segurança',
    description: 'Certificado SSL grátis, proteção contra ataques DDoS e backups automáticos. Sua presença digital protegida 24/7.',
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: 'Design Premium',
    description: 'Templates criados por designers profissionais. Tipografia refinada, paletas harmônicas e micro-interações elegantes.',
  },
  {
    icon: <Wifi className="h-5 w-5" />,
    title: 'Domínio & Hospedagem',
    description: 'Domínio .com.br grátis no primeiro ano, hospedagem cloud com 99.9% de uptime e suporte técnico dedicado.',
  },
];

export default function Builder() {
  return (
    <main>
      <GoldParticles count={25} />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>AI Site Builder Premium</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              O Builder de Sites{' '}
              <span className="text-gradient-gold">Mais Inteligente do Mundo</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Crie um site profissional em minutos com inteligência artificial.
              Responda algumas perguntas sobre sua marca e veja a mágica acontecer.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PremiumButton href="/builder">
                Começar Gratuito <Sparkles className="h-4 w-4" />
              </PremiumButton>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold text-sm group inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-6 py-2.5 font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
              >
                <MessageCircle className="h-4 w-4" />
                Falar com Consultor
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#D6A84F]" /> Site em Minutos
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#D6A84F]" /> Sem Codificação
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#D6A84F]" /> Grátis por 14 Dias
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FLUXO DO BUILDER ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Como Funciona</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Crie seu Site em{' '}
              <span className="text-gradient-gold">4 Passos Simples</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#A1A1AA]">
              Do briefing ao site no ar. Sem complicação, sem código, sem estresse.
            </p>
          </Reveal>

          <div className="relative mt-16">
            {/* Desktop connector line */}
            <div className="absolute top-12 left-[10%] right-[10%] h-px hidden bg-gradient-to-r from-[rgba(214,168,79,0.3)] via-[rgba(214,168,79,0.15)] to-[rgba(214,168,79,0.3)] lg:block" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {FLOW.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    variants={staggerItem}
                    className="relative flex flex-col items-center text-center"
                  >
                    <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-[rgba(214,168,79,0.15)] bg-[rgba(214,168,79,0.04)]" />
                      <div className="absolute inset-2 rounded-full bg-[rgba(214,168,79,0.08)]" />
                      <Icon className="relative h-7 w-7 text-[#D6A84F]" />
                    </div>
                    <span className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6A84F]">
                      {item.step}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#A1A1AA]">{item.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ TEMPLATES GERADOS POR IA ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Templates Inteligentes</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Sites Gerados por IA para{' '}
              <span className="text-gradient-gold">Seu Segmento</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#A1A1AA]">
              Veja exemplos reais de sites criados pelo nosso AI em segundos.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {AI_TEMPLATES.map((template) => (
              <motion.div
                key={template.name}
                variants={staggerItem}
                className="glass-card group rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden transition-all duration-500 hover:border-[rgba(214,168,79,0.25)] hover:bg-[rgba(214,168,79,0.02)]"
              >
                {/* Preview */}
                {template.preview}

                {/* Info */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-block rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em]"
                      style={{
                        borderColor: template.borderColor,
                        color: template.accentColor,
                        backgroundColor: `${template.accentColor}10`,
                      }}
                    >
                      {template.tag}
                    </span>
                    <span className="text-[10px] text-[#71717A]">{template.category}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-bold text-white">{template.name}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Responsivo', 'SEO', 'Moderno'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-[rgba(255,255,255,0.04)] px-2 py-0.5 text-[10px] text-[#A1A1AA]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6A84F] transition-all duration-300 group-hover:gap-2.5">
                      Usar Template <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Recursos Premium</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Tudo que Você Precisa para{' '}
              <span className="text-gradient-gold">Vender Mais</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#A1A1AA]">
              Infraestrutura completa de sites profissionais com o poder da inteligência artificial.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {BUILDER_FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ CTA FINAL ═══════ */}
      <section className="relative overflow-hidden border-t border-[rgba(214,168,79,0.1)] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Comece Agora</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Crie seu Site com IA{' '}
              <span className="text-gradient-gold">Gratuitamente</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
              Teste o AI Site Builder Premium por 14 dias grátis. Sem cartão de crédito.
              Sem compromisso. Seu site no ar em minutos.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PremiumButton href="/builder">
                Começar Gratuito <Sparkles className="h-4 w-4" />
              </PremiumButton>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold text-sm group inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-6 py-2.5 font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
              >
                Ver Demonstração <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#D6A84F]" /> 14 Dias Grátis
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#D6A84F]" /> Sem Cartão
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#D6A84F]" /> Cancele Quando Quiser
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-[#D6A84F]" /> Domínio Grátis
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
