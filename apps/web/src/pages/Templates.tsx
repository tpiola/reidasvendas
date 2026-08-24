import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Bug,
  Building2,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Home,
  PawPrint,
  Scale,
  Sparkles,
  Stethoscope,
  Utensils,
  Wrench,
} from 'lucide-react';
import { Reveal, SectionLabel, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { PremiumButton } from '@/components/PremiumButton';

const CATEGORIES = [
  { id: 'todos', label: 'Todos', icon: Sparkles },
  { id: 'saude', label: 'Saúde e beleza', icon: HeartPulse },
  { id: 'alimentacao', label: 'Alimentação', icon: Utensils },
  { id: 'servicos', label: 'Serviços locais', icon: Wrench },
  { id: 'imoveis', label: 'Imóveis', icon: Building2 },
  { id: 'educacao', label: 'Educação', icon: GraduationCap },
] as const;

type CategoryId = (typeof CATEGORIES)[number]['id'];

const MODELS = [
  {
    id: 'odontologia',
    name: 'Clínica odontológica',
    category: 'saude',
    icon: Stethoscope,
    objective: 'Gerar avaliações e agendamentos pelo WhatsApp.',
    description: 'Apresentação clínica premium com confiança, equipe, tratamentos, localização e respostas às principais objeções.',
    structure: ['Hero e avaliação', 'Tratamentos prioritários', 'Equipe e confiança', 'Dúvidas frequentes'],
  },
  {
    id: 'dedetizacao',
    name: 'Dedetização e controle de pragas',
    category: 'servicos',
    icon: Bug,
    objective: 'Facilitar orçamentos rápidos e atendimentos urgentes.',
    description: 'Arquitetura para serviços por tipo de ocorrência, áreas atendidas, segurança, documentação e contato sem fricção.',
    structure: ['Ocorrências e serviços', 'Residencial e empresarial', 'Método de atendimento', 'Orçamento rápido'],
  },
  {
    id: 'restaurante',
    name: 'Restaurante e delivery',
    category: 'alimentacao',
    icon: Utensils,
    objective: 'Transformar visitas em pedidos, reservas ou rotas.',
    description: 'Página visual com pratos em destaque, cardápio enxuto, avaliações, horários e integração aos canais de pedido.',
    structure: ['Pratos em destaque', 'Cardápio', 'Avaliações reais', 'Pedido e localização'],
  },
  {
    id: 'estetica',
    name: 'Clínica de estética e beleza',
    category: 'saude',
    icon: Sparkles,
    objective: 'Gerar agendamentos para avaliação personalizada.',
    description: 'Comunicação aspiracional sem exageros, organizada por desejo, procedimento, especialista, segurança e acompanhamento.',
    structure: ['Desejos e procedimentos', 'Especialistas', 'Protocolos e segurança', 'Agendamento'],
  },
  {
    id: 'academia',
    name: 'Academia e studio personal',
    category: 'saude',
    icon: Dumbbell,
    objective: 'Gerar aulas experimentais e visitas ao espaço.',
    description: 'Estrutura direta para modalidades, ambiente, planos, rotina, depoimentos e início simples pelo celular.',
    structure: ['Modalidades', 'Espaço e equipe', 'Planos essenciais', 'Aula experimental'],
  },
  {
    id: 'oficina',
    name: 'Oficina mecânica',
    category: 'servicos',
    icon: Wrench,
    objective: 'Aumentar solicitações de orçamento com mais confiança.',
    description: 'Site técnico e claro para revisão, freios, suspensão, óleo e diagnóstico, com transparência e localização visível.',
    structure: ['Serviços automotivos', 'Processo de diagnóstico', 'Confiança e garantia real', 'Orçamento'],
  },
  {
    id: 'pet-shop',
    name: 'Pet shop e banho e tosa',
    category: 'servicos',
    icon: PawPrint,
    objective: 'Gerar agendamentos recorrentes pelo WhatsApp.',
    description: 'Experiência acolhedora para serviços, cuidados, fotos reais, leva e traz, rotina do pet e contato rápido.',
    structure: ['Banho e tosa', 'Cuidados e segurança', 'Fotos e avaliações', 'Agendamento'],
  },
  {
    id: 'advocacia',
    name: 'Advocacia local',
    category: 'servicos',
    icon: Scale,
    objective: 'Facilitar o primeiro contato de forma ética e sóbria.',
    description: 'Apresentação profissional com áreas de atuação, processo de atendimento, autoridade verificável e análise inicial.',
    structure: ['Áreas de atuação', 'Como funciona', 'Equipe e autoridade', 'Análise do caso'],
  },
  {
    id: 'imobiliaria',
    name: 'Imobiliária e corretor',
    category: 'imoveis',
    icon: Home,
    objective: 'Gerar contatos para compra, venda, locação e avaliação.',
    description: 'Vitrine organizada por intenção, tipo e região, com imóveis selecionados e contato direto com o responsável.',
    structure: ['Imóveis selecionados', 'Busca por intenção', 'Serviços imobiliários', 'Falar com corretor'],
  },
  {
    id: 'escola',
    name: 'Escola e curso local',
    category: 'educacao',
    icon: GraduationCap,
    objective: 'Gerar matrículas, visitas e conversas com responsáveis.',
    description: 'Estrutura para metodologia, turmas, ambiente, fotos reais, perguntas dos responsáveis e visita agendada.',
    structure: ['Metodologia', 'Cursos e turmas', 'Estrutura e provas', 'Agendar visita'],
  },
] as const;

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('todos');
  const filteredModels = activeCategory === 'todos'
    ? MODELS
    : MODELS.filter((model) => model.category === activeCategory);

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-line pb-16 pt-32 sm:pb-20 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(166,111,24,0.14),transparent_42%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Modelos por segmento</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1.04] text-text-primary sm:text-5xl md:text-6xl">
              Uma arquitetura diferente para cada tipo de negócio.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
              Estes modelos mostram como organizamos conteúdo, confiança e contato em cada mercado.
              O projeto final é adaptado à empresa, à cidade, ao público e aos serviços reais.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PremiumButton href="/contato">
                Solicitar análise do meu negócio <ArrowRight className="h-4 w-4" />
              </PremiumButton>
              <Link to="/portfolio" className="btn-outline-gold">
                Ver projetos publicados
              </Link>
            </div>
          </Reveal>
          <p className="mx-auto mt-6 max-w-xl text-xs leading-5 text-text-muted">
            Modelos demonstrativos não representam clientes nem resultados específicos.
          </p>
        </div>
      </section>

      <section className="border-b border-line py-7" aria-label="Filtrar modelos">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 px-4 sm:px-6">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const selected = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={selected}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                  selected
                    ? 'border-gold bg-[rgba(166,111,24,0.12)] text-gold-light'
                    : 'border-text-primary/10 text-text-secondary hover:border-[rgba(166,111,24,0.35)] hover:text-text-primary'
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {category.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredModels.map((model, index) => {
                const Icon = model.icon;
                const category = CATEGORIES.find((item) => item.id === model.category);
                return (
                  <motion.article
                    key={model.id}
                    layout
                    variants={staggerItem}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.28 }}
                    className="group flex min-h-[440px] flex-col overflow-hidden rounded-3xl border border-text-primary/[0.08] bg-surface-2 transition-colors hover:border-[rgba(166,111,24,0.32)]"
                  >
                    <div className="relative min-h-44 overflow-hidden border-b border-line bg-[linear-gradient(145deg,#111,#070707)] p-6">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(166,111,24,0.14),transparent_45%)]" aria-hidden="true" />
                      <div className="relative flex items-start justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                          Modelo {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(166,111,24,0.2)] bg-[rgba(166,111,24,0.08)] text-gold-light">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="relative mt-8 grid grid-cols-[1.2fr_.8fr] gap-3" aria-hidden="true">
                        <div className="space-y-2">
                          <span className="block h-3 w-4/5 rounded-full bg-white/20" />
                          <span className="block h-2 w-full rounded-full bg-white/10" />
                          <span className="block h-2 w-3/4 rounded-full bg-white/10" />
                          <span className="mt-4 block h-8 w-28 rounded-lg bg-gold" />
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04]" />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                        {category?.label}
                      </p>
                      <h2 className="mt-3 font-serif text-2xl font-bold text-text-primary">{model.name}</h2>
                      <p className="mt-3 text-sm font-semibold leading-6 text-text-primary">{model.objective}</p>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">{model.description}</p>

                      <ul className="mt-5 grid gap-2 text-xs text-text-secondary" aria-label={`Estrutura sugerida para ${model.name}`}>
                        {model.structure.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Link
                        to={`/contato?modelo=${model.id}`}
                        className="mt-auto inline-flex min-h-12 items-center justify-between border-t border-text-primary/[0.08] pt-5 text-sm font-semibold text-gold-light transition-colors hover:text-text-primary"
                      >
                        Quero uma análise para este segmento
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <SectionLabel>Projeto personalizado</SectionLabel>
          <h2 className="mt-4 font-serif text-3xl font-bold text-text-primary sm:text-5xl">
            O modelo organiza o raciocínio. A sua empresa define o resultado final.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary">
            Avaliamos serviços, público, concorrência, cidade, provas e canais de contato antes de construir cada página.
          </p>
          <div className="mt-8">
            <PremiumButton href="/contato">
              Solicitar análise do meu negócio <ArrowRight className="h-4 w-4" />
            </PremiumButton>
          </div>
        </div>
      </section>
    </main>
  );
}
