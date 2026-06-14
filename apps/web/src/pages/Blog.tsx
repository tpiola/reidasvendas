import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const posts = [
  {
    slug: 'presenca-digital-negocios-locais',
    title: 'Por que sua empresa precisa de presença digital em 2025?',
    excerpt: 'Descubra como negócios locais estão usando sites profissionais e automação para competir com grandes marcas.',
    date: '2025-05-15',
    category: 'Marketing Digital',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
  },
  {
    slug: 'automacao-vendas-whatsapp',
    title: 'Automação de Vendas no WhatsApp: Guia Completo',
    excerpt: 'Aprenda como automatizar seu atendimento no WhatsApp sem perder a humanização e aumentando conversões.',
    date: '2025-05-10',
    category: 'Automação',
    img: 'https://images.unsplash.com/photo-1553729459-afe8f2e2b59b?w=800&q=80',
  },
  {
    slug: 'dashboards-gestao-negocios',
    title: 'Dashboards de Gestão: Tomando Decisões Baseadas em Dados',
    excerpt: 'Saiba como um dashboard personalizado pode transformar a gestão do seu negócio com dados em tempo real.',
    date: '2025-05-05',
    category: 'Tecnologia',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    slug: 'sites-que-vendem',
    title: '6 Características de Sites que Realmente Vendem',
    excerpt: 'Conheça os elementos essenciais que transformam visitantes em clientes no seu site institucional.',
    date: '2025-04-28',
    category: 'Sites',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    slug: 'mentoria-digital-empreendedores',
    title: 'Mentoria Digital: O Atalho para Resultados Rápidos',
    excerpt: 'Como a mentoria digital pode acelerar seus resultados e evitar erros comuns de quem está começando.',
    date: '2025-04-20',
    category: 'Mentoria',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  },
  {
    slug: 'aplicativos-negocios',
    title: 'Por que seu negócio precisa de um aplicativo próprio?',
    excerpt: 'Apps aumentam o engajamento, fidelizam clientes e geram receita recorrente. Veja como começar.',
    date: '2025-04-15',
    category: 'Apps',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

export default function Blog() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-[#030305]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,87,255,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <span className="reveal inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Blog</span>
          <h1 className="reveal reveal-delay-1 mt-4 font-['Playfair_Display'] text-4xl font-bold text-white sm:text-5xl">
            Conteúdo que{' '}
            <span className="text-gradient-gold">Transforma</span>
          </h1>
          <p className="reveal reveal-delay-2 mx-auto mt-4 max-w-xl text-lg text-[rgba(248,248,250,0.55)]">
            Artigos, guias e insights sobre marketing digital, vendas e tecnologia para seu negócio crescer.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className={`reveal reveal-delay-${(i % 4) + 1} group glass-card rounded-2xl overflow-hidden transition-all hover:scale-[1.02]`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.15em]">
                    <span className="rounded-full bg-[rgba(201,168,76,0.1)] px-3 py-1 text-[#C9A84C]">{post.category}</span>
                    <span className="flex items-center gap-1 text-[rgba(248,248,250,0.35)]">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-['Playfair_Display'] mt-3 text-lg font-semibold text-white group-hover:text-[#C9A84C] transition">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[rgba(248,248,250,0.5)]">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0057FF]">
                    Ler mais <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
