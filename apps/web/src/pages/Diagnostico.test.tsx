import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
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

    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'QA Deploy' } });
    fireEvent.change(screen.getByLabelText('Qual é o seu negócio?'), {
      target: { value: 'representacao-comercial' },
    });
    fireEvent.change(screen.getByLabelText('Principal objetivo comercial'), {
      target: { value: 'mais-contatos' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));

    await waitFor(() => {
      expect(screen.getByLabelText('Solução de interesse (opcional)')).toHaveValue('catalogo-para-representantes');
    });
    expect(screen.getByLabelText('Conte mais sobre o problema (opcional)')).not.toBeRequired();
    expect(screen.getByLabelText('Faixa de investimento (opcional)')).not.toBeRequired();
    expect(await screen.findByLabelText('E-mail (opcional)')).toHaveValue('comercial@exemplo.com');
    expect(screen.getByLabelText('E-mail (opcional)')).not.toBeRequired();
  });
  it('envia apenas os campos essenciais e mantém o handoff explícito', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, delivery: 'whatsapp_handoff' }),
    });
    vi.stubGlobal('fetch', fetchMock);
    render(<MemoryRouter initialEntries={['/diagnostico?plano=crescimento&cobranca=anual&origem=planos']}><Diagnostico /></MemoryRouter>);
    expect(screen.getByText(/Sua escolha:/)).toHaveTextContent('Crescimento · R$ 6.970/ano');
    fireEvent.change(screen.getByLabelText('Nome'), { target: { value: 'Pessoa de teste' } });
    fireEvent.change(screen.getByLabelText('Qual é o seu negócio?'), { target: { value: 'servico-local' } });
    fireEvent.change(screen.getByLabelText('Principal objetivo comercial'), { target: { value: 'mais-contatos' } });
    fireEvent.click(screen.getByRole('button', { name: 'Continuar' }));
    fireEvent.change(screen.getByLabelText('WhatsApp para retorno'), { target: { value: '16999999999' } });
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('button', { name: 'Registrar meu diagnóstico' }));
    expect(await screen.findByText('Diagnóstico preparado para envio')).toBeInTheDocument();
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(payload).toMatchObject({ name: 'Pessoa de teste', email: '', consent: true, service: 'seo-local-google-business', investment: '', plan: 'crescimento', billing: 'anual', origin: 'planos' });
    expect(payload.message).toContain('Objetivo: mais-contatos');
    expect(screen.getByText(/ainda precisa ser enviado/)).toBeInTheDocument();
    expect(decodeURIComponent(screen.getByRole('link', { name: /Abrir conversa qualificada/ }).getAttribute('href') || '')).toContain('Ainda a definir');
  });

});
