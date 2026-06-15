import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Reveal } from '@/hooks/useAnimation';

const posts = {
  'soberania-digital-o-que-e': {
    title: 'Soberania Digital: O que é e por que sua empresa precisa',
    date: '15 Jun 2026', category: 'Estratégia', readTime: '5 min',
    content: `No cenário digital atual, a maioria das empresas depende de plataformas de terceiros para vender: Instagram, Facebook, marketplaces. O problema? Você não controla o algoritmo, as regras mudam do dia para a noite, e seu negócio fica refém.

**Soberania digital** é a capacidade da sua empresa ter controle total sobre sua infraestrutura de vendas — dados, processos, automações — sem depender exclusivamente de plataformas que você não governa.

## Os pilares da soberania digital

1. **Propriedade dos dados** — Seus leads, clientes e métricas são seus. Não de uma plataforma.
2. **Infraestrutura própria** — Site, aplicativo, CRM e automações que você controla.
3. **Independência de algoritmo** — Seu tráfego orgânico não depende de mudanças de terceiros.
4. **Governança de resultados** — Métricas claras e previsíveis sobre o que funciona.

## Por que isso importa agora?

Empresas que investem em infraestrutura digital própria têm:
- **3x mais previsibilidade** de receita
- **Menor custo de aquisição** no longo prazo
- **Ativo digital** que valoriza com o tempo (diferente de tráfego pago que acaba quando o budget acaba)

A soberania digital não é um luxo — é o novo padrão de mercado para empresas que querem crescer com consistência.`,
  },
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = slug ? posts[slug as keyof typeof posts] : null;

  if (!post) {
    return (
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-serif text-3xl font-bold text-white">Artigo não encontrado</h1>
          <Link to="/blog" className="btn-outline-gold inline-flex mt-6">
            <ArrowLeft className="h-4 w-4" /> Voltar ao Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="relative pt-28 pb-16">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#D6A84F] transition-all hover:gap-3 mb-8">
              <ArrowLeft className="h-3 w-3" /> Voltar ao Blog
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(214,168,79,0.3)] bg-[rgba(3,3,3,0.6)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D6A84F] backdrop-blur-sm">
              <Tag className="h-3 w-3" />{post.category}
            </span>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-3 flex items-center gap-4 text-xs font-medium text-[#71717A]">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <article className="prose prose-invert max-w-none 
              prose-headings:font-serif prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-[#A1A1AA] prose-p:leading-relaxed
              prose-strong:text-white
              prose-li:text-[#A1A1AA]
              prose-ul:space-y-2
              prose-a:text-[#D6A84F] prose-a:no-underline hover:prose-a:underline
            ">
              {post.content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h2 key={i} className="font-serif text-2xl font-bold text-white mt-10 mb-4">{line.replace('## ', '')}</h2>;
                if (line.startsWith('**')) return <strong key={i} className="block text-white font-semibold mt-4 mb-2">{line.replace(/\*\*/g, '')}</strong>;
                if (line.startsWith('- ')) return <li key={i} className="text-[#A1A1AA] ml-4">{line.replace('- ', '')}</li>;
                if (line.trim() === '') return <br key={i} />;
                if (line.startsWith('1. ')) return <li key={i} className="text-[#A1A1AA] ml-4 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
                return <p key={i} className="text-[#A1A1AA] leading-relaxed mb-4">{line}</p>;
              })}
            </article>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
