import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Smartphone, Bot, BarChart3, GraduationCap, MessageCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel, SectionTitle, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { PremiumButton } from '@/components/PremiumButton';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeading } from '@/components/PremiumComponents';
import { GoldParticles } from '@/components/GoldParticles';

const servicosDetalhados = [
  {
    icon: Monitor, title: 'Sites & Landing Pages que Vendem',
    result: 'Transforme visitantes em clientes com páginas projetadas para conversão máxima.',
    desc: 'Landing pages de alta conversão, sites institucionais premium, e-commerces e portais. Design responsivo, SEO estrutural, performance obsessiva.',
    img: BRAND.images.services.sites,
    beneficios: ['Design responsivo mobile-first', 'Otimizado para SEO', 'Alta velocidade de carregamento', 'Integração com WhatsApp e redes sociais'],
    resultadoChave: 'Taxa de conversão 2x maior que sites convencionais',
  },
  {
    icon: Smartphone, title: 'Aplicativos que Seus Clientes Vão Usar',
    result: 'Experiência mobile que fideliza e gera receita recorrente.',
    desc: 'Apps nativos e híbridos iOS/Android. UX premium, performance nativa e funcionalidades sob medida para seu negócio.',
    img: BRAND.images.services.apps,
    beneficios: ['iOS e Android', 'UI/UX premium', 'Notificações push', 'Integração com APIs'],
    resultadoChave: 'Engajamento 3x maior que sites mobile convencionais',
  },
  {
    icon: Bot, title: 'Automação que Vende Enquanto Você Dorme',
    result: 'Funil de vendas 24/7 sem precisar aumentar sua equipe.',
    desc: 'Automação de marketing, vendas e atendimento. CRM integrado, chatbots com IA, disparo omnichannel e funis automatizados.',
    img: BRAND.images.services.automations,
    beneficios: ['CRM integrado', 'Chatbot inteligente', 'Disparo omnichannel', 'Funil automatizado'],
    resultadoChave: 'Até 70% menos tempo gasto em tarefas repetitivas',
  },
  {
    icon: BarChart3, title: 'Dashboards que Revelam Oportunidades',
    result: 'Decisões baseadas em dados, não em achismos.',
    desc: 'Painéis de gestão personalizados com dados em tempo real. Visualização clara de indicadores, gráficos interativos e relatórios.',
    img: BRAND.images.services.dashboards,
    beneficios: ['Dados em tempo real', 'Gráficos interativos', 'Exportação de relatórios', 'Alertas inteligentes'],
    resultadoChave: 'Redução de 40% no tempo de análise de resultados',
  },
  {
    icon: GraduationCap, title: 'Mentoria que Acelera Resultados',
    result: 'Estratégia digital clara e execução guiada por quem entende do mercado.',
    desc: 'Mentoria digital completa para empreendedores. Estruturação de vendas online, marketing digital e presença digital consistente.',
    img: BRAND.images.services.mentoria,
    beneficios: ['Sessões individuais', 'Material exclusivo', 'Suporte contínuo', 'Resultados mensuráveis'],
    resultadoChave: 'Empreendedores mentorados crescem 2,5x mais rápido',
  },
];

const casosDeSucesso = [
  { nome: 'Cliente A', descricao: 'Aumento de 340% nas vendas online em 3 meses', link: '/portfolio' },
  { nome: 'Cliente B', descricao: 'Redução de 60% no custo de aquisição de clientes', link: '/portfolio' },
  { nome: 'Cliente C', descricao: 'De 0 a R$ 50k/mês em vendas digitais em 90 dias', link: '/portfolio' },
];

export default function Servicos() {
  return (
    <main>
      <GoldParticles count={25} />

      {/* Hero */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal><SectionLabel>Serviços</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Soluções que Transformam seu Negócio{' '}
              <span className="text-gradient-gold">em uma Máquina de Vendas</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#A1A1AA]">
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

      {/* Grid */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid gap-8"
          >
            {servicosDetalhados.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title} variants={staggerItem}
                  className="glass-card grid overflow-hidden rounded-2xl md:grid-cols-2"
                >
                  <div className={`relative h-56 overflow-hidden md:h-auto ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img src={s.img} alt={s.title} loading="lazy"
                      className="h-full w-full object-cover transition-all duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(3,3,3,0.6)] to-transparent" />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-10">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.1)] text-[#D6A84F]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="mb-1 inline-block rounded-full border border-[rgba(214,168,79,0.2)] bg-[rgba(214,168,79,0.06)] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D6A84F]">
                      {s.resultadoChave}
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-white">{s.title}</h2>
                    <p className="mt-1 text-sm font-medium text-[#D6A84F]">{s.result}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">{s.desc}</p>
                    <ul className="mt-4 space-y-2">
                      {s.beneficios.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-[#71717A]">
                          <CheckCircle2 className="h-4 w-4 text-[#D6A84F]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/planos"
                      className="mt-6 inline-flex items-center gap-2 self-start rounded-lg border border-[rgba(214,168,79,0.2)] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#D6A84F] transition-all hover:bg-[rgba(214,168,79,0.1)]"
                    >
                      Ver planos <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Casos de Sucesso */}
      <section className="border-t border-[rgba(214,168,79,0.1)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Casos de Sucesso</SectionLabel>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
              Resultados que <span className="text-gradient-gold">Falam por Si</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#A1A1AA]">
              Conheça empresas que transformaram seus resultados com nossas soluções.
            </p>
          </Reveal>
          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {casosDeSucesso.map((caso, i) => (
              <motion.div key={caso.nome} variants={staggerItem}>
                <Link
                  to={caso.link}
                  className="glass-card group block rounded-2xl p-6 transition-all hover:border-[rgba(214,168,79,0.3)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.1)] text-lg font-bold text-[#D6A84F]">
                    {caso.nome.charAt(0)}
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-white">{caso.nome}</h3>
                  <p className="mt-2 text-sm text-[#A1A1AA]">{caso.descricao}</p>
                  <div className="mt-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D6A84F] transition-all group-hover:gap-2">
                    Ver caso completo <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="border-t border-[rgba(214,168,79,0.1)] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              Pronto para Transformar seu Negócio{' '}
              <span className="text-gradient-gold">em uma Máquina de Vendas</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-[#A1A1AA]">
              Escolha o plano ideal para sua empresa e comece hoje. Diagnóstico gratuito incluído.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <PremiumButton href="/planos">
                Ver Planos e Preços <ArrowRight className="h-4 w-4" />
              </PremiumButton>
              <Link to="/portfolio" className="btn-outline-gold text-sm group">
                Ver Portfólio <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
