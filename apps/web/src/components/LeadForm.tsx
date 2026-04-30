import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import type { LeadPayload, LeadSource } from '@altiq/types';
import { assignAbVariant, getOrCreateVisitorId, isEmail, pickUtm } from '@altiq/utils';
import { trackConversion } from '@/components/AnalyticsProvider';
import { Input } from '@altiq/ui';

const Schema = z.object({
  name: z.string().trim().min(2).max(80).optional().or(z.literal('')),
  email: z.string().trim().min(3).max(160),
  phone: z.string().trim().min(8).max(40).optional().or(z.literal('')),
  company: z.string().trim().min(2).max(120).optional().or(z.literal('')),
  city: z.string().trim().min(2).max(80).optional().or(z.literal('')),
  consent: z.boolean(),
});

const FullSchema = Schema.extend({
  objective: z.string().trim().min(2).max(120).optional().or(z.literal('')),
  stage: z.string().trim().min(2).max(120).optional().or(z.literal('')),
  timeline: z.string().trim().min(2).max(120).optional().or(z.literal('')),
  message: z.string().trim().min(2).max(2000).optional().or(z.literal('')),
});

type FormValues = {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  city?: string;
  consent: boolean;
  objective?: string;
  stage?: string;
  timeline?: string;
  message?: string;
};

async function submitLead(
  payload: LeadPayload,
): Promise<{ ok: true } | { ok: false; error: string }> {
  // [MVO Rei das Vendas] Rastreamento de Funis Líquidos (ex: PostHog/Hotjar)
  // window.posthog?.capture('lead_submitted', { source: payload.source, variant: payload.variant });
  
  if (import.meta.env.DEV && !import.meta.env.VITE_N8N_WEBHOOK_URL) {
    const key = 'reidasvendas:dev-leads';
    const raw = window.localStorage.getItem(key);
    let list: unknown[] = [];
    try {
      const parsed = raw ? (JSON.parse(raw) as unknown) : [];
      list = Array.isArray(parsed) ? parsed : [];
    } catch {
      list = [];
    }
    list.unshift({ ...payload, receivedAt: new Date().toISOString() });
    window.localStorage.setItem(key, JSON.stringify(list.slice(0, 50)));
    return { ok: true };
  }

  try {
    // [MVO Rei das Vendas] Webhook Universal n8n
    const endpoint = import.meta.env.VITE_N8N_WEBHOOK_URL || '/api/lead';
    
    // [MVO Rei das Vendas] Integração Supabase (Checkout de Leads)
    // if (import.meta.env.VITE_SUPABASE_URL) {
    //   await supabase.from('leads').insert([payload]);
    // }
    
    const r = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (r.ok) return { ok: true };
    const data: unknown = await r.json().catch(() => null);
    const error =
      typeof data === 'object' &&
      data !== null &&
      'error' in data &&
      typeof (data as { error?: unknown }).error === 'string'
        ? String((data as { error?: unknown }).error)
        : 'submit_failed';
    return { ok: false, error };
  } catch {
    return { ok: false, error: 'network_error' };
  }
}

type LeadFormProps = {
  source: LeadSource;
  title?: string;
  description?: string;
  ctaLabel?: string;
  formVariant?: 'compact' | 'full';
  context?: Record<string, unknown>;
  onSuccess?: () => void;
  className?: string;
};

