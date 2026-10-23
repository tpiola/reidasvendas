'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { track, getAttribution } from '@/lib/tracking';
export default function DiagnosticForm({
  crmEnabled,
}: {
  crmEnabled: boolean;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false),
    [errors, setErrors] = useState<Record<string, string>>({}),
    [notice, setNotice] = useState('');
  const started = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice('');
    const f = new FormData(e.currentTarget);
    const values = {
      name: String(f.get('name') || '').trim(),
      phone: String(f.get('phone') || '').trim(),
      company: String(f.get('company') || '').trim(),
      challenge: String(f.get('challenge') || '').trim(),
      contactConsent: f.get('contactConsent') === 'on',
      website: String(f.get('website') || ''),
    };
    const err: Record<string, string> = {};
    if (values.name.length < 2) err.name = 'Informe seu nome.';
    if (!/^(?:55)?[1-9]{2}9?\d{8}$/.test(values.phone.replace(/\D/g, '')))
      err.phone = 'Use DDD e número válido.';
    if (values.company.length < 2) err.company = 'Informe a empresa.';
    if (values.challenge.length < 5)
      err.challenge = 'Conte seu principal desafio.';
    if (!values.contactConsent)
      err.contactConsent = 'Autorize o contato solicitado.';
    setErrors(err);
    if (Object.keys(err).length) {
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    const eventId = crypto.randomUUID();
    track('form_submit', { page: '/diagnostico', event_id: eventId });
    if (!crmEnabled) {
      const text = `Olá! Vim pelo site Rei das Vendas. Sou ${values.name}, da ${values.company}. Meu desafio: ${values.challenge}`;
      window.location.assign(
        'https://wa.me/5516992333344?' + new URLSearchParams({ text }),
      );
      return;
    }
    setPending(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          eventId,
          page: '/diagnostico',
          attribution: getAttribution(),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.errors || {});
        throw new Error(result.error || 'Confira os campos indicados.');
      }
      track(
        'lead_created',
        { page: '/diagnostico', event_id: eventId },
        'Lead',
      );
      sessionStorage.setItem('rdv-confirmed-lead', '1');
      router.push('/obrigado');
    } catch (error) {
      setNotice(
        error instanceof Error
          ? error.message
          : 'Não foi possível confirmar o envio. Use o WhatsApp.',
      );
    } finally {
      setPending(false);
    }
  }
  return (
    <form
      ref={form}
      noValidate
      onSubmit={submit}
      onFocus={() => {
        if (!started.current) {
          started.current = true;
          track('form_start', { page: '/diagnostico' });
        }
      }}
      className="diagnostic-form"
    >
      <div className="form-grid">
        {[
          {
            name: 'name',
            label: 'Seu nome',
            autoComplete: 'name',
            type: 'text',
            max: 90,
          },
          {
            name: 'phone',
            label: 'WhatsApp com DDD',
            autoComplete: 'tel',
            type: 'tel',
            max: 25,
          },
          {
            name: 'company',
            label: 'Empresa',
            autoComplete: 'organization',
            type: 'text',
            max: 120,
          },
        ].map((x) => (
          <div className="form-field" key={x.name}>
            <label htmlFor={x.name}>{x.label}</label>
            <input
              id={x.name}
              name={x.name}
              type={x.type}
              inputMode={x.type === 'tel' ? 'tel' : 'text'}
              autoComplete={x.autoComplete}
              maxLength={x.max}
              required
              aria-invalid={!!errors[x.name]}
              aria-describedby={errors[x.name] ? x.name + '-error' : undefined}
            />
            {errors[x.name] && (
              <p className="field-error" id={x.name + '-error'}>
                {errors[x.name]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="form-field">
        <label htmlFor="challenge">Qual é o principal desafio?</label>
        <textarea
          name="challenge"
          id="challenge"
          rows={4}
          maxLength={600}
          required
          aria-invalid={!!errors.challenge}
          aria-describedby="challenge-hint challenge-error"
        />
        <p id="challenge-hint">
          Até 600 caracteres. Não inclua senhas nem dados sensíveis.
        </p>
        <p id="challenge-error" className="field-error">
          {errors.challenge}
        </p>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Deixe este campo vazio</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="consent-check">
        <input
          type="checkbox"
          name="contactConsent"
          required
          aria-invalid={!!errors.contactConsent}
          aria-describedby="consent-error"
        />
        Autorizo o contato solicitado sobre minha empresa. Li a{' '}
        <a href="/privacidade">política de privacidade</a>. Isto não autoriza
        campanhas futuras.
      </label>
      <p className="field-error" id="consent-error">
        {errors.contactConsent}
      </p>
      <p role="status" className="field-error">
        {notice}
      </p>
      <button
        className="button button-primary"
        type="submit"
        disabled={pending}
      >
        {pending
          ? 'Confirmando seu pedido…'
          : crmEnabled
            ? 'Solicitar análise do meu cenário'
            : 'Preparar conversa no WhatsApp'}
      </button>
      <p className="form-note">
        {crmEnabled
          ? 'O envio só será confirmado após o recebimento.'
          : 'Você revisa a mensagem no WhatsApp antes de enviá-la. Nenhum pedido é enviado automaticamente.'}{' '}
        Conversa inicial não contrata uma auditoria paga.
      </p>
    </form>
  );
}
