import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';

// A jornada do cliente, contada do jeito que o dono de negócio entende.
const JOURNEY = [
  ['01', 'Acha', 'A pessoa te procura no Google, no mapa ou por indicação.'],
  ['02', 'Entende', 'Em segundos ela sabe o que você faz e por que escolher você.'],
  ['03', 'Chama', 'Um toque e ela cai no seu WhatsApp com o contexto certo.'],
  ['04', 'Fecha', 'A venda sai porque nada se perdeu no caminho.'],
];

const METHOD = [
  ['Leitura', 'A gente olha onde seu negócio aparece hoje e o que está te custando cliente.'],
  ['Corte', 'Achamos o problema que mais dói e atacamos ele primeiro.'],
  ['Construção', 'Montamos a peça certa: página, catálogo, sistema ou automação.'],
  ['Operação', 'Publicamos, medimos e deixamos você no comando.'],
];

const PROJECTS = [
  { name: 'Sentinela Saúde Ambiental', type: 'Dedetizadora · Franca/SP', detail: 'Diagnóstico antes da aplicação e orçamento direto no WhatsApp.', image: '/imagens/portfolio/sentinela.webp' },
  { name: 'Drogalar', type: 'Rede de farmácias', detail: 'Sete lojas, convênios e busca integrada no mesmo endereço.', image: '/imagens/portfolio/drogalar.webp' },
  { name: 'TKA Esportes', type: 'Loja de artigos esportivos', detail: 'E-commerce com 30 anos de história e catálogo por categoria.', image: '/imagens/portfolio/tka-esportes.webp' },
  { name: 'Keeus', type: 'Chinelos premium', detail: 'Loja de chinelos com foco em tamanho certo e compra consciente.', image: '/imagens/portfolio/keeus.webp' },
];

const DECISIONS = [
  ['Você não aparece no Google', 'A gente acerta o básico local: páginas úteis, endereço certo, estrutura que o Google entende.'],
  ['Quem chega não entende o que você faz', 'Organizamos a página pra responder na hora o que você vende e por que escolher você.'],
  ['O contato chega sem contexto', 'Diagnóstico curto, origem preservada e encaminhamento certo.'],
  ['O retorno se perde', 'Integração, responsável definido e acompanhamento.'],
];

export default function Home() {
  const { t } = useI18n();
  return (
    <main id="main-content" className="rdv-dossier">
      <section className="rdv-hero" aria-labelledby="home-title">
        <div className="rdv-shell rdv-hero__grid">
          <div className="rdv-hero__copy">
            <p className="rdv-kicker">{t('hero.kicker')}</p>
            <h1 id="home-title">
              {t('hero.title.1')} {t('hero.title.2')}{" "}
              <span className="rdv-hero__highlight">{t('hero.title.3')}</span>
            </h1>
            <p className="rdv-lede">{t('hero.lede')}</p>
            <div className="rdv-hero__actions">
              <Link
                className="rdv-primary-action"
                to="/diagnostico"
                onClick={() => trackEvent('diagnostic_start', { position: 'home-hero' })}
              >
                {t('hero.cta')} <ArrowRight aria-hidden="true" />
              </Link>
              <a className="rdv-hero__ghost" href="#como-funciona">
                {t('hero.cta.secondary')}
              </a>
            </div>
          </div>

          <aside className="rdv-decision-map" aria-labelledby="decision-map-title">
            <div className="rdv-decision-map__head">
              <p>Onde o cliente some</p>
              <span>RDV / 01</span>
            </div>
            <h2 id="decision-map-title">Da busca à venda, sem perder ninguém no caminho.</h2>
            <ol>
              {JOURNEY.map(([number, title, detail]) => (
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
          <div><strong>{t('stats.verticals.value')}</strong><span>{t('stats.verticals.label')}</span></div>
          <div><strong>{t('stats.whatsapp.value')}</strong><span>{t('stats.whatsapp.label')}</span></div>
          <div><strong>{t('stats.radius.value')}</strong><span>{t('stats.radius.label')}</span></div>
        </div>
      </section>

      <section className="rdv-thesis" aria-label="Princípio de trabalho">
        <div className="rdv-shell">
          <p>Site bonito não paga conta. Site que aparece e responde rápido, paga.</p>
          <span>Diagnóstico antes de escopo</span>
        </div>
      </section>

      <section className="rdv-method" id="como-funciona" aria-labelledby="method-title">
        <div className="rdv-shell">
          <header className="rdv-section-intro">
            <p className="rdv-kicker">Como funciona</p>
            <h2 id="method-title">Sem enrolação. Quatro passos e o site tá no ar.</h2>
            <p>Nada de reunião infinita. A gente entende o problema, ataca o que dói e publica.</p>
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
            <p className="rdv-kicker">O que já fizemos</p>
            <h2 id="proof-title">Cada projeto é um problema diferente. Nada de template reusado.</h2>
          </header>
          <div className="rdv-project-grid" role="list">
            {PROJECTS.map((p) => (
              <article key={p.name} role="listitem" className="rdv-project-card">
                <img
                  src={p.image}
                  alt={`Site de ${p.name}`}
                  loading="lazy"
                  width="1200"
                  height="750"
                />
                <div className="rdv-project-card__body">
                  <p className="rdv-project-card__type">{p.type}</p>
                  <h3>{p.name}</h3>
                  <p>{p.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rdv-decisions" aria-labelledby="decisions-title">
        <div className="rdv-shell">
          <header className="rdv-section-intro rdv-section-intro--compact">
            <p className="rdv-kicker">Onde a gente resolve</p>
            <h2 id="decisions-title">Tecnologia vem depois. Primeiro a gente entende o problema.</h2>
          </header>
          <div className="rdv-decision-table">
            <div className="rdv-decision-table__head" aria-hidden="true">
              <span>Seu gargalo</span>
              <span>O que a gente faz</span>
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
            <h2 id="closing-title">Mostra onde você está perdendo cliente.</h2>
          </div>
          <div>
            <p>O diagnóstico junta contexto, prioridade e faixa de investimento antes de abrir o WhatsApp.</p>
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
