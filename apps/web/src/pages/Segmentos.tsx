import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, ShoppingCart, Stethoscope, Wrench, Building2,
  GraduationCap, Factory, UtensilsCrossed, Briefcase, Search,
  MessageCircle, CheckCircle2, Star, Shield, Zap, Globe,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { GoldParticles } from '@/components/GoldParticles';

/* ─── Nichos / Segmentos ─── */
const SEGMENTOS = [
  {
    icon: ShoppingCart, title: 'E-commerce', slug: 'ecommerce',
    desc: 'Lojas virtuais completas com carrinho inteligente, gestão de estoque, integração com meios de pagamento e marketplaces. Tudo que você precisa para vender online 24 horas por dia.',
    features: ['Catálogo de produtos ilimitado', 'Carrinho abandonado', 'Integração Mercado Pago/PagSeguro', 'Gestão de frete', 'Cupons e promoções'],
  },
  {
    icon: Stethoscope, title: 'Saúde', slug: 'saude',
    desc: 'Sites profissionais para clínicas, consultórios e profissionais de saúde. Agendamento online, prontuário digital e integração com sistemas de saúde.',
    features: ['Agendamento online', 'Prontuário digital', 'Teleconsulta integrada', 'Portal do paciente', 'Conformidade LGPD'],
  },
  {
    icon: Wrench, title: 'Serviços', slug: 'servicos',
    desc: 'Para prestadores de serviços que querem profissionalizar a presença digital e atrair mais clientes com um site que mostra credibilidade e autoridade.',
    features: ['Site institucional premium', 'Portfólio interativo', 'Orçamento online', 'Agenda de serviços', 'Avaliações de clientes'],
  },
  {
    icon: Building2, title: 'Imobiliário', slug: 'imobiliario',
    desc: 'Soluções digitais para imobiliárias, corretores e incorporadoras. Vitrine de imóveis com busca inteligente, tour virtual e captação de leads.',
    features: ['Vitrine de imóveis', 'Busca inteligente', 'Tour virtual 360', 'Captação de leads', 'Integração com CRMs'],
  },
  {
    icon: GraduationCap, title: 'Educação', slug: 'educacao',
    desc: 'Plataformas educacionais, escolas e cursos livres. Portal do aluno, área de membros, gestão de turmas e conteúdo didático online.',
    features: ['Área de membros', 'Gestão de turmas', 'Conteúdo didático', 'Certificado digital', 'Integração com LMS'],
  },
  {
    icon: Factory, title: 'Indústria', slug: 'industria',
    desc: 'Sites institucionais para indústrias de todos os portes. Catálogo técnico, portal do fornecedor e integração com sistemas ERP.',
    features: ['Catálogo técnico', 'Portal do fornecedor', 'Integração ERP', 'Dashboard industrial', 'B2B portal'],
  },
  {
    icon: UtensilsCrossed, title: 'Restaurantes', slug: 'restaurantes',
    desc: 'Presença digital completa para bares, restaurantes e delivery. Cardápio online, pedidos pelo site e integração com apps de entrega.',
    features: ['Cardápio digital', 'Pedidos online', 'Delivery integrado', 'Reservas online', 'Programa de fidelidade'],
  },
  {
    icon: Briefcase, title: 'Profissionais Liberais', slug: 'liberais',
    desc: 'Site profissional para médicos, advogados, arquitetos, engenheiros e outros profissionais. Portfólio, blog e captação de clientes.',
    features: ['Site pessoal premium', 'Portfólio de projetos', 'Blog profissional', 'Captação de leads', 'Agendamento de consultas'],
  },
];

