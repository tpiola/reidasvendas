import { notFound } from 'next/navigation';
import Article from '@/components/Article';
import { articles } from '@/lib/editorial';
import { metadata as meta } from '@/lib/site';
export const dynamicParams = false;
export const revalidate = 86400;
export function generateStaticParams() {
  return articles
    .filter((a) => a.route.startsWith('/guia/'))
    .map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.route === '/' + 'guia/' + slug);
  return a ? meta(a.title, a.metaDescription, a.route) : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articles.find((a) => a.route === '/guia/' + slug);
  if (!a) notFound();
  return <Article article={a} />;
}
