import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Smartphone, Bot, BarChart3, GraduationCap, MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/brand';

const servicosDetalhados = [
  {
    icon: Monitor,
    title: 'Sites Profissionais',
    desc: 'Landing pages de alta conversão, sites institucionais, e-commerces e portais. Design responsivo, otimização SEO, performance e experiência do usuário premium.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    beneficios: ['Design responsivo mobile-first', 'Otimizado para SEO', 'Alta velocidade de carregamento', 'Integração com WhatsApp e redes sociais'],
  },
  {
    icon: Smartphone,
    title: 'Aplicativos',
    desc: 'Apps nativos e híbridos para iOS e Android. Experiência do usuário impecável, performance nativa e funcionalidades sob medida para seu negócio.',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    beneficios: ['iOS e Android', 'UI/UX premium', 'Notificações push', 'Integração com APIs'],
  },
  {
    icon: Bot,
    title: 'Automações',
    desc: 'Automação de marketing, vendas e atendimento. CRM integrado, chatbots inteligentes, disparo de mensagens e funis automatizados.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    beneficios: ['CRM integrado', 'Chatbot inteligente', 'Disparo em massa', 'Funil automatizado'],
  },
  {
    icon: BarChart3,
    title: 'Dashboards',
    desc: 'Painéis de gestão personalizados com dados em tempo real. Visualização clara de indicadores, gráficos interativos e relatórios automáticos.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    beneficios: ['Dados em tempo real', 'Gráficos interativos', 'Exportação de relatórios', 'Alertas inteligentes'],
  },
  {
    icon: GraduationCap,
    title: 'Mentoria',
    desc: 'Mentoria digital completa para empreendedores. Estruturação de vendas online, marketing digital, tráfego pago e presença digital.',
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    beneficios: ['Sessões individuais', 'Material exclusivo', 'Suporte contínuo', 'Resultados mensuráveis'],
  },
];

export default function Servicos() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-[#030305]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,87,255,0.1)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <span className="reveal inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A84C]">Serviços</span>
          <h1 className="reveal reveal-delay-1 mt-4 font-['Playfair_Display'] text-4xl font-bold text-white sm:text-5xl">
            Soluções Digitais{' '}
            <span className="text-gradient-blue">Completas</span>
          </h1>
          <p className="reveal reveal-delay-2 mx-auto mt-4 max-w-xl text-lg text-[rgba(248,248,250,0.55)]">
            Do diagnóstico à execução, tudo que seu negócio precisa para crescer no digital.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8">
            {servicosDetalhados.map((s, i) => (
              <div key={s.title} className={`reveal reveal-delay-${(i % 4) + 1} glass-card grid overflow-hidden rounded-2xl md:grid-cols-2 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="relative h-56 overflow-hidden md:h-auto">
                  <img src={s.img} alt={s.title} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[rgba(3,3,5,0.4)] to-transparent" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(0,87,255,0.1)] text-[#0057FF]">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white">{s.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-[rgba(248,248,250,0.55)]">{s.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {s.beneficios.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-[rgba(248,248,250,0.5)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0057FF]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[rgba(255,255,255,0.06)] py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="reveal font-['Playfair_Display'] text-2xl font-bold text-white sm:text-3xl">
            Pronto para Transformar seu Negócio?
          </h2>
          <p className="reveal reveal-delay-1 mt-3 text-[rgba(248,248,250,0.55)]">
            Agende uma conversa gratuita e descubra a solução ideal para sua empresa.
          </p>
          <div className="reveal reveal-delay-2 mt-6 flex flex-wrap justify-center gap-4">
            <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle className="h-4 w-4" />
              Fale Conosco
            </a>
            <Link to="/contato" className="btn-outline">
              Enviar Mensagem <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
