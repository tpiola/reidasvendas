import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ArrowRight, MessageCircle, Globe, Clock, Shield } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal } from '@/hooks/useAnimation';
import { GoldParticles } from '@/components/GoldParticles';

export default function Obrigado() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <main>
      <GoldParticles count={25} />

      {/* Hero */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(166,111,24,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          {/* Success Icon */}
          <Reveal>
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(166,111,24,0.1)]">
              <CheckCircle2 className="h-10 w-10 text-gold" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="inline-block rounded-full bg-[rgba(166,111,24,0.1)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
              Pagamento Confirmado
            </span>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="mt-5 font-serif text-4xl font-bold text-text-primary sm:text-5xl md:text-6xl">
              Pagamento Confirmado!{' '}
              <span className="text-gradient-gold">🎉</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Seu site começa a ser construído em até <strong className="text-text-primary">24h úteis</strong>.
              Você receberá um email com os próximos passos e o cronograma completo.
            </p>
          </Reveal>

          {/* Session Info */}
          {sessionId && (
            <Reveal delay={0.25}>
              <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full border border-[rgba(166,111,24,0.12)] bg-[rgba(166,111,24,0.03)] px-4 py-2">
                <span className="text-xs text-text-muted">
                  Referência:{' '}
                  <span className="font-mono text-text-secondary">{sessionId.slice(0, 12)}...</span>
                </span>
              </div>
            </Reveal>
          )}

          {/* Trust badges */}
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-text-muted">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold" /> Entrega em até 7 dias
              </span>
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-gold" /> Garantia de 30 dias
              </span>
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gold" /> Domínio grátis incluso
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next Steps */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal>
            <div className="rounded-2xl border border-[rgba(166,111,24,0.12)] bg-[rgba(166,111,24,0.03)] p-6 sm:p-8">
              <h2 className="font-serif text-xl font-semibold text-text-primary">
                Próximos Passos
              </h2>
              <div className="mt-6 space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Email de Boas-Vindas',
                    desc: 'Você receberá um email com o link do nosso briefings e um formulário para contar sobre seu projeto.',
                  },
                  {
                    step: '2',
                    title: 'Briefing e Alinhamento',
                    desc: 'Respondemos em até 24h para alinhar expectativas, tirar dúvidas e definir o cronograma personalizado.',
                  },
                  {
                    step: '3',
                    title: 'Construção do Projeto',
                    desc: 'Nossa equipe trabalha no seu site enquanto você cuida do seu negócio. Você recebe atualizações semanais.',
                  },
                  {
                    step: '4',
                    title: 'Entrega e Treinamento',
                    desc: 'Seu site no ar, testado e otimizado. Mostramos como gerenciar e damos todo o suporte necessário.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start gap-4 rounded-xl border border-[rgba(28,25,20,0.05)] bg-[rgba(28,25,20,0.02)] p-4 transition-all duration-300 hover:border-[rgba(166,111,24,0.15)]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(166,111,24,0.1)] text-sm font-bold text-gold">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">{item.title}</h3>
                      <p className="mt-0.5 text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold bg-[length:200%_auto] px-8 py-3 text-base font-bold text-[#FFFDF8] transition-all duration-400 hover:bg-right hover:shadow-[0_0_40px_rgba(166,111,24,0.35),0_0_80px_rgba(166,111,24,0.12)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Ver Portfolio
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(166,111,24,0.22)] px-8 py-3 text-base font-semibold text-text-primary transition-all duration-400 hover:border-gold hover:bg-[rgba(166,111,24,0.08)] hover:shadow-[0_0_30px_rgba(166,111,24,0.1)] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4" />
                Falar pelo WhatsApp
              </a>
            </div>
            <p className="mt-4 text-center text-xs text-text-muted">
              Enquanto isso, veja o que já entregamos para outros clientes.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
