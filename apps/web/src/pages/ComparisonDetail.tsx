import { Link, useParams } from 'react-router-dom';
import { GrowthClosing, GrowthFaq, GrowthHero, GrowthSectionTitle } from '@/components/GrowthShell';
import { trackEvent } from '@/lib/analytics';
import { COMPARISON_BY_SLUG, COMPARISONS } from '@/lib/growth';
import NotFound from '@/pages/NotFound';

// Comparativos publicados: href explícito para o bloco de comparação cruzada.
const COMPARISON_PATHS: Record<string, string> = {
  wix: '/alternativas/wix',
  wordpress: '/alternativas/wordpress',
  'loja-integrada': '/alternativas/loja-integrada',
  linktree: '/alternativas/linktree',
};

export default function ComparisonDetail() {
  const { slug = '' } = useParams();
  const comparison = COMPARISON_BY_SLUG.get(slug);
  if (!comparison) return <NotFound />;

  const relatedComparisons = COMPARISONS
    .filter((item) => item.slug !== comparison.slug)
    .map((item) => ({ item, to: COMPARISON_PATHS[item.slug] ?? `/alternativas/${item.slug}` }));

  return (
    <main className="ge-page" id="main-content">
      <GrowthHero label="Comparação responsável" title={comparison.title} description={comparison.summary} secondary={{ label: 'Ver soluções próprias', to: '/solucoes' }} />
      <section className="ge-section"><div className="ge-shell ge-two-columns"><GrowthSectionTitle label="Análise de adequação" title="A pergunta correta é: adequado para qual operação?" description="Ferramentas legítimas resolvem problemas diferentes. A comparação considera o processo comercial, a autonomia desejada e o nível de responsabilidade técnica." /><div><article className="ge-issue"><span>Quando a plataforma faz sentido</span><h3>{comparison.name}</h3><p>{comparison.platformFit}</p></article><article className="ge-issue"><span>Quando avaliar uma arquitetura própria</span><h3>Processo específico e responsabilidade clara.</h3><p>{comparison.customFit}</p></article></div></div></section>
      <section className="ge-section ge-section-muted"><div className="ge-shell"><GrowthSectionTitle label="Critérios de decisão" title="Compare a operação inteira. Não apenas a mensalidade." /><div className="ge-architecture">{comparison.considerations.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}</div><p className="ge-source">Preços, limites e recursos podem mudar. Consulte as informações atuais diretamente na <a href={comparison.officialUrl} target="_blank" rel="noopener noreferrer">fonte oficial de {comparison.name}</a>.</p></div></section>
      <section className="ge-section"><div className="ge-shell"><GrowthSectionTitle label="Outras comparações" title="A plataforma certa depende da operação, não da popularidade." description="Cada ferramenta resolve um cenário diferente. Compare as demais alternativas antes de definir a arquitetura do projeto." /><div className="ge-inline-grid">{relatedComparisons.map(({ item, to }) => <Link className="ge-inline-card" key={to} to={to} onClick={() => trackEvent('product_view', { platform: item.name, origin: comparison.slug })}><span>Alternativa avaliada</span><h3>{item.title}</h3><p>{item.summary}</p></Link>)}</div></div></section>
      <GrowthFaq questions={comparison.questions} />
      <GrowthClosing title="Escolha a arquitetura depois de entender o problema que ela precisa resolver." />
    </main>
  );
}
