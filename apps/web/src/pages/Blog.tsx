import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Tag, Search, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal, staggerContainer, staggerItem, SectionLabel } from '@/hooks/useAnimation';
import { GoldParticles } from '@/components/GoldParticles';
import { PremiumButton } from '@/components/PremiumButton';

const categorias = ['Todas', 'Estratégia', 'Tecnologia', 'Automação', 'Design'];

const posts = [
  {
    slug: 'soberania-digital-o-que-e',
    title: 'Soberania Digital: O que é e por que sua empresa precisa',
    excerpt: 'Entenda o conceito de soberania digital e como ele pode transformar a forma como sua empresa vende online.',
    date: '15 Jun 2026',
    category: 'Estratégia',
    readTime: '5 min',
    image: '/imagens/og-default.jpg',
  },
  {
    slug: 'infraestrutura-de-vendas-digitais',
    title: 'Infraestrutura de Vendas Digitais: O novo padrão de mercado',
    excerpt: 'Por que empresas que investem em infraestrutura digital vendem mais e com maior previsibilidade.',
    date: '10 Jun 2026',
    category: 'Tecnologia',
    readTime: '7 min',
    image: '/imagens/services/sites.jpg',
  },
  {
    slug: 'automacao-inteligente-para-negocios-locais',
    title: 'Automação Inteligente para Negócios Locais',
    excerpt: 'Como pequenas e médias empresas podem usar automação para competir com grandes players.',
    date: '05 Jun 2026',
    category: 'Automação',
    readTime: '6 min',
    image: '/imagens/services/automations.jpg',
  },
  {
    slug: 'design-premium-ou-template',
    title: 'Design Premium vs Template: O impacto na conversão',
    excerpt: 'Por que um design sob medida pode multiplicar seus resultados — e por que templates genéricos custam mais caro no longo prazo.',
    date: '01 Jun 2026',
    category: 'Design',
    readTime: '4 min',
    image: '/imagens/services/dashboards.jpg',
  },
];

export default function Blog() {
  const [activeCategoria, setActiveCategoria] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const matchCategoria = activeCategoria === 'Todas' || post.category === activeCategoria;
    const matchSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategoria && matchSearch;
  });

  return (
    <main>
      <GoldParticles count={15} />

      {/* Hero */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal><SectionLabel>Blog</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Conteúdo sobre{' '}
              <span className="text-gradient-gold">Soberania Digital</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#A1A1AA]">
              Artigos, análises e guias sobre infraestrutura digital, automação, design premium e tecnologia para negócios.
            </p>
          </Reveal>

          {/* Search Bar */}
          <Reveal delay={0.25}>
            <div className="mx-auto mt-8 max-w-md">
              <div className="flex items-center gap-2 rounded-xl border border-[rgba(214,168,79,0.15)] bg-[rgba(3,3,3,0.6)] px-4 py-2.5 backdrop-blur-sm transition-all focus-within:border-[rgba(214,168,79,0.4)]">
                <Search className="h-4 w-4 shrink-0 text-[#71717A]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar artigos..."
                  className="w-full bg-transparent text-sm text-white placeholder-[#71717A] outline-none"
                />
              </div>
            </div>
          </Reveal>

          {/* Categorias */}
          <Reveal delay={0.3}>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoria(cat)}
                  className={`rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-all ${
                    activeCategoria === cat
                      ? 'border-[#D6A84F] bg-[rgba(214,168,79,0.12)] text-[#D6A84F]'
                      : 'border-[rgba(214,168,79,0.15)] text-[#71717A] hover:border-[rgba(214,168,79,0.3)] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-sm text-[#71717A]">Nenhum artigo encontrado para esta busca.</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2"
            >
              {filteredPosts.map((post) => (
                <motion.div key={post.slug} variants={staggerItem}>
                  <Link to={`/blog/${post.slug}`} className="glass-card group block overflow-hidden rounded-2xl transition-all hover:border-[rgba(214,168,79,0.3)]">
                    <div className="relative h-48 overflow-hidden">
                      <img src={post.image} alt={post.title} loading="lazy"
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(214,168,79,0.3)] bg-[rgba(3,3,3,0.6)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D6A84F] backdrop-blur-sm">
                          <Tag className="h-3 w-3" />
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="mb-2 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[#71717A]">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
                      </div>
                      <h2 className="font-serif text-lg font-semibold text-white transition-colors group-hover:text-[#D6A84F]">{post.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{post.excerpt}</p>
                      <div className="mt-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#D6A84F] transition-all group-hover:gap-2">
                        Ler artigo <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Guest CTA */}
      <section className="border-t border-[rgba(214,168,79,0.1)] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
              Quer aparecer <span className="text-gradient-gold">aqui</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 text-sm text-[#A1A1AA]">
              Tem um case, insight ou expertise para compartilhar? Escreva como convidado no blog da Rei das Vendas e alcance empreendedores de todo o Brasil.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <PremiumButton href="/contato">
                <MessageCircle className="h-4 w-4" />
                Entre em contato
              </PremiumButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
