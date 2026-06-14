import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Smartphone, Bot, BarChart3, GraduationCap, MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/brand';

const servicos = [
  { icon: Monitor, title: 'Sites Profissionais', desc: 'Landing pages e sites institucionais de alta conversão, responsivos e otimizados para SEO.' },
  { icon: Smartphone, title: 'Aplicativos', desc: 'Apps nativos e híbridos para iOS e Android com experiência premium e performance.' },
  { icon: Bot, title: 'Automações', desc: 'Automação de marketing, vendas e atendimento com CRM, WhatsApp e e-mail integrados.' },
  { icon: BarChart3, title: 'Dashboards', desc: 'Painéis de gestão personalizados com dados em tempo real para decisões inteligentes.' },
  { icon: GraduationCap, title: 'Mentoria', desc: 'Mentoria digital para estruturar vendas online e presença digital do zero à escala.' },
];

const nichos = [
  { nome: 'Calçadista', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80' },
  { nome: 'Comércio', img: 'https://images.unsplash.com/photo-1553729459-afe8f2e2b59b?w=600&q=80' },
  { nome: 'Indústria', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80' },
  { nome: 'Saúde', img: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80' },
  { nome: 'Educação', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80' },
  { nome: 'Serviços', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80' },
];

const faq = [
  { q: 'Quanto tempo leva para criar um site?', r: 'Nosso processo leva em média 5 a 10 dias úteis, dependendo da complexidade do projeto.' },
  { q: 'Preciso ter conhecimento técnico?', r: 'Não. Cuidamos de tudo: domínio, hospedagem, design, conteúdo e manutenção.' },
  { q: 'Vocês atendem qualquer nicho?', r: 'Sim. Trabalhamos com calçadista, comércio, indústria, saúde, educação e serviços.' },
  { q: 'Como funciona a mentoria?', r: 'A mentoria é 100% online, com sessões individuais e materiais exclusivos para acelerar seus resultados.' },
  { q: 'Qual o investimento mínimo?', r: 'Temos planos a partir de R$ 97/mês. Cada solução é customizada para sua necessidade.' },
];

const HeroSection = () => (
  <section className="relative flex min-h-[90vh] items-center overflow-hidden">
    {/* Background parallax */}
    <div
      className="hero-parallax absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=80)',
      }}
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(3,3,5,0.92)] via-[rgba(3,3,5,0.7)] to-[rgba(3,3,5,0.4)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,87,255,0.15)_0%,transparent_60%)]" />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <div className="max-w-3xl">
        <span className="reveal inline-block rounded-full border border-[#C9A84C]/30 bg-[rgba(201,168,76,0.1)] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">
          Soluções Digitais Premium
        </span>
        <h1 className="reveal reveal-delay-1 mt-6 font-['Playfair_Display'] text-4xl leading-tight font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Soluções Digitais que{' '}
          <span className="text-gradient-gold">Transformam</span>{' '}
          Negócios
        </h1>
        <p className="reveal reveal-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-[rgba(248,248,250,0.6)]">
          Sites profissionais, aplicativos, automações e mentoria para negócios locais que querem competir com quem já domina o digital.
        </p>
        <div className="reveal reveal-delay-3 mt-8 flex flex-wrap gap-4">
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle className="h-4 w-4" />
            Fale Conosco
          </a>
          <Link to="/servicos" className="btn-outline">
            Ver Serviços
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const ServicosSection = () => (
  <section className="bg-[#08080B] py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="reveal mb-14 text-center">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">O que fazemos</span>
        <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
          Soluções Completas para o{' '}
          <span className="text-gradient-blue">Digital</span>
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servicos.map((s, i) => (
          <div key={s.title} className={`reveal reveal-delay-${(i % 4) + 1} glass-card group rounded-2xl p-6 sm:p-8`}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(0,87,255,0.1)] text-[#0057FF] transition group-hover:bg-[#0057FF] group-hover:text-white">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[rgba(248,248,250,0.5)]">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const NichosSection = () => (
  <section className="py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="reveal mb-14 text-center">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Nichos</span>
        <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
          Atendemos Diversos{' '}
          <span className="text-gradient-gold">Segmentos</span>
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {nichos.map((n, i) => (
          <div key={n.nome} className={`reveal reveal-delay-${(i % 4) + 1} group relative h-56 overflow-hidden rounded-2xl`}>
            <img src={n.img} alt={n.nome} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,3,5,0.85)] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-white">{n.nome}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ComoFuncionaSection = () => (
  <section className="bg-[#08080B] py-20 sm:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="reveal mb-14 text-center">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Processo</span>
        <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
          Como{' '}
          <span className="text-gradient-blue">Funciona</span>
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {[
          { num: '01', title: 'Diagnóstico', desc: 'Entendemos seu negócio, objetivos e desafios para criar a solução ideal.' },
          { num: '02', title: 'Criação', desc: 'Desenvolvemos sob medida com design premium, tecnologia de ponta e foco em conversão.' },
          { num: '03', title: 'Resultados', desc: 'Acompanhamos, otimizamos e garantimos que sua presença digital gere negócios.' },
        ].map((item, i) => (
          <div key={item.num} className={`reveal reveal-delay-${(i % 4) + 1} text-center`}>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(0,87,255,0.1)] text-2xl font-bold text-[#0057FF] font-['Playfair_Display']">
              {item.num}
            </div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[rgba(248,248,250,0.5)]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DepoimentosSection = () => {
  const depoimentos = [
    { nome: 'Carlos Silva', cargo: 'CEO, Calçados Silva', texto: 'A Rei das Vendas transformou nossa presença digital. Nosso site triplicou o número de leads em apenas 2 meses.' },
    { nome: 'Ana Oliveira', cargo: 'Diretora, Clínica Oliveira', texto: 'O dashboard de gestão que desenvolveram para nós revolucionou a forma como tomamos decisões.' },
    { nome: 'Marcos Santos', cargo: 'Fundador, EducaMais', texto: 'A mentoria digital foi um divisor de águas. Estruturaram todo nosso funil de vendas do zero.' },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal mb-14 text-center">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Depoimentos</span>
          <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
            Quem Já Usa{' '}
            <span className="text-gradient-gold">Recomenda</span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {depoimentos.map((d, i) => (
            <div key={d.nome} className={`reveal reveal-delay-${(i % 4) + 1} glass-card rounded-2xl p-6 sm:p-8`}>
              <div className="mb-4 text-[#C9A84C]">
                {'"'}
              </div>
              <p className="text-sm leading-relaxed text-[rgba(248,248,250,0.65)]">{d.texto}</p>
              <div className="mt-4 border-t border-[rgba(255,255,255,0.06)] pt-4">
                <p className="text-sm font-semibold text-white">{d.nome}</p>
                <p className="text-xs text-[rgba(248,248,250,0.4)]">{d.cargo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FaqSection = () => (
  <section className="bg-[#08080B] py-20 sm:py-28">
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <div className="reveal mb-14 text-center">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">FAQ</span>
        <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
          Perguntas{' '}
          <span className="text-gradient-blue">Frequentes</span>
        </h2>
      </div>
      <div className="space-y-3">
        {faq.map((item) => (
          <details key={item.q} className="group glass-card rounded-2xl overflow-hidden">
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
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80)',
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(3,3,5,0.92)] to-[rgba(3,3,5,0.8)]" />
    <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
      <h2 className="reveal font-['Playfair_Display'] text-3xl font-bold text-white sm:text-4xl">
        Vamos Transformar seu{' '}
        <span className="text-gradient-gold">Negócio</span>
      </h2>
      <p className="reveal reveal-delay-1 mt-4 text-lg text-[rgba(248,248,250,0.6)]">
        Agende uma conversa sem compromisso e descubra como podemos ajudar sua empresa a crescer no digital.
      </p>
      <div className="reveal reveal-delay-2 mt-8 flex flex-wrap justify-center gap-4">
        <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <MessageCircle className="h-4 w-4" />
          Fale Conosco
        </a>
        <Link to="/contato" className="btn-outline">
          Enviar Mensagem
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
      <NichosSection />
      <ComoFuncionaSection />
      <DepoimentosSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
