import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { metadata, SITE, breadcrumb, organization } from '../lib/site';
import JsonLd from '../components/JsonLd';
import { proxy } from '../proxy';
import config, { securityHeaders } from '../next.config';

describe('canonical identity and safe structured data', () => {
  it('keeps the canonical absolute and excludes campaign parameters', () => {
    const result = metadata(
      'Serviço local',
      'Descrição',
      '/servicos/criacao-de-sites-franca',
    );
    expect(result.alternates?.canonical).toBe(
      `${SITE}/servicos/criacao-de-sites-franca`,
    );
    expect(result.robots).toEqual({ index: true, follow: true });
    expect(
      metadata('Obrigado', 'Próximo passo', '/obrigado', true).robots,
    ).toEqual({ index: false, follow: true });
  });
  it('links entity and breadcrumb to the verified www identity', () => {
    expect(organization.url).toBe('https://www.reidasvendas.com.br');
    expect(organization.telephone).toBe('+5516992333344');
    expect(
      breadcrumb([{ name: 'Serviços', path: '/servicos' }]).itemListElement.map(
        (item) => item.item,
      ),
    ).toEqual([`${SITE}/`, `${SITE}/servicos`]);
    expect(organization).not.toHaveProperty('aggregateRating');
  });
  it('cannot close JSON-LD script with attacker-controlled content', () => {
    const element = JsonLd({
      data: { name: '</script><script>alert(1)</script>' },
    });
    const serialized = element.props.dangerouslySetInnerHTML.__html as string;
    expect(serialized).not.toContain('</script>');
    expect(JSON.parse(serialized).name).toBe(
      '</script><script>alert(1)</script>',
    );
  });
});

describe('production host normalization and security', () => {
  it('redirects apex to HTTPS www preserving the route and UTMs', () => {
    const response = proxy(
      new NextRequest(
        'http://reidasvendas.com.br/diagnostico?utm_source=teste',
      ),
    );
    expect(response.status).toBe(308);
    expect(response.headers.get('location')).toBe(
      'https://www.reidasvendas.com.br/diagnostico?utm_source=teste',
    );
  });
  it('respects TLS termination and does not create preview/local redirect loops', () => {
    for (const url of [
      'https://www.reidasvendas.com.br/metodo',
      'https://example-preview.vercel.app/metodo',
      'http://localhost:3000/metodo',
    ]) {
      expect(
        proxy(
          new NextRequest(url, {
            headers: {
              'x-forwarded-proto': url.startsWith('http:') ? 'http' : 'https',
            },
          }),
        ).headers.get('location'),
      ).toBeNull();
    }
    expect(
      proxy(
        new NextRequest('http://www.reidasvendas.com.br/metodo', {
          headers: { 'x-forwarded-proto': 'https' },
        }),
      ).headers.get('location'),
    ).toBeNull();
  });
  it('blocks framing and MIME sniffing while keeping full CSP report-only', () => {
    const headers = Object.fromEntries(
      securityHeaders.map((header) => [header.key.toLowerCase(), header.value]),
    );
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['content-security-policy']).toContain(
      "frame-ancestors 'none'",
    );
    expect(headers['content-security-policy-report-only']).toContain(
      'report-uri /csp-report',
    );
  });
  it('redirects legacy paths to relevant valid sections without shadowing service pages', async () => {
    const redirects = await config.redirects?.();
    expect(
      redirects?.find((item) => item.source === '/politica')?.destination,
    ).toBe('/privacidade');
    expect(redirects?.some((item) => item.source === '/servicos/:slug')).toBe(
      false,
    );
  });
});
