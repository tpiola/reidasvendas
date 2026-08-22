import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GrowthClosing, GrowthHero, GrowthSectionTitle } from '@/components/GrowthShell';
import { trackEvent } from '@/lib/analytics';
import { DEMONSTRATIONS } from '@/lib/growth';

export default function Demonstrations() {
  return <main className="ge-page" id="main-content"><GrowthHero label="Biblioteca de arquiteturas" title="Veja a solução funcionando antes de imaginar o projeto." description="Experiências interativas desenhadas para operações específicas. Todos os dados são fictícios e claramente identificados como demonstração." secondary={{ label: 'Explorar soluções', to: '/solucoes' }} /><section className="ge-section"><div className="ge-shell"><GrowthSectionTitle label="Arquiteturas demonstrativas" title="Cada negócio precisa de uma jornada diferente." /><div className="ge-grid">{DEMONSTRATIONS.map((demo) => <Link className="ge-card" key={demo.slug} to={`/demonstracoes/${demo.slug}`} onClick={() => trackEvent('product_view', { demonstration: demo.slug, service: demo.solution })}><span className="ge-card-kicker">{demo.segment}</span><h3>{demo.title}</h3><p>{demo.description}</p><span className="ge-card-action">Abrir experiência <ArrowRight size={15} aria-hidden="true" /></span></Link>)}</div></div></section><GrowthClosing title="Uma demonstração mostra possibilidades. Seu projeto continua exclusivo." /></main>;
}
