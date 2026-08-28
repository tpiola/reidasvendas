import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { DELIVERY_MODELS } from '@/lib/marketplace';

const DELIVERIES = [
  ['Presença', 'Site institucional, landing page, portfólio ou arquitetura de conteúdo.'],
  ['Comércio', 'E-commerce, catálogo, pedido, pagamento e canais de aquisição.'],
  ['Produto', 'Aplicativo, SaaS, portal, área do cliente ou sistema sob medida.'],
  ['Automação', 'Qualificação, recepção comercial, integrações e rotinas digitais.'],
];

const CONTINUITY = [
  ['Base operacional', 'Hospedagem, segurança, monitoramento, backup e atualizações.'],
  ['Crescimento', 'Base + SEO, conteúdo prioritário, analytics e CRO.'],
  ['Capilaridade', 'Crescimento + evolução de canais, campanhas e páginas de aquisição.'],
  ['Produto contínuo', 'Releases, observabilidade e evolução de aplicativos, SaaS ou sistemas.'],
];

const PRINCIPLES = [
  'Cada proposta identifica o que está incluído, o que depende do cliente e o que é opcional.',
  'Mídia paga, licenças e serviços de terceiros aparecem separados do trabalho do Rei das Vendas.',
  'Domínio, código, acessos, dados e continuidade são definidos antes do início.',
  'Nenhum pacote promete ranking, volume de vendas ou prazo incompatível com o escopo.',
];

export default function Planos() {
  return (
    <main id="main-content" className="rdv-offers">
      <header className="rdv-offers__hero">
        <div className="rdv-shell">
          <p className="rdv-kicker">Modelos de contratação</p>
          <h1>Projeto individual. Investimento explicável.</h1>
          <p>
            Você pode contratar uma entrega com escopo fechado, manter a operação acompanhada ou criar um ciclo
            contínuo de crescimento. A recomendação depende do problema e da capacidade real de execução.
          </p>
          <Link className="rdv-primary-action" to="/diagnostico?origem=planos-hero" onClick={() => trackEvent('diagnostic_start', { position: 'plans-hero' })}>
            Solicitar análise <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </header>

      <section className="rdv-offers__models" aria-labelledby="offer-models-title">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">Três relações possíveis</p>
            <h2 id="offer-models-title">Comece com o nível de responsabilidade que o momento exige.</h2>
          </header>
          <div>
            {DELIVERY_MODELS.map((model, index) => (
              <article key={model.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{model.label}</p>
                <h3>{model.title}</h3>
                <p>{model.description}</p>
                <strong>{model.cadence}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rdv-offers__comparison" aria-labelledby="offer-comparison-title">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">Entrega ou assinatura</p>
            <h2 id="offer-comparison-title">O que muda em cada modelo.</h2>
          </header>
          <div className="rdv-offers__columns">
            <article>
              <span>Entrega individual</span>
              <h3>Construir e publicar uma prioridade.</h3>
              <ul>{DELIVERIES.map(([title, detail]) => <li key={title}><strong>{title}</strong><p>{detail}</p></li>)}</ul>
            </article>
            <article>
              <span>Operação contínua</span>
              <h3>Manter e evoluir uma base já publicada.</h3>
              <ul>{CONTINUITY.map(([title, detail]) => <li key={title}><strong>{title}</strong><p>{detail}</p></li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      <section className="rdv-offers__principles" aria-labelledby="offer-principles-title">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">Proposta sem surpresa</p>
            <h2 id="offer-principles-title">Quatro regras antes de falar em valor.</h2>
          </header>
          <ol>
            {PRINCIPLES.map((principle, index) => (
              <li key={principle}><span>{String(index + 1).padStart(2, '0')}</span><p>{principle}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rdv-offers__closing" aria-labelledby="offers-closing-title">
        <div className="rdv-shell">
          <p className="rdv-kicker">Próxima decisão</p>
          <h2 id="offers-closing-title">O investimento só faz sentido depois que o corte está claro.</h2>
          <p>O diagnóstico leva poucos minutos e registra o contexto antes da conversa. Nenhuma contratação acontece automaticamente.</p>
          <div>
            <Link className="rdv-primary-action" to="/diagnostico?origem=planos-final" onClick={() => trackEvent('diagnostic_start', { position: 'plans-final' })}>
              Preparar meu diagnóstico <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="rdv-offers__secondary" to="/solucoes">Voltar às possibilidades <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
