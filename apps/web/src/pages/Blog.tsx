/**
 * BLOG.TSX — Rei das Vendas
 * Grid de posts com imagem + titulo + excerpt + categoria + data
 * Design premium estilo Medium
 * Responsivo
 */

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { DEFAULT_OG_IMAGE } from '@/lib/seo-meta';
import { BLOG_POSTS } from '@/data/blog';
import { Reveal } from '@/components/Reveal';

export default function Blog() {
  useEffect(() => {
    applySeo({
      title: 'Blog — Marketing digital, funis e automacao | Rei das Vendas | Franca-SP',
      description:
        'Artigos sobre funil, WhatsApp, SEO e automacao para negocios locais de Franca-SP que querem previsibilidade comercial.',
      canonicalPath: '/blog',
      ogImage: DEFAULT_OG_IMAGE,
    });
  }, []);

  return (
    <main className="page-surface">
      {/* HEADER */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#0057FF]/80">
            Blog
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[color:var(--page-fg)] sm:text-4xl lg:text-5xl">
            Conteudo que educa e inspira
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[color:var(--page-fg-muted)] sm:text-base">
            Funil, tecnologia, performance e cases para o empreendedor de Franca que quer decidir com clareza.
          </p>
        </Reveal>
      </section>

      {/* POSTS GRID */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] transition-all hover:shadow-lg hover:shadow-[#0057FF]/5">
                {/* IMAGE */}
                <Link to={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-[color:var(--page-surface)]">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]/70">
                    {post.category}
                  </span>
                  <h2 className="mt-2 text-base font-semibold text-[color:var(--page-fg)] leading-snug">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="hover:text-[#0057FF] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[color:var(--page-fg-muted)]">
                    {post.excerpt}
                  </p>

                  {/* META */}
                  <div className="mt-4 flex items-center justify-between border-t border-[color:var(--border-subtle)] pt-3">
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[color:var(--page-fg-muted)] opacity-60">
                      {post.author}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[color:var(--page-fg-muted)] opacity-60">
                      {post.readMinutes} min
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[color:var(--border-subtle)] py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--page-fg)] sm:text-3xl">
              Quer aplicar esses conhecimentos?
            </h2>
            <p className="mt-3 text-sm text-[color:var(--page-fg-muted)]">
              Diagnostico gratuito para seu negocio em Franca-SP.
            </p>
            <div className="mt-6">
              <Link
                to="/diagnostico"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0057FF] px-7 text-sm font-semibold text-white transition-all hover:bg-[#0057FF]/90 active:scale-[0.98]"
              >
                Solicitar Diagnostico Gratuito
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
