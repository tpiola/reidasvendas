import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import { trackEvent } from '@/lib/analytics';
import { BRAND } from '@/lib/brand';
import {
  ACQUISITION_CHANNELS,
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
    emphasis: 'flagship',
  },
  {
    name: 'TKA Esportes',
    type: 'Comércio · e-commerce',
    detail: 'Trinta anos de história transformados em catálogo por categoria e experiência de compra.',
    image: '/imagens/portfolio/tka-esportes.webp',
    emphasis: 'standard',
  },
  {
    name: 'Keeus',
    type: 'Marca · e-commerce',
    detail: 'Produto, tamanho e compra consciente organizados em uma presença comercial própria.',
    image: '/imagens/portfolio/keeus.webp',
    emphasis: 'standard',
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
  return (
    <main id="main-content" className="rdv-platform">
      <Hero />

      <section className="rdv-motion-rail" aria-label="Capacidades digitais">
        <div className="rdv-motion-rail__track">
          {[...MARKETPLACE_ITEMS.slice(0, 12), ...MARKETPLACE_ITEMS.slice(0, 12)].map((item, index) => (
            <span key={`${item.title}-${index}`} aria-hidden={index >= 12 ? 'true' : undefined}>
              {item.title}
            </span>
          ))}
        </div>
      </section>

      <section className="rdv-platform-intro" aria-labelledby="platform-intro-title">
        <div className="rdv-shell rdv-platform-intro__grid">
          <header>
            <p className="rdv-kicker">Mapa de possibilidades</p>
            <h2 id="platform-intro-title">Não vendemos uma página. Construímos o que o seu negócio precisa para avançar.</h2>
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

        <div className="rdv-shell rdv-family-ledger" role="list">
          {FAMILY_ORDER.map((family, index) => {
            const familyItems = MARKETPLACE_ITEMS.filter((item) => item.family === family);
            return (
              <Link
                key={family}
                role="listitem"
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
            );
          })}
        </div>
      </section>

      <section className="rdv-distribution" aria-labelledby="distribution-title">
        <div className="rdv-shell rdv-distribution__grid">
          <header>
            <p className="rdv-kicker">Capilaridade com direção</p>
            <h2 id="distribution-title">Um núcleo próprio. Vários caminhos até ele.</h2>
            <p>
              A presença central organiza a oferta. Cada canal recebe a mensagem, a página e a próxima ação adequadas
              à intenção de quem chegou.
            </p>
            <Link className="rdv-primary-action" to="/solucoes/distribuicao-multicanal">
              Ver arquitetura multicanal <ArrowRight aria-hidden="true" />
            </Link>
          </header>

          <div className="rdv-channel-map" aria-label="Canais conectáveis ao núcleo digital">
            <div className="rdv-channel-map__core">
              <span>Seu negócio</span>
              <strong>Oferta · dados · atendimento</strong>
            </div>
            <div className="rdv-channel-map__orbit">
              {ACQUISITION_CHANNELS.map((channel, index) => (
                <span key={channel} style={{ '--channel-index': index } as CSSProperties}>{channel}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rdv-proof-v3" aria-labelledby="proof-title">
        <div className="rdv-shell">
          <header className="rdv-proof-v3__header">
            <div>
              <p className="rdv-kicker">Projetos publicados</p>
              <h2 id="proof-title">Prova em tela. Sem número inventado.</h2>
            </div>
            <p>Cada projeto responde a uma operação diferente. A evidência é o produto publicado, a arquitetura e o que ele realmente organiza.</p>
          </header>

          <div className="rdv-project-stage" role="list">
            {PROJECTS.map((project, index) => (
              <article
                key={project.name}
                role="listitem"
                className={`rdv-project-shot${project.emphasis === 'flagship' ? ' is-flagship' : ''}`}
              >
                <div className="rdv-project-shot__media">
                  <img src={project.image} alt={`Interface publicada de ${project.name}`} loading={index === 0 ? 'eager' : 'lazy'} width="1200" height="750" />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="rdv-project-shot__body">
                  <p>{project.type}</p>
                  <h3>{project.name}</h3>
                  <p>{project.detail}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="rdv-proof-v3__actions">
            <Link className="rdv-text-action" to="/portfolio">Ver projetos reais <ArrowRight aria-hidden="true" /></Link>
            <Link className="rdv-text-action" to="/demonstracoes">Explorar arquiteturas demonstrativas <ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="rdv-models" aria-labelledby="models-title">
        <div className="rdv-shell">
          <header className="rdv-models__header">
            <p className="rdv-kicker">Formas de trabalhar</p>
            <h2 id="models-title">Um projeto individual. A continuidade que fizer sentido.</h2>
            <p>O desenho, a copy, a estrutura e as integrações pertencem ao contexto do cliente. A assinatura existe para operar e evoluir — não para aprisionar o projeto.</p>
          </header>

          <div className="rdv-models__grid">
            {DELIVERY_MODELS.map((model, index) => (
              <article key={model.id}>
                <span>{String(index + 1).padStart(2, '0')} / {model.label}</span>
                <h3>{model.title}</h3>
                <p>{model.description}</p>
                <strong>{model.cadence}</strong>
              </article>
            ))}
          </div>

          <Link className="rdv-primary-action" to="/planos">
            Comparar modelos de contratação <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="rdv-method-v3" aria-labelledby="method-title">
        <div className="rdv-shell rdv-method-v3__grid">
          <header>
            <p className="rdv-kicker">Método Rei das Vendas</p>
            <h2 id="method-title">Da leitura à operação, sem pular a realidade do cliente.</h2>
            <p>Nossa missão é o sucesso digital do cliente — e isso exige publicar o que funciona, medir o que importa e manter alguém responsável pelo próximo passo.</p>
          </header>
          <ol>
            {METHOD.map(([title, detail], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{title}</h3><p>{detail}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rdv-closing-v3" aria-labelledby="closing-title">
        <div className="rdv-shell">
          <p className="rdv-kicker">O primeiro movimento</p>
          <h2 id="closing-title">Mostre seu negócio. A gente devolve uma direção.</h2>
          <p>O diagnóstico registra objetivo, gargalo e prioridade antes de abrir o WhatsApp. Sem proposta genérica e sem compromisso automático.</p>
          <div>
            <Link
              className="rdv-primary-action"
              to="/diagnostico?origem=home-final"
              onClick={() => trackEvent('diagnostic_start', { position: 'home-final' })}
            >
              Mapear meu negócio <ArrowRight aria-hidden="true" />
            </Link>
            <a className="rdv-whatsapp-action" href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { position: 'home-final' })}>
              WhatsApp · {BRAND.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
