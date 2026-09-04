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

    expect(screen.getByRole('link', { name: /explorar possibilidades/i })).toHaveAttribute('href', '/solucoes');
    expect(screen.getByRole('link', { name: /ver projetos reais/i })).toHaveAttribute('href', '/portfolio');

    fireEvent.click(screen.getByRole('link', { name: /ver projetos reais/i }));
    expect(screen.getByText('Portfolio page')).toBeInTheDocument();
  });
});
