import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MessageCircle } from 'lucide-react';

// Mesmos posts do Blog.tsx
const posts = [
  {
    slug: 'presenca-digital-negocios-locais',
    title: 'Por que sua empresa precisa de presença digital em 2025?',
    content: `Empresas que ignoram o digital estão perdendo clientes todos os dias. Não é exagero: 87% dos consumidores buscam um negócio online antes de comprar. Se sua empresa em Franca-SP não aparece no Google, não tem site ou não responde no WhatsApp, você simplesmente não existe para esses clientes.\n\nTer presença digital não significa ter um site bonito e pronto. Significa ser encontrado quando alguém pesquisa pelo seu produto ou serviço, responder rápido, entregar uma experiência que gere confiança.\n\n**O que sua empresa precisa ter:**\n\n1. **Site profissional** — responsivo, rápido, otimizado para SEO local\n2. **WhatsApp Business** — organizado com catálogo e respostas rápidas\n3. **Google Meu Negócio** — para aparecer nas pesquisas locais\n4. **Redes sociais atualizadas** — Instagram e Facebook com conteúdo relevante\n\nCada item desses é uma peça do motor de vendas digital.`,
    excerpt: 'Descubra como negócios locais estão usando sites profissionais e automação para competir com grandes marcas.',
    date: '2025-05-15',
    category: 'Marketing Digital',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
  },
  {
    slug: 'automacao-vendas-whatsapp',
    title: 'Automação de Vendas no WhatsApp: Guia Completo',
    content: `O WhatsApp é o canal mais usado pelos brasileiros. Sua empresa provavelmente já usa. Mas será que está usando direito?\n\nAutomatizar o WhatsApp não significa perder o contato humano. Significa responder mais rápido, organizar os pedidos e nunca perder um lead.\n\n**O que dá para automatizar:**\n\n- **Respostas automáticas** para perguntas frequentes (horários, endereço, preços)\n- **Disparo de mensagens** para clientes que abandonaram carrinho ou não voltam há 30 dias\n- **CRM integrado** — cada conversa vira um lead no seu sistema\n- **Notificações** de novo pedido direto no grupo da equipe\n\nNa prática, uma loja que automatizou o WhatsApp reduziu o tempo de resposta de 2 horas para 30 segundos. Resultado: mais vendas fechadas.`,
    excerpt: 'Aprenda como automatizar seu atendimento no WhatsApp sem perder a humanização e aumentando conversões.',
    date: '2025-05-10',
    category: 'Automação',
    img: 'https://images.unsplash.com/photo-1553729459-afe8f2e2b59b?w=800&q=80',
  },
  {
    slug: 'dashboards-gestao-negocios',
    title: 'Dashboards de Gestão: Tomando Decisões Baseadas em Dados',
    content: `Você sabe quantos leads sua empresa teve essa semana? Quanto custou cada um? Qual canal trouxe mais vendas?\n\nSe a resposta para qualquer dessas perguntas é "não sei", você está pilotando seu negócio no escuro.\n\n**O que um dashboard faz:**\n\n- **Centraliza dados** de vendas, estoque, marketing e atendimento\n- **Mostra em tempo real** o que está funcionando e o que não está\n- **Gera relatórios automáticos** sem planilha manual\n- **Alerta** quando algo sai do esperado\n\nUm dashboard bem feito não é um luxo. É o painel de controle do seu negócio. Sem ele, você toma decisão no achismo.`,
    excerpt: 'Saiba como um dashboard personalizado pode transformar a gestão do seu negócio com dados em tempo real.',
    date: '2025-05-05',
    category: 'Tecnologia',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    slug: 'sites-que-vendem',
    title: '6 Características de Sites que Realmente Vendem',
    content: `Ter um site é obrigatório. Ter um site que vende é o que separa negócios que crescem de negócios que estagnam.\n\n**1. Responsivo** — 70% das visitas vêm do celular. Se o site não funciona bem no mobile, você perde 7 em cada 10 visitantes.\n\n**2. Rápido** — Um site que demora mais de 3 segundos para carregar perde 53% dos visitantes.\n\n**3. CTA claro** — O visitante precisa saber o que fazer: comprar, ligar, pedir orçamento. Se não estiver óbvio, ele vai embora.\n\n**4. SEO local** — Se você está em Franca, seu site precisa aparecer quando alguém pesquisa "site Franca-SP" ou "empresa de marketing Franca".\n\n**5. Provas sociais** — Depoimentos, cases, números. As pessoas confiam mais em quem já entregou.\n\n**6. WhatsApp integrado** — O brasileiro prefere falar no WhatsApp do que preencher formulário. Facilite o contato.`,
    excerpt: 'Conheça os elementos essenciais que transformam visitantes em clientes no seu site institucional.',
    date: '2025-04-28',
    category: 'Sites',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    slug: 'mentoria-digital-empreendedores',
    title: 'Mentoria Digital: O Atalho para Resultados Rápidos',
    content: `Todo empreendedor já passou por isso: sabe que precisa investir em digital, mas não sabe por onde começar.\n\nA mentoria digital existe exatamente para isso. Um profissional experiente que já fez dezenas de projetos te guia para não perder tempo (nem dinheiro) com tentativas e erros.\n\n**O que você leva da mentoria:**\n\n- Um diagnóstico realista do seu momento digital\n- Um plano de ação priorizado por impacto\n- Acompanhamento mensal para ajustar rotas\n- Sem bla-bla-blá teórico — só o que funciona na prática\n\nEmpresas que fazem mentoria digital estruturada chegam aos resultados 3x mais rápido do que quem tenta sozinho.`,
    excerpt: 'Como a mentoria digital pode acelerar seus resultados e evitar erros comuns de quem está começando.',
    date: '2025-04-20',
    category: 'Mentoria',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  },
  {
    slug: 'aplicativos-negocios',
    title: 'Por que seu negócio precisa de um aplicativo próprio?',
    content: `Um app próprio não é mais coisa de grande empresa. Com as tecnologias atuais, qualquer negócio pode ter seu aplicativo por uma fração do custo de alguns anos atrás.\n\n**Vantagens de ter um app:**\n\n- **Push notification** — avisa o cliente sobre promoções, novidades e lembretes sem depender de rede social\n- **Fidelização** — cliente com app na tela inicial compra mais e com mais frequência\n- **Menos concorrência** — no app, você não divide atenção com anúncio de concorrente\n- **Dados do cliente** — saiba o que cada cliente compra, quando compra e prefere\n\nApps para delivery, catálogo de produtos, agendamento de serviços ou programa de fidelidade. Cada vez mais negócios locais estão aderindo.`,
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

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Playfair_Display'] text-3xl font-bold text-white">Post não encontrado</h1>
          <p className="mt-3 text-[rgba(248,248,250,0.5)]">Volte para o blog e confira outros artigos.</p>
          <Link to="/blog" className="btn-primary mt-6 inline-flex">
            <ArrowLeft className="h-4 w-4" /> Voltar ao Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-[#030305]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,87,255,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[rgba(248,248,250,0.4)] transition hover:text-[#C9A84C]">
            <ArrowLeft className="h-3 w-3" /> Voltar ao Blog
          </Link>
          <div className="mt-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.15em]">
            <span className="rounded-full bg-[rgba(201,168,76,0.1)] px-3 py-1 text-[#C9A84C]">{post.category}</span>
            <span className="flex items-center gap-1 text-[rgba(248,248,250,0.35)]">
              <Calendar className="h-3 w-3" />
              {formatDate(post.date)}
            </span>
          </div>
          <h1 className="mt-4 font-['Playfair_Display'] text-3xl font-bold text-white sm:text-4xl">{post.title}</h1>
        </div>
      </section>

      <section className="pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <img src={post.img} alt={post.title} className="w-full rounded-2xl object-cover" />
          <div className="prose prose-invert prose-sm sm:prose-base mt-10 max-w-none text-[rgba(248,248,250,0.7)] leading-relaxed">
            {post.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('**')) {
                return <h3 key={i} className="mt-6 font-['Playfair_Display'] text-lg font-semibold text-white">{paragraph.replace(/\*\*/g, '')}</h3>;
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(l => l.startsWith('- '));
                return (
                  <ul key={i} className="my-4 space-y-2">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A84C]" />
                        {item.replace(/^- /, '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.match(/^\d+\.\s/)) {
                const items = paragraph.trim().split('\n').filter(l => l.match(/^\d+\.\s/));
                return (
                  <ol key={i} className="my-4 space-y-3">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(0,87,255,0.1)] text-[10px] font-bold text-[#0057FF]">{item.match(/^(\d+)/)?.[1]}</span>
                        {item.replace(/^\d+\.\s/, '')}
                      </li>
                    ))}
                  </ol>
                );
              }
              return <p key={i} className="mb-4 text-sm sm:text-base">{paragraph}</p>;
            })}
          </div>
          <div className="mt-12 border-t border-[rgba(255,255,255,0.06)] pt-8 text-center">
            <p className="text-sm text-[rgba(248,248,250,0.4)]">Gostou do conteúdo? Compartilhe ou entre em contato.</p>
            <a href="https://wa.me/5516999999999?text=Li%20o%20artigo%20sobre%20presença%20digital%20e%20quero%20saber%20mais" target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 inline-flex">
              <MessageCircle className="h-4 w-4" /> Fale Conosco
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
