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
    icon: Monitor, title: 'Sites & Landing Pages',
    desc: 'Landing pages de alta conversão, sites institucionais premium, e-commerces e portais. Design responsivo, SEO estrutural, performance obsessiva.',
    img: BRAND.images.services.sites,
    beneficios: ['Design responsivo mobile-first', 'Otimizado para SEO', 'Alta velocidade de carregamento', 'Integração com WhatsApp e redes sociais'],
  },
  {
    icon: Smartphone, title: 'Aplicativos Sob Medida',
    desc: 'Apps nativos e híbridos iOS/Android. UX premium, performance nativa e funcionalidades sob medida para seu negócio.',
    img: BRAND.images.services.apps,
    beneficios: ['iOS e Android', 'UI/UX premium', 'Notificações push', 'Integração com APIs'],
  },
  {
    icon: Bot, title: 'Automação Inteligente',
    desc: 'Automação de marketing, vendas e atendimento. CRM integrado, chatbots com IA, disparo omnichannel e funis automatizados.',
    img: BRAND.images.services.automations,
    beneficios: ['CRM integrado', 'Chatbot inteligente', 'Disparo omnichannel', 'Funil automatizado'],
  },
  {
    icon: BarChart3, title: 'Dashboards em Tempo Real',
    desc: 'Painéis de gestão personalizados com dados em tempo real. Visualização clara de indicadores, gráficos interativos e relatórios.',
    img: BRAND.images.services.dashboards,
    beneficios: ['Dados em tempo real', 'Gráficos interativos', 'Exportação de relatórios', 'Alertas inteligentes'],
  },
  {
    icon: GraduationCap, title: 'Mentoria Digital',
    desc: 'Mentoria digital completa para empreendedores. Estruturação de vendas online, marketing digital e presença digital consistente.',
    img: BRAND.images.services.mentoria,
    beneficios: ['Sessões individuais', 'Material exclusivo', 'Suporte contínuo', 'Resultados mensuráveis'],
  },
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
              Infraestrutura Digital{' '}
              <span className="text-gradient-gold">Completa</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#A1A1AA]">
              Do diagnóstico à governança — soluções digitais para empresas em Franca-SP que querem vender com estrutura séria.
            </p>
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
                    <h2 className="font-serif text-2xl font-bold text-white">{s.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">{s.desc}</p>
                    <ul className="mt-4 space-y-2">
                      {s.beneficios.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-[#71717A]">
                          <CheckCircle2 className="h-4 w-4 text-[#D6A84F]" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[rgba(214,168,79,0.1)] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              Pronto para Construir sua{' '}
              <span className="text-gradient-gold">Infraestrutura Digital</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-[#A1A1AA]">
              Agende um diagnóstico gratuito e descubra a solução ideal para sua empresa.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <PremiumButton href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Fale Conosco
              </PremiumButton>
              <Link to="/contato" className="btn-outline-gold text-sm group">
                Enviar Mensagem <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
