import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import ConversionJourney from '@/components/ConversionJourney';
import { SwapLink } from '@/components/SwapLink';
import { staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { motion, useReducedMotion } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import {
  HOME_FAQS,
  LAUDOS,
  MEDICAO_REALIZADA_EM,
  PATOLOGIAS,
  PROTOCOLO,
  TRADE_OFF,
} from '@/lib/conversao';
import { ESTEIRA_RESUMO, PILARES } from '@/lib/esteira';
import {
  DELIVERY_MODELS,
  FAMILY_LABELS,
  MARKETPLACE_ITEMS,
  type SolutionFamily,
} from '@/lib/marketplace';

const FAMILY_ORDER: SolutionFamily[] = [
  'presenca',
  'comercio',
  'atendimento',
  'produto',
  'distribuicao',
  'operacao',
];

const PROJECTS = [
  {
    name: 'Sentinela Saúde Ambiental',
    type: 'Serviço local · Franca/SP',
    detail: 'Serviços, áreas atendidas, diagnóstico e orçamento reunidos em uma jornada móvel.',
    image: '/imagens/portfolio/sentinela.webp',
    video: '/videos/projetos/sentinela-loop.mp4',
    emphasis: 'flagship',
    href: 'https://sentinelasaudeambiental.com.br',
  },
  {
    name: 'TKA Esportes',
    type: 'Comércio · e-commerce',
    detail: 'Trinta anos de história transformados em catálogo por categoria e experiência de compra.',
    image: '/imagens/portfolio/tka.webp',
    video: '/videos/projetos/tka-loop.mp4',
    emphasis: 'standard',
    href: 'https://tkaesportes.com.br',
  },
];

const OTHER_WORK = [
  {
    name: 'Thiago Piola',
    type: 'Presença autoral · portfólio',
    detail: 'Trajetória, projetos e serviços organizados em uma narrativa própria.',
    image: '/imagens/portfolio/thiagopiola.webp',
    video: '/videos/projetos/thiagopiola-loop.mp4',
    href: 'https://thiagopiola.com.br',
  },
  {
    name: 'SaúdeGPT',
    type: 'Produto conversacional · saúde',
    detail: 'Produto web guiado, com histórico e limites institucionais explícitos.',
    image: '/imagens/portfolio/saudegpt.webp',
    video: '/videos/projetos/saudegpt-loop.mp4',
    href: 'https://saudegpt.com',
  },
];

const METHOD = [
  ['Leitura', 'Entendemos oferta, público, canais, atendimento e o que está travando a próxima venda.'],
  ['Corte', 'Priorizamos a intervenção que reduz mais atrito sem inflar o primeiro escopo.'],
  ['Construção', 'Design, conteúdo, código, integrações e medição avançam como uma única entrega.'],
  ['Distribuição', 'Publicamos e conectamos busca, campanhas, conteúdo e atendimento ao destino certo.'],
  ['Operação', 'Acompanhamos estabilidade, uso e oportunidades para decidir o próximo release.'],
];

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <main id="main-content" className="rdv-platform rdv-studio">
      <Hero />

      {/* PATOLOGIA — o que a triagem mede, com o custo de cada vazamento em CAC. */}
      <section className="rdv-method-v3" aria-labelledby="patologia-title">
        <div className="rdv-shell rdv-method-v3__grid">
          <div>
            <header>
              <p className="rdv-kicker">Patologia de funil</p>
              <h2 id="patologia-title">Quatro vazamentos consomem o orçamento que já foi aprovado.</h2>
              <p>Nenhum deles aparece no relatório de vaidade. Todos aparecem no custo por cliente adquirido.</p>
            </header>
          </div>
          <motion.ol
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {PATOLOGIAS.map((item) => (
              <motion.li key={item.titulo} variants={staggerItem}>
                <span>{item.ordem}</span>
                <div>
                  <h3>{item.titulo}</h3>
                  <p>{item.doenca}</p>
                  <p><strong>Custo:</strong> {item.custo}</p>
                  <p><strong>Princípio ativo:</strong> {item.mecanismo}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* PROTOCOLO — as 12 verificações e o instrumento de cada uma. */}
      <section id="protocolo" className="rdv-shell scroll-mt-28 py-20 sm:py-28" aria-labelledby="protocolo-title">
        <header className="max-w-3xl">
          <p className="rdv-kicker">Protocolo de auditoria</p>
          <h2 id="protocolo-title" className="mt-4 font-serif text-3xl font-bold leading-tight text-text-primary sm:text-5xl">
            Doze verificações. Cada uma com o instrumento que a mede.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            A triagem segue esta ordem porque a leitura barata vem primeiro: rastreio antes de mídia, medição antes de
            opinião. O laudo entrega a fila priorizada por impacto e esforço.
          </p>
        </header>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] sm:grid-cols-2 lg:grid-cols-3">
          {PROTOCOLO.map(([titulo, detalhe], index) => (
            <li key={titulo} className="bg-black/20 p-6">
              <span className="font-serif text-sm text-gold" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-serif text-lg font-bold text-text-primary">{titulo}</h3>
              <p className="mt-2 text-sm leading-6 text-text-secondary">{detalhe}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            className="rdv-primary-action"
            to="/diagnostico?origem=home-protocolo&estagio=triagem"
            onClick={() => trackEvent('diagnostic_start', { position: 'home-protocolo', stage: 'triagem' })}
          >
            Solicitar triagem clínica <ArrowRight aria-hidden="true" />
          </Link>
          <SwapLink to="/solucoes" swapLabel="Abrir o catálogo de soluções">
            Ver o que pode ser construído
          </SwapLink>
        </div>
      </section>

      {/* LAUDOS — a prova publicada, com o que foi medido de fato. */}
      <section className="rdv-proof-v3" aria-labelledby="proof-title">
        <div className="rdv-shell">
          <div>
            <header className="rdv-proof-v3__header">
              <div>
                <p className="rdv-kicker">Laudos publicados</p>
                <h2 id="proof-title">Métrica de vaidade morre. <em className="rdv-accent-serif">Métrica de negócio fica.</em></h2>
              </div>
              <p>
                Cada laudo abaixo foi medido por auditoria direta nas páginas em produção em {MEDICAO_REALIZADA_EM}.
                Onde ainda não existe instrumentação instalada, está escrito: nenhum resultado de negócio é afirmado
                sem medição.
              </p>
            </header>
          </div>

          <div className="rdv-project-stage" role="list">
            {PROJECTS.map((project, index) => (
              <div key={project.name} className="rdv-project-shot-wrap" role="listitem">
                <article
                  className={`rdv-project-shot${project.emphasis === 'flagship' ? ' is-flagship' : ''}`}
                >
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rdv-project-shot__link"
                    aria-label={`Abrir o site publicado de ${project.name} em nova aba`}
                    onClick={() => trackEvent('portfolio_open', { project: project.name, position: 'home-proof' })}
                  >
                    <div className="rdv-project-shot__media">
                      <img src={project.image} alt={`Interface publicada de ${project.name}`} loading={index === 0 ? 'eager' : 'lazy'} width="1200" height="750" />
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <em>Visitar projeto <ArrowRight aria-hidden="true" /></em>
                    </div>
                    <div className="rdv-project-shot__body">
                      <p>{project.type}</p>
                      <h3>{project.name}</h3>
                      <p>{project.detail}</p>
                    </div>
                  </a>
                </article>
              </div>
            ))}
          </div>

          <div className="rdv-home-otherwork" role="list">
            {OTHER_WORK.map((work) => (
              <div key={work.name} role="listitem">
                <a href={work.href} target="_blank" rel="noopener noreferrer" className="rdv-home-otherwork__item" onClick={() => trackEvent('portfolio_open', { project: work.name, position: 'home-proof' })}>
                  <span className="rdv-home-otherwork__media">
                    <img src={work.image} alt={`Interface publicada de ${work.name}`} width="1200" height="750" loading="lazy" />
                  </span>
                  <div>
                    <p>{work.type}</p>
                    <h3>{work.name}</h3>
                  </div>
                  <p>{work.detail}</p>
                </a>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] lg:grid-cols-3">
            {LAUDOS.map((laudo) => (
              <article key={laudo.projeto} className="bg-black/20 p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{laudo.metadata}</p>
                <h3 className="mt-3 font-serif text-2xl font-bold text-text-primary">{laudo.projeto}</h3>
                <p className="mt-4 text-sm leading-6 text-text-secondary">
                  <strong className="text-text-primary">Métrica de vaidade morta:</strong> {laudo.vaidade}
                </p>
                <p className="mt-3 text-sm leading-6 text-text-secondary">
                  <strong className="text-text-primary">Métrica de negócio salva:</strong> {laudo.negocio}
                </p>
                <ul className="mt-4 space-y-2">
                  {laudo.medido.map((linha) => (
                    <li key={linha} className="flex gap-2 text-sm leading-6 text-text-muted">
                      <span aria-hidden="true" className="text-gold">·</span>
                      {linha}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-text-muted">{laudo.depois}</p>
              </article>
            ))}
          </div>

          <div className="rdv-proof-v3__actions">
            <Link className="rdv-primary-action" to="/diagnostico?origem=home-projetos&estagio=triagem" onClick={() => trackEvent('diagnostic_start', { position: 'home-projetos', stage: 'triagem' })}>
              Quero a triagem do meu funil <ArrowRight aria-hidden="true" />
            </Link>
            <SwapLink to="/portfolio" swapLabel="Abrir o portfólio">
              Ver projetos reais
            </SwapLink>
            <SwapLink to="/demonstracoes" swapLabel="Ver arquiteturas em uso">
              Explorar arquiteturas demonstrativas
            </SwapLink>
          </div>
        </div>
      </section>

      <section className="rdv-platform-intro" aria-labelledby="platform-intro-title">
        <div className="rdv-shell rdv-platform-intro__grid">
          <header>
            <p className="rdv-kicker">Mapa de possibilidades</p>
            <h2 id="platform-intro-title">O próximo passo do seu negócio. <em className="rdv-accent-serif">Bem construído.</em></h2>
          </header>
          <div className="rdv-platform-intro__copy">
            <p>
              Site, loja, aplicativo, atendimento ou automação são partes do mesmo sistema: fazer o cliente encontrar,
              entender, escolher e continuar com você.
            </p>
            <Link className="rdv-text-action" to="/solucoes">
              Explorar todas as possibilidades <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <motion.div
          className="rdv-shell rdv-family-ledger"
          role="list"
          variants={staggerContainer}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {FAMILY_ORDER.map((family, index) => {
            const familyItems = MARKETPLACE_ITEMS.filter((item) => item.family === family);
            return (
              <motion.div key={family} variants={staggerItem} role="listitem">
                <Link
                  className="rdv-family-row"
                  to={`/solucoes?categoria=${family}`}
                  onClick={() => trackEvent('category_select', { category: family, position: 'home-map' })}
                >
                  <span className="rdv-family-row__index">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{FAMILY_LABELS[family]}</h3>
                    <p>{familyItems.map((item) => item.format).slice(0, 4).join(' · ')}</p>
                  </div>
                  <strong>{familyItems.length} possibilidades</strong>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <ConversionJourney />

      <section className="rdv-models" aria-labelledby="models-title">
        <div className="rdv-shell">
          <div>
            <header className="rdv-models__header">
              <p className="rdv-kicker">Formas de trabalhar</p>
              <h2 id="models-title">Um projeto individual. <em className="rdv-accent-serif">A continuidade</em> que fizer sentido.</h2>
              <p>O desenho, a copy, a estrutura e as integrações pertencem ao contexto do cliente. A assinatura existe para operar e evoluir — não para aprisionar o projeto.</p>
            </header>
          </div>

          <motion.div
            className="rdv-models__grid"
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {DELIVERY_MODELS.map((model, index) => (
              <motion.article key={model.id} variants={staggerItem}>
                <span>{String(index + 1).padStart(2, '0')} / {model.label}</span>
                <h3>{model.title}</h3>
                <p>{model.description}</p>
                <strong>{model.cadence}</strong>
              </motion.article>
            ))}
          </motion.div>

          <div>
            <Link className="rdv-primary-action" to="/planos">
              Comparar modelos de contratação <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="rdv-method-v3" aria-labelledby="method-title">
        <div className="rdv-shell rdv-method-v3__grid">
          <div>
            <header>
              <p className="rdv-kicker">Método Rei das Vendas</p>
              <h2 id="method-title">Da leitura à operação, sem pular a realidade do cliente.</h2>
              <p>Nossa missão é o sucesso digital do cliente — e isso exige publicar o que funciona, medir o que importa e manter alguém responsável pelo próximo passo.</p>
            </header>
          </div>
          <motion.ol
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {METHOD.map(([title, detail], index) => (
              <motion.li key={title} variants={staggerItem}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{title}</h3><p>{detail}</p></div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ESTEIRA — a escada de contratação, com o preço ancorado em resultado. */}
      <section id="triagem-paga" className="rdv-shell scroll-mt-28 py-20 sm:py-28" aria-labelledby="esteira-title">
        <header className="max-w-3xl">
          <p className="rdv-kicker">Esteira de contratação</p>
          <h2 id="esteira-title" className="mt-4 font-serif text-3xl font-bold leading-tight text-text-primary sm:text-5xl">
            O preço é ancorado no retorno. Não em hora, não em quantidade de página.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            Três pilares, nesta ordem: primeiro se mede, depois se constrói, depois se otimiza com dado. Não existe
            atalho entre eles, e nada é cobrado por quantidade de tela entregue.
          </p>
          <p className="mt-4 text-sm leading-6 text-text-muted">{ESTEIRA_RESUMO}</p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {PILARES.map((pilar) => (
            <article key={pilar.id} className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-7">
              <span className="font-serif text-sm text-gold" aria-hidden="true">{pilar.ordem}</span>
              <h3 className="mt-2 font-serif text-2xl font-bold text-text-primary">{pilar.nome}</h3>
              <p className="mt-3 font-serif text-xl font-bold text-gold-light">{pilar.faixa}</p>
              <p className="mt-3 text-sm leading-6 text-text-secondary">{pilar.resumo}</p>
              <ul className="mt-5 space-y-2">
                {pilar.escopo.map((linha) => (
                  <li key={linha} className="flex gap-2 text-sm leading-6 text-text-secondary">
                    <span aria-hidden="true" className="text-gold">·</span>
                    {linha}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-5 text-text-muted">Prazo: {pilar.prazo}</p>
              <p className="mt-3 border-t border-white/10 pt-4 text-sm leading-6 text-text-primary">{pilar.ancoragem}</p>
              <p className="mt-4 text-xs leading-5 text-text-muted">{pilar.funcao}</p>
              <Link
                className="rdv-primary-action mt-6 self-start"
                to={`/diagnostico?origem=home-esteira-${pilar.id}&estagio=triagem`}
                onClick={() => trackEvent('diagnostic_start', { position: `home-esteira-${pilar.id}`, stage: 'triagem' })}
              >
                Solicitar triagem <ArrowRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        {/* Quebra de objeção do diagnóstico remunerado — a fonte também alimenta o HTML pré-renderizado. */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-10">
          <h3 className="font-serif text-2xl font-bold text-text-primary">Por que o diagnóstico é pago</h3>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            {HOME_FAQS.map((item) => (
              <div key={item.question}>
                <dt className="text-sm font-semibold text-text-primary">{item.question}</dt>
                <dd className="mt-2 text-sm leading-6 text-text-secondary">{item.answer}</dd>
              </div>
            ))}
          </dl>
          <Link className="rdv-text-action mt-8 inline-flex" to="/planos">
            Ver a tabela de execução vigente (implantação e assinatura) <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* LIMITE DE ESCOPO — quem não se reconhece aqui não deve contratar. */}
      <section className="rdv-method-v3" aria-labelledby="tradeoff-title">
        <div className="rdv-shell rdv-method-v3__grid">
          <div>
            <header>
              <p className="rdv-kicker">Limite de escopo</p>
              <h2 id="tradeoff-title">Quatro perfis não são clientes desta casa.</h2>
              <p>Recusar trabalho é parte do método: escopo errado produz entrega bonita e resultado nenhum.</p>
            </header>
          </div>
          <motion.ol
            variants={staggerContainer}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {TRADE_OFF.map((item) => (
              <motion.li key={item.titulo} variants={staggerItem}>
                <span>{item.ordem}</span>
                <div><h3>{item.titulo}</h3><p>{item.detalhe}</p></div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section className="rdv-closing-v3" aria-labelledby="closing-title">
        <div className="rdv-shell rdv-closing-v3__content">
          <div>
            <p className="rdv-kicker">O primeiro movimento</p>
            <h2 id="closing-title">Antes de construir, <em className="rdv-accent-serif">meça o vazamento</em>.</h2>
            <p>
              A triagem registra objetivo, gargalo e prioridade em números. Nenhuma conversa comercial começa antes de
              o laudo existir.
            </p>
          </div>
          <div className="rdv-closing-v3__actions">
            <div>
              <Link
                className="rdv-primary-action"
                to="/diagnostico?origem=home-final&estagio=triagem"
                onClick={() => trackEvent('diagnostic_start', { position: 'home-final', stage: 'triagem' })}
              >
                Solicitar triagem clínica <ArrowRight aria-hidden="true" />
              </Link>
              <Link className="rdv-text-action" to="/planos">
                Ver esteira, escopo e prazos
              </Link>
            </div>
          </div>
          <div>
            <p className="rdv-closing-v3__footnote">
              Quatro triagens por mês. O laudo é seu, creditado integralmente no Setup se você aprovar a execução.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
