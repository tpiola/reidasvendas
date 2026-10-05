import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, MessageCircle, ShieldCheck } from 'lucide-react';
import { Reveal, SectionLabel } from '@/hooks/useAnimation';
import { BRAND } from '@/lib/brand';
import { captureAttribution, trackEvent } from '@/lib/analytics';
import { SOLUTIONS } from '@/lib/growth';
import { selectedOffer } from '@/lib/ofertas';

type FormData = {
  nome: string;
  whatsapp: string;
  segmento: string;
  email: string;
  presencaDigital: string;
  objetivo: string;
  faturamento: string;
  sessoes: string;
  decisor: string;
  prazo: string;
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
  faturamento: '',
  sessoes: '',
  decisor: '',
  prazo: '',
  solucao: '',
  problema: '',
  investimento: '',
  consentimento: false,
};

const inputClass = 'rdv-field';
const labelClass = 'rdv-field-label';

const trustItems = [
  'Diagnóstico antes de qualquer proposta',
  'Análise feita a partir do contexto informado',
  'Foco em prioridades reais',
  'Sem promessa de primeiro lugar no Google',
  'Triagem remunerada, creditada integralmente no Setup',
];

export default function Diagnostico() {
  const [searchParams] = useSearchParams();
  const oferta = selectedOffer(searchParams.get('plano'), searchParams.get('cobranca'), searchParams.get('campanha'));
  const [etapa, setEtapa] = useState<1 | 2>(1);
  const [dados, setDados] = useState<FormData>(() => ({
    ...initialData,
    email: searchParams.get('email')?.trim().toLowerCase() || '',
    solucao: oferta?.service || searchParams.get('solucao') || '',
  }));
  const [sucesso, setSucesso] = useState(false);
  const [entrega, setEntrega] = useState<DeliveryMode>('webhook');
  const [formStarted, setFormStarted] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const stageHeadingRef = useRef<HTMLHeadingElement>(null);
  const stageTransitionReady = useRef(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const submissionIdRef = useRef(
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  );

  const whatsappMessage = [
    'Olá! Quero conversar sobre o meu projeto digital.',
    `Nome: ${dados.nome}.`,
    ...(dados.email ? [`E-mail: ${dados.email}.`] : []),
    ...(oferta ? [`Plano: ${oferta.label} — ${oferta.price} (${oferta.billing}${oferta.campaign ? '; campanha Black Friday' : ''}).`] : []),
    `WhatsApp para retorno: ${dados.whatsapp}.`,
    `Negócio: ${dados.segmento}.`,
    `Necessidade: ${dados.solucao || 'A definir na conversa'}.`,
    `Problema: ${dados.problema || 'A detalhar na conversa'}.`,
    `Objetivo comercial: ${dados.objetivo}.`,
    `Faixa de investimento: ${dados.investimento || 'Ainda a definir'}.`,
  ].join('\n');
  const contextualWhatsapp = `https://wa.me/${BRAND.phone}?text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    trackEvent('view_diagnostico', { service: searchParams.get('solucao') || undefined, origin: searchParams.get('origem') || undefined });
  }, [searchParams]);

  useEffect(() => {
    const email = searchParams.get('email')?.trim().toLowerCase() || '';
    const solucao = selectedOffer(searchParams.get('plano'), searchParams.get('cobranca'))?.service || searchParams.get('solucao') || '';

    if (!email && !solucao) return;

    // Static prerendering cannot see the browser query string. Reconcile it after
    // hydration without replacing values the visitor has already edited.
    setDados((current) => {
      const nextEmail = current.email || email;
      const nextSolution = current.solucao || solucao;

      if (nextEmail === current.email && nextSolution === current.solucao) return current;

      return {
        ...current,
        email: nextEmail,
        solucao: nextSolution,
      };
    });
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
      `Faturamento: ${dados.faturamento}`,
      `Sessões por mês: ${dados.sessoes}`,
      `Decisor do investimento: ${dados.decisor}`,
      `Gatilho e prazo: ${dados.prazo}`,
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
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': submissionIdRef.current,
        },
        body: JSON.stringify({
          name: dados.nome,
          nome: dados.nome,
          email: dados.email,
          phone: dados.whatsapp,
          whatsapp: dados.whatsapp,
          company: dados.segmento,
          ramo: dados.segmento,
          source: 'diagnostico',
          origem: 'diagnostico',
          origin: searchParams.get('origem') || 'direto',
          plan: oferta?.id,
          billing: oferta?.billing,
          campaign: oferta?.campaign,
          message: mensagem,
          mensagem,
          service: dados.solucao,
          problem: dados.problema,
          investment: dados.investimento,
          landingPage: attribution.landing_page,
          consent: true,
          website: honeypotRef.current?.value || '',
          utm: attribution,
        }),
      });

      if (!response.ok) throw new Error('lead_delivery_failed');
      const body = await response.json().catch(() => ({}));
      if (body.ok !== true || !['webhook', 'whatsapp_handoff'].includes(body.delivery)) throw new Error('lead_delivery_failed');

      const delivery: DeliveryMode = body.delivery === 'whatsapp_handoff' ? 'whatsapp_handoff' : 'webhook';
      setEntrega(delivery);
      trackEvent('form_submit', { form: 'diagnostico', service: dados.solucao, investment: dados.investimento, segment: dados.segmento, delivery });
      trackEvent(delivery === 'webhook' ? 'generate_lead' : 'lead_prepared', { form: 'diagnostico', service: dados.solucao, plan: oferta?.id, billing: oferta?.billing, delivery });
      setSucesso(true);
      trackEvent('thank_you_view', { service: dados.solucao, delivery });
    } catch {
      setErro('Não foi possível enviar agora. Seus dados continuam aqui: tente novamente ou envie o contexto pelo WhatsApp.');
      trackEvent('form_error', { form: 'diagnostico', service: dados.solucao });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main id="main-content" className="rdv-diagnostic">
      <section className="rdv-diagnostic__stage">
        <div className="rdv-shell">
          <Reveal className="rdv-diagnostic__intro">
            <SectionLabel>Mapeamento do perfil do seu negócio</SectionLabel>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.05] text-text-primary sm:text-5xl lg:text-7xl">
              Conte o que seu negócio precisa.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Informe segmento, faturamento aproximado, tráfego atual e quem decide o investimento. As respostas
              organizam a triagem clínica: laudo em 5 dias úteis, com escopo e valor apresentados antes de qualquer
              contratação — e creditados no Setup se você aprovar a execução.
            </p>
          </Reveal>

          {oferta ? <p className="rdv-offer-context" role="status">Sua escolha: <strong>{oferta.label} · {oferta.price}</strong> · {oferta.billing === 'implantacao' ? 'Implantação' : `Assinatura ${oferta.billing}`}. O escopo será confirmado antes da contratação.</p> : null}

          <div className="rdv-diagnostic__grid">
            <Reveal>
              <div className="rdv-diagnostic__form">
                {!sucesso ? (
                  <>
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                          Etapa {etapa} de 2
                        </p>
                        <h2 ref={stageHeadingRef} tabIndex={-1} className="mt-2 font-serif text-2xl font-bold text-text-primary outline-none sm:text-3xl">
                          {etapa === 1 ? 'Qual é o contexto da sua operação?' : 'Como devemos encaminhar seu diagnóstico?'}
                        </h2>
                      </div>
                      <div
                        className="flex gap-2"
                        role="progressbar"
                        aria-label="Progresso do diagnóstico"
                        aria-valuemin={1}
                        aria-valuemax={2}
                        aria-valuenow={etapa}
                        aria-valuetext={`Etapa ${etapa} de 2`}
                      >
                        {[1, 2].map((item) => (
                          <span
                            key={item}
                            className={`h-1.5 w-10 rounded-full ${item <= etapa ? 'bg-gold' : 'bg-text-primary/10'}`}
                          />
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} onFocus={handleFormStart} className="space-y-5">
                      <div hidden>
                        <label htmlFor="website">Não preencha este campo</label>
                        <input ref={honeypotRef} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                      </div>
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
                          {/* Qualificação: as quatro respostas que filtram curiosidade de compromisso
                              antes de qualquer contato comercial. Média de 2 ou mais aprovadas abre a
                              agenda de triagem; abaixo disso, a casa devolve ferramenta e não abre conversa. */}
                          <div>
                            <label htmlFor="faturamento" className={labelClass}>Faturamento mensal aproximado</label>
                            <select id="faturamento" name="faturamento" required value={dados.faturamento} onChange={(event) => updateField('faturamento', event.target.value)} className={inputClass}>
                              <option value="" disabled>Selecione a faixa</option>
                              <option value="ate-30k">Até R$ 30 mil</option>
                              <option value="30k-100k">R$ 30 mil a R$ 100 mil</option>
                              <option value="100k-500k">R$ 100 mil a R$ 500 mil</option>
                              <option value="acima-500k">Acima de R$ 500 mil</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="sessoes" className={labelClass}>Sessões mensais de tráfego próprio (Google, anúncio, Instagram)</label>
                            <select id="sessoes" name="sessoes" required value={dados.sessoes} onChange={(event) => updateField('sessoes', event.target.value)} className={inputClass}>
                              <option value="" disabled>Selecione a faixa</option>
                              <option value="ate-500">Até 500</option>
                              <option value="500-2k">500 a 2 mil</option>
                              <option value="2k-10k">2 mil a 10 mil</option>
                              <option value="acima-10k">Acima de 10 mil</option>
                              <option value="nao-meço">Não meço hoje</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="decisor" className={labelClass}>Quem decide sobre investimento em aquisição</label>
                            <select id="decisor" name="decisor" required value={dados.decisor} onChange={(event) => updateField('decisor', event.target.value)} className={inputClass}>
                              <option value="" disabled>Selecione quem assina</option>
                              <option value="eu">Eu, sozinho</option>
                              <option value="eu-socio">Eu e sócio</option>
                              <option value="comite">Comitê ou diretoria</option>
                              <option value="terceiro">Agência ou terceiro decide</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="prazo" className={labelClass}>O que motivou a busca agora</label>
                            <select id="prazo" name="prazo" required value={dados.prazo} onChange={(event) => updateField('prazo', event.target.value)} className={inputClass}>
                              <option value="" disabled>Selecione o gatilho</option>
                              <option value="queda-vendas">Queda de vendas</option>
                              <option value="concorrente">Concorrente aparecendo na frente</option>
                              <option value="lancamento">Lançamento ou campanha com data</option>
                              <option value="pesquisa">Pesquisa de preço, sem prazo</option>
                            </select>
                          </div>
                          <button
                            type="submit"
                            className="rdv-form-action"
                          >
                            Continuar <ArrowRight size={18} aria-hidden="true" />
                          </button>
                        </>
                      ) : (
                        <>
                          <div>
                            <label htmlFor="whatsapp" className={labelClass}>WhatsApp para retorno</label>
                            <input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" required minLength={10} maxLength={20} value={dados.whatsapp} onChange={(event) => updateField('whatsapp', event.target.value)} placeholder="(16) 99999-9999" className={inputClass} />
                          </div>
                          <div>
                            <label htmlFor="email" className={labelClass}>E-mail (opcional)</label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              value={dados.email}
                              onChange={(event) => updateField('email', event.target.value)}
                              placeholder="voce@empresa.com.br"
                              className={inputClass}
                            />
                          </div>
                          <details className="rdv-diagnostic__details">
                            <summary>Adicionar detalhes (opcional)</summary>
                            <div className="mt-5 space-y-5">
                              <div>
                                <label htmlFor="solucao" className={labelClass}>Solução de interesse (opcional)</label>
                                <select id="solucao" name="solucao" value={dados.solucao} onChange={(event) => updateField('solucao', event.target.value)} className={inputClass}>
                                  <option value="" disabled>Selecione a necessidade principal</option>
                                  {SOLUTIONS.map((solution) => <option key={solution.slug} value={solution.slug}>{solution.title}</option>)}
                                  <option value="ainda-nao-sei">Ainda preciso entender a melhor solução</option>
                                </select>
                              </div>
                              <div>
                                <label htmlFor="problema" className={labelClass}>Conte mais sobre o problema (opcional)</label>
                                <textarea id="problema" name="problema" rows={3} maxLength={1000} value={dados.problema} onChange={(event) => updateField('problema', event.target.value)} placeholder="Explique onde a operação perde oportunidades ou exige esforço manual." className={inputClass} />
                              </div>
                              <div>
                                <label htmlFor="investimento" className={labelClass}>Faixa de investimento (opcional)</label>
                                <select id="investimento" name="investimento" value={dados.investimento} onChange={(event) => updateField('investimento', event.target.value)} className={inputClass}>
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
                                <label htmlFor="presenca-digital" className={labelClass}>
                                  Site ou perfil do Google <span className="text-text-muted">(opcional)</span>
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
                            </div>
                          </details>
                          <label className="flex items-start gap-3 text-xs leading-5 text-text-secondary"><input type="checkbox" required checked={dados.consentimento} onChange={(event) => updateField('consentimento', event.target.checked)} className="mt-1 accent-gold" />Autorizo o uso destas informações exclusivamente para análise e retorno sobre esta solicitação.</label>
                          <div className="rdv-form-message">
                            {erro ? <><p role="alert">{erro}</p><a href={contextualWhatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_open', { origin: 'diagnostico-fallback', plan: oferta?.id })}>Enviar contexto pelo WhatsApp</a></> : null}
                          </div>
                          <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
                            <button
                              type="button"
                              onClick={() => setEtapa(1)}
                              className="rdv-form-back"
                            >
                              <ArrowLeft size={18} aria-hidden="true" /> Voltar
                            </button>
                            <button
                              type="submit"
                              disabled={enviando}
                              className="rdv-form-action"
                            >
                              {enviando ? <>Registrando diagnóstico <Loader2 size={18} className="animate-spin" aria-hidden="true" /></> : <>Registrar meu diagnóstico <ArrowRight size={18} aria-hidden="true" /></>}
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                    <p className="mt-5 text-center text-xs leading-relaxed text-text-muted">
                      Seus dados são usados somente para analisar e responder a esta solicitação.
                    </p>
                  </>
                ) : (
                  <div className="flex min-h-[460px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-light">
                      <CheckCircle2 size={32} aria-hidden="true" />
                    </div>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      {entrega === 'whatsapp_handoff' ? 'Diagnóstico preparado para envio' : 'Diagnóstico registrado'}
                    </p>
                    <h2 ref={stageHeadingRef} tabIndex={-1} className="mt-3 font-serif text-3xl font-bold text-text-primary outline-none sm:text-4xl">Agora sua conversa começa com contexto.</h2>
                    <p className="mt-4 max-w-lg leading-relaxed text-text-secondary">
                      {entrega === 'whatsapp_handoff'
                        ? 'Seu diagnóstico está organizado, mas ainda precisa ser enviado. Abra o WhatsApp e confirme o envio da mensagem para a nossa equipe.'
                        : 'Seu negócio, objetivo e contatos foram registrados. Abra o WhatsApp com essas informações já organizadas.'}
                    </p>
                    <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
                      <a
                        href={contextualWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rdv-primary-action"
                        onClick={() => trackEvent('whatsapp_open', { service: dados.solucao, investment: dados.investimento, origin: 'diagnostico-concluido' })}
                      >
                        <MessageCircle size={18} aria-hidden="true" /> Abrir conversa qualificada
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <aside className="rdv-diagnostic__aside">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/20 bg-gold/10 text-gold-light">
                  <ShieldCheck size={25} aria-hidden="true" />
                </div>
                <h2 className="mt-6 font-serif text-3xl font-bold leading-tight text-text-primary">
                  Clareza para decidir o que fazer primeiro.
                </h2>
                <p className="mt-4 leading-relaxed text-text-secondary">
                  A leitura considera presença, conversão, tecnologia, investimento e o estágio operacional informado.
                </p>
                <ul className="mt-7 space-y-4">
                  {trustItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold-light">
                        <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-text-primary/[0.08] pt-7">
                  <p className="text-sm leading-7 text-text-secondary">O formulário organiza seu contexto antes da conversa. Se preferir falar diretamente, use o contato pelo WhatsApp disponível no rodapé.</p>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
