import { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';
import { DEMONSTRATIONS } from '@/lib/growth';
import {
  FAMILY_LABELS,
  MARKETPLACE_ITEMS,
  type SolutionFamily,
} from '@/lib/marketplace';

type Filter = 'todas' | SolutionFamily;

const FILTERS: Filter[] = [
  'todas',
  'presenca',
  'comercio',
  'atendimento',
  'produto',
  'distribuicao',
  'operacao',
];

const FOUNDATION = [
  ['Estratégia', 'Objetivo, público, oferta, jornada e corte comercial antes da interface.'],
  ['Identidade', 'Direção visual, copy e sistema de componentes próprios para o negócio.'],
  ['Engenharia', 'Código, dados, integrações e estados de falha dimensionados ao projeto.'],
  ['Distribuição', 'Busca, canais, campanhas e conteúdo conectados ao destino adequado.'],
  ['Medição', 'Eventos úteis, consentimento e leitura do funil sem números decorativos.'],
  ['Continuidade', 'Domínio, acessos, publicação, segurança e responsabilidade documentados.'],
];

export default function Solucoes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialFamily = searchParams.get('categoria');
  const [activeFilter, setActiveFilter] = useState<Filter>(
    FILTERS.includes(initialFamily as Filter) ? (initialFamily as Filter) : 'todas',
  );
  const [query, setQuery] = useState('');

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
    return MARKETPLACE_ITEMS.filter((item) => {
      const matchesFamily = activeFilter === 'todas' || item.family === activeFilter;
      const matchesQuery = !normalizedQuery || [item.title, item.description, item.format, item.outcome]
        .join(' ')
        .toLocaleLowerCase('pt-BR')
        .includes(normalizedQuery);
      return matchesFamily && matchesQuery;
    });
  }, [activeFilter, query]);

  const selectFilter = (filter: Filter) => {
    setActiveFilter(filter);
    if (filter === 'todas') setSearchParams({}, { replace: true });
    else setSearchParams({ categoria: filter }, { replace: true });
    trackEvent('category_select', { category: filter, position: 'solution-marketplace' });
  };

  return (
    <main id="main-content" className="rdv-marketplace">
      <header className="rdv-marketplace__hero">
        <div className="rdv-shell">
          <p className="rdv-kicker">Vitrine de soluções</p>
          <h1>Pare de perder cliente para quem já resolveu o site.</h1>
          <p>
            Clínica, consultório, loja ou prestador de serviço: em segundos, quem pesquisa decide quem parece
            confiável — e quem nem aparece. Escolha o resultado que seu negócio precisa agora; a implementação
            continua individual, sob medida.
          </p>
          <div className="rdv-marketplace__hero-actions">
            <a href="#catalogo" className="rdv-primary-action">Explorar catálogo <ArrowRight aria-hidden="true" /></a>
            <Link to="/diagnostico?origem=marketplace-hero" className="rdv-marketplace__secondary">Ainda não sei o que preciso <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </header>

      <section id="catalogo" className="rdv-marketplace__catalog" aria-labelledby="catalog-title">
        <div className="rdv-shell">
          <div className="rdv-marketplace__controls">
            <div>
              <p className="rdv-kicker">24 caminhos possíveis</p>
              <h2 id="catalog-title">Filtre por objetivo.</h2>
            </div>
            <label className="rdv-marketplace__search">
              <Search aria-hidden="true" />
              <span className="sr-only">Buscar solução</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ex.: vender online, agendar, automatizar"
              />
            </label>
          </div>

          <div className="rdv-marketplace__filters" role="group" aria-label="Filtrar soluções por categoria">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? 'is-active' : ''}
                aria-pressed={activeFilter === filter}
                onClick={() => selectFilter(filter)}
              >
                {filter === 'todas' ? 'Todas' : FAMILY_LABELS[filter]}
              </button>
            ))}
          </div>

          <p className="rdv-marketplace__result" aria-live="polite">
            {visibleItems.length} {visibleItems.length === 1 ? 'possibilidade encontrada' : 'possibilidades encontradas'}
          </p>

          {visibleItems.length ? (
            <div className="rdv-marketplace__grid" role="list">
              {visibleItems.map((item, index) => (
                <article key={`${item.title}-${item.family}`} role="listitem" className="rdv-market-card">
                  <div className="rdv-market-card__top">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{item.format}</p>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <dl>
                    <div><dt>Objetivo</dt><dd>{item.outcome}</dd></div>
                    <div><dt>Modelo</dt><dd>Projeto individual ou evolução contínua</dd></div>
                  </dl>
                  <Link
                    to={`/solucoes/${item.solution}`}
                    onClick={() => trackEvent('solution_open', { solution: item.solution, source: 'marketplace' })}
                  >
                    Configurar esta solução <ArrowRight aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="rdv-marketplace__empty">
              <h3>Nenhuma solução recebeu esse nome.</h3>
              <p>Descreva o resultado no diagnóstico. A recomendação não depende de uma categoria pronta.</p>
              <Link className="rdv-primary-action" to="/diagnostico?origem=marketplace-busca">Descrever meu problema <ArrowRight aria-hidden="true" /></Link>
            </div>
          )}
        </div>
      </section>

      <section className="rdv-marketplace__foundation" aria-labelledby="foundation-title">
        <div className="rdv-shell">
          <header>
            <p className="rdv-kicker">O que acompanha a solução</p>
            <h2 id="foundation-title">O digital funciona como sistema, não como arquivo entregue.</h2>
          </header>
          <ol>
            {FOUNDATION.map(([title, detail], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rdv-marketplace__demos" aria-labelledby="demos-title">
        <div className="rdv-shell">
          <header>
            <div>
              <p className="rdv-kicker">Arquiteturas demonstrativas</p>
              <h2 id="demos-title">Veja a jornada antes de discutir a ferramenta.</h2>
            </div>
            <p>Demonstrações usam dados fictícios identificados. Elas mostram possibilidades de experiência, não projetos de clientes nem templates para revenda.</p>
          </header>
          <div>
            {DEMONSTRATIONS.map((demo, index) => (
              <Link key={demo.slug} to={`/demonstracoes/${demo.slug}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><p>{demo.segment}</p><h3>{demo.title}</h3></div>
                <p>{demo.description}</p>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rdv-marketplace__closing" aria-labelledby="marketplace-closing-title">
        <div className="rdv-shell">
          <p className="rdv-kicker">Projeto individual</p>
          <h2 id="marketplace-closing-title">Parta de uma possibilidade. Termine com algo que só faz sentido para o seu negócio.</h2>
          <div>
            <Link className="rdv-primary-action" to="/diagnostico?origem=marketplace-final" onClick={() => trackEvent('diagnostic_start', { position: 'marketplace-final' })}>
              Configurar meu projeto <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="rdv-marketplace__secondary" to="/planos">Ver formas de contratação <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
