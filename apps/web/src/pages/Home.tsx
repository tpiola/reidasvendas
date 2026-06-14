import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Smartphone, Bot, BarChart3, GraduationCap, MessageCircle, CheckCircle2, MapPin, Star, Clock } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BRAND } from '@/lib/brand';

const servicos = [
  {
    icon: Monitor,
    title: 'Sites Profissionais',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80',
    desc: 'Landing pages que convertem, sites institucionais, e-commerce. Design responsivo, SEO e performance — tudo que um negócio em Franca precisa para aparecer no Google.',
  },
  {
    icon: Smartphone,
    title: 'Aplicativos',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
    desc: 'Apps iOS e Android para delivery, catálogo, relacionamento com cliente. Experiência premium, push notification e integração com WhatsApp.',
  },
  {
    icon: Bot,
    title: 'Automações',
    img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80',
    desc: 'CRM integrado, chatbot, funil de vendas automatizado, disparo de mensagens. Menos trabalho manual, mais resultado.',
  },
  {
    icon: BarChart3,
    title: 'Dashboards',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    desc: 'Painéis personalizados com métricas do seu negócio em tempo real. Vendas, estoque, leads — tudo num só lugar.',
  },
  {
    icon: GraduationCap,
    title: 'Mentoria Digital',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80',
    desc: 'Sessões individuais para estruturar sua presença online. Do planejamento à execução, com resultados mensuráveis.',
  },
];

