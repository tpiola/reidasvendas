import { Link } from 'react-router-dom';
import {
  ArrowRight, ExternalLink, Globe, MessageCircle,
  Footprints, Store, Factory, HeartPulse, GraduationCap, Briefcase,
  BarChart3,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal, SectionLabel, SectionTitle, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { GoldParticles } from '@/components/GoldParticles';

/* ─── Projetos Reais ─── */
const projetos = [
  {
    name: 'SaúdeGPT',
    segment: 'Saúde / Inteligência Artificial',
    client: 'Solução própria',
    description:
      'Plataforma de IA generativa especializada em saúde, oferecendo respostas inteligentes baseadas em diretrizes clínicas e literatura médica validada.',
    cover: '/imagens/portfolio/saudegpt.jpg',
    techs: ['React', 'Node.js', 'OpenAI', 'PostgreSQL', 'Supabase'],
    href: 'https://saudegpt.com',
    metrics: 'Em breve',
  },
  {
    name: 'Sentinela Saúde Ambiental',
    segment: 'Saúde Pública / Vigilância Ambiental',
    client: 'Secretaria Municipal de Saúde',
    description:
      'Sistema de monitoramento e gestão para vigilância ambiental em saúde pública, com dashboards de indicadores e relatórios automatizados.',
    cover: '/imagens/portfolio/sentinela.jpg',
    techs: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Chart.js'],
    href: 'https://sentinelasaudeambiental.com.br',
    metrics: 'Em breve',
  },
  {
    name: 'Thiago Piola',
    segment: 'Profissional / Portfólio Pessoal',
    client: 'Thiago B. G. Piola',
    description:
      'Site pessoal e portfólio profissional do Founder do Rei das Vendas, apresentando trajetória, projetos e serviços com design premium.',
    cover: '/imagens/portfolio/thiagopiola.jpg',
    techs: ['React', 'Next.js', 'Tailwind', 'Framer Motion', 'Vercel'],
    href: 'https://thiagopiola.com.br',
    metrics: 'Em breve',
  },
];

/* ─── Processo ─── */
const passos = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Analisamos seu negócio, concorrência e público-alvo para identificar oportunidades e gargalos digitais.',
  },
  {
    number: '02',
    title: 'Estratégia',
    description:
      'Definimos roadmap, tecnologias, wireframes e métricas de sucesso alinhadas aos seus objetivos de negócio.',
  },
  {
    number: '03',
    title: 'Criação',
    description:
      'Desenvolvemos o produto com design premium, código limpo e performance obsessiva — revisões inclusas.',
  },
  {
    number: '04',
    title: 'Deploy',
    description:
      'Publicamos em produção com infraestrutura escalável, SSL, domínio próprio e otimização completa de performance.',
  },
  {
    number: '05',
    title: 'Suporte',
    description:
      'Acompanhamento contínuo, manutenção, atualizações e melhorias baseadas em dados reais de uso.',
  },
];

/* ─── Nichos ─── */
const nichos = [
  {
    icon: Footprints,
    title: 'Calçadista',
    desc: 'Sites e vitrines digitais para indústrias e lojas do polo calçadista de Franca.',
  },
  {
    icon: Store,
    title: 'Comércio',
    desc: 'E-commerces, PDVs e automação comercial para lojas físicas e online.',
  },
  {
    icon: Factory,
    title: 'Indústria',
    desc: 'Dashboards de produção, portais corporativos e sistemas de gestão industrial.',
  },
  {
    icon: HeartPulse,
    title: 'Saúde',
    desc: 'Plataformas clínicas, prontuários, telemedicina e sistemas para vigilância.',
  },
  {
    icon: GraduationCap,
    title: 'Educação',
    desc: 'Portais educacionais, plataformas EAD e sistemas de gestão acadêmica.',
  },
  {
    icon: Briefcase,
    title: 'Serviços',
    desc: 'Landing pages, CRM e automação de atendimento para prestadores de serviços.',
  },
];

