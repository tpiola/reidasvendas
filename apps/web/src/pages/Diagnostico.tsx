import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, MessageCircle, ShieldCheck } from 'lucide-react';
import { PremiumButton } from '@/components/PremiumButton';
import { Reveal, SectionLabel } from '@/hooks/useAnimation';
import { BRAND } from '@/lib/brand';
import { captureAttribution, trackEvent } from '@/lib/analytics';
import { SOLUTIONS } from '@/lib/growth';

type FormData = {
  nome: string;
  whatsapp: string;
  segmento: string;
  email: string;
  presencaDigital: string;
  objetivo: string;
  solucao: string;
  problema: string;
  investimento: string;
  consentimento: boolean;
};

type DeliveryMode = 'webhook' | 'whatsapp_handoff';

const initialData: FormData = {
  nome: '',
  whatsapp: '',
  segmento: '',
  email: '',
  presencaDigital: '',
  objetivo: '',
  solucao: '',
  problema: '',
  investimento: '',
  consentimento: false,
};

const inputClass =
  'w-full rounded-xl border border-white/10 bg-[#0D0D0D] px-4 py-3 text-white placeholder:text-[#52525B] focus:border-[#D6A84F] focus:outline-none';
const labelClass = 'mb-2 block text-xs font-medium text-[#A1A1AA]';

const trustItems = [
  'Diagnóstico antes de qualquer proposta',
  'Análise feita a partir do contexto informado',
  'Foco em prioridades reais',
  'Sem promessa de primeiro lugar no Google',
  'WhatsApp liberado somente após a qualificação',
];

