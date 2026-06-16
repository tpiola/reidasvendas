import { useState, useEffect } from 'react';
import { Send, MessageCircle, Mail, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal } from '@/hooks/useAnimation';
import { PremiumButton } from '@/components/PremiumButton';
import { GoldParticles } from '@/components/GoldParticles';

/* ─── N8N Webhook URL ─── */
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';

type FormErrors = {
  nome?: string;
  email?: string;
  telefone?: string;
};

export default function Contato() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    empresa: '',
    telefone: '',
    comoConheceu: '',
    mensagem: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  /* ─── Capturar ?plano= da URL ─── */
  const [planoParam, setPlanoParam] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const plano = params.get('plano');
    if (plano) {
      setPlanoParam(plano);
      const planoNome = plano === 'digital' ? 'Digital'
        : plano === 'profissional' ? 'Profissional'
        : plano === 'enterprise' ? 'Enterprise'
        : plano;
      setToastMessage({ type: 'success', text: `Você está contratando o plano ${planoNome}! Preencha os dados abaixo.` });
      setForm((prev) => ({ ...prev, mensagem: `Quero contratar o plano ${planoNome}` }));
    }
  }, []);

  /* ─── Exibir toast por 5s ─── */
  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(() => setToastMessage(null), 5000);
      return () => clearTimeout(t);
    }
  }, [toastMessage]);

  /* ─── Validation ─── */
  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.nome.trim()) errs.nome = 'Nome é obrigatório';
    if (!form.email.trim()) errs.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'E-mail inválido';
    if (!form.telefone.trim()) errs.telefone = 'Telefone é obrigatório';
    else if (form.telefone.replace(/\D/g, '').length < 10) errs.telefone = 'Telefone inválido — mínimo 10 dígitos';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const origem = window.location.pathname + window.location.search;

    const leadPayload = {
      nome: form.nome,
      email: form.email,
      empresa: form.empresa,
      telefone: form.telefone,
      comoConheceu: form.comoConheceu,
      mensagem: form.mensagem,
      plano: planoParam || undefined,
      origem,
      pagina: '/contato',
      timestamp: new Date().toISOString(),
    };

    try {
      /* ─── Enviar para API local ─── */
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leadPayload }),
      });
    } catch { /* silent */ }

    /* ─── Enviar para n8n ─── */
    let n8nOk = false;
    if (N8N_WEBHOOK_URL) {
      try {
        const r = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload),
        });
        if (r.ok) n8nOk = true;
        else console.warn('[n8n] webhook respondeu com status', r.status);
      } catch (err) {
        console.warn('[n8n] webhook falhou, salvando localmente', err);
        try {
          const localLeads = JSON.parse(localStorage.getItem('leads_pendentes') || '[]');
          localLeads.push({ ...leadPayload, salvoEm: new Date().toISOString() });
          localStorage.setItem('leads_pendentes', JSON.stringify(localLeads));
        } catch { /* silent */ }
      }
    }

    setLoading(false);
    setSent(true);
    setToastMessage({
      type: 'success',
      text: n8nOk
        ? 'Recebemos seu contato! Responderemos em breve.'
        : 'Recebemos seu contato! (Modo offline — dados salvos localmente)',
    });
  };

  return (
    <main>
      <GoldParticles count={20} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 z-50 -translate-x-1/2 animate-fade-in">
          <div
            className={`flex items-center gap-2.5 rounded-xl border px-5 py-3 shadow-2xl backdrop-blur-xl ${
              toastMessage.type === 'success'
                ? 'border-[rgba(214,168,79,0.3)] bg-[rgba(214,168,79,0.1)] text-[#D6A84F]'
                : 'border-red-500/30 bg-red-500/10 text-red-400'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span className="text-sm font-medium">{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal><span className="section-label">Contato</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl">
              Vamos{' '}<span className="text-gradient-gold">Conversar</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#A1A1AA]">
              Preencha o formulário ou fale diretamente pelo WhatsApp. Respondemos em até 24h.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + Info */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            {/* Form */}
            <Reveal className="rounded-2xl p-6 sm:p-8 glass-card">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(214,168,79,0.1)] text-[#D6A84F]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white">Mensagem Enviada!</h3>
                  <p className="mt-2 text-sm text-[#A1A1AA]">Recebemos seu contato e responderemos em breve.</p>
                  <PremiumButton href={BRAND.whatsapp} className="mt-6" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    Falar pelo WhatsApp
                  </PremiumButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {planoParam && (
                    <div className="rounded-xl border border-[rgba(214,168,79,0.15)] bg-[rgba(214,168,79,0.04)] px-4 py-3">
                      <p className="text-xs font-medium text-[#D6A84F]">
                        Contratando plano{' '}
                        <strong>
                          {planoParam === 'digital' ? 'Digital'
                            : planoParam === 'profissional' ? 'Profissional'
                            : planoParam === 'enterprise' ? 'Enterprise'
                            : planoParam}
                        </strong>
                      </p>
                    </div>
                  )}
                  <div>
                    <label className="label-field mb-1.5 block">Nome completo *</label>
                    <input type="text" required value={form.nome} onChange={(e) => { setForm({ ...form, nome: e.target.value }); setErrors((prev) => ({ ...prev, nome: undefined })); }} placeholder="Seu nome completo" className={`input-field ${errors.nome ? 'border-red-500/50' : ''}`} />
                    {errors.nome && <p className="mt-1 text-xs text-red-400">{errors.nome}</p>}
                  </div>
                  <div>
                    <label className="label-field mb-1.5 block">E-mail *</label>
                    <input type="email" required value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors((prev) => ({ ...prev, email: undefined })); }} placeholder="seu@email.com" className={`input-field ${errors.email ? 'border-red-500/50' : ''}`} />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="label-field mb-1.5 block">Empresa</label>
                    <input type="text" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} placeholder="Nome da sua empresa (opcional)" className="input-field" />
                  </div>
                  <div>
                    <label className="label-field mb-1.5 block">Telefone / WhatsApp *</label>
                    <input type="tel" required value={form.telefone} onChange={(e) => { setForm({ ...form, telefone: e.target.value }); setErrors((prev) => ({ ...prev, telefone: undefined })); }} placeholder="(16) 99999-0000" className={`input-field ${errors.telefone ? 'border-red-500/50' : ''}`} />
                    {errors.telefone && <p className="mt-1 text-xs text-red-400">{errors.telefone}</p>}
                  </div>
                  <div>
                    <label className="label-field mb-1.5 block">Como nos conheceu?</label>
                    <select value={form.comoConheceu} onChange={(e) => setForm({ ...form, comoConheceu: e.target.value })} className="input-field appearance-none">
                      <option value="" disabled>Selecione uma opção</option>
                      <option value="google">Google</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="indicacao">Indicação de um amigo</option>
                      <option value="whatsapp">Grupo de WhatsApp</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-field mb-1.5 block">Mensagem</label>
                    <textarea rows={4} value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} placeholder="Conte um pouco sobre seu projeto..." className="input-field resize-none py-3" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-gold w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                    <Send className="h-4 w-4" />
                    {loading ? 'Enviando...' : 'Enviar Mensagem'}
                  </button>
                </form>
              )}
            </Reveal>

            {/* Info */}
            <div className="space-y-6">
              <Reveal delay={0.1}>
                <div className="glass-card rounded-2xl p-6 sm:p-8">
                  <h3 className="font-serif text-lg font-semibold text-white">Informações de Contato</h3>
                  <div className="mt-6 space-y-4">
                    <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#A1A1AA] transition hover:text-white">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.1)] text-[#D6A84F]"><MessageCircle className="h-5 w-5" /></span>
                      <div>
                        <p className="font-medium text-white">WhatsApp</p>
                        <p className="text-[#71717A]">Resposta em até 1h em horário comercial</p>
                      </div>
                    </a>
                    <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-sm text-[#A1A1AA] transition hover:text-white">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.1)] text-[#D6A84F]"><Mail className="h-5 w-5" /></span>
                      <div>
                        <p className="font-medium text-white">E-mail</p>
                        <p className="text-[#71717A]">{BRAND.email}</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-3 text-sm text-[#A1A1AA]">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(214,168,79,0.1)] text-[#D6A84F]"><MapPin className="h-5 w-5" /></span>
                      <div>
                        <p className="font-medium text-white">Localização</p>
                        <p className="text-[#71717A]">{BRAND.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="glass-card rounded-2xl p-6 sm:p-8">
                  <h3 className="font-serif text-lg font-semibold text-white">Horários</h3>
                  <div className="mt-4 space-y-2 text-sm text-[#71717A]">
                    <p>Segunda a Sexta: 9h às 18h</p>
                    <p>Sábado: 9h às 13h</p>
                    <p className="mt-3 text-[#D6A84F]">
                      <MessageCircle className="-mt-0.5 mr-1 inline h-3 w-3" />
                      WhatsApp disponível 24h — respondemos em até 1h em horário comercial
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="glass-card overflow-hidden rounded-2xl">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119122.3!2d-47.45!3d-20.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b0b2a5c9c9e2b5%3A0x5f8b8f9a0e2c8f4a!2sFranca%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1" width="100%" height="200" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Localização Rei das Vendas" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
