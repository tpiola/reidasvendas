import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, FileText, Download, CheckCircle2, Search, MessageCircle,
  BookOpen, ClipboardList, PenTool, BarChart3, Puzzle, ChevronDown,
  Star, Shield, Zap, Globe,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { GoldParticles } from '@/components/GoldParticles';

/* ─── Cards de Recursos ─── */
const RECURSOS = [
  {
    icon: BookOpen, title: 'Guias & E-books',
    desc: 'Materiais completos sobre marketing digital, vendas online, SEO e transformação digital para pequenas e médias empresas.',
    items: [
      'Guia Completo de Marketing Digital para PMEs',
      'E-book: Como Vender Mais com um Site Profissional',
      'Checklist de SEO para Pequenas Empresas',
      'Guia de Automação Comercial para Iniciantes',
    ],
    color: 'from-[#D6A84F]/20 to-[#F2D38A]/5',
  },
  {
    icon: ClipboardList, title: 'Checklists & Templates',
    desc: 'Ferramentas práticas para você aplicar imediatamente no seu negócio, desde a criação do site até a gestão de vendas.',
    items: [
      'Template de Briefing para Criação de Sites',
      'Checklist de Lançamento Digital',
      'Modelo de Calendário Editorial',
      'Template de Análise de Concorrência Digital',
    ],
    color: 'from-[#D6A84F]/15 to-[#B88932]/5',
  },
  {
    icon: PenTool, title: 'Modelos & Wireframes',
    desc: 'Estruturas prontas de páginas e funis de vendas que usamos como ponto de partida para criar soluções personalizadas.',
    items: [
      'Wireframe de Landing Page de Alta Conversão',
      'Modelo de Dashboard Gerencial',
      'Estrutura de Site para E-commerce',
      'Wireframe de Página de Vendas',
    ],
    color: 'from-[#D6A84F]/20 to-[#F2D38A]/5',
  },
  {
    icon: BarChart3, title: 'Relatórios & Análises',
    desc: 'Dados e insights do mercado digital brasileiro para embasar suas decisões estratégicas com informação de qualidade.',
    items: [
      'Panorama do Mercado Digital Brasileiro 2026',
      'Análise de Performance de Sites em Franca-SP',
      'Benchmarking de Concorrentes Digitais',
      'Relatório de Tendências em UX e Design',
    ],
    color: 'from-[#D6A84F]/15 to-[#B88932]/5',
  },
  {
    icon: Puzzle, title: 'Ferramentas & Utilitários',
    desc: 'Aplicativos e ferramentas online que recomendamos para complementar sua infraestrutura digital e otimizar processos.',
    items: [
      'Calculadora de ROI Digital',
      'Guia de Ferramentas Gratuitas para PMEs',
      'Comparativo de Plataformas de E-commerce',
      'Kit de Ferramentas de Produtividade Digital',
    ],
    color: 'from-[#D6A84F]/20 to-[#F2D38A]/5',
  },
  {
    icon: Download, title: 'Downloads Técnicos',
    desc: 'Arquivos, códigos-fonte e documentação técnica para desenvolvedores e profissionais que querem se aprofundar.',
    items: [
      'Componentes UI Premium (React + Tailwind)',
      'Scripts de Automação Comercial',
      'Configuração de SEO Técnico (Guia Passo a Passo)',
      'Documentação de Integração de APIs',
    ],
    color: 'from-[#D6A84F]/15 to-[#B88932]/5',
  },
];