export default function Diagnostico() {
  const [searchParams] = useSearchParams();
  const [etapa, setEtapa] = useState<1 | 2>(1);
  const [dados, setDados] = useState<FormData>(() => ({ ...initialData, solucao: searchParams.get('solucao') || '' }));
  const [sucesso, setSucesso] = useState(false);
  const [entrega, setEntrega] = useState<DeliveryMode>('webhook');
  const [formStarted, setFormStarted] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const stageHeadingRef = useRef<HTMLHeadingElement>(null);
  const stageTransitionReady = useRef(false);

  const whatsappMessage = [
    'Olá! Acabei de concluir o Mapeamento de Perfil Diamante.',
    `Nome: ${dados.nome}.`,
    `E-mail: ${dados.email}.`,
    `WhatsApp para retorno: ${dados.whatsapp}.`,
    `Negócio: ${dados.segmento}.`,
    `Necessidade: ${dados.solucao}.`,
    `Problema: ${dados.problema}.`,
    `Objetivo comercial: ${dados.objetivo}.`,
    `Faixa de investimento: ${dados.investimento}.`,
  ].join('\n');
  const contextualWhatsapp = `https://wa.me/${BRAND.phone}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    trackEvent('view_diagnostico', { service: searchParams.get('solucao') || undefined, origin: searchParams.get('origem') || undefined });
  }, [searchParams]);

  useEffect(() => {
    if (!stageTransitionReady.current) {
      stageTransitionReady.current = true;
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      const heading = stageHeadingRef.current;
      if (!heading) return;

      const headerOffset = 112;
      const top = Math.max(0, window.scrollY + heading.getBoundingClientRect().top - headerOffset);
      heading.focus({ preventScroll: true });
      window.scrollTo({
        top,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [etapa, sucesso]);

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setDados((current) => ({ ...current, [field]: value }));
  };

  const handleFormStart = () => {
    if (formStarted) return;
    setFormStarted(true);
    trackEvent('form_start', { form: 'diagnostico', service: dados.solucao || undefined });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro('');

    if (etapa === 1) {
      setEtapa(2);
      trackEvent('diagnostic_step', { step: 2, service: dados.solucao });
      return;
    }

    if (!dados.consentimento) {
      setErro('Confirme o uso dos seus dados para responder ao diagnóstico.');
      return;
    }

    setEnviando(true);
    const attribution = captureAttribution();
    const mensagem = [
      `Segmento: ${dados.segmento}`,
      `Solução: ${dados.solucao}`,
      `Problema: ${dados.problema}`,
      `Objetivo: ${dados.objetivo || 'Não informado'}`,
      `Investimento: ${dados.investimento}`,
      `Presença digital: ${dados.presencaDigital || 'Não informada'}`,
      `Estágio: ${searchParams.get('estagio') || 'Não informado'}`,
    ].join('\n');

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: dados.nome,
          nome: dados.nome,
          email: dados.email,
          phone: dados.whatsapp,
          whatsapp: dados.whatsapp,
          company: dados.segmento,
          ramo: dados.segmento,
          source: 'diagnostico-soberano',
          origem: 'diagnostico-soberano',
          message: mensagem,
          mensagem,
          service: dados.solucao,
          problem: dados.problema,
          investment: dados.investimento,
          landingPage: attribution.landing_page,
          consent: true,
          utm: attribution,
        }),
      });

      if (!response.ok) throw new Error('lead_delivery_failed');
      const body = await response.json().catch(() => ({}));
      if (body.ok === false) throw new Error('lead_delivery_failed');

      const delivery: DeliveryMode = body.delivery === 'whatsapp_handoff' ? 'whatsapp_handoff' : 'webhook';
      setEntrega(delivery);
      trackEvent('form_submit', { form: 'diagnostico', service: dados.solucao, investment: dados.investimento, segment: dados.segmento, delivery });
      setSucesso(true);
      trackEvent('thank_you_view', { service: dados.solucao, delivery });
    } catch {
      setErro('Não foi possível registrar o diagnóstico agora. Revise sua conexão e tente novamente.');
      trackEvent('form_error', { form: 'diagnostico', service: dados.solucao });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#030303] text-white">
      <section className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(214,168,79,0.16),transparent_34%),radial-gradient(circle_at_85%_70%,rgba(242,211,138,0.08),transparent_30%)]"
        />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <Reveal className="mx-auto max-w-4xl text-center">
            <SectionLabel>Mapeamento de Perfil Diamante</SectionLabel>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-7xl">
              Antes de recomendar tecnologia, entendemos a sua operação.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Informe seu negócio, a necessidade, o problema e a faixa de investimento. Depois do envio,
              você recebe acesso a uma conversa contextualizada pelo WhatsApp.
            </p>
          </Reveal>

          <div className="mt-14 grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:gap-12">
            <Reveal>
              <div className="rounded-3xl border border-white/[0.08] bg-[#090909] p-6 shadow-2xl shadow-black/40 sm:p-8">
                {!sucesso ? (
                  <>
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6A84F]">
                          Etapa {etapa} de 2
                        </p>
                        <h2 ref={stageHeadingRef} tabIndex={-1} className="mt-2 font-serif text-2xl font-bold text-white outline-none sm:text-3xl">
                          {etapa === 1 ? 'Qual é o contexto da sua operação?' : 'Como devemos encaminhar seu diagnóstico?'}
                        </h2>
                      </div>
                      <div className="flex gap-2" aria-label={`Etapa ${etapa} de 2`}>
                        {[1, 2].map((item) => (
                          <span
                            key={item}
                            className={`h-1.5 w-10 rounded-full ${item <= etapa ? 'bg-[#D6A84F]' : 'bg-white/10'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} onFocus={handleFormStart} className="space-y-5">
                      {etapa === 1 ? (
                        <>
                          <div>
                            <label htmlFor="nome" className={labelClass}>Nome</label>
                            <input
                              id="nome"
                              name="nome"
                              type="text"
                              autoComplete="name"
                              required
                              value={dados.nome}
                              onChange={(event) => updateField('nome', event.target.value)}
                              placeholder="Como podemos chamar você?"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label htmlFor="segmento" className={labelClass}>Qual é o seu negócio?</label>
                            <select
                              id="segmento"
                              name="segmento"
                              required
                              value={dados.segmento}
                              onChange={(event) => updateField('segmento', event.target.value)}
                              className={inputClass}
                            >
                              <option value="" disabled>Selecione seu segmento</option>
                              <option value="clinica-saude">Clínica / saúde</option>
                              <option value="estetica">Estética</option>
                              <option value="restaurante-delivery">Restaurante / delivery</option>
                              <option value="oficina">Oficina</option>
                              <option value="pet-shop">Pet shop</option>
                              <option value="advocacia">Advocacia</option>
                              <option value="imobiliaria">Imobiliária</option>
                              <option value="contabilidade">Contabilidade</option>
                              <option value="representacao-comercial">Representação comercial</option>
                              <option value="escola-curso">Escola / curso</option>
                              <option value="servico-local">Serviço local</option>
                              <option value="industria-distribuidora">Indústria / distribuidora</option>
                              <option value="profissional-liberal">Profissional liberal</option>
                              <option value="outro">Outro</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="solucao" className={labelClass}>O que você precisa?</label>
                            <select id="solucao" name="solucao" required value={dados.solucao} onChange={(event) => updateField('solucao', event.target.value)} className={inputClass}>
                              <option value="" disabled>Selecione a necessidade principal</option>
                              {SOLUTIONS.map((solution) => <option key={solution.slug} value={solution.slug}>{solution.title}</option>)}
                              <option value="ainda-nao-sei">Ainda preciso entender a melhor solução</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="problema" className={labelClass}>Qual problema você quer resolver?</label>
                            <textarea id="problema" name="problema" required rows={3} maxLength={1000} value={dados.problema} onChange={(event) => updateField('problema', event.target.value)} placeholder="Explique onde a operação perde oportunidades ou exige esforço manual." className={inputClass} />
                          </div>
                          <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] px-6 py-3.5 font-bold text-[#030303] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:ring-offset-2 focus:ring-offset-[#090909]"
                          >
                            Continuar <ArrowRight size={18} aria-hidden="true" />
                          </button>
                        </>
                      ) : (
                        <>
                          <div>
                            <label htmlFor="investimento" className={labelClass}>Faixa de investimento disponível</label>
                            <select id="investimento" name="investimento" required value={dados.investimento} onChange={(event) => updateField('investimento', event.target.value)} className={inputClass}>
                              <option value="" disabled>Selecione uma faixa aproximada</option>
                              <option value="ate-2500">Até R$ 2.500</option>
                              <option value="2500-5000">R$ 2.500 a R$ 5.000</option>
                              <option value="5000-10000">R$ 5.000 a R$ 10.000</option>
                              <option value="10000-25000">R$ 10.000 a R$ 25.000</option>
                              <option value="acima-25000">Acima de R$ 25.000</option>
                              <option value="preciso-definir">Ainda preciso definir</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="whatsapp" className={labelClass}>WhatsApp para retorno</label>
                            <input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" required minLength={10} maxLength={20} value={dados.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)} placeholder="(16) 99999-9999" className={inputClass} />
                          </div>
                          <div>
                            <label htmlFor="email" className={labelClass}>E-mail</label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              value={dados.email}
                              onChange={(event) => updateField('email', event.target.value)}
                              placeholder="voce@empresa.com.br"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label htmlFor="presenca-digital" className={labelClass}>
                              Site ou perfil do Google <span className="text-[#71717A]">(opcional)</span>
                            </label>
                            <input
                              id="presenca-digital"
                              name="presencaDigital"
                              type="text"
                              value={dados.presencaDigital}
                              onChange={(event) => updateField('presencaDigital', event.target.value)}
                              placeholder="https://seusite.com.br ou link do perfil"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label htmlFor="objetivo" className={labelClass}>Principal objetivo comercial</label>
                            <select
                              id="objetivo"
                              name="objetivo"
                              required
                              value={dados.objetivo}
                              onChange={(event) => updateField('objetivo', event.target.value)}
                              className={inputClass}
                            >
                              <option value="" disabled>Selecione o principal objetivo</option>
                              <option value="mais-contatos">Receber mais contatos</option>
                              <option value="agendar">Gerar mais agendamentos</option>
                              <option value="vender-mais">Vender mais</option>
                              <option value="automatizar-atendimento">Automatizar o atendimento</option>
                              <option value="sistema-app">Criar um sistema ou app</option>
                              <option value="nao-sei">Ainda preciso entender</option>
                            </select>
                          </div>
                          <label className="flex items-start gap-3 text-xs leading-5 text-[#A1A1AA]"><input type="checkbox" required checked={dados.consentimento} onChange={(event) => updateField('consentimento', event.target.checked)} className="mt-1 accent-[#D6A84F]" />Autorizo o uso destas informações exclusivamente para análise e retorno sobre esta solicitação.</label>
                          {erro ? <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-100">{erro}</p> : null}
                          <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
                            <button
                              type="button"
                              onClick={() => setEtapa(1)}
                              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3.5 font-semibold text-[#D4D4D8] transition hover:border-[#D6A84F]/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D6A84F]"
                            >
                              <ArrowLeft size={18} aria-hidden="true" /> Voltar
                            </button>
                            <button
                              type="submit"
                              disabled={enviando}
                              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] px-6 py-3.5 font-bold text-[#030303] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:ring-offset-2 focus:ring-offset-[#090909]"
                            >
                              {enviando ? <>Registrando diagnóstico <Loader2 size={18} className="animate-spin" aria-hidden="true" /></> : <>Registrar meu diagnóstico <ArrowRight size={18} aria-hidden="true" /></>}
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                    <p className="mt-5 text-center text-xs leading-relaxed text-[#71717A]">
                      Seus dados são usados somente para analisar e responder a esta solicitação.
                    </p>
                  </>
                ) : (
                  <div className="flex min-h-[460px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D6A84F]/30 bg-[#D6A84F]/10 text-[#F2D38A]">
                      <CheckCircle2 size={32} aria-hidden="true" />
                    </div>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#D6A84F]">
                      {entrega === 'whatsapp_handoff' ? 'Diagnóstico preparado para envio' : 'Diagnóstico registrado'}
                    </p>
                    <h2 ref={stageHeadingRef} tabIndex={-1} className="mt-3 font-serif text-3xl font-bold text-white outline-none sm:text-4xl">Agora sua conversa começa com contexto.</h2>
                    <p className="mt-4 max-w-lg leading-relaxed text-[#A1A1AA]">
                      {entrega === 'whatsapp_handoff'
                        ? 'Seu diagnóstico está organizado, mas ainda precisa ser enviado. Abra o WhatsApp e confirme o envio da mensagem para a nossa equipe.'
                        : 'Seu negócio, a solução procurada, o problema e a faixa de investimento foram registrados. Abra o WhatsApp com essas informações já organizadas.'}
                    </p>
                    <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
                      <PremiumButton
                        href={contextualWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="lg"
                        onClick={() => trackEvent('whatsapp_open', { service: dados.solucao, investment: dados.investimento, origin: 'diagnostico-concluido' })}
                      >
                        <MessageCircle size={18} aria-hidden="true" /> Abrir conversa qualificada
                      </PremiumButton>
                      <Link to="/blog" className="btn-outline-gold inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold">
                        Ver conteúdos do blog
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="glass-card rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D6A84F]/20 bg-[#D6A84F]/10 text-[#F2D38A]">
                  <ShieldCheck size={25} aria-hidden="true" />
                </div>
                <h2 className="mt-6 font-serif text-3xl font-bold leading-tight text-white">
                  Clareza para decidir o que fazer primeiro.
                </h2>
                <p className="mt-4 leading-relaxed text-[#A1A1AA]">
                  A leitura considera presença, conversão, tecnologia, investimento e o estágio operacional informado.
                </p>
                <ul className="mt-7 space-y-4">
                  {trustItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#D4D4D8]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D6A84F]/10 text-[#F2D38A]">
                        <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-white/[0.08] pt-7">
                  <p className="text-sm leading-7 text-[#A1A1AA]">O contato pelo WhatsApp é liberado somente depois do registro do diagnóstico. Assim, o atendimento começa com informações reais da operação.</p>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
