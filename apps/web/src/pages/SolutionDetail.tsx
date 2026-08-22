import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { GrowthClosing, GrowthFaq, GrowthHero, GrowthSectionTitle } from '@/components/GrowthShell';
import { diagnosticUrl, trackEvent } from '@/lib/analytics';
import { LOCAL_BY_SLUG, SOLUTION_BY_SLUG } from '@/lib/growth';
import NotFound from '@/pages/NotFound';

export default function SolutionDetail() {
  const { slug = '' } = useParams();
  const locationPage = LOCAL_BY_SLUG.get(slug);
  const solution = SOLUTION_BY_SLUG.get(locationPage?.solution || slug);

  if (!solution) return <NotFound />;

  const pageTitle = locationPage?.title || solution.title;
  const pageDescription = locationPage?.context || solution.summary;

  return (
    <main className="ge-page" id="main-content">
      <GrowthHero
        label={`${solution.category}${locationPage ? ` · ${locationPage.city}` : ''}`}
        title={pageTitle}
        description={pageDescription}
        solution={solution.slug}
        secondary={solution.demonstration ? { label: 'Abrir arquitetura demonstrativa', to: `/demonstracoes/${solution.demonstration}` } : undefined}
      />

      <section className="ge-section">
        <div className="ge-shell ge-two-columns">
          <GrowthSectionTitle label="Leitura operacional" title="O gargalo vem antes da solução." description={solution.pain} />
          <div>
            <article className="ge-issue"><span>Perfil atendido</span><h3>Para quem esta arquitetura faz sentido.</h3><p>{solution.audience}</p></article>
            <article className="ge-issue"><span>Direção comercial</span><h3>O que precisa mudar na jornada.</h3><p>{solution.outcome}</p></article>
            {locationPage ? (
              <article className="ge-issue"><span>Contexto local · {locationPage.city}</span><h3>Prioridades desta intenção.</h3><ul className="ge-checklist">{locationPage.priorities.map((priority) => <li key={priority}><Check size={15} aria-hidden="true" />{priority}</li>)}</ul></article>
            ) : null}
          </div>
        </div>
      </section>

      <section className="ge-section ge-section-muted">
        <div className="ge-shell">
          <GrowthSectionTitle label="Arquitetura da solução" title="Cada camada precisa justificar sua existência." description="A composição é definida no diagnóstico. Os elementos abaixo representam possibilidades coerentes com este tipo de operação." />
          <div className="ge-architecture">
            {solution.architecture.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}
          </div>
        </div>
      </section>

      {solution.demonstration ? (
        <section className="ge-section"><div className="ge-shell"><div className="ge-demo-promo"><img src={solution.image} alt="" width="960" height="640" loading="lazy" /><div className="ge-demo-caption"><span>Arquitetura demonstrativa</span><h3>Explore a experiência antes de discutir implementação.</h3><p>Demonstração interativa com dados fictícios, identificada como referência de solução.</p><Link className="ge-link" to={`/demonstracoes/${solution.demonstration}`} onClick={() => trackEvent('product_view', { service: solution.slug, demonstration: solution.demonstration })}>Abrir demonstração <ArrowRight size={16} aria-hidden="true" /></Link></div></div></div></section>
      ) : null}

      <section className="ge-section"><div className="ge-shell"><GrowthSectionTitle label="Arquiteturas relacionadas" title="O contexto define a próxima camada." /><div className="ge-inline-grid">{solution.related.map((relatedSlug) => { const related = SOLUTION_BY_SLUG.get(relatedSlug); return related ? <Link className="ge-inline-card" key={related.slug} to={`/solucoes/${related.slug}`} onClick={() => trackEvent('category_select', { service: related.slug, origin: solution.slug })}><span>{related.category}</span><h3>{related.title}</h3><p>{related.summary}</p></Link> : null; })}</div><div className="ge-actions"><Link className="ge-button" to={diagnosticUrl(solution.slug, 'solution-related')}>Mapear minha operação <ArrowRight size={17} aria-hidden="true" /></Link></div></div></section>

      <GrowthFaq questions={solution.questions} />
      <GrowthClosing solution={solution.slug} />
    </main>
  );
}