/* ─── FAQ Expandido (12+ perguntas) ─── */
const FAQ = [
  { q: 'O que é infraestrutura digital e por que minha empresa precisa?', a: 'Infraestrutura digital é o conjunto de ferramentas e sistemas que sua empresa usa para vender, se comunicar e gerenciar operações online. Inclui site, e-commerce, CRM, automações, dashboards e muito mais. Toda empresa que quer crescer no século XXI precisa de uma base digital sólida — assim como precisa de uma boa localização física.' },
  { q: 'Quanto custa criar um site profissional hoje?', a: 'Na Rei das Vendas, nossos planos começam em R$ 97/mês para o plano Digital, que inclui site premium, domínio grátis, blog e SEO. O valor é menor que um estagiário e entrega resultado profissional. Planos mais completos com e-commerce, CRM e automações vão até R$ 597/mês.' },
  { q: 'Qual a diferença entre um site comum e um site feito pela Rei das Vendas?', a: 'Um site comum é bonito, mas não vende. Nosso foco é conversão: cada elemento é pensado para guiar o visitante até a ação desejada — comprar, contratar, agendar. Além disso, entregamos infraestrutura completa: SEO, performance, integrações e suporte contínuo.' },
  { q: 'Em quanto tempo meu site fica pronto?', a: 'Sites institucionais ficam prontos em até 7 dias úteis. Projetos com e-commerce, funcionalidades avançadas ou integrações complexas levam de 15 a 21 dias. Você recebe um cronograma detalhado antes do início do projeto.' },
  { q: 'Preciso de conhecimento técnico para gerenciar meu site?', a: 'Não. Criamos um painel administrativo intuitivo que qualquer pessoa consegue usar. Se precisar de ajuda, nosso suporte está disponível. E se quiser alterações mais complexas, nós fazemos para você.' },
  { q: 'Vocês fazem sites para qualquer tipo de negócio?', a: 'Sim. Atendemos desde profissionais liberais (médicos, advogados, arquitetos) até indústrias e e-commerces. Cada projeto é personalizado para o segmento e porte da empresa. Veja nossa página de Segmentos para mais detalhes.' },
  { q: 'O que está incluído no domínio grátis?', a: 'Todos os nossos planos incluem um domínio .com.br grátis no primeiro ano. A renovação anual (cerca de R$ 40) é feita diretamente com o provedor. Sem taxas ocultas, sem surpresas.' },
  { q: 'Vocês oferecem garantia de satisfação?', a: 'Sim. Oferecemos garantia incondicional de 30 dias. Se por qualquer motivo você não ficar satisfeito, devolvemos 100% do seu investimento. Sem burocracia, sem questionamentos.' },
  { q: 'Como funciona o suporte técnico?', a: 'Oferecemos suporte por e-mail (48h) no plano Digital, suporte prioritário (24h) no Profissional e suporte VIP (4h) com gerente dedicado no Enterprise. Todos os planos incluem acesso ao WhatsApp para dúvidas rápidas.' },
  { q: 'Vocês atendem empresas fora de Franca-SP?', a: 'Sim! Atendemos empresas em todo o Brasil. Todo o processo é remoto: reuniões por videoconferência, entregas por nuvem e suporte por WhatsApp e e-mail. Já atendemos clientes em São Paulo, Ribeirão Preto, Belo Horizonte e outras cidades.' },
  { q: 'Posso migrar meu site atual para a Rei das Vendas?', a: 'Sim. Fazemos migração completa do seu conteúdo, banco de dados e configurações sem perda de dados. Nos planos Enterprise, a migração é inclusa. Nos demais planos, consulte condições especiais.' },
  { q: 'O que é o diagnóstico gratuito?', a: 'É uma conversa sem compromisso onde analisamos sua presença digital atual, identificamos oportunidades de melhoria e apresentamos um plano personalizado. Não fazemos pressão de venda — nosso foco é mostrar como podemos agregar valor real ao seu negócio.' },
  { q: 'Como faço para contratar?', a: 'Escolha o plano ideal na página de Planos, preencha seus dados e faça o pagamento via Stripe (cartão, boleto ou PIX). Em até 24 horas úteis, entraremos em contato para iniciar o projeto. Ou se preferir, agende um diagnóstico gratuito pelo WhatsApp.' },
  { q: 'Vocês oferecem desconto para pagamento anual?', a: 'Sim. Oferecemos descontos atrativos para pagamento anual. Consulte nossa tabela de preços ou fale conosco pelo WhatsApp para saber as condições especiais para sua empresa.' },
];

