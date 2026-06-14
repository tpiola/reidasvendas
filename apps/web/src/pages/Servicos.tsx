import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Smartphone, Bot, BarChart3, GraduationCap, MessageCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel, staggerContainer, staggerItem } from '@/hooks/useAnimation';

const servicosDetalhados = [
  {
    icon: Monitor,
    title: 'Sites Profissionais',
    desc: 'Landing pages de alta conversão, sites institucionais, e-commerces e portais. Design responsivo, otimização SEO, performance e experiência do usuário premium.',
    img: BRAND.images.services.sites,
    beneficios: ['Design responsivo mobile-first', 'Otimizado para SEO', 'Alta velocidade de carregamento', 'Integração com WhatsApp e redes sociais'],
  },
  {
    icon: Smartphone,
    title: 'Aplicativos',
    desc: 'Apps nativos e híbridos para iOS e Android. Experiência do usuário impecável, performance nativa e funcionalidades sob medida para seu negócio.',
    img: BRAND.images.services.apps,
    beneficios: ['iOS e Android', 'UI/UX premium', 'Notificações push', 'Integração com APIs'],
  },
  {
    icon: Bot,
    title: 'Automações',
    desc: 'Automação de marketing, vendas e atendimento. CRM integrado, chatbots inteligentes, disparo de mensagens e funis automatizados.',
    img: BRAND.images.services.automations,
    beneficios: ['CRM integrado', 'Chatbot inteligente', 'Disparo em massa', 'Funil automatizado'],
  },
  {
    icon: BarChart3,
    title: 'Dashboards',
    desc: 'Painéis de gestão personalizados com dados em tempo real. Visualização clara de indicadores, gráficos interativos e relatórios automáticos.',
    img: BRAND.images.services.dashboards,
    beneficios: ['Dados em tempo real', 'Gráficos interativos', 'Exportação de relatórios', 'Alertas inteligentes'],
  },
  {
    icon: GraduationCap,
    title: 'Mentoria',
    desc: 'Mentoria digital completa para empreendedores. Estruturação de vendas online, marketing digital, tráfego pago e presença digital.',
    img: BRAND.images.services.mentoria,
    beneficios: ['Sessões individuais', 'Material exclusivo', 'Suporte contínuo', 'Resultados mensuráveis'],
  },
];

export default function Servicos() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-[#030305]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,87,255,0.1)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Serviços</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Soluções Digitais{' '}
              <span className="text-gradient-blue">Completas</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-[rgba(248,248,250,0.55)]">
              Do diagnóstico à execução, soluções digitais para empresas em Franca-SP e região.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid gap-8"
          >
            {servicosDetalhados.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  variants={staggerItem}
                  className="glass-card grid overflow-hidden rounded-2xl md:grid-cols-2"
                >
                  <div className={`relative h-56 overflow-hidden md:h-auto ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                    <img
                      src={s.img}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-all duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(3,3,5,0.4)] to-transparent" />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-10">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(0,87,255,0.1)] text-[#0057FF]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-white">{s.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[rgba(248,248,250,0.55)]">{s.desc}</p>
                    <ul className="mt-4 space-y-2">
                      {s.beneficios.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-sm text-[rgba(248,248,250,0.5)]">
                          <CheckCircle2 className="h-4 w-4 text-[#0057FF]" />
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
      <section className="border-t border-[rgba(255,255,255,0.06)] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              Pronto para Transformar seu Negócio?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-[rgba(248,248,250,0.55)]">
              Agende uma conversa gratuita e descubra a solução ideal para sua empresa.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <MessageCircle className="h-4 w-4" />
                Fale Conosco
              </a>
              <Link to="/contato" className="btn-outline">
                Enviar Mensagem <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
