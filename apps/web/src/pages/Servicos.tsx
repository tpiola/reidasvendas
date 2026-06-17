import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Monitor, Smartphone, Bot, BarChart3, GraduationCap, MessageCircle,
  CheckCircle2, Search, Shield, Zap, Target, Layers, RefreshCw, Clock, Globe,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { PremiumButton } from '@/components/PremiumButton';
import { GoldParticles } from '@/components/GoldParticles';

/* ─── 6 Serviços ─── */
const SERVICOS = [
  {
    icon: Monitor, title: 'Sites & Landing Pages',
    desc: 'Páginas que vendem. Design premium, copy persuasiva e jornada de compra otimizada para transformar visitantes em clientes. Sites institucionais, landing pages de alta conversão e e-commerces completos.',
    cta: 'Ver planos',
    link: '/planos',
    tag: 'Conversão',
  },
  {
    icon: Smartphone, title: 'Aplicativos iOS/Android',
    desc: 'Apps nativos e híbridos com UX premium. Do conceito à publicação na App Store e Google Play. Notificações push, integração com APIs e performance nativa.',
    cta: 'Solicitar orçamento',
    link: '/contato',
    tag: 'Mobile',
  },
  {
    icon: Bot, title: 'Automação Comercial',
    desc: 'Funil de vendas automatizado 24/7. CRM integrado, chatbots com IA, disparo omnichannel (WhatsApp, e-mail, SMS) e sequências de nutrição inteligentes.',
    cta: 'Saber mais',
    link: '/planos',
    tag: 'Produtividade',
  },
  {
    icon: BarChart3, title: 'Dashboards em Tempo Real',
    desc: 'Painéis de gestão personalizados com dados ao vivo. Gráficos interativos, KPIs estratégicos, alertas inteligentes e exportação de relatórios para decisões baseadas em dados.',
    cta: 'Ver demonstração',
    link: '/portfolio',
    tag: 'Dados',
  },
  {
    icon: Search, title: 'SEO & Performance',
    desc: 'Otimização completa para mecanismos de busca. SEO técnico, on-page e de conteúdo. Velocidade de carregamento, core web vitals e estratégia de palavras-chave.',
    cta: 'Consultar especialista',
    link: '/contato',
    tag: 'Tráfego',
  },
  {
    icon: GraduationCap, title: 'Mentoria Digital',
    desc: 'Acompanhamento personalizado para empreendedores. Estruturação de vendas online, marketing digital, presença digital consistente e resultados mensuráveis.',
    cta: 'Agendar sessão',
    link: '/contato',
    tag: 'Estratégia',
  },
];

/* ─── Processo ─── */
const PROCESSO = [
  { step: '01', title: 'Diagnóstico', desc: 'Analisamos seu negócio, concorrência e público-alvo para entender exatamente o que precisa ser feito.', icon: Search },
  { step: '02', title: 'Estratégia', desc: 'Desenhamos a solução ideal: arquitetura, design, funcionalidades e cronograma. Você aprova antes de começarmos.', icon: Target },
  { step: '03', title: 'Execução', desc: 'Colocamos a mão na massa com entregas semanais. Você acompanha cada etapa em tempo real.', icon: Layers },
  { step: '04', title: 'Otimização', desc: 'Projeto no ar, mas o trabalho não para. Monitoramos, ajustamos e melhoramos continuamente para maximizar resultados.', icon: RefreshCw },
];

/* ─── Diferenciais ─── */
const DIFERENCIAIS = [
  {
    icon: Zap, title: 'Entrega Rápida', desc: 'Site profissional no ar em até 7 dias úteis. Sem promessas irreais, sem atrasos.' },
  { icon: Shield, title: 'Garantia de 30 Dias', desc: 'Se não ficar satisfeito, devolvemos 100% do seu dinheiro. Sem burocracia.' },
  { icon: Clock, title: 'Suporte Contínuo', desc: 'Não sumimos depois da entrega. Estamos aqui sempre que você precisar.' },
  { icon: Target, title: 'Foco em Resultado', desc: 'Cada decisão de design e tecnologia é tomada pensando em conversão e vendas.' },
];

