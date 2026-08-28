import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Diagnostico from './Diagnostico';

class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '0px';
  readonly thresholds = [0];

  disconnect(): void {}
  observe(): void {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
  unobserve(): void {}
}

describe('Diagnostico', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: IntersectionObserverMock,
    });
    Object.defineProperty(window, 'requestAnimationFrame', {
      configurable: true,
      value: (callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      },
    });
    Object.defineProperty(window, 'cancelAnimationFrame', {
      configurable: true,
      value: vi.fn(),
    });
    Object.defineProperty(window, 'scrollTo', {
      configurable: true,
      value: vi.fn(),
    });
  });

  it('reconcilia e-mail e solução da URL depois da hidratação', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/diagnostico?email=Comercial%40Exemplo.com&solucao=catalogo-para-representantes',
        ]}
      >
        <Diagnostico />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText('O que você precisa?')).toHaveValue('catalogo-para-representantes');
    });

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'QA Deploy' } });
    fireEvent.change(screen.getByLabelText('Qual é o seu negócio?'), {
      target: { value: 'representacao-comercial' },
    });
    fireEvent.change(screen.getByLabelText('Qual problema você quer resolver?'), {
      target: { value: 'Validar o handoff do Hero.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));

    expect(await screen.findByLabelText('E-mail')).toHaveValue('comercial@exemplo.com');
  });
});
