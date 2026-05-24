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
      ogImage: DEFAULT_OG_IMAGE,
    });
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <main className="bg-[#030305] text-white">
      <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <nav className="text-[11px] text-white/40">
          <Link to="/blog" className="hover:text-white/70">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">{post.category}</span>
        </nav>
        <Reveal>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">{post.title}</h1>
          <p className="mt-4 text-sm text-white/40">
            {post.readMinutes} min de leitura · {post.publishedAt}
          </p>
        </Reveal>
        <div className="prose-invert mt-10 space-y-6">
          {post.body.map((paragraph) => (
            <Reveal key={paragraph}>
              <p className="text-base leading-relaxed text-white/55">{paragraph}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14 border-t border-white/[0.06] pt-10">
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