export default function Servicos() {
  return (
    <main>
      <GoldParticles count={25} />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Serviços</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Soluções que Transformam seu Negócio{' '}
              <span className="text-gradient-gold">em uma Máquina de Vendas</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Na <strong className="text-white">Rei das Vendas</strong>, não entregamos só tecnologia — entregamos <strong className="text-white">resultados</strong>. Cada solução é desenhada para aumentar sua receita, reduzir custos e transformar sua presença digital em um ativo que gera valor todos os dias.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PremiumButton href="/planos">
                Ver Planos <ArrowRight className="h-4 w-4" />
              </PremiumButton>
              <Link to={BRAND.whatsapp} className="btn-outline-gold text-sm group" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Fale conosco no WhatsApp
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ GRID DE 6 SERVIÇOS ═══════ */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SERVICOS.map((servico) => {
              const Icon = servico.icon;
              return (
                <motion.div
                  key={servico.title}
                  variants={staggerItem}
                  className="glass-card group flex flex-col rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 transition-all duration-500 hover:border-[rgba(214,168,79,0.25)] hover:bg-[rgba(214,168,79,0.02)]"
                >
                  {/* Tag */}
                  <span className="mb-3 inline-block self-start rounded-full border border-[rgba(214,168,79,0.15)] bg-[rgba(214,168,79,0.06)] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#D6A84F]">
                    {servico.tag}
                  </span>

                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.08)] text-[#D6A84F] transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.15)] group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-white">{servico.title}</h3>

                  {/* Description */}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#A1A1AA]">
                    {servico.desc}
                  </p>

                  {/* CTA */}
                  <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    <Link
                      to={servico.link}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6A84F] transition-all duration-300 group-hover:gap-2.5"
                    >
                      {servico.cta} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ PROCESSO ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Como Funciona</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Nosso Processo em{' '}
              <span className="text-gradient-gold">4 Etapas</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#A1A1AA]">
              Da descoberta à otimização contínua — um método testado que garante resultados previsíveis.
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
              {PROCESSO.map((etapa) => {
                const Icon = etapa.icon;
                return (
                  <motion.div
                    key={etapa.step}
                    variants={staggerItem}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Step number */}
                    <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-[rgba(214,168,79,0.15)] bg-[rgba(214,168,79,0.04)]" />
                      <div className="absolute inset-2 rounded-full bg-[rgba(214,168,79,0.08)]" />
                      <Icon className="relative h-7 w-7 text-[#D6A84F]" />
                    </div>

                    <span className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6A84F]">
                      {etapa.step}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white">{etapa.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#A1A1AA]">{etapa.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ DIFERENCIAIS ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Diferenciais</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Por que Nosso <span className="text-gradient-gold">Trabalho é Diferente</span>
            </h2>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {DIFERENCIAIS.map((dif) => {
              const Icon = dif.icon;
              return (
                <motion.div
                  key={dif.title}
                  variants={staggerItem}
                  className="glass-card group rounded-2xl p-6 text-center transition-all duration-300 hover:border-[rgba(214,168,79,0.2)]"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.08)] text-[#D6A84F] transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.15)] group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white">{dif.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#A1A1AA]">{dif.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ CTA FINAL ═══════ */}
      <section className="relative overflow-hidden border-t border-[rgba(214,168,79,0.1)] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Transforme seu Negócio</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Pronto para ter uma{' '}
              <span className="text-gradient-gold">Máquina de Vendas Digital</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
              Escolha o plano ideal para sua empresa e comece hoje. Diagnóstico gratuito incluído em todos os planos.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PremiumButton href="/planos">
                Ver Planos e Preços <ArrowRight className="h-4 w-4" />
              </PremiumButton>
              <Link
                to="/portfolio"
                className="btn-outline-gold text-sm group"
              >
                Ver Portfólio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#D6A84F]" /> Diagnóstico Gratuito
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#D6A84F]" /> Garantia 30 Dias
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#D6A84F]" /> Site em 7 Dias
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-[#D6A84F]" /> Suporte Contínuo
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
