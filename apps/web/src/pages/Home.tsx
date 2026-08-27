import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';

const DECISION_STAGES = [
  ['01', 'Encontro', 'Busca, indicação, mapa ou campanha levam a pessoa ao lugar certo.'],
  ['02', 'Entendimento', 'Oferta, recorte e prova respondem por que avançar.'],
  ['03', 'Ação', 'O próximo passo pede apenas o contexto necessário.'],
  ['04', 'Continuidade', 'Origem e intenção acompanham o contato até o atendimento.'],
];

const METHOD = [
  ['Leitura', 'Reunimos domínio, canais, oferta, atendimento e dados disponíveis.'],
  ['Corte', 'Localizamos a perda que merece ser resolvida antes das demais.'],
  ['Construção', 'Escolhemos a peça compatível: página, catálogo, sistema ou automação.'],
  ['Operação', 'Publicamos, medimos e deixamos responsáveis, acessos e retorno definidos.'],
];

const PROJECTS = [
  ['SaúdeGPT', 'Produto conversacional', 'Conteúdo sensível, navegação guiada e postura institucional.'],
  ['Sentinela Saúde Ambiental', 'Presença de serviço local', 'Serviços, áreas atendidas e caminho de orçamento organizados no mesmo endereço.'],
  ['Thiago Piola', 'Presença autoral', 'Trajetória, repertório e serviços articulados em uma narrativa própria.'],
];

const DECISIONS = [
  ['A empresa não é encontrada', 'Consistência local, páginas úteis e base técnica rastreável.'],
  ['A oferta não é entendida', 'Arquitetura de informação, linguagem e prova verificável.'],
  ['O contato chega sem contexto', 'Diagnóstico curto, origem preservada e encaminhamento claro.'],
  ['O retorno se perde', 'Integração, responsável e sequência de acompanhamento.'],
];

export default function Home() {
  return (
    <main id="main-content" className="rdv-dossier">
      <section className="rdv-hero" aria-labelledby="home-title">
        <div className="rdv-shell rdv-hero__grid">
          <div className="rdv-hero__copy">
            <p className="rdv-kicker">Projetos digitais · Franca, SP</p>
            <h1 id="home-title">Antes de pedir outro site, descubra onde a venda está quebrando.</h1>
            <p className="rdv-lede">
              Mapeamos como a pessoa encontra, entende e aciona seu negócio. Depois decidimos o que precisa ser construído — site, catálogo, sistema ou automação.
            </p>
            <Link
              className="rdv-primary-action"
              to="/diagnostico"
              onClick={() => trackEvent('diagnostic_start', { position: 'home-hero' })}
            >
              Abrir diagnóstico <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <aside className="rdv-decision-map" aria-labelledby="decision-map-title">
            <div className="rdv-decision-map__head">
              <p>Mapa de uma decisão comercial</p>
              <span>RDV / 01</span>
            </div>
            <h2 id="decision-map-title">O fio não pode se romper entre a busca e a conversa.</h2>
            <ol>
              {DECISION_STAGES.map(([number, title, detail]) => (
                <li key={number}>
                  <h3><span>{number}</span>{title}</h3>
                  <p>{detail}</p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="rdv-hero-stats" aria-label="Números do Rei das Vendas">
        <div className="rdv-shell rdv-hero-stats__grid">
          <div><strong>13</strong><span>verticais e soluções</span></div>
          <div><strong>24h</strong><span>canal de WhatsApp</span></div>
          <div><strong>40</strong><span>km raio de atuação</span></div>
        </div>
      </section>

      <section className="rdv-thesis" aria-label="Princípio de trabalho">
        <div className="rdv-shell">
          <p>O site só entra quando resolve um corte real da operação.</p>
          <span>Diagnóstico antes de escopo</span>
        </div>
      </section>

      <section className="rdv-method" aria-labelledby="method-title">
        <div className="rdv-shell">
          <header className="rdv-section-intro">
            <h2 id="method-title">Uma sequência com começo, responsável e critério de saída.</h2>
            <p>Sem catálogo empurrado antes de entender a restrição comercial, técnica e operacional.</p>
          </header>
          <ol className="rdv-workflow">
            {METHOD.map(([title, detail], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rdv-proof" aria-labelledby="proof-title">
        <div className="rdv-shell">
          <header className="rdv-section-intro rdv-section-intro--compact">
            <h2 id="proof-title">Três problemas diferentes. Nenhuma embalagem reaproveitada.</h2>
          </header>
          <div className="rdv-project-ledger" role="list">
            {PROJECTS.map(([name, type, detail]) => (
              <article key={name} role="listitem">
                <h3>{name}</h3>
                <p className="rdv-project-ledger__type">{type}</p>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rdv-decisions" aria-labelledby="decisions-title">
        <div className="rdv-shell">
          <header className="rdv-section-intro rdv-section-intro--compact">
            <h2 id="decisions-title">Tecnologia é consequência da leitura.</h2>
          </header>
          <div className="rdv-decision-table">
            <div className="rdv-decision-table__head" aria-hidden="true">
              <span>Gargalo observado</span>
              <span>Decisão de projeto</span>
            </div>
            {DECISIONS.map(([problem, response]) => (
              <div className="rdv-decision-table__row" key={problem}>
                <h3>{problem}</h3>
                <p>{response}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rdv-closing" aria-labelledby="closing-title">
        <div className="rdv-shell rdv-closing__grid">
          <div>
            <p className="rdv-kicker">O primeiro passo</p>
            <h2 id="closing-title">Mostre onde a operação perde o fio.</h2>
          </div>
          <div>
            <p>O diagnóstico reúne contexto, prioridade e faixa de investimento antes de abrir o WhatsApp.</p>
            <Link
              className="rdv-primary-action"
              to="/diagnostico"
              onClick={() => trackEvent('diagnostic_start', { position: 'home-closing' })}
            >
              Começar agora <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
