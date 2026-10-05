import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ConversionJourney from './ConversionJourney';

class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element): void {
    this.callback(
      [{ isIntersecting: true, target } as unknown as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }

  unobserve(): void {}

  disconnect(): void {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

function renderJourney() {
  return render(
    <MemoryRouter>
      <ConversionJourney />
    </MemoryRouter>,
  );
}

describe('ConversionJourney', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
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
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: IntersectionObserverMock,
    });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('explica a jornada em quatro etapas acessíveis', () => {
    renderJourney();

    const section = screen.getByRole('region', { name: /ser encontrado é o começo/i });
    expect(section).toBeInTheDocument();

    const steps = within(screen.getByRole('list', { name: /etapas da jornada comercial/i })).getAllByRole('button');
    expect(steps).toHaveLength(4);
    steps.forEach((step) => expect(step).toHaveAttribute('aria-controls', 'journey-detail'));
  });

  it('não duplica o id distribution-title (colisão com a seção de distribuição da home)', () => {
    renderJourney();

    expect(document.querySelectorAll('#jornada-title')).toHaveLength(1);
    expect(document.querySelectorAll('#distribution-title')).toHaveLength(0);
  });

  it('troca a etapa exibida ao escolher outra e pausa a rotação automática', () => {
    renderJourney();

    const steps = within(screen.getByRole('list', { name: /etapas da jornada comercial/i })).getAllByRole('button');
    expect(steps[0]).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(steps[2]);

    expect(steps[2]).toHaveAttribute('aria-pressed', 'true');
    expect(steps[0]).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: /retomar animação da jornada/i })).toBeInTheDocument();
  });

  it('permite pausar e retomar a animação', () => {
    renderJourney();

    const pause = screen.getByRole('button', { name: /pausar animação da jornada/i });
    fireEvent.click(pause);
    expect(screen.getByRole('button', { name: /retomar animação da jornada/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /retomar animação da jornada/i }));
    expect(screen.getByRole('button', { name: /pausar animação da jornada/i })).toBeInTheDocument();
  });

  it('avança sozinha quando a seção está visível', () => {
    vi.useFakeTimers();
    renderJourney();

    const steps = within(screen.getByRole('list', { name: /etapas da jornada comercial/i })).getAllByRole('button');
    expect(steps[0]).toHaveAttribute('aria-pressed', 'true');

    act(() => {
      vi.advanceTimersByTime(5200);
    });

    expect(steps[1]).toHaveAttribute('aria-pressed', 'true');
  });
});
