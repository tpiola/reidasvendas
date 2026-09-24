import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GrowthClosing, GrowthHero, GrowthSectionTitle } from '@/components/GrowthShell';
import { trackEvent } from '@/lib/analytics';
import { DEMONSTRATIONS, SOLUTION_BY_SLUG, type Solution } from '@/lib/growth';

// Cada demonstração existe porque uma solução real precisa resolver um problema diferente.
const SOLUTION_PATHS: Record<string, string> = {
  'site-para-clinicas': '/solucoes/site-para-clinicas',
  'site-para-restaurantes': '/solucoes/site-para-restaurantes',
  'catalogo-para-representantes': '/solucoes/catalogo-para-representantes',
  'site-para-imobiliarias': '/solucoes/site-para-imobiliarias',
};

const DEMO_SOLUTIONS = [...new Set(DEMONSTRATIONS.map((demo) => demo.solution))]
  .map((slug) => SOLUTION_BY_SLUG.get(slug))
  .filter((solution): solution is Solution => Boolean(solution));

export default function Demonstrations() {
  return <main className="ge-page" id="main-content"><GrowthHero label="Biblioteca de arquiteturas" title="Veja a solução funcionando antes de imaginar o projeto." description="Experiências interativas desenhadas para operações específicas. Todos os dados são fictícios e claramente identificados como demonstração." secondary={{ label: 'Explorar soluções', to: '/solucoes' }} /><section className="ge-section"><div className="ge-shell"><GrowthSectionTitle label="Arquiteturas demonstrativas" title="Cada negócio precisa de uma jornada diferente." /><div className="ge-grid">{DEMONSTRATIONS.map((demo) => <Link className="ge-card" key={demo.slug} to={`/demonstracoes/${demo.slug}`} onClick={() => trackEvent('product_view', { demonstration: demo.slug, service: demo.solution })}><span className="ge-card-kicker">{demo.segment}</span><h3>{demo.title}</h3><p>{demo.description}</p><span className="ge-card-action">Abrir experiência <ArrowRight size={15} aria-hidden="true" /></span></Link>)}</div></div></section><section className="ge-section ge-section-muted"><div className="ge-shell"><GrowthSectionTitle label="Arquiteturas por trás das demonstrações" title="A experiência mostra o fluxo. O projeto define o que sustenta ele." description="Cada demonstração representa uma solução com regras próprias de conteúdo, triagem e responsabilidade técnica." /><div className="ge-grid">{DEMO_SOLUTIONS.map((solution) => <Link className="ge-card" key={solution.slug} to={SOLUTION_PATHS[solution.slug] ?? `/solucoes/${solution.slug}`} onClick={() => trackEvent('category_select', { service: solution.slug, position: 'demonstrations-solutions' })}><span className="ge-card-kicker">{solution.category}</span><h3>{solution.title}</h3><p>{solution.summary}</p><span className="ge-card-action">Entender a solução <ArrowRight size={15} aria-hidden="true" /></span></Link>)}</div></div></section><GrowthClosing title="Uma demonstração mostra possibilidades. Seu projeto continua exclusivo." /></main>;
}
