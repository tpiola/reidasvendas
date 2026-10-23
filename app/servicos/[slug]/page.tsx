import Link from 'next/link';
import { notFound } from 'next/navigation';
import content from '@/data/content.json';
import PageShell from '@/components/PageShell';
import JsonLd from '@/components/JsonLd';
import { metadata as meta, SITE } from '@/lib/site';
export const dynamicParams = false;
export const revalidate = 86400;
export function generateStaticParams() {
  return content.services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = content.services.find((s) => s.slug === slug);
  return s ? meta(s.title, s.metaDescription, '/servicos/' + s.slug) : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = content.services.find((s) => s.slug === slug);
  if (!s) notFound();
  return (
    <PageShell
      title={s.title}
      description={s.description}
      path={'/servicos/' + s.slug}
    >
      <div className="split-content">
        <div className="prose">
          <h2>Quando este trabalho faz sentido</h2>
          <p>{s.problem}</p>
          <h2>Como trabalhamos</h2>
          <p>{s.approach}</p>
          <h2>O que entra no escopo</h2>
          <ul>
            {s.deliverables.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <h2>Para quem é</h2>
          <p>{s.goodFit}</p>
          <h2>Como avaliamos</h2>
          <p>{s.measurement}</p>
          <h2>O que combinar antes</h2>
          <p>{s.limits}</p>
          <p>
            Atendimento a negócios de Franca/SP, região e projetos remotos. O
            escopo considera o segmento e o caminho real do seu cliente.
          </p>
        </div>
        <aside className="callout">
          <h2>Comece pelo seu cenário.</h2>
          <p>
            Conte o que vende, onde atende e o que precisa melhorar. A primeira
            conversa não inicia um contrato.
          </p>
          <a
            className="button button-primary"
            href={
              '/go/whatsapp?src=' +
              encodeURIComponent(s.slug) +
              '&page=/servicos/' +
              s.slug
            }
          >
            {{
              'criacao-de-sites-franca': 'Planejar meu site',
              'gestao-de-trafego-franca': 'Revisar meus anúncios',
              'social-media-franca': 'Organizar meu conteúdo',
              'seo-local-franca': 'Revisar minha busca local',
              'implantacao-crm-franca': 'Implantar meu CRM',
              'automacao-de-follow-up-franca': 'Organizar meu follow-up',
              'consultoria-comercial-franca': 'Revisar meu comercial',
              'diagnostico-de-funil-franca': 'Analisar meu funil',
            }[s.slug] || 'Conversar sobre meu cenário'}
          </a>
          <Link className="text-link" href="/servicos#investimento">
            Ver formas de contratação ↗
          </Link>
        </aside>
      </div>
      <section className="content-section">
        <h2>Este trabalho se conecta a</h2>
        <div className="related-links">
          {s.related.map((slug) => {
            const r = content.services.find((x) => x.slug === slug);
            return r ? (
              <Link key={slug} href={'/servicos/' + slug}>
                {r.title} ↗
              </Link>
            ) : null;
          })}
        </div>
        <Link href="/metodo" className="text-link">
          Conhecer o método ↗
        </Link>
      </section>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.title,
          description: s.description,
          url: SITE + '/servicos/' + s.slug,
          provider: { '@id': SITE + '/#organization' },
          areaServed: { '@type': 'City', name: 'Franca' },
          serviceType: s.category,
        }}
      />
    </PageShell>
  );
}
