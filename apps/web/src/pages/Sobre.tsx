import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Target, Lightbulb, Users, TrendingUp, CheckCircle2,
  MessageCircle, MapPin, Quote, Award, BookOpen, BarChart3, Clock,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel, springSoft, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { GoldParticles } from '@/components/GoldParticles';

/* ─── Timeline ─── */
const TIMELINE = [
  { year: '2023', title: 'Fundação', desc: 'Thiago funda a Rei das Vendas em Franca-SP com a missão de levar infraestrutura digital profissional para empresas locais. Primeiro cliente conquistado em menos de 30 dias.' },
  { year: '2024', title: 'Expansão', desc: 'Portfólio ultrapassa 12 projetos entregues. Lançamento dos planos mensais com suporte contínuo. Parcerias estratégicas com fornecedores de infraestrutura cloud.' },
  { year: '2025', title: 'Inovação', desc: 'Integração de IA generativa nos projetos. Dashboard em tempo real lançado como produto standalone. Clientes em 3 estados brasileiros.' },
  { year: '2026', title: 'Escalabilidade', desc: 'Novos segmentos atendidos. Plataforma de automação comercial própria. Meta: 50+ empresas com infraestrutura digital completa até o final do ano.' },
];

/* ─── Metodologia (4 Pilares) ─── */
const PILARES = [
  { icon: Target, title: 'Diagnóstico Preciso', desc: 'Antes de qualquer linha de código, analisamos seu negócio como um médico: identificamos sintomas, diagnosticamos causas e só então prescrevemos o tratamento digital ideal. Sem achismos, sem soluções prontas.' },
  { icon: Lightbulb, title: 'Estratégia Sob Medida', desc: 'Cada pixel, cada funcionalidade e cada automação é desenhada exclusivamente para o seu modelo de negócio. Não usamos templates genéricos — sua empresa é única, sua solução também.' },
  { icon: Users, title: 'Execução com Parceria', desc: 'Não somos apenas prestadores de serviço. Somos seu time de tecnologia. Acompanhamos cada etapa, treinamos sua equipe e estamos disponíveis sempre que você precisar. Parceria de verdade.' },
  { icon: TrendingUp, title: 'Resultados Mensuráveis', desc: 'Todo projeto tem KPIs claros desde o início. Mais visitas, mais leads, mais vendas. Se não puder ser medido, não entregamos. Nosso sucesso é seu resultado.' },
];

/* ─── Stats ─── */
const STATS = [
  { number: BRAND.stats.years, label: 'Anos de Mercado', icon: Clock },
  { number: BRAND.stats.projects, label: 'Projetos Entregues', icon: BarChart3 },
  { number: BRAND.stats.satisfaction, label: 'Satisfação dos Clientes', icon: Users },
];

