import Link from 'next/link';
import PageShell from './PageShell';
import JsonLd from './JsonLd';
import content from '@/data/content.json';
import { SITE } from '@/lib/site';
export default function Article({
  article: a,
}: {
  article: (typeof content.articles)[number];
}) {
  return (
    <PageShell title={a.title} description={a.description} path={a.route}>
      <div className="article-layout">
        <article className="prose">
          <p className="muted">
            {a.category} · Atualizado em 23/10/2026 · Equipe Rei das Vendas
          </p>
          {a.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              <p>{s.text}</p>
            </section>
          ))}
          {a.slug === 'follow-up-que-converte' && (
            <p>
              <a
                href="/downloads/guia-follow-up.md"
                download
                data-event="resource_download"
              >
                Baixar guia de follow-up em texto ↗
              </a>
            </p>
          )}
          <section>
            <h2>Confira na sua operação</h2>
            <ul>
              {a.checklist.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>
          <div className="callout">
            <h2>Qual etapa precisa de atenção?</h2>
            <p>
              Leve a leitura para o cenário real da sua empresa. Vamos definir a
              prioridade antes de indicar a entrega.
            </p>
            <a
              className="button button-primary"
              href={'/go/whatsapp?src=artigo&page=' + a.route}
            >
              {a.cta}
            </a>
          </div>
        </article>
        <aside className="article-aside">
          <h2>Continue por aqui</h2>
          {a.related.map((path) => (
            <Link key={path} href={path}>
              {path.startsWith('/servicos')
                ? 'Conhecer o serviço relacionado'
                : path === '/diagnostico'
                  ? 'Conversar sobre meu cenário'
                  : 'Ler o conteúdo relacionado'}{' '}
              ↗
            </Link>
          ))}
          <Link href="/faq">Dúvidas antes de contratar ↗</Link>
        </aside>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': a.schema,
          headline: a.title,
          description: a.description,
          datePublished: '2026-10-23',
          dateModified: '2026-10-23',
          image: SITE + '/og/og-1200x630.png',
          inLanguage: 'pt-BR',
          author: {
            '@type': 'Organization',
            name: 'Rei das Vendas',
            url: SITE,
          },
          publisher: { '@id': SITE + '/#organization' },
          mainEntityOfPage: SITE + a.route,
        }}
      />
    </PageShell>
  );
}
