import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    window.localStorage.clear();
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
  });

  it('cicla entre sistema, claro e escuro e persiste a preferência', () => {
    render(<ThemeToggle />);

    const system = screen.getByRole('button', { name: /tema do sistema ativo/i });
    expect(document.documentElement.dataset.themePreference).toBe('system');
    expect(document.documentElement.dataset.theme).toBe('light');

    fireEvent.click(system);
    const light = screen.getByRole('button', { name: /modo claro ativo/i });
    expect(window.localStorage.getItem('rdv-theme')).toBe('light');

    fireEvent.click(light);
    const dark = screen.getByRole('button', { name: /modo escuro ativo/i });
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(window.localStorage.getItem('rdv-theme')).toBe('dark');

    fireEvent.click(dark);
    expect(document.documentElement.dataset.themePreference).toBe('system');
    expect(window.localStorage.getItem('rdv-theme')).toBe('system');
  });
});
