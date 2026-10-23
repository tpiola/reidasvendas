import { NextResponse, type NextRequest } from 'next/server';

const productionHosts = new Set([
  'reidasvendas.com.br',
  'www.reidasvendas.com.br',
]);

/** Next 16: proxy replaces middleware.ts and uses Node.js. No session or PII processing here. */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = url.hostname.toLowerCase();
  if (productionHosts.has(host)) {
    const forwardedProtocol = request.headers
      .get('x-forwarded-proto')
      ?.split(',')[0]
      ?.trim();
    const effectiveProtocol =
      forwardedProtocol ?? url.protocol.replace(':', '');
    if (host !== 'www.reidasvendas.com.br' || effectiveProtocol === 'http') {
      url.protocol = 'https:';
      url.hostname = 'www.reidasvendas.com.br';
      url.port = '';
      return NextResponse.redirect(url, 308);
    }
  }
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  if (process.env.VERCEL_ENV === 'preview') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|logo/|icons/|og/|fonts/).*)',
  ],
};
