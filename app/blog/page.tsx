import Link from 'next/link';
import { articles } from '@/lib/editorial';
import PageShell from '@/components/PageShell';
import { metadata as meta } from '@/lib/site';
export const metadata = meta(
  'Guias de vendas e marketing para PME',
  'Conteúdo prático sobre sites, follow-up, CRM, anúncios e indicadores para negócios locais.',
  '/blog',
);
export default function Page() {
  return (
    <PageShell
      title="Decisões melhores para vender melhor."
      description="Leituras diretas para organizar o marketing, o atendimento e a próxima ação. Exemplos são identificados; resultado de cliente exige fonte."
      path="/blog"
    >
      <div className="article-grid">
        {articles.map((a) => (
          <article className="article-card" key={a.slug}>
            <p className="muted">
              {a.category} · {a.readMinutes} min
            </p>
            <h2>
              <Link href={a.route}>{a.title}</Link>
            </h2>
            <p>{a.description}</p>
            <Link className="text-link" href={a.route}>
              Ler o guia ↗
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
