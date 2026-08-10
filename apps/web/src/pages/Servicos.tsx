import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Globe2,
  MapPin,
  MessageCircle,
  MonitorSmartphone,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { PremiumButton } from '@/components/PremiumButton';

const DELIVERABLES = [
  {
    icon: MonitorSmartphone,
    title: 'Site profissional',
    description: 'Páginas planejadas para apresentar a empresa, explicar os serviços e funcionar perfeitamente no celular.',
  },
  {
    icon: Search,
    title: 'Preparação para buscas',
    description: 'Títulos, páginas, estrutura e informações locais organizados para ajudar clientes a encontrar o negócio.',
  },
  {
    icon: MapPin,
    title: 'Google, mapa e localização',
    description: 'Telefone, endereço, horários, rotas e áreas atendidas apresentados de forma consistente e fácil de confirmar.',
  },
  {
    icon: MessageCircle,
    title: 'Canais de contato',
    description: 'WhatsApp, telefone, formulários e agendamento posicionados para reduzir dúvidas e facilitar o próximo passo.',
  },
  {
    icon: Globe2,
    title: 'Publicação e domínio',
    description: 'Configuração profissional do domínio, hospedagem, segurança e versão final testada no endereço público.',
  },
  {
    icon: ShieldCheck,
    title: 'Revisão e suporte',
    description: 'Conteúdo, navegação, contatos e experiência revisados antes da publicação, com suporte conforme o projeto.',
  },
];

const PROCESS = [
  ['01', 'Conhecemos o negócio', 'Entendemos serviços, público, região, diferenciais e o tipo de contato que a empresa deseja receber.'],
  ['02', 'Planejamos a apresentação', 'Organizamos páginas, textos, imagens e caminhos para ligação, mensagem, visita, orçamento ou agendamento.'],
  ['03', 'Criamos e revisamos', 'Construímos primeiro para o celular e testamos navegação, velocidade, acessibilidade, formulários e contatos.'],
  ['04', 'Publicamos e orientamos', 'Colocamos o projeto no ar, validamos o domínio público e entregamos orientações de manutenção.'],
];

const INCLUDED = [
  'Projeto adaptado à identidade e à realidade da empresa',
  'Páginas e seções definidas conforme a jornada do cliente',
  'Textos claros e sem promessas que não possam ser comprovadas',
  'Versão responsiva para celular, tablet e computador',
  'Integração com WhatsApp, telefone, formulário e localização',
  'Configuração essencial para buscas e compartilhamento',
  'Testes antes e depois da publicação',
];

export default function Servicos() {
  return (
    <main className="min-h-screen bg-[#030303]">
      <section className="relative overflow-hidden border-b border-white/[0.06] pb-16 pt-32 sm:pb-20 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(214,168,79,0.14),transparent_44%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal><SectionLabel>Sites profissionais</SectionLabel></Reveal>
          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-4 max-w-4xl font-serif text-4xl font-bold leading-[1.04] text-white sm:text-5xl md:text-6xl">
              Tudo o que sua empresa precisa para se apresentar bem na internet.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#A1A1AA] sm:text-lg">
              Criamos o site e organizamos os pontos essenciais da presença online para que o cliente encontre informações corretas, compreenda os serviços e entre em contato sem dificuldade.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <PremiumButton href="/contato">Solicitar análise <ArrowRight className="h-4 w-4" /></PremiumButton>
              <Link to="/templates" className="btn-outline-gold">Ver modelos por segmento</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <SectionLabel>O que entregamos</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">
              Uma presença organizada do primeiro acesso ao contato.
            </h2>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {DELIVERABLES.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article key={item.title} variants={staggerItem} className="rounded-3xl border border-white/[0.08] bg-[#090909] p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(214,168,79,0.18)] bg-[rgba(214,168,79,0.08)] text-[#F2D38A]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#A1A1AA]">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-[#080808] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <SectionLabel>Como funciona</SectionLabel>
              <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">Um processo simples, conduzido com cuidado.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#A1A1AA]">O escopo é definido depois da análise, para recomendar somente as páginas e conexões que realmente fazem sentido.</p>
            </div>
            <div className="border-t border-white/10">
              {PROCESS.map(([number, title, text]) => (
                <article key={number} className="grid gap-3 border-b border-white/10 py-6 sm:grid-cols-[52px_190px_1fr]">
                  <span className="text-xs font-bold text-[#D6A84F]">{number}</span>
                  <h3 className="font-serif text-xl font-bold text-white">{title}</h3>
                  <p className="text-sm leading-6 text-[#A1A1AA]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel>Projeto bem definido</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-5xl">Sem pacotes inflados e sem promessas genéricas.</h2>
            <p className="mt-5 text-base leading-7 text-[#A1A1AA]">O investimento depende da quantidade de páginas, conteúdo, integrações e necessidades do negócio. Tudo é descrito na proposta antes do início.</p>
          </div>
          <ul className="grid gap-3 rounded-3xl border border-white/[0.08] bg-[#090909] p-6 sm:p-8">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-[#D4D4D8]">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#D6A84F]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-[#0A0A0A] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <ClipboardCheck className="mx-auto h-9 w-9 text-[#D6A84F]" aria-hidden="true" />
          <h2 className="mt-5 font-serif text-3xl font-bold text-white sm:text-5xl">Descubra o que hoje pode estar afastando clientes.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#A1A1AA]">Analisamos como sua empresa aparece, como o site funciona no celular e se o visitante consegue entrar em contato sem dificuldade.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PremiumButton href="/contato">Quero uma análise <ArrowRight className="h-4 w-4" /></PremiumButton>
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
              <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
