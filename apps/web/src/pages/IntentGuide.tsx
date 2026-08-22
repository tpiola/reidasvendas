import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GrowthClosing, GrowthFaq, GrowthHero } from '@/components/GrowthShell';
import { GUIDE_BY_SLUG, SOLUTION_BY_SLUG, TOOL_BY_SLUG } from '@/lib/growth';
import NotFound from '@/pages/NotFound';

export default function IntentGuide() {
  const location = useLocation();
  const guide = GUIDE_BY_SLUG.get(location.pathname.replace(/^\//, ''));
  if (!guide) return <NotFound />;

  const solution = SOLUTION_BY_SLUG.get(guide.solution);
  const tool = guide.tool ? TOOL_BY_SLUG.get(guide.tool) : undefined;

  return (
    <main className="ge-page" id="main-content">
      <GrowthHero label="Inteligência para decidir" title={guide.title} description={guide.summary} solution={guide.solution} secondary={tool ? { label: 'Abrir calculadora', to: `/ferramentas/${tool.slug}` } : undefined} />
      <section className="ge-section"><div className="ge-shell ge-two-columns"><article className="ge-article">{guide.sections.map((section, index) => <section key={section.title}><span className="ge-article-label">Critério 0{index + 1}</span><h2>{section.title}</h2><p>{section.detail}</p></section>)}</article><aside>{solution ? <article className="ge-issue"><span>Arquitetura relacionada</span><h3>{solution.title}</h3><p>{solution.summary}</p><div className="ge-actions"><Link className="ge-link" to={`/solucoes/${solution.slug}`}>Entender a solução <ArrowRight size={16} aria-hidden="true" /></Link></div></article> : null}{tool ? <article className="ge-issue"><span>Ferramenta disponível</span><h3>{tool.title}</h3><p>{tool.summary}</p><div className="ge-actions"><Link className="ge-link" to={`/ferramentas/${tool.slug}`}>Fazer simulação <ArrowRight size={16} aria-hidden="true" /></Link></div></article> : null}</aside></div></section>
      <GrowthFaq questions={guide.questions} />
      <GrowthClosing solution={guide.solution} />
    </main>
  );
}