/* ─── FAQ Accordion ─── */
function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      className={`group cursor-pointer rounded-2xl border transition-all duration-300 ${
        open
          ? 'border-[rgba(214,168,79,0.3)] bg-[rgba(214,168,79,0.04)]'
          : 'border-[rgba(255,255,255,0.06)] bg-transparent hover:border-[rgba(214,168,79,0.15)]'
      }`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between gap-4 p-5 sm:p-6">
        <span className="flex items-start gap-3 text-sm font-semibold text-white sm:text-base">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(214,168,79,0.1)] text-xs font-bold text-[#D6A84F]">
            {String(index + 1).padStart(2, '0')}
          </span>
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-[#D6A84F] transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </div>
      <motion.div
        initial={false}
        animate={{
          height: open ? 'auto' : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-sm leading-relaxed text-[#A1A1AA] sm:px-6 sm:pb-6 sm:pl-16">
          {a}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function Recursos() {
  return (
    <main>
      <GoldParticles count={25} />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Recursos</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Conhecimento que{' '}
              <span className="text-gradient-gold">Transforma Resultados</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Guias, templates, checklists e ferramentas para ajudar sua empresa a crescer no digital. 
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[#D6A84F]" /> Guias Completos
              </span>
              <span className="hidden sm:inline text-[rgba(255,255,255,0.12)]">•</span>
              <span className="flex items-center gap-1.5">
                <ClipboardList className="h-4 w-4 text-[#D6A84F]" /> Templates Práticos
              </span>
              <span className="hidden sm:inline text-[rgba(255,255,255,0.12)]">•</span>
              <span className="flex items-center gap-1.5">
                <Download className="h-4 w-4 text-[#D6A84F]" /> Downloads Gratuitos
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ GRID DE CARDS ═══════ */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {RECURSOS.map((recurso) => {
              const Icon = recurso.icon;
              return (
                <motion.div
                  key={recurso.title}
                  variants={staggerItem}
                  className="glass-card group flex flex-col rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 transition-all duration-500 hover:border-[rgba(214,168,79,0.25)] hover:bg-[rgba(214,168,79,0.02)]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.08)] text-[#D6A84F] transition-all duration-300 group-hover:bg-[rgba(214,168,79,0.15)] group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-white">{recurso.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{recurso.desc}</p>

                  <ul className="mt-4 flex-1 space-y-2">
                    {recurso.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-[#71717A]">
                        <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-[#D6A84F]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D6A84F] transition-all duration-300 group-hover:gap-2.5">
                      Acessar Recursos <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ FAQ EXPANDIDO ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Dúvidas Frequentes</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Perguntas que{' '}
              <span className="text-gradient-gold">Todo Mundo Faz</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#A1A1AA]">
              Separamos as principais dúvidas que recebemos sobre infraestrutura digital.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="mt-10 space-y-3"
            >
              {FAQ.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} index={i} />
              ))}
            </motion.div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <p className="text-sm text-[#71717A]">
                Ainda tem dúvidas?{' '}
                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#D6A84F] underline underline-offset-2 transition-colors hover:text-[#F2D38A]"
                >
                  Fale conosco no WhatsApp
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ CTA BANNER FINAL ═══════ */}
      <section className="relative overflow-hidden border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Baixe o Guia Completo de{' '}
              <span className="text-gradient-gold">Marketing Digital para PMEs</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
              Aprenda como estruturar sua presença digital do zero, com estratégias práticas 
              que funcionam para pequenas e médias empresas.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] bg-[length:200%_auto] px-8 py-3 text-base font-bold text-[#030303] transition-all duration-400 hover:bg-right hover:shadow-[0_0_40px_rgba(214,168,79,0.35)]"
              >
                <Download className="h-4 w-4" />
                Baixar Guia Gratuito
              </Link>
              <Link
                to="/planos"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-8 py-3 text-base font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
              >
                Conhecer Planos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-[#D6A84F]" /> Conteúdo Exclusivo
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#D6A84F]" /> 100% Gratuito
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#D6A84F]" /> Aplicação Imediata
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
