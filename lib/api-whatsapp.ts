import { after, NextRequest, NextResponse } from 'next/server';
import { cleanText, rateLimit, sendMetaConversion } from './server-events';
export const runtime = 'nodejs';
const contexts: Record<string, string> = {
  diagnostico: 'Quero entender como funciona o diagnóstico comercial.',
  sites: 'Quero um site que ajude minha empresa a receber contatos.',
  trafego: 'Quero avaliar a gestão de tráfego pago para minha empresa.',
  social: 'Quero conversar sobre social media para minha empresa.',
};
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const src = cleanText(url.searchParams.get('src'), 40);
  const page = cleanText(url.searchParams.get('page'), 200);
  const id = cleanText(url.searchParams.get('event_id'), 80);
  const safePage = /^\/(?!\/)[a-zA-Z0-9\-/_]*$/.test(page) ? page : '/';
  const score = url.searchParams.get('score');
  const quiz =
    src === 'quiz' && /^[0-3]$/.test(score || '')
      ? ` Fiz a autoavaliação: ${score}/3 fundamentos presentes. Quero conversar sobre meu cenário.`
      : '';
  const service = src.includes('sites')
    ? 'Quero conversar sobre criação de sites.'
    : src.includes('trafego')
      ? 'Quero avaliar gestão de tráfego.'
      : src.includes('social')
        ? 'Quero conversar sobre social media.'
        : '';
  const message = `Olá! Vim pelo site Rei das Vendas. ${contexts[src] || service || 'Quero entender como aumentar minhas vendas.'}${quiz}`;
  // Destination is fixed: src/page/UTMs can never become open redirects or inject arbitrary text.
  const target = new URL('https://wa.me/5516992333344');
  target.searchParams.set('text', message);
  const referer = request.headers.get('referer');
  let sameSite = false;
  try {
    sameSite =
      !!referer && new URL(referer).origin === new URL(request.url).origin;
  } catch {
    /* Direct visits still open WhatsApp. */
  }
  if (sameSite && /^[A-Za-z0-9_-]{16,80}$/.test(id))
    after(async () => {
      if ((await rateLimit(request, 'contact', 30, 600)) === 'allowed')
        await sendMetaConversion(request, 'Contact', id, safePage);
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