export default function Portfolio() {
  return (
    <main>
      <GoldParticles count={25} />

      {/* ─── HEADER ─── */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Portfólio</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Projetos que Transformam{' '}
              <span className="text-gradient-gold">Negócios em Franca-SP</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#A1A1AA]">
              Cada projeto é fruto de um processo estruturado: diagnóstico preciso, estratégia sob medida e execução
              com padrão premium. Conheça o trabalho real que já entregamos — de plataformas de IA a sistemas de
              vigilância em saúde pública.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── GALERIA DE PROJETOS ─── */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {projetos.map((proj) => (
              <motion.div
                key={proj.name}
                variants={staggerItem}
                className="glass-card group flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:border-[rgba(214,168,79,0.3)]"
              >
                {/* Cover */}
                <div className="relative h-48 overflow-hidden sm:h-56">
                  <img
                    src={proj.cover}
                    alt={proj.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,3,3,0.85)] via-[rgba(3,3,3,0.2)] to-transparent" />

                  {/* Badge */}
                  <a
                    href={proj.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-[rgba(3,3,3,0.75)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#D6A84F] backdrop-blur-sm transition-all hover:bg-[rgba(214,168,79,0.2)]"
                  >
                    <Globe className="h-3 w-3" />
                    Visitar
                  </a>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {/* Segment */}
                  <span className="section-label mb-2 inline-block self-start text-[10px]">
                    {proj.segment}
                  </span>

                  {/* Name */}
                  <h3 className="font-serif text-lg font-bold text-white">{proj.name}</h3>

                  {/* Client */}
                  <p className="mt-1 text-xs text-[#71717A]">
                    Cliente: <span className="text-[#A1A1AA]">{proj.client}</span>
                  </p>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#A1A1AA]">
                    {proj.description}
                  </p>

                  {/* Techs */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {proj.techs.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[rgba(214,168,79,0.15)] bg-[rgba(214,168,79,0.06)] px-2.5 py-0.5 text-[10px] font-medium text-[#D6A84F]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics + Link */}
                  <div className="mt-4 flex items-center justify-between border-t border-[rgba(214,168,79,0.08)] pt-4">
                    <span className="flex items-center gap-1.5 text-[11px] text-[#71717A]">
                      <BarChart3 className="h-3.5 w-3.5 text-[#D6A84F]" />
                      Resultados: {proj.metrics}
                    </span>
                    <a
                      href={proj.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] font-semibold text-[#D6A84F] transition-all hover:gap-2"
                    >
                      Acessar site <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── SEÇÃO DE PROCESSO ─── */}
      <section className="border-t border-[rgba(214,168,79,0.06)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionLabel>Processo</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTitle highlight="Passo a Passo">
              Como Funciona o Desenvolvimento
            </SectionTitle>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {passos.map((passo) => (
              <div
                key={passo.number}
                className="glass-card rounded-2xl p-6 text-center transition-all duration-300 hover:border-[rgba(214,168,79,0.25)]"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(214,168,79,0.25)] bg-[rgba(214,168,79,0.08)] text-lg font-bold text-[#D6A84F]">
                  {passo.number}
                </div>
                <h3 className="font-serif text-base font-semibold text-white">{passo.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{passo.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEÇÃO DE NICHIOS ─── */}
      <section className="border-t border-[rgba(214,168,79,0.06)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionLabel>Indústrias</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionTitle highlight="Atendemos">
              Nichos que
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-[#A1A1AA]">
              Soluções digitais adaptadas para diferentes segmentos — sempre com o mesmo padrão premium.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {nichos.map((nicho) => {
              const Icon = nicho.icon;
              return (
                <motion.div
                  key={nicho.title}
                  variants={staggerItem}
                  className="glass-card group rounded-2xl p-6 transition-all duration-300 hover:border-[rgba(214,168,79,0.25)]"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.1)] text-[#D6A84F] transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.18)] group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-white">{nicho.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{nicho.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="border-t border-[rgba(214,168,79,0.1)] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              Seu Projeto Pode Ser o{' '}
              <span className="text-gradient-gold">Próximo</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-[#A1A1AA]">
          Transforme sua ideia em um produto digital premium. Agende um diagnóstico gratuito e descubra
              como podemos construir juntos.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                to="/contato"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] bg-[length:200%_auto] px-8 py-3 text-base font-bold text-[#030303] transition-all duration-400 hover:bg-right hover:shadow-[0_0_40px_rgba(214,168,79,0.35),0_0_80px_rgba(214,168,79,0.12)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4" />
                Fale Conosco
              </Link>
              <Link
                to="/servicos"
                className="btn-outline-gold text-sm group"
              >
                Ver Serviços <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
