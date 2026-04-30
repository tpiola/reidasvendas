import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('admin App', () => {
  it('renderiza', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