export function LeadForm({
  source,
  title = 'Diagnóstico gratuito (2 minutos)',
  description =
    'Você recebe um plano de ação com 3 alavancas de conversão e um roteiro de automação personalizado para o seu negócio.',
  ctaLabel = 'Quero meu diagnóstico grátis',
  formVariant = 'compact',
  context,
  onSuccess,
  className,
}: LeadFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const visitorId = useMemo(() => getOrCreateVisitorId(window.localStorage), []);
  const variant = useMemo(() => assignAbVariant(visitorId), [visitorId]);
  const utm = useMemo(() => pickUtm(window.location.search), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { consent: false }, mode: 'onBlur' });

  return (
    <form
      className={className ?? 'space-y-0'}
      onSubmit={handleSubmit(async (values) => {
        setError(null);
        setStatus('sending');

        const parsed = (formVariant === 'full' ? FullSchema : Schema).safeParse(values);
        if (!parsed.success) {
          setStatus('error');
          setError('Confira os campos e tente novamente.');
          return;
        }
        if (!isEmail(parsed.data.email)) {
          setStatus('error');
          setError('E-mail inválido.');
          return;
        }

        const payload: LeadPayload = {
          email: parsed.data.email,
          name: parsed.data.name || undefined,
          phone: parsed.data.phone || undefined,
          company: parsed.data.company || undefined,
          city: parsed.data.city || undefined,
          consent: parsed.data.consent,
          source,
          variant: variant,
          utm,
          context: {
            pagePath: window.location.pathname,
            ...(formVariant === 'full'
              ? {
                  objective: (parsed.data as FormValues).objective || undefined,
                  stage: (parsed.data as FormValues).stage || undefined,
                  timeline: (parsed.data as FormValues).timeline || undefined,
                  message: (parsed.data as FormValues).message || undefined,
                }
              : null),
            ...(context ?? null),
          },
        };

        const r = await submitLead(payload);
        if (r.ok) {
          setStatus('sent');
          
          // [MVO Rei das Vendas] Dispara evento de conversão unificado
          trackConversion('generate_lead', {
            value: 0,
            currency: 'BRL',
            source: source,
            intent: context?.intent,
          });

          onSuccess?.();
          return;
        }
        setStatus('error');
        setError('Não consegui enviar agora. Tente novamente em instantes.');
      })}
      aria-describedby={error ? 'lead-error' : undefined}
    >
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/50">
          {description}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40" htmlFor="name">
            Nome
          </label>
          <div className="mt-2">
            <Input
              id="name"
              autoComplete="name"
              placeholder="Seu nome"
              className="border-glow-1 bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:ring-brand-blue focus-visible:border-brand-blue/50"
              {...register('name')}
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40" htmlFor="email">
            E-mail <span className="text-brand-blue" aria-hidden="true">*</span>
          </label>
          <div className="mt-2">
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="voce@empresa.com"
              aria-required="true"
              className="border-glow-1 bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:ring-brand-blue focus-visible:border-brand-blue/50"
              {...register('email', { required: true })}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-400" role="alert">
              Informe um e-mail válido.
            </p>
          )}
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40" htmlFor="phone">
            WhatsApp
          </label>
          <div className="mt-2">
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(DDD) 99999-9999"
              className="border-glow-1 bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:ring-brand-blue focus-visible:border-brand-blue/50"
              {...register('phone')}
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40" htmlFor="company">
            Empresa / projeto
          </label>
          <div className="mt-2">
            <Input
              id="company"
              autoComplete="organization"
              placeholder="Nome da empresa ou projeto"
              className="border-glow-1 bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:ring-brand-blue focus-visible:border-brand-blue/50"
              {...register('company')}
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40" htmlFor="city">
            Cidade
          </label>
          <div className="mt-2">
            <Input
              id="city"
              autoComplete="address-level2"
              placeholder="Ex.: São Paulo"
              className="border-glow-1 bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:ring-brand-blue focus-visible:border-brand-blue/50"
              {...register('city')}
            />
          </div>
        </div>
      </div>

      {formVariant === 'full' && (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-black/65" htmlFor="objective">
              Objetivo principal
            </label>
            <div className="mt-2">
              <Input
                id="objective"
                placeholder="Ex.: aumentar leads, agendamentos, vendas"
                {...register('objective')}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-black/65" htmlFor="stage">
              Estágio atual
            </label>
            <div className="mt-2">
              <Input
                id="stage"
                placeholder="Ex.: já vendo / validando / lançando"
                {...register('stage')}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-black/65" htmlFor="timeline">
              Prazo
            </label>
            <div className="mt-2">
              <Input
                id="timeline"
                placeholder="Ex.: 2 semanas / 30 dias / sem urgência"
                {...register('timeline')}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-black/65" htmlFor="message">
              Mensagem
            </label>
            <div className="mt-2">
              <textarea
                id="message"
                rows={4}
                className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 text-sm text-black placeholder:text-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                placeholder="Contexto, oferta, público, links e qualquer detalhe relevante."
                {...register('message')}
              />
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 flex items-start gap-3">
        <input
          id="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-white/20 accent-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-required="true"
          {...register('consent', { required: true })}
        />
        <label className="text-[11px] leading-relaxed text-white/40" htmlFor="consent">
          Concordo em receber contato, conforme a{' '}
          <a href="/politica" className="text-white/60 underline hover:text-white transition-colors">
            política de privacidade
          </a>
          .
        </label>
      </div>
      {errors.consent && (
        <p className="mt-1 text-xs text-red-400" role="alert">
          Confirme o consentimento para continuar.
        </p>
      )}

      {error && (
        <div
          id="lead-error"
          role="alert"
          className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-300"
        >
          {error}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'sending' || status === 'sent'}
          className="btn-glow inline-flex h-12 items-center justify-center rounded-2xl px-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background w-full sm:w-auto"
        >
          {status === 'sent'
            ? '✓ Enviado — confira seu e-mail'
            : status === 'sending'
              ? 'Enviando…'
              : ctaLabel}
        </button>
        <p className="text-[11px] text-white/30">
          Sem spam. Cancele a qualquer momento.
        </p>
      </div>
    </form>
  );
}
