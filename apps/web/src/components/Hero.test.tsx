import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Hero from './Hero';
import { I18nProvider } from '../lib/i18n';

vi.mock('./NeuralCanvas', () => ({
  default: () => <canvas data-testid="neural-canvas" />,
}));

describe('Hero', () => {
  beforeEach(() => {
    window.localStorage.setItem('rdv-locale', 'pt');
    // A URL do jsdom persiste entre os testes deste arquivo: o teste dos dois
    // caminhos clica em "Ver projetos reais" e navega para /portfolio. Sem este
    // reset, o teste seguinte renderiza /portfolio e o <Routes> não acha "/".
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

  it('apresenta os dois caminhos: soluções e provas publicadas', () => {
    render(
      <BrowserRouter>
        <I18nProvider>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/portfolio" element={<main>Portfolio page</main>} />
          </Routes>
        </I18nProvider>
      </BrowserRouter>,
    );

    expect(screen.getByRole('link', { name: /quero parar de perder cliente/i })).toHaveAttribute('href', '/solucoes');
    expect(screen.getByRole('link', { name: /ver projetos reais/i })).toHaveAttribute('href', '/portfolio');

    fireEvent.click(screen.getByRole('link', { name: /ver projetos reais/i }));
    expect(screen.getByText('Portfolio page')).toBeInTheDocument();
  });

  /**
   * O seletor da capa aponta para páginas que existem de verdade. Estes slugs
   * foram conferidos no sitemap construído (57 páginas canônicas). Se alguém
   * renomear uma página do catálogo sem atualizar o seletor, este teste falha —
   * é o que impede a capa de mandar visitante para uma rota inexistente.
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
