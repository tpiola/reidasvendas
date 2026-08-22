import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AppWindow,
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  Globe2,
  MonitorSmartphone,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { PremiumButton } from '@/components/PremiumButton';
import { Reveal, SectionLabel, SectionTitle, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { BRAND } from '@/lib/brand';
import { trackEvent } from '@/lib/analytics';
import { COMPARISONS, DEMONSTRATIONS, GUIDES, LOCAL_PAGES, SOLUTIONS, TOOLS } from '@/lib/growth';

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
    result: 'Aplicação web de produto digital técnico, com postura institucional e fluxo de conversa guiado. Exemplo real de produto digital construído com arquitetura própria.',
  },
  {
    icon: Globe2,
    name: 'Sentinela',
    category: 'Vigilância ambiental e dashboards',
    description: 'Sistema digital para reunir indicadores, apoiar o monitoramento e facilitar a leitura de dados ambientais.',
    result: 'Painel operacional com leitura de dados e relatórios estruturados. Mostra a capacidade de construir sistema, automação e visualização de indicadores para processos específicos.',
  },
  {
    icon: AppWindow,
    name: 'Thiago Piola',
    category: 'Portfólio premium',
    description: 'Presença digital autoral para apresentar trajetória, projetos e serviços com clareza e direção visual.',
    result: 'Site de autoridade com narrativa, hierarquia visual e performance. Demonstra padrão de design e desenvolvimento de uma presença digital construída do zero.',
  },
];

export default function Solucoes() {
  return (
    <main className="min-h-screen bg-[#030303]">
      <section className="relative overflow-hidden border-b border-white/[0.06] pb-16 pt-32 sm:pb-20 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,168,79,0.14),transparent_44%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal><SectionLabel>Biblioteca de soluções e arquiteturas</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-4 max-w-5xl font-serif text-4xl font-bold leading-[1.04] text-white sm:text-5xl md:text-6xl">
              Uma arquitetura para cada problema real da operação.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[#A1A1AA] sm:text-lg">
              Sites de alta conversão, landing pages, catálogos, aplicativos, SaaS, automações e infraestrutura digital. Cada solução começa pelo contexto do negócio.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PremiumButton href="/diagnostico" size="lg">
                Mapear minha operação <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PremiumButton>
              <PremiumButton href="/demonstracoes" variant="outline" size="lg">Explorar demonstrações</PremiumButton>
            </div>
            <p className="mt-4 text-xs leading-5 text-[#71717A]">
              Você envia o contexto do negócio; nós analisamos e indicamos as prioridades. Sem compromisso.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-16 sm:py-24" aria-labelledby="solution-library-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl">
            <SectionLabel>Arquiteturas por problema e segmento</SectionLabel>
            <h2 id="solution-library-title" className="mt-4 font-serif text-3xl font-bold leading-tight text-white sm:text-5xl">Encontre a solução compatível com sua operação.</h2>
            <p className="mt-5 text-base leading-8 text-[#A1A1AA]">Cada página apresenta contexto, gargalo, arquitetura possível, perguntas relevantes e um diagnóstico específico.</p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {SOLUTIONS.map((solution) => (
              <Link
                key={solution.slug}
                to={`/solucoes/${solution.slug}`}
                onClick={() => trackEvent('category_select', { service: solution.slug, category: solution.category })}
                className="group grid min-h-52 gap-4 rounded-2xl border border-white/[0.08] bg-[#090909] p-6 transition hover:border-[rgba(214,168,79,0.4)] hover:bg-[#0D0B08]"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D6A84F]">{solution.category}</span>
                <h3 className="font-serif text-2xl font-semibold leading-tight text-white">{solution.title}</h3>
                <p className="text-sm leading-7 text-[#A1A1AA]">{solution.summary}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#F2D38A]">Ver arquitetura <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
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
            <SectionTitle>Arquitetura exclusiva. Infraestrutura construída para o seu negócio.</SectionTitle>
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
                    {project.result}
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

      <section className="border-y border-white/[0.06] bg-[#080808] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl"><SectionLabel>Demonstrações e ferramentas</SectionLabel><SectionTitle>Experimente antes de avançar para o diagnóstico.</SectionTitle></Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="rounded-3xl border border-white/[0.08] bg-[#090909] p-6 sm:p-8"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D6A84F]">Arquiteturas demonstrativas</span><h3 className="mt-4 font-serif text-3xl font-bold text-white">Fluxos interativos por segmento.</h3><ul className="mt-5 space-y-3">{DEMONSTRATIONS.map((demo) => <li key={demo.slug}><Link className="inline-flex items-center gap-2 text-sm text-[#D4D4D8] transition hover:text-[#F2D38A]" to={`/demonstracoes/${demo.slug}`}>{demo.title} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></li>)}</ul></article>
            <article className="rounded-3xl border border-white/[0.08] bg-[#090909] p-6 sm:p-8"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D6A84F]">Ferramentas de diagnóstico</span><h3 className="mt-4 font-serif text-3xl font-bold text-white">Simulações e clareza operacional.</h3><ul className="mt-5 space-y-3">{TOOLS.map((tool) => <li key={tool.slug}><Link className="inline-flex items-center gap-2 text-sm text-[#D4D4D8] transition hover:text-[#F2D38A]" to={`/ferramentas/${tool.slug}`}>{tool.title} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></li>)}</ul></article>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="max-w-3xl"><SectionLabel>Intenção comercial e contexto local</SectionLabel><SectionTitle>Informação útil para quem já precisa decidir.</SectionTitle></Reveal>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <article><h3 className="font-serif text-2xl font-bold text-white">Comparar alternativas</h3><ul className="mt-5 space-y-4">{COMPARISONS.map((comparison) => <li key={comparison.slug}><Link className="text-sm leading-7 text-[#A1A1AA] hover:text-[#F2D38A]" to={`/alternativas/${comparison.slug}`}>{comparison.title}</Link></li>)}</ul></article>
            <article><h3 className="font-serif text-2xl font-bold text-white">Entender antes de contratar</h3><ul className="mt-5 space-y-4">{GUIDES.map((guide) => <li key={guide.slug}><Link className="text-sm leading-7 text-[#A1A1AA] hover:text-[#F2D38A]" to={`/${guide.slug}`}>{guide.title}</Link></li>)}</ul></article>
            <article><h3 className="font-serif text-2xl font-bold text-white">Intenções locais específicas</h3><ul className="mt-5 space-y-4">{LOCAL_PAGES.map((local) => <li key={local.slug}><Link className="text-sm leading-7 text-[#A1A1AA] hover:text-[#F2D38A]" to={`/solucoes/${local.slug}`}>{local.title}</Link></li>)}</ul></article>
          </div>
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
                Mapear minha operação <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </PremiumButton>
            </div>
            <p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-[#71717A]">
              Depois do envio, a equipe da {BRAND.name} revisa o contexto e libera uma conversa contextual pelo WhatsApp. Dúvidas institucionais podem ser enviadas para{' '}
              <a className="text-[#D6A84F] hover:text-[#F2D38A]" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
