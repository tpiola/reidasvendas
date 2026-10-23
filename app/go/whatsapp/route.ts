import { after, NextRequest, NextResponse } from 'next/server';
import {
  rateLimit,
  sendMetaConversion,
  serverConsent,
} from '@/lib/server-events';
import {
  sanitizeAttribution,
  sanitizeBillingCycle,
  sanitizeMachineValue,
  sanitizePath,
  sanitizePlanId,
  validEventId,
  whatsappDestination,
} from '@/lib/whatsapp';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const query = new URL(request.url).searchParams;
  const source = sanitizeAttribution({
    source: query.get('source') || query.get('utm_source'),
    medium: query.get('medium') || query.get('utm_medium'),
    campaign: query.get('campaign') || query.get('utm_campaign'),
  });
  const page = sanitizePath(query.get('page'));
  const target = whatsappDestination({
    src: sanitizeMachineValue(query.get('src')),
    page,
    plan: sanitizePlanId(
      query.get('plan') || query.get('plano') || query.get('plan_id'),
    ),
    cycle: sanitizeBillingCycle(
      query.get('cycle') || query.get('ciclo') || query.get('billing_cycle'),
    ),
    score: query.get('score'),
    ...source,
  });
  const eventId = query.get('event_id');
  let sameSite = false;
  try {
    const referer = request.headers.get('referer');
    sameSite =
      !!referer && new URL(referer).origin === new URL(request.url).origin;
  } catch {
    /* Untrusted or missing referrer cannot enable measurement. Contact still works. */
  }
  if (sameSite && validEventId(eventId) && serverConsent(request).marketing)
    after(async () => {
      // Rate limit protects optional measurement only: Redis failure never blocks this CTA.
      if ((await rateLimit(request, 'contact', 30, 600)) === 'allowed')
        await sendMetaConversion(request, 'Contact', eventId, page);
    });
  return NextResponse.redirect(target, {
    status: 302,
    headers: {
      'Cache-Control': 'private, no-store',
      'Referrer-Policy': 'no-referrer',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
