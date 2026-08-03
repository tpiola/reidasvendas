import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AppWindow,
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  Globe2,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Search,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { PremiumButton } from '@/components/PremiumButton';
import { Reveal, SectionLabel, SectionTitle, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { BRAND } from '@/lib/brand';

// GA4 tracking: view_page:"/solucoes"

const PROBLEMS = [
  'Site lento ou difícil de navegar',
  'Oferta sem clareza para quem chega',
  'Ausência de provas que sustentem a decisão',
  'WhatsApp desorganizado e sem contexto',
  'Leads sem acompanhamento ou follow-up',
  'Informações inconsistentes no Google',
  'Experiência ruim no celular',
];

const METHOD = [
  ['01', 'Diagnóstico do negócio', 'Entendemos oferta, público, objetivos, operação e o momento atual da empresa.'],
  ['02', 'Análise da presença atual', 'Revisamos site, Google, canais de contato, concorrência e pontos de perda na jornada.'],
  ['03', 'Definição da arquitetura', 'Organizamos páginas, mensagens, caminhos de conversão e integrações necessárias.'],
  ['04', 'Construção do site/funil', 'Transformamos a estratégia em uma experiência clara, rápida e pensada para o celular.'],
  ['05', 'Automação e integração', 'Conectamos formulários, WhatsApp e ferramentas para dar continuidade aos contatos.'],
  ['06', 'Publicação e teste', 'Validamos conteúdo, responsividade, performance, segurança, eventos e canais de contato.'],
  ['07', 'Otimização contínua', 'Acompanhamos dados reais para priorizar ajustes e evoluções com critério.'],
];

const MODULES = [
  {
    icon: MonitorSmartphone,
    title: 'Site de Conversão Local',
    description: 'Um site profissional que transforma visitas em contatos com uma experiência objetiva e confiável.',
    items: ['Experiência mobile', 'Mensagem e oferta claras', 'WhatsApp bem posicionado', 'Estrutura para SEO local'],
  },
  {
    icon: Bot,
    title: 'Funil + Automação',
    description: 'Uma estrutura para capturar, responder, organizar e acompanhar leads sem perder oportunidades.',
    items: ['Captação estruturada', 'Respostas e direcionamentos', 'Organização dos contatos', 'Acompanhamento de leads'],
  },
  {
    icon: AppWindow,
    title: 'Aplicativos e SaaS',
    description: 'Sistemas sob medida para reduzir atrito em processos importantes do negócio.',
    items: ['Agendamento', 'Operação interna', 'Atendimento', 'Painéis e indicadores'],
  },
  {
    icon: ShieldCheck,
    title: 'Infraestrutura Digital',
    description: 'A base técnica para manter a presença digital estável, mensurável e preparada para evoluir.',
    items: ['Domínio e hospedagem', 'Segurança e performance', 'Integrações', 'Analytics'],
  },
];

const PROJECTS = [
  {
    icon: Bot,
    name: 'SaúdeGPT',
    category: 'IA generativa em saúde',
    description: 'Plataforma que organiza uma experiência de inteligência artificial voltada a informações de saúde.',
  },
  {
    icon: Globe2,
    name: 'Sentinela',
    category: 'Vigilância ambiental e dashboards',
    description: 'Sistema digital para reunir indicadores, apoiar o monitoramento e facilitar a leitura de dados ambientais.',
  },
  {
    icon: AppWindow,
    name: 'Thiago Piola',
    category: 'Portfólio premium',
    description: 'Presença digital autoral para apresentar trajetória, projetos e serviços com clareza e direção visual.',
  },
];

export default function Solucoes() {
  return (
    <main className="min-h-screen bg-[#030303]">
      <section className="relative overflow-hidden border-b border-white/[0.06] pb-16 pt-32 sm:pb-20 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,168,79,0.14),transparent_44%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal><SectionLabel>Soluções sob medida</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-4 max-w-5xl font-serif text-4xl font-bold leading-[1.04] text-white sm:text-5xl md:text-6xl">
              Soluções digitais completas para negócios locais. Construídas negócio a negócio.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#A1A1AA] sm:text-lg">
              Não entregamos apenas um site. Construímos a infraestrutura digital que faz sua empresa ser encontrada, gerar confiança, receber contatos e vender com mais previsibilidade.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PremiumButton href="/diagnostico" size="lg">
                Receber diagnóstico gratuito <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PremiumButton>
              <PremiumButton href="/portfolio" variant="outline" size="lg">Ver projetos reais</PremiumButton>
            </div>
            <p className="mt-4 text-xs leading-5 text-[#71717A]">
              Você envia o contexto do negócio; nós analisamos e indicamos as prioridades. Sem compromisso.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <Reveal>
            <SectionLabel>O gargalo real</SectionLabel>
            <SectionTitle>O problema não é falta de presença digital. É presença digital sem conversão.</SectionTitle>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#A1A1AA]">
              Estar online não basta quando cada ponto de contato cria dúvida, atrito ou demora. Antes de adicionar ferramentas, identificamos onde a jornada perde clareza e continuidade.
            </p>
          </Reveal>
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-3 rounded-3xl border border-white/[0.08] bg-[#090909] p-6 sm:grid-cols-2 sm:p-8"
          >
            {PROBLEMS.map((problem) => (
              <motion.li key={problem} variants={staggerItem} className="flex gap-3 text-sm leading-6 text-[#D4D4D8]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D6A84F]" aria-hidden="true" />
                {problem}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#080808] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <SectionLabel>Método</SectionLabel>
            <SectionTitle>Como construímos uma solução exclusiva</SectionTitle>
            <p className="mt-5 text-base leading-8 text-[#A1A1AA]">
              Cada decisão parte do diagnóstico. O processo conecta estratégia, comunicação, tecnologia e operação sem empurrar módulos que o negócio não precisa.
            </p>
          </Reveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {METHOD.map(([number, title, text], index) => (
              <motion.article
                key={number}
                variants={staggerItem}
                className={`rounded-3xl border border-white/[0.08] bg-[#090909] p-6 ${index === METHOD.length - 1 ? 'lg:col-start-2' : ''}`}
              >
                <span className="text-xs font-bold tracking-[0.18em] text-[#D6A84F]">{number}</span>
                <h3 className="mt-4 font-serif text-2xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#A1A1AA]">{text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <SectionLabel>Módulos de solução</SectionLabel>
            <SectionTitle>A estrutura certa para o estágio do seu negócio.</SectionTitle>
            <p className="mt-5 text-base leading-8 text-[#A1A1AA]">
              Os módulos podem funcionar juntos ou ser implementados por etapas, conforme as prioridades identificadas no diagnóstico.
            </p>
          </Reveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 grid gap-5 lg:grid-cols-2"
          >
            {MODULES.map((module) => {
              const Icon = module.icon;
              return (
                <motion.article key={module.title} variants={staggerItem} className="rounded-3xl border border-white/[0.08] bg-[#090909] p-6 sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(214,168,79,0.18)] bg-[rgba(214,168,79,0.08)] text-[#F2D38A]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-bold text-white sm:text-3xl">{module.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#A1A1AA]">{module.description}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {module.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-[#D4D4D8]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D6A84F]" aria-hidden="true" /> {item}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#080808] py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <Reveal>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(214,168,79,0.18)] bg-[rgba(214,168,79,0.08)] text-[#F2D38A]">
              <Zap className="h-6 w-6" aria-hidden="true" />
            </span>
            <SectionTitle>Não é template. É infraestrutura construída para o seu negócio.</SectionTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-white/[0.08] bg-[#090909] p-6 sm:p-8">
              <p className="text-base leading-8 text-[#A1A1AA]">
                Cada negócio tem público, oferta, objeções e uma jornada diferentes. Por isso, a solução é montada a partir de diagnóstico — não de uma lista pronta de páginas.
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  'Design, copy, tecnologia e automação trabalham como um único sistema.',
                  'As decisões respondem ao contexto comercial e operacional da empresa.',
                  'O site deixa de ser apenas apresentação e passa a atuar como um ativo comercial.',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 text-[#D4D4D8]">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#D6A84F]" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <SectionLabel>Projetos reais</SectionLabel>
            <SectionTitle>Estratégia aplicada a desafios diferentes.</SectionTitle>
            <p className="mt-5 text-base leading-8 text-[#A1A1AA]">
              Produtos e experiências digitais construídos para contextos específicos, sem atribuir resultados que ainda não foram medidos.
            </p>
          </Reveal>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 grid gap-5 lg:grid-cols-3"
          >
            {PROJECTS.map((project) => {
              const Icon = project.icon;
              return (
                <motion.article key={project.name} variants={staggerItem} className="flex flex-col rounded-3xl border border-white/[0.08] bg-[#090909] p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(214,168,79,0.18)] bg-[rgba(214,168,79,0.08)] text-[#F2D38A]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#D6A84F]">{project.category}</p>
                  <h3 className="mt-2 font-serif text-3xl font-bold text-white">{project.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-[#A1A1AA]">{project.description}</p>
                  <p className="mt-6 border-t border-white/[0.08] pt-5 text-xs leading-6 text-[#71717A]">
                    [DADO_NECESSARIO: resultado mensuravel do projeto]
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
          <Reveal delay={0.1} className="mt-8">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-[#F2D38A] transition-colors hover:text-white">
              Conhecer os projetos em detalhes <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-[#0A0A0A] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <ClipboardCheck className="mx-auto h-10 w-10 text-[#D6A84F]" aria-hidden="true" />
            <h2 className="mt-5 font-serif text-3xl font-bold text-white sm:text-5xl">Antes de propor, nós entendemos.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#A1A1AA]">
              Envie seu site atual, seu perfil do Google ou apenas conte seu momento. Você recebe uma leitura clara do que precisa ser prioridade.
            </p>
            <div className="mt-8">
              <PremiumButton href="/diagnostico" size="lg">
                Receber diagnóstico gratuito <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PremiumButton>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-[#71717A]">
              Depois do envio, a equipe da {BRAND.name} revisa o contexto e retorna com os próximos passos pelo canal informado. Se preferir, escreva para{' '}
              <a className="text-[#D6A84F] hover:text-[#F2D38A]" href={`mailto:${BRAND.email}`}>{BRAND.email}</a> ou{' '}
              <a className="inline-flex items-center gap-1 text-[#D6A84F] hover:text-[#F2D38A]" href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer">
                fale no WhatsApp <MessageCircle className="h-3 w-3" aria-hidden="true" />
              </a>.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
