import type { LeadPayload } from '@altiq/types';

/** Espelha lead na planilha via Google Apps Script (sem Zapier). */
export async function mirrorLeadToGoogleSheets(payload: LeadPayload & { receivedAt?: string }): Promise<void> {
  const url = import.meta.env.VITE_GOOGLE_SHEETS_URL as string | undefined;
  if (!url?.startsWith('https://script.google.com/')) return;

  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        name: payload.name ?? '',
        email: payload.email,
        phone: payload.phone ?? '',
        source: payload.source,
        variant: payload.variant,
        pagePath:
          payload.context && typeof payload.context === 'object' && 'pagePath' in payload.context
            ? String((payload.context as { pagePath?: string }).pagePath ?? '')
            : '',
        receivedAt: payload.receivedAt ?? new Date().toISOString(),
      }),
    });
  } catch {
    /* não bloqueia conversão */
  }
}
