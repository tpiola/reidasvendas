import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { DEFAULT_OG_IMAGE } from '@/lib/seo-meta';
import { BLOG_POSTS } from '@/data/blog';
import { PageHero } from '@/components/shipper/PageHero';
import { Reveal } from '@/components/Reveal';

export default function Blog() {
  useEffect(() => {
    applySeo({
      title: 'Blog — Marketing digital, funis e automação | Rei das Vendas',
      description:
        'Artigos sobre funil, WhatsApp, SEO e automação para negócios locais que querem previsibilidade comercial.',
      canonicalPath: '/blog',
      ogImage: DEFAULT_OG_IMAGE,
    });
  }, []);

  return (
    <main className="page-surface">
      <PageHero
        eyebrow="Blog"
        title="Conteúdo que"
        titleAccent="atrai e educa."
        subtitle="Funil, IA, performance e cases — para o empreendedor que quer decidir com clareza."
      />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <article className="card-dark group flex h-full flex-col overflow-hidden">
                <Link
                  to={`/blog/${post.slug}`}
                  className="relative block aspect-[16/10] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]"
                >
                  <img
                    src={post.thumbImageUrl}
                    srcSet={`${post.thumbImageUrl} 960w, ${post.coverImageUrl} 1920w`}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    alt={post.title}
                    width={960}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A84C]/70">{post.category}</p>
                <h2 className="mt-3 text-lg font-semibold text-surface">
                  <Link to={`/blog/${post.slug}`} className="hover:text-[#C9A84C]/90">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm text-surface-muted">{post.excerpt}</p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-surface-muted opacity-70">
                  {post.readMinutes} min · {post.publishedAt}
                </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
