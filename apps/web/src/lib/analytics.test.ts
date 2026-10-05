import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Medição com consentimento', () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    sessionStorage.clear();
    document.querySelector('#rdv-measurement')?.remove();
    delete window.dataLayer;
    delete window.gtag;
    vi.stubEnv('VITE_GA4_ID', 'G-TEST123');
    vi.stubEnv('VITE_GTM_ID', '');
  });
  afterEach(() => vi.unstubAllEnvs());

  it('não carrega rastreadores antes do consentimento', async () => {
    const { trackEvent } = await import('./analytics');
    trackEvent('page_view');
    expect(document.querySelector('#rdv-measurement')).toBeNull();
    expect(window.dataLayer).toBeUndefined();
  });

  it('despacha apenas uma visualização e exclui dados pessoais e query string', async () => {
    localStorage.setItem('reidasvendas:cookie-consent', 'accepted');
    window.history.replaceState({}, '', '/diagnostico?email=pessoa%40example.com');
    const { trackEvent } = await import('./analytics');
    trackEvent('page_view', { page_title: 'Diagnóstico', email: 'pessoa@example.com', phone: '16999999999' });
    trackEvent('page_view', { page_title: 'Diagnóstico' });
    const events = (window.dataLayer || []).filter((item) => Array.isArray(item) && item[0] === 'event');
    expect(events).toHaveLength(1);
    expect(JSON.stringify(events)).not.toContain('pessoa');
    expect(JSON.stringify(events)).not.toContain('16999999999');
    expect(document.querySelector('#rdv-measurement')).toHaveAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=G-TEST123');
    window.history.replaceState({}, '', '/');
  });

  it('prioriza GTM sem instalar um segundo provedor GA4', async () => {
    localStorage.setItem('reidasvendas:cookie-consent', 'accepted');
    vi.stubEnv('VITE_GTM_ID', 'GTM-TEST123');
    const { trackEvent } = await import('./analytics');
    trackEvent('generate_lead', { plan: 'base' });
    expect(window.gtag).toBeUndefined();
    expect(window.dataLayer?.filter((item) => typeof item === 'object' && item !== null && 'event' in item && item.event === 'generate_lead')).toHaveLength(1);
    expect(document.querySelectorAll('#rdv-measurement')).toHaveLength(1);
  });
});