export default function Sobre() {
  return (
    <main>
      <GoldParticles count={25} />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(214,168,79,0.10)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(214,168,79,0.05)_0%,transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Left: Text */}
            <div>
              <Reveal>
                <SectionLabel>Sobre Nós</SectionLabel>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                  Transformamos <span className="text-gradient-gold">Ideias em Infraestrutura Digital</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
                  Na <strong className="text-white">Rei das Vendas</strong>, não criamos sites — construímos máquinas de vendas.
                  Cada projeto é pensado, desenhado e executado com a precisão de quem entende que o digital 
                  é o maior ativo que sua empresa pode ter.
                </p>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="mt-3 text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
                  Somos uma agência digital focada em <strong className="text-white">resultado</strong>. 
                  Nossas soluções combinam design premium, tecnologia de ponta e estratégia de negócio 
                  para transformar sua presença online em uma vantagem competitiva real.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/contato"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] bg-[length:200%_auto] px-6 py-2.5 text-sm font-bold text-[#030303] transition-all duration-400 hover:bg-right hover:shadow-[0_0_40px_rgba(214,168,79,0.35)]"
                  >
                    Fale Conosco <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-6 py-2.5 text-sm font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
                  >
                    Ver Portfólio <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right: Founder Card */}
            <Reveal delay={0.3} variant={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: springSoft } }}>
              <div className="founder-glow rounded-2xl border border-[rgba(214,168,79,0.15)] bg-[rgba(255,255,255,0.02)] p-6 sm:p-8">
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#D6A84F] to-[#B88932] text-xl font-bold text-[#030303]">
                    TB
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">{BRAND.founder.name}</h3>
                    <p className="text-xs text-[#D6A84F]">{BRAND.founder.title}</p>
                  </div>
                </div>
                <div className="mb-4 flex items-center gap-4 text-xs text-[#71717A]">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-[#D6A84F]" /> Franca, SP</span>
                  <span className="flex items-center gap-1"><Award className="h-3 w-3 text-[#D6A84F]" /> {BRAND.founder.crf}</span>
                </div>
                <blockquote className="relative border-l-2 border-[#D6A84F] pl-4">
                  <Quote className="absolute -top-2 -left-2 h-4 w-4 text-[#D6A84F]/40" />
                  <p className="text-sm italic leading-relaxed text-[#A1A1AA]">
                    {BRAND.founder.bio}
                  </p>
                </blockquote>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid gap-6 sm:grid-cols-3"
          >
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  className="glass-card rounded-2xl p-6 text-center transition-all duration-300 hover:border-[rgba(214,168,79,0.2)]"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.08)] text-[#D6A84F]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="font-serif text-4xl font-bold text-white">{stat.number}</p>
                  <p className="mt-1 text-sm text-[#A1A1AA]">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ HISTÓRIA (TIMELINE) ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Nossa História</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              De Franca para o Brasil —{' '}
              <span className="text-gradient-gold">Nossa Trajetória</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#A1A1AA]">
              Cada ano representa um passo firme na missão de transformar o digital das empresas brasileiras.
            </p>
          </Reveal>

          <div className="relative mt-16">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[rgba(214,168,79,0.3)] via-[rgba(214,168,79,0.15)] to-transparent sm:left-1/2 sm:-translate-x-px" />

            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.1}>
                  <div className={`relative flex flex-col gap-4 sm:flex-row sm:items-start ${
                    i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}>
                    {/* Dot on line */}
                    <div className="absolute left-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center sm:left-1/2">
                      <div className="h-3 w-3 rounded-full bg-[#D6A84F] shadow-[0_0_12px_rgba(214,168,79,0.4)]" />
                    </div>

                    {/* Content */}
                    <div className={`pl-14 sm:w-[calc(50%-2rem)] sm:pl-0 ${
                      i % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
                    }`}>
                      <div className={`glass-card rounded-2xl p-5 sm:p-6 ${
                        i === TIMELINE.length - 1 ? 'border-[rgba(214,168,79,0.2)]' : ''
                      }`}>
                        <span className="inline-block rounded-full bg-[rgba(214,168,79,0.1)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D6A84F]">
                          {item.year}
                        </span>
                        <h3 className="mt-2 font-serif text-lg font-bold text-white">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#A1A1AA]">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ METODOLOGIA (4 PILARES) ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Metodologia</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Como <span className="text-gradient-gold">Transformamos</span> seu Negócio
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#A1A1AA]">
              Quatro pilares que sustentam cada projeto entregue pela Rei das Vendas.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-12 grid gap-6 sm:grid-cols-2"
          >
            {PILARES.map((pilar) => {
              const Icon = pilar.icon;
              return (
                <motion.div
                  key={pilar.title}
                  variants={staggerItem}
                  className="glass-card group rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:border-[rgba(214,168,79,0.25)]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.08)] text-[#D6A84F] transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.15)] group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">{pilar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{pilar.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ DIFERENCIAIS ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Diferenciais</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Por que <span className="text-gradient-gold">Escolher a Rei das Vendas</span>
            </h2>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-12 grid gap-5 sm:grid-cols-3"
          >
            {[
              { icon: BookOpen, title: 'Conhecimento Técnico', desc: 'Farmácia, web design, estratégia digital — uma visão multidisciplinar que enxerga seu negócio como um todo.' },
              { icon: CheckCircle2, title: 'Entrega Garantida', desc: 'Cronograma realista e comunicação transparente. Se prometemos, entregamos. Se não der, avisamos antes.' },
              { icon: Users, title: 'Suporte Humanizado', desc: 'Nada de chatbots genéricos. Você fala com gente de verdade que entende do seu projeto e resolve em horas.' },
              { icon: TrendingUp, title: 'Foco em Resultado', desc: 'Cada funcionalidade existe por um motivo: aumentar suas vendas, reduzir custos ou melhorar a experiência do cliente.' },
              { icon: Target, title: 'Atendimento Local', desc: 'Baseados em Franca-SP, entendemos as necessidades específicas do comércio local e da indústria calçadista.' },
              { icon: Award, title: 'Qualidade Premium', desc: 'Design, performance e usabilidade no mais alto nível. Seu site vai competir de igual para igual com grandes marcas.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className="glass-card rounded-2xl p-5 transition-all duration-300 hover:border-[rgba(214,168,79,0.2)]"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(214,168,79,0.08)] text-[#D6A84F]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#A1A1AA]">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="relative overflow-hidden border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Vamos Conversar</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Pronto para Transformar seu Negócio{' '}
              <span className="text-gradient-gold">Digitalmente</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
              Agende um diagnóstico gratuito. Sem compromisso, sem roteiro de vendas. 
              Vamos entender seu negócio e mostrar como podemos ajudar.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] bg-[length:200%_auto] px-8 py-3 text-base font-bold text-[#030303] transition-all duration-400 hover:bg-right hover:shadow-[0_0_40px_rgba(214,168,79,0.35)]"
              >
                Quero um Diagnóstico <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-8 py-3 text-base font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
              >
                <MessageCircle className="h-4 w-4" />
                Tirar Dúvidas no WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
