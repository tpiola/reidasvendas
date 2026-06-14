import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Smartphone, Bot, BarChart3, GraduationCap, MessageCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BRAND } from '@/lib/brand';

const servicos = [
  { icon: Monitor, title: 'Sites Profissionais', img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80', desc: 'Landing pages e sites institucionais responsivos, otimizados para SEO e taxa de conversão.' },
  { icon: Smartphone, title: 'Aplicativos', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80', desc: 'Aplicativos nativos e híbridos para iOS e Android com experiência de usuário premium.' },
  { icon: Bot, title: 'Automações', img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80', desc: 'Funil de vendas automatizado com CRM, WhatsApp, e-mail e n8n.' },
  { icon: BarChart3, title: 'Dashboards', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80', desc: 'Painéis de gestão personalizados com métricas em tempo real e exportação de dados.' },
  { icon: GraduationCap, title: 'Mentoria', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80', desc: 'Sessões individuais para estruturar presença digital, funil e estratégia de crescimento.' },
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
  { q: 'Quanto tempo leva para criar um site?', r: 'Nosso processo leva em média 5 a 10 dias úteis, dependendo da complexidade do projeto.' },
  { q: 'Preciso ter conhecimento técnico?', r: 'Não. Cuidamos de tudo: domínio, hospedagem, design, conteúdo e manutenção.' },
  { q: 'Vocês atendem qualquer nicho?', r: 'Sim. Trabalhamos com calçadista, comércio, indústria, saúde, educação e serviços.' },
  { q: 'Como funciona a mentoria?', r: 'A mentoria é 100% online, com sessões individuais e materiais exclusivos para acelerar seus resultados.' },
  { q: 'Qual o investimento mínimo?', r: 'Temos planos a partir de R$ 97/mês. Cada solução é customizada para sua necessidade.' },
];

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
  <section className="relative flex min-h-[95vh] items-center overflow-hidden bg-[#030305]">
    <motion.div style={{ y }} className="absolute inset-0 opacity-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,87,255,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(201,168,76,0.15),transparent_60%)]" />
    </motion.div>
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
      <div className="max-w-3xl">
        <span className="reveal inline-block rounded-full border border-white/10 bg-white/5 backdrop-blur px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A84C]">
          Diagnóstico gratuito · Resposta em 24h
        </span>
        <h1 className="reveal reveal-delay-1 mt-6 font-['Playfair_Display'] text-5xl leading-[1.05] font-extrabold tracking-[-0.02em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
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
        <div className="mt-14 grid grid-cols-3 gap-8 text-white">
          {[{ n: '+47', l: 'clientes' }, { n: '+82', l: 'projetos' }, { n: '+11', l: 'anos Franca' }].map((s) => (
            <div key={s.l} className="reveal text-center">
              <div className="text-4xl font-extrabold bg-gradient-to-r from-[#C9A84C] to-[#F0D080] bg-clip-text text-transparent">{s.n}</div>
              <div className="text-xs text-white/60">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

const ServicosSection = () => (
  <section className="bg-[#030305] py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="reveal mb-14 text-center">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">O que fazemos</span>
        <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
          Soluções Completas para o{' '}
          <span className="text-gradient-blue">Digital</span>
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {servicos.map((s, i) => (
          <div key={s.title} className={`reveal reveal-delay-${(i % 4) + 1} group relative overflow-hidden rounded-2xl`}>
            <img src={s.img} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur text-white">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{s.desc}</p>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[#0057FF]/60" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const NichosSection = () => (
  <section className="py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="reveal mb-14 text-center">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Nichos</span>
        <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
          Atendemos Diversos{' '}
          <span className="text-gradient-gold">Segmentos</span>
        </h2>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {nichos.map((n, i) => (
          <div key={n.nome} className={`reveal reveal-delay-${(i % 4) + 1} group relative h-64 overflow-hidden rounded-2xl`}>
            <img src={n.img} alt={n.nome} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">{n.nome}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ComoFuncionaSection = () => (
  <section className="bg-[#030305] py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="reveal mb-14 text-center">
        <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Processo</span>
        <h2 className="font-['Playfair_Display'] mt-3 text-3xl font-bold text-white sm:text-4xl">
          Como{' '}
          <span className="text-gradient-blue">Funciona</span>
        </h2>
      </div>
      <div className="space-y-16">
        {[
          { num: '01', title: 'Diagnóstico Estratégico', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80', desc: 'Entendemos profundamente seu negócio, mercado e oportunidades para construir uma estratégia digital sólida.' },
          { num: '02', title: 'Criação e Implementação', img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&q=80', desc: 'Desenvolvemos soluções sob medida com design premium, tecnologia moderna e foco total em conversão.' },
          { num: '03', title: 'Otimização e Crescimento', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80', desc: 'Monitoramos, ajustamos e escalamos sua operação digital com base em dados e resultados reais.' },
        ].map((item, i) => (
          <div key={item.num} className={`reveal reveal-delay-${(i % 4) + 1} grid items-center gap-8 md:grid-cols-2`}>
            <img src={item.img} alt="" className="h-64 w-full rounded-2xl object-cover" />
            <div>
              <div className="text-5xl font-extrabold text-[#0057FF]">{item.num}</div>
              <h3 className="mt-2 font-['Playfair_Display'] text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DepoimentosSection = () => {
  const depoimentos = [
    { nome: 'Rafael Mendes', cargo: 'Diretor, Calçados Franca Prime', texto: 'Saímos de praticamente zero presença digital para uma máquina previsível de vendas.', resultado: '+312% leads em 90 dias' },
    { nome: 'Dra. Juliana Prado', cargo: 'Clínica Integrada Franca', texto: 'Hoje temos agenda cheia com pacientes qualificados vindos do digital todos os dias.', resultado: 'Agenda lotada em 60 dias' },
    { nome: 'Eduardo Nogueira', cargo: 'Indústria CouroTech', texto: 'Automatizamos nosso comercial e reduzimos drasticamente o tempo de resposta ao cliente.', resultado: '-68% tempo de atendimento' },
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
        <div className="grid gap-8 md:grid-cols-3">
          {depoimentos.map((d, i) => (
            <div key={d.nome} className={`reveal reveal-delay-${(i % 4) + 1} rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6`}>
              <p className="text-sm leading-relaxed text-white/70">{d.texto}</p>
              <div className="mt-4 text-lg font-bold text-[#C9A84C]">{d.resultado}</div>
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{d.nome}</p>
                <p className="text-xs text-white/50">{d.cargo}</p>
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
