import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Hero from './Hero';
import { I18nProvider } from '../lib/i18n';

vi.mock('./NeuralCanvas', () => ({
  default: () => <canvas data-testid="neural-canvas" />,
}));

function DiagnosticLocation() {
  const location = useLocation();
  return <output data-testid="diagnostic-location">{location.search}</output>;
}

describe('Hero', () => {
  beforeEach(() => {
    window.localStorage.setItem('rdv-locale', 'pt');
    window.history.replaceState({}, '', '/?utm_source=campanha-local');
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

  it('preserva a atribuição e pré-preenche o diagnóstico sem transmitir o e-mail', async () => {
    render(
      <BrowserRouter>
        <I18nProvider>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/diagnostico" element={<DiagnosticLocation />} />
          </Routes>
        </I18nProvider>
      </BrowserRouter>,
    );

    fireEvent.change(screen.getByLabelText('E-mail profissional'), {
      target: { value: '  Comercial@Exemplo.com  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Abrir diagnóstico' }));

    const output = await screen.findByTestId('diagnostic-location');
    const query = new URLSearchParams(output.textContent ?? '');

    expect(query.get('email')).toBe('comercial@exemplo.com');
    expect(query.get('origem')).toBe('home-hero-email');
    expect(query.get('utm_source')).toBe('campanha-local');
  });
});
