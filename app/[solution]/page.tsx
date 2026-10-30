import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageShell from '@/components/PageShell';
import JsonLd from '@/components/JsonLd';
import { subscriptionSolutions } from '@/data/subscription-solutions';
import { SITE, metadata as meta } from '@/lib/site';
export const dynamicParams = false;
export function generateStaticParams() {
  return subscriptionSolutions.map(({ slug }) => ({ solution: slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ solution: string }>;
}) {
  const { solution } = await params;
  const item = subscriptionSolutions.find((entry) => entry.slug === solution);
  return item
    ? meta(
        item.slug === 'sites-para-pequenos-negocios'
          ? 'Sites para pequenos negócios'
          : item.name + ' para PME',
        item.description,
        '/' + item.slug,
      )
    : {};
}
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ solution: string }>;
}) {
  const { solution } = await params;
  const item = subscriptionSolutions.find((entry) => entry.slug === solution);
  if (!item) notFound();
  return (
    <PageShell
      title={item.title}
      description={item.description}
      path={'/' + item.slug}
    >
      <div className="split-content">
        <article className="prose">
          <section data-reveal>
            <h2>O problema que merece atenção</h2>
            <p>{item.problem}</p>
          </section>
          <section data-reveal>
            <h2>Como o trabalho acontece</h2>
            <p>{item.mechanism}</p>
          </section>
          <section data-reveal>
            <h2>O que entra no escopo</h2>
            <ul>
              {item.includes.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
            <p>
              <strong>Limites claros:</strong> {item.excludes}
            </p>
          </section>
          <section data-reveal>
            <h2>Como conferir a entrega</h2>
            <p>{item.proof}</p>
          </section>
          <section>
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
          </section>
        </article>
        <aside className="callout">
          <p className="eyebrow">Um módulo. Um caminho conectado.</p>
          <h2>Escolha o plano pelo que sua operação precisa manter.</h2>
          <p>
            Compare páginas, conteúdo, ajustes e acompanhamento. Implantação,
            mensalidade e terceiros são separados antes da contratação.
          </p>
          <Link className="button" href="/planos" data-event="click_cta_planos">
            Comparar os planos
          </Link>
          <a
            className="text-link"
            href={
              '/go/whatsapp?' +
              new URLSearchParams({ src: item.slug, page: '/' + item.slug })
            }
          >
            Avaliar meu cenário ↗
          </a>
          <Link className="text-link" href="/casos">
            Conferir trabalhos públicos ↗
          </Link>
        </aside>
      </div>
      <section className="content-section">
        <h2>As peças que completam o caminho.</h2>
        <div className="related-links">
          {item.related.map((slug) => (
            <Link key={slug} href={'/' + slug}>
              {subscriptionSolutions.find((entry) => entry.slug === slug)?.name}{' '}
              ↗
            </Link>
          ))}
        </div>
        <Link className="text-link" href="/guia/funil-de-vendas-para-pme">
          Ler o guia de funil para PME ↗
        </Link>
      </section>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': SITE + '/' + item.slug + '/#service',
          name: item.name,
          description: item.description,
          url: SITE + '/' + item.slug,
          provider: { '@id': SITE + '/#organization' },
          areaServed: [
            { '@type': 'City', name: 'Franca' },
            { '@type': 'Country', name: 'Brasil' },
          ],
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            },
          ],
        }}
      />
    </PageShell>
  );
}
