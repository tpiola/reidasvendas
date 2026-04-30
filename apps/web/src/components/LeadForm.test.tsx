import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LeadForm } from './LeadForm';

describe('LeadForm', () => {
  it('renderiza título e botão', () => {
    vi.stubGlobal('fetch', vi.fn());
    render(<LeadForm source="hero" />);
    expect(screen.getByText(/Diagnóstico gratuito/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Quero meu diagnóstico/i })).toBeInTheDocument();
  });
});

