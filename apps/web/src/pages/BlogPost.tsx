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
      title: `${post.title} — Blog Rei das Vendas`,
      description: post.excerpt,
      canonicalPath: `/blog/${post.slug}`,
      ogImage: post.coverImageUrl,
    });
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <main className="page-surface">
      <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <nav className="text-[11px] text-surface-muted">
          <Link to="/blog" className="hover:text-[color:var(--page-fg)]">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span>{post.category}</span>
        </nav>
        <Reveal>
          <div className="media-band mt-8 overflow-hidden rounded-2xl">
            <img
              src={post.coverImageUrl}
              alt={post.title}
              width={1920}
              height={1080}
              className="aspect-[16/9] w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
          <h1 className="mt-8 text-3xl font-semibold tracking-tight text-surface md:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm text-surface-muted">
            {post.readMinutes} min de leitura · {post.publishedAt}
          </p>
        </Reveal>
        <div className="mt-10 space-y-6">
          {post.body.map((paragraph) => (
            <Reveal key={paragraph}>
              <p className="text-base leading-relaxed text-surface-muted">{paragraph}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 border-t border-[color:var(--border-subtle)] pt-10">
          <Link
            to="/diagnostico"
            className="btn-glow inline-flex h-12 items-center justify-center px-10 text-[11px] font-bold uppercase tracking-[0.24em] text-white"
          >
            Agendar diagnóstico
          </Link>
        </Reveal>
      </article>
    </main>
  );
}
