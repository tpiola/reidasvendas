// GA4: view_diagnostico, form_start, form_submit, whatsapp_click, thank_you_view
import { useEffect, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';
import { PremiumButton } from '@/components/PremiumButton';
import { Reveal, SectionLabel } from '@/hooks/useAnimation';
import { BRAND } from '@/lib/brand';

type FormData = {
  nome: string;
  whatsapp: string;
  segmento: string;
  email: string;
  presencaDigital: string;
  objetivo: string;
};

const initialData: FormData = {
  nome: '',
  whatsapp: '',
  segmento: '',
  email: '',
  presencaDigital: '',
  objetivo: '',
};

const inputClass =
  'w-full rounded-xl border border-white/10 bg-[#0D0D0D] px-4 py-3 text-white placeholder:text-[#52525B] focus:border-[#D6A84F] focus:outline-none';
const labelClass = 'mb-2 block text-xs font-medium text-[#A1A1AA]';

const trustItems = [
  'Diagnostico sem compromisso',
  'Analise feita por especialista',
  'Foco em prioridades reais',
  'Sem promessa de primeiro lugar no Google',
  'Atendimento em Franca e regiao',
];

export default function Diagnostico() {
  const [etapa, setEtapa] = useState<1 | 2>(1);
  const [dados, setDados] = useState<FormData>(initialData);
  const [sucesso, setSucesso] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  useEffect(() => {
    console.log('GA4: view_diagnostico');
  }, []);

  const updateField = (field: keyof FormData, value: string) => {
    setDados((current) => ({ ...current, [field]: value }));
  };

  const handleFormStart = () => {
    if (formStarted) return;
    setFormStarted(true);
    console.log('GA4: form_start');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (etapa === 1) {
      setEtapa(2);
      return;
    }

    console.log('GA4: form_submit', dados);
    console.log('Dados do diagnostico:', dados);
    setSucesso(true);
    console.log('GA4: thank_you_view');
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
            <SectionLabel>Diagnostico gratuito</SectionLabel>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-7xl">
              Receba um diagnostico gratuito da presenca digital do seu negocio.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Analisamos seu site, Google, celular, WhatsApp e funil. Voce recebe prioridades claras,
              sem promessa vazia e sem metrica inventada.
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
                        <h2 className="mt-2 font-serif text-2xl font-bold text-white sm:text-3xl">
                          {etapa === 1 ? 'Conte sobre o seu negocio' : 'Onde podemos gerar mais impacto?'}
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
                              placeholder="Como podemos chamar voce?"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label htmlFor="whatsapp" className={labelClass}>WhatsApp</label>
                            <input
                              id="whatsapp"
                              name="whatsapp"
                              type="tel"
                              inputMode="tel"
                              autoComplete="tel"
                              required
                              value={dados.whatsapp}
                              onChange={(event) => updateField('whatsapp', event.target.value)}
                              placeholder="(16) 99999-9999"
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label htmlFor="segmento" className={labelClass}>Segmento</label>
                            <select
                              id="segmento"
                              name="segmento"
                              required
                              value={dados.segmento}
                              onChange={(event) => updateField('segmento', event.target.value)}
                              className={inputClass}
                            >
                              <option value="" disabled>Selecione seu segmento</option>
                              <option value="clinica-saude">Clinica / saude</option>
                              <option value="estetica">Estetica</option>
                              <option value="restaurante-delivery">Restaurante / delivery</option>
                              <option value="oficina">Oficina</option>
                              <option value="pet-shop">Pet shop</option>
                              <option value="advocacia">Advocacia</option>
                              <option value="imobiliaria">Imobiliaria</option>
                              <option value="escola-curso">Escola / curso</option>
                              <option value="servico-local">Servico local</option>
                              <option value="industria-distribuidora">Industria / distribuidora</option>
                              <option value="profissional-liberal">Profissional liberal</option>
                              <option value="outro">Outro</option>
                            </select>
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
                            <label htmlFor="objetivo" className={labelClass}>Principal objetivo</label>
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
                              <option value="nao-sei">Nao sei ainda</option>
                            </select>
                          </div>
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
                              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] px-6 py-3.5 font-bold text-[#030303] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#D6A84F] focus:ring-offset-2 focus:ring-offset-[#090909]"
                            >
                              Quero meu diagnostico <ArrowRight size={18} aria-hidden="true" />
                            </button>
                          </div>
                        </>
                      )}
                    </form>
                    <p className="mt-5 text-center text-xs leading-relaxed text-[#71717A]">
                      Seus dados serao usados somente para responder a esta solicitacao.
                    </p>
                  </>
                ) : (
                  <div className="flex min-h-[460px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D6A84F]/30 bg-[#D6A84F]/10 text-[#F2D38A]">
                      <CheckCircle2 size={32} aria-hidden="true" />
                    </div>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#D6A84F]">Solicitacao recebida</p>
                    <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">Recebido! Vamos analisar.</h2>
                    <p className="mt-4 max-w-lg leading-relaxed text-[#A1A1AA]">
                      O proximo passo e revisar as informacoes enviadas. Nossa equipe entrara em contato pelo WhatsApp para alinhar o contexto e apresentar as prioridades encontradas.
                    </p>
                    <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
                      <PremiumButton
                        href={BRAND.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="lg"
                        onClick={() => console.log('GA4: whatsapp_click')}
                      >
                        <MessageCircle size={18} aria-hidden="true" /> Chamar no WhatsApp
                      </PremiumButton>
                      <Link to="/blog" className="btn-outline-gold inline-flex items-center justify-center rounded-full px-8 py-3 font-semibold">
                        Ver conteudos do blog
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
                  Voce recebe ate 5 prioridades para melhorar presenca, conversao e atendimento.
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
                  <p className="text-sm text-[#A1A1AA]">Prefere falar agora?</p>
                  <PremiumButton
                    href={BRAND.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className="mt-3 w-full"
                    onClick={() => console.log('GA4: whatsapp_click')}
                  >
                    <MessageCircle size={18} aria-hidden="true" /> Chamar no WhatsApp
                  </PremiumButton>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
