/**
 * BLOGPOST.TSX — Rei das Vendas
 * Pagina de post individual
 * Imagem grande no topo + tipografia agradavel + autor/data + CTA
 * SEO com meta author + data
 * Responsivo
 */

import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { applySeo } from '@/lib/seo';
import { DEFAULT_OG_IMAGE } from '@/lib/seo-meta';
import { findBlogPost } from '@/data/blog';
import { Reveal } from '@/components/Reveal';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = findBlogPost(slug);

  useEffect(() => {
    if (!post) return;
    applySeo({
      title: `${post.title} — Blog Rei das Vendas | Franca-SP`,
      description: post.excerpt,
      canonicalPath: `/blog/${post.slug}`,
      ogImage: post.imageUrl || DEFAULT_OG_IMAGE,
    });
    const metaAuthor = document.querySelector('meta[name="author"]') as HTMLMetaElement | null;
    if (metaAuthor) {
      metaAuthor.setAttribute('content', post.author);
    } else {
      const el = document.createElement('meta');
      el.setAttribute('name', 'author');
      el.setAttribute('content', post.author);
      document.head.appendChild(el);
    }
    const metaDate = document.querySelector('meta[name="article:published_time"]') as HTMLMetaElement | null;
    if (metaDate) {
      metaDate.setAttribute('content', post.publishedAt);
    } else {
      const el = document.createElement('meta');
      el.setAttribute('name', 'article:published_time');
      el.setAttribute('content', post.publishedAt);
      document.head.appendChild(el);
    }
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00-03:00');
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <main className="page-surface">
      <article>
        {/* HERO IMAGE */}
        <div className="relative aspect-[2/1] overflow-hidden bg-[#0a0a0a] sm:aspect-[3/1]">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="h-full w-full object-cover"
            style={{ filter: 'brightness(0.6)' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, var(--page-bg) 0%, transparent 50%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* CONTENT */}
        <div className="mx-auto max-w-3xl px-6 pb-20">
          {/* BREADCRUMB */}
          <nav className="pt-8 text-[11px] text-[color:var(--page-fg-muted)]">
            <Link to="/blog" className="hover:text-[#0057FF] transition-colors">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#C9A84C]/70">{post.category}</span>
          </nav>

          {/* TITLE */}
          <Reveal>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-[color:var(--page-fg)] leading-tight sm:text-3xl md:text-4xl">
              {post.title}
            </h1>
          </Reveal>

          {/* AUTHOR + DATE + READ TIME */}
          <Reveal delay={0.06}>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[color:var(--page-fg-muted)]">
              <span className="font-medium text-[color:var(--page-fg)]">{post.author}</span>
              <span className="opacity-40" aria-hidden="true">|</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span className="opacity-40" aria-hidden="true">|</span>
              <span>{post.readMinutes} min de leitura</span>
            </div>
          </Reveal>

          {/* BODY */}
          <div className="mt-8 space-y-5">
            {post.body.map((paragraph, idx) => (
              <Reveal key={idx} delay={0.04 * idx}>
                <p className="text-sm leading-relaxed text-[color:var(--page-fg)] sm:text-base sm:leading-[1.75]">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          <Reveal className="mt-12 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-6 text-center">
            <h3 className="text-base font-semibold text-[color:var(--page-fg)]">
              Gostou do conteudo?
            </h3>
            <p className="mt-1 text-sm text-[color:var(--page-fg-muted)]">
              Aplique essas ideias no seu negocio com nosso diagnostico gratuito.
            </p>
            <Link
              to="/diagnostico"
              className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-[#0057FF] px-6 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#0057FF]/90 active:scale-[0.98]"
            >
              Solicitar Diagnostico Gratuito
            </Link>
          </Reveal>

          {/* BACK LINK */}
          <div className="mt-8 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-xs text-[color:var(--page-fg-muted)] hover:text-[#0057FF] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Voltar para o blog
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