/* ─── Categorias ─── */
const CATEGORIAS = [
  { id: 'todos', label: 'Todos os Segmentos', icon: Search },
  { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
  { id: 'saude', label: 'Saúde', icon: Stethoscope },
  { id: 'servicos', label: 'Serviços', icon: Wrench },
  { id: 'imobiliario', label: 'Imobiliário', icon: Building2 },
  { id: 'educacao', label: 'Educação', icon: GraduationCap },
  { id: 'industria', label: 'Indústria', icon: Factory },
  { id: 'restaurantes', label: 'Restaurantes', icon: UtensilsCrossed },
  { id: 'liberais', label: 'Prof. Liberais', icon: Briefcase },
];

/* ─── Ícone por slug ─── */
function SegmentIcon({ icon: Icon, className }: { icon: React.ComponentType<{ className?: string }>; className?: string }) {
  return <Icon className={className} />;
}

export default function Segmentos() {
  const [filtro, setFiltro] = useState('todos');

  const segmentosFiltrados = filtro === 'todos'
    ? SEGMENTOS
    : SEGMENTOS.filter((s) => s.slug === filtro);

  return (
    <main>
      <GoldParticles count={25} />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Segmentos</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Soluções Digitais para{' '}
              <span className="text-gradient-gold">Cada Tipo de Negócio</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Não importa o segmento da sua empresa — temos a solução digital certa 
              para transformar sua presença online em resultado.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#D6A84F]" /> Soluções Sob Medida
              </span>
              <span className="hidden sm:inline text-[rgba(255,255,255,0.12)]">•</span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-[#D6A84F]" /> Cases de Sucesso
              </span>
              <span className="hidden sm:inline text-[rgba(255,255,255,0.12)]">•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-[#D6A84F]" /> Entrega Rápida
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FILTROS + CARDS ═══════ */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="lg:flex lg:gap-10">
            {/* Sidebar de Filtros (Desktop) */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <Reveal>
                <div className="sticky top-28 space-y-1.5">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A]">
                    Filtrar por
                  </p>
                  {CATEGORIAS.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setFiltro(cat.id)}
                        className={`flex w-full items-center gap-2.5 rounded-xl px-4 py-2.5 text-left text-xs font-semibold transition-all duration-300 ${
                          filtro === cat.id
                            ? 'bg-[rgba(214,168,79,0.1)] text-[#D6A84F] border border-[rgba(214,168,79,0.2)]'
                            : 'text-[#A1A1AA] hover:bg-white/[0.03] hover:text-white border border-transparent'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            </aside>

            {/* Filtros Mobile */}
            <div className="mb-8 lg:hidden">
              <Reveal>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIAS.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setFiltro(cat.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                          filtro === cat.id
                            ? 'bg-[#D6A84F] text-[#030303]'
                            : 'border border-[rgba(255,255,255,0.1)] text-[#A1A1AA] hover:border-[rgba(214,168,79,0.3)] hover:text-white'
                        }`}
                      >
                        <Icon className="h-3 w-3" />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            </div>

            {/* Grid de Cards */}
            <div className="flex-1">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {segmentosFiltrados.map((segmento) => {
                  const Icon = segmento.icon;
                  return (
                    <motion.div
                      key={segmento.slug}
                      variants={staggerItem}
                      layout
                      className="glass-card group flex flex-col rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 transition-all duration-500 hover:border-[rgba(214,168,79,0.25)] hover:bg-[rgba(214,168,79,0.02)]"
                    >
                      {/* Icon */}
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.08)] text-[#D6A84F] transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.15)] group-hover:scale-110">
                        <SegmentIcon icon={Icon} className="h-6 w-6" />
                      </div>

                      {/* Title & Desc */}
                      <h3 className="font-serif text-lg font-bold text-white">{segmento.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{segmento.desc}</p>

                      {/* Features */}
                      <ul className="mt-4 flex-1 space-y-2">
                        {segmento.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-xs text-[#71717A]">
                            <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-[#D6A84F]" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                        <Link
                          to={`/contato?segmento=${segmento.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6A84F] transition-all duration-300 group-hover:gap-2.5"
                        >
                          Ver Solução <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Empty state */}
              {segmentosFiltrados.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-sm text-[#71717A]">Nenhum segmento encontrado com este filtro.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ CTA FINAL ═══════ */}
      <section className="relative overflow-hidden border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Seu Segmento Não Está na Lista?{' '}
              <span className="text-gradient-gold">Fale Conosco</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
              Criamos soluções personalizadas para qualquer tipo de negócio. 
              Agende um diagnóstico gratuito e descubra como podemos ajudar sua empresa.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] bg-[length:200%_auto] px-8 py-3 text-base font-bold text-[#030303] transition-all duration-400 hover:bg-right hover:shadow-[0_0_40px_rgba(214,168,79,0.35)]"
              >
                Solicitar Diagnóstico <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-8 py-3 text-base font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
              >
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-[#D6A84F]" /> Atendemos em Todo o Brasil
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#D6A84F]" /> Diagnóstico Sem Compromisso
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#D6A84F]" /> Projeto em Até 7 Dias
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
