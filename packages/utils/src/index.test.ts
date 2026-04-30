import { describe, expect, it } from 'vitest';
import { assignAbVariant } from './index';

describe('assignAbVariant', () => {
  it('retorna A ou B', () => {
    const v = assignAbVariant('abc');
    expect(v === 'A' || v === 'B').toBe(true);
  });
});

