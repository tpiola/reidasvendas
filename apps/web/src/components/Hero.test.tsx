import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Hero from './Hero';
import { I18nProvider } from '../lib/i18n';

// O setup do projeto não registra cleanup automático: sem isto, cada teste deste
// arquivo empilha uma cópia do hero no document.body e as consultas por role
// passam a encontrar múltiplos elementos.
afterEach(cleanup);

describe('Hero', () => {
  beforeEach(() => {
    window.localStorage.setItem('rdv-locale', 'pt');
    window.history.pushState({}, '', '/');
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  it('oferece os dois caminhos: solicitar a triagem e ler o protocolo', () => {
    render(
      <BrowserRouter>
        <I18nProvider>
          <Routes>
            <Route path="/" element={<Hero />} />
          </Routes>
        </I18nProvider>
      </BrowserRouter>,
    );

    expect(screen.getByRole('link', { name: /solicitar triagem clínica/i })).toHaveAttribute(
      'href',
      '/diagnostico?origem=home-hero&estagio=triagem',
    );
    expect(screen.getByRole('link', { name: /ver o protocolo de auditoria/i })).toHaveAttribute('href', '#protocolo');
  });

  /**
   * O caminho antigo levava direto ao WhatsApp sem qualificação. O único atalho
   * de contato aceito na capa é o do rodapé — a capa exige passar pela triagem.
   */
  it('não oferece atalho direto para o WhatsApp na capa', () => {
    const { container } = render(
      <BrowserRouter>
        <I18nProvider>
          <Routes>
            <Route path="/" element={<Hero />} />
          </Routes>
        </I18nProvider>
      </BrowserRouter>,
    );

    expect(container.querySelectorAll('a[href*="wa.me"]')).toHaveLength(0);
    expect(container.querySelectorAll('canvas')).toHaveLength(0);
  });

  /**
   * O seletor da capa aponta para páginas que existem de verdade. Estes slugs
   * foram conferidos no sitemap construído. Se alguém renomear uma página do
   * catálogo sem atualizar o seletor, este teste falha — é o que impede a capa
   * de mandar visitante para uma rota inexistente.
   */
  it('leva cada tipo de negócio para a página certa do catálogo', () => {
    render(
      <BrowserRouter>
        <I18nProvider>
          <Routes>
            <Route path="/" element={<Hero />} />
          </Routes>
        </I18nProvider>
      </BrowserRouter>,
    );

    const esperados: Array<[string, string]> = [
      ['/solucoes/site-para-clinicas', 'Clínica ou consultório'],
      ['/solucoes/site-para-advogados', 'Advocacia'],
      ['/solucoes/site-para-restaurantes', 'Restaurante ou delivery'],
      ['/solucoes/ecommerce-profissional', 'Loja ou e-commerce'],
      ['/solucoes/site-para-imobiliarias', 'Imobiliária ou corretor'],
      ['/solucoes/site-para-profissionais-liberais', 'Profissional liberal'],
    ];

    for (const [href, nome] of esperados) {
      expect(screen.getByRole('link', { name: nome })).toHaveAttribute('href', href);
    }

    expect(screen.getByRole('link', { name: /ver todas as soluções/i })).toHaveAttribute('href', '/solucoes');
  });
});
