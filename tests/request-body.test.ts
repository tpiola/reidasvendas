import { describe, it, expect } from 'vitest';
import { readTextLimit, BodyTooLargeError } from '../lib/request-body';
describe('bounded request bodies', () => {
  it('reads valid UTF-8 without changing content', async () => {
    expect(
      await readTextLimit(
        new Request('https://test.local', { method: 'POST', body: 'ação' }),
        20,
      ),
    ).toBe('ação');
  });
  it('limits streamed bodies even without content-length', async () => {
    await expect(
      readTextLimit(
        new Request('https://test.local', {
          method: 'POST',
          body: 'a'.repeat(100),
        }),
        10,
      ),
    ).rejects.toBeInstanceOf(BodyTooLargeError);
  });
  it('rejects declared oversized content before reading', async () => {
    await expect(
      readTextLimit(
        new Request('https://test.local', {
          method: 'POST',
          body: 'a',
          headers: { 'content-length': '1000' },
        }),
        10,
      ),
    ).rejects.toBeInstanceOf(BodyTooLargeError);
  });
});