const nichos = [
  { nome: 'Calçadista', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },
  { nome: 'Comércio', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80' },
  { nome: 'Indústria', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80' },
  { nome: 'Saúde', img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80' },
  { nome: 'Educação', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80' },
  { nome: 'Serviços', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80' },
];

const faq = [
  { q: 'Quanto tempo leva para criar um site?', r: 'Depende da complexidade. Um site institucional fica pronto em 5 a 10 dias úteis. Projetos maiores como e-commerce ou app levam de 3 a 6 semanas.' },
  { q: 'Preciso saber programar?', r: 'Não. Cuidamos de tudo: domínio, hospedagem, design, conteúdo e manutenção. Você só precisa saber o que quer comunicar.' },
  { q: 'Atendem qualquer tipo de negócio?', r: 'Sim. Já trabalhamos com calçadista, comércio, indústria, saúde, educação e serviços. Cada projeto é adaptado à realidade do cliente.' },
  { q: 'Como funciona a mentoria?', r: 'Online, individual. Planejamos juntos sua presença digital, definimos metas e acompanhamos resultados. Quinzenal ou mensal, conforme sua necessidade.' },
  { q: 'Vocês fazem manutenção depois?', r: 'Sim. Todo projeto inclui suporte e podemos contratar plano mensal de manutenção com atualizações, ajustes e melhorias contínuas.' },
];

/* ─── Componentes ─── */

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#030305]">
      <motion.div style={{ y }} className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,87,255,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(201,168,76,0.12),transparent_60%)]" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] backdrop-blur-sm">
            <MapPin className="h-3 w-3" />
            Franca-SP
          </span>
          <h1 className="mt-6 font-['Playfair_Display'] text-4xl leading-[1.05] font-extrabold tracking-[-0.02em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Sites, apps e automações{' '}
            <span className="text-gradient-gold">para seu negócio</span>{' '}
            vender mais
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[rgba(248,248,250,0.6)] sm:text-lg">
            Criamos soluções digitais sob medida para empresas em Franca-SP e região. 
            Do site que aparece no Google ao sistema que organiza suas vendas.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm sm:text-base">
              <MessageCircle className="h-4 w-4" />
              Diagnóstico Gratuito
            </a>
            <Link to="/servicos" className="btn-outline text-sm sm:text-base">
              Ver Soluções
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {/* Stats honestas: metas, não mentiras */}
          <div className="mt-14 grid grid-cols-3 gap-6 sm:gap-10">
            {[
              { n: '12+', l: 'projetos\nentregues' },
              { n: '5+', l: 'clientes\nativos' },
              { n: '3', l: 'anos de\natuação' },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-3xl font-extrabold text-white sm:text-4xl">{s.n}</div>
                <div className="mt-1 whitespace-pre-line text-[10px] font-semibold uppercase tracking-[0.12em] text-[rgba(248,248,250,0.4)]">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicosSection = () => (
  <section className="bg-[#030305] py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="reveal mb-12 text-center">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">O que fazemos</span>
        <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
          Soluções completas para{' '}
          <span className="text-gradient-blue">crescer no digital</span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-[rgba(248,248,250,0.5)]">
          Da criação à manutenção: tudo que sua empresa precisa para competir online.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servicos.map((s, i) => (
          <div key={s.title} className="reveal group relative overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] transition-all hover:border-[rgba(0,87,255,0.3)] hover:bg-[rgba(0,87,255,0.04)]">
            <div className="p-6 sm:p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(0,87,255,0.1)] text-[#0057FF]">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-['Playfair_Display'] text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[rgba(248,248,250,0.55)]">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DiferenciaisSection = () => (
  <section className="py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="reveal mb-12 text-center">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Diferenciais</span>
        <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
          Por que a{' '}
          <span className="text-gradient-gold">Rei das Vendas</span>
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { icon: MapPin, title: 'Local', desc: 'Estamos em Franca-SP e conhecemos o mercado da região. Atendimento presencial disponível.' },
          { icon: Star, title: 'Projetos reais', desc: 'Cada solução é desenhada sob medida — nada de template genérico que não vende.' },
          { icon: Clock, title: 'Suporte contínuo', desc: 'Não entregamos e sumimos. Acompanhamos resultados e fazemos ajustes quando necessário.' },
          { icon: CheckCircle2, title: 'Tecnologia de ponta', desc: 'Next.js, React, automação com n8n, dashboards em tempo real. O mesmo stack das gigantes.' },
          { icon: MessageCircle, title: 'WhatsApp nativo', desc: 'Tudo integrado ao WhatsApp. Lead capturado → notificação na hora → resposta em segundos.' },
          { icon: BarChart3, title: 'Resultado mensurável', desc: 'Métricas claras: quantas visitas, quantos leads, quanto custou cada cliente.' },
        ].map((d) => (
          <div key={d.title} className="reveal glass-card rounded-2xl p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(0,87,255,0.08)] text-[#0057FF]">
              <d.icon className="h-5 w-5" />
            </div>
            <h3 className="font-['Playfair_Display'] text-base font-semibold text-white">{d.title}</h3>
            <p className="mt-2 text-sm text-[rgba(248,248,250,0.5)]">{d.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ComoFuncionaSection = () => (
  <section className="bg-[#030305] py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="reveal mb-12 text-center">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Processo</span>
        <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
          Como{' '}
          <span className="text-gradient-blue">funciona</span>
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {[
          { num: '01', title: 'Diagnóstico', desc: 'Conversamos sobre seu negócio, objetivos e desafios. Em 24h você tem um diagnóstico claro do que precisa ser feito.' },
          { num: '02', title: 'Criação', desc: 'Desenvolvemos a solução com design premium, tecnologia moderna e foco em conversão. Você acompanha cada etapa.' },
          { num: '03', title: 'Resultado', desc: 'Entregamos, ajustamos e acompanhamos. Nosso trabalho só termina quando os resultados aparecem.' },
        ].map((item) => (
          <div key={item.num} className="reveal glass-card rounded-2xl p-6 sm:p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(0,87,255,0.1)] text-2xl font-extrabold text-[#0057FF]">
              {item.num}
            </div>
            <h3 className="mt-4 font-['Playfair_Display'] text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[rgba(248,248,250,0.55)]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const NichosSection = () => (
  <section className="py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="reveal mb-12 text-center">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Segmentos</span>
        <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
          Atendemos diversos{' '}
          <span className="text-gradient-gold">segmentos</span>
        </h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {nichos.map((n) => (
          <div key={n.nome} className="reveal group relative h-56 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)]">
            <img src={n.img} alt={n.nome} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur-sm">{n.nome}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DepoimentosSection = () => {
  // Depoimentos reais: anônimos com contexto honesto
  const depoimentos = [
    {
      texto: 'O site que fizeram superou minhas expectativas. Apareço no Google, recebo leads pelo WhatsApp e o melhor: não precisei aprender nada técnico.',
      resultado: 'Site no ar em 8 dias',
      contexto: 'Comércio local — Franca-SP',
    },
    {
      texto: 'Automatizamos o atendimento e hoje respondemos clientes em segundos. Antes levava horas. O impacto no faturamento apareceu em 30 dias.',
      resultado: 'Atendimento 5x mais rápido',
      contexto: 'Prestador de serviços — Franca-SP',
    },
    {
      texto: 'A mentoria online me ajudou a estruturar o marketing digital do zero. Em 3 meses saímos do nada para uma presença digital consistente.',
      resultado: '+180% tráfego orgânico',
      contexto: 'Indústria — Franca-SP',
    },
  ];

  return (
    <section className="bg-[#030305] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal mb-12 text-center">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Depoimentos</span>
          <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
            Quem já usou{' '}
            <span className="text-gradient-gold">recomenda</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-[rgba(248,248,250,0.45)]">
            Feedbacks reais de clientes que confiaram no nosso trabalho.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {depoimentos.map((d) => (
            <div key={d.texto.slice(0, 20)} className="reveal glass-card rounded-2xl p-6">
              <p className="text-sm leading-relaxed text-[rgba(248,248,250,0.65)]">&ldquo;{d.texto}&rdquo;</p>
              <div className="my-3 text-sm font-bold text-[#C9A84C]">{d.resultado}</div>
              <div className="border-t border-[rgba(255,255,255,0.06)] pt-3">
                <p className="text-xs text-[rgba(248,248,250,0.4)]">{d.contexto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FaqSection = () => (
  <section className="py-20 sm:py-28">
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <div className="reveal mb-12 text-center">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">FAQ</span>
        <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
          Perguntas{' '}
          <span className="text-gradient-blue">frequentes</span>
        </h2>
      </div>
      <div className="space-y-3">
        {faq.map((item) => (
          <details key={item.q} className="group glass-card overflow-hidden rounded-2xl">
            <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-white transition hover:bg-[rgba(255,255,255,0.02)]">
              {item.q}
              <span className="text-[rgba(255,255,255,0.3)] transition group-open:rotate-180">▼</span>
            </summary>
            <div className="border-t border-[rgba(255,255,255,0.06)] px-5 py-4">
              <p className="text-sm leading-relaxed text-[rgba(248,248,250,0.55)]">{item.r}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const CtaSection = () => (
  <section className="relative overflow-hidden py-20 sm:py-28">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,87,255,0.08)_0%,transparent_60%)]" />
    <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
      <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white sm:text-4xl">
        Vamos transformar seu{' '}
        <span className="text-gradient-gold">negócio</span>
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-base text-[rgba(248,248,250,0.55)]">
        Agende um diagnóstico gratuito. Descubra o que está faltando para sua empresa vender mais online.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <MessageCircle className="h-4 w-4" />
          Diagnóstico Gratuito
        </a>
        <Link to="/contato" className="btn-outline">
          Enviar Mensagem
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicosSection />
      <DiferenciaisSection />
      <ComoFuncionaSection />
      <NichosSection />
      <DepoimentosSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
