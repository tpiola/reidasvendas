import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GrowthClosing, GrowthHero, GrowthSectionTitle } from '@/components/GrowthShell';
import { trackEvent } from '@/lib/analytics';
import { TOOLS } from '@/lib/growth';

export default function Tools() {
  return (
    <main className="ge-page" id="main-content">
      <GrowthHero label="Ferramentas de inteligência operacional" title="Decisões melhores começam por perguntas melhores." description="Simule cenários, organize um briefing e identifique prioridades iniciais. As ferramentas são orientativas e não substituem diagnóstico técnico." secondary={{ label: 'Explorar soluções', to: '/solucoes' }} />
      <section className="ge-section"><div className="ge-shell"><GrowthSectionTitle label="Ferramentas disponíveis" title="Menos suposição. Mais clareza operacional." /><div className="ge-grid">{TOOLS.map((tool) => <Link className="ge-card" key={tool.slug} to={`/ferramentas/${tool.slug}`} onClick={() => trackEvent('product_view', { tool: tool.slug, type: 'free-tool' })}><span className="ge-card-kicker">Ferramenta de diagnóstico</span><h3>{tool.title}</h3><p>{tool.summary}</p><span className="ge-card-action">Abrir ferramenta <ArrowRight size={15} aria-hidden="true" /></span></Link>)}</div></div></section>
      <GrowthClosing title="Uma simulação abre a conversa. O diagnóstico define a solução." />
    </main>
  );
}
