export class BodyTooLargeError extends Error {}
export async function readTextLimit(
  request: Request,
  limit: number,
): Promise<string> {
  const length = Number(request.headers.get('content-length') || 0);
  if (length > limit) throw new BodyTooLargeError();
  const reader = request.body?.getReader();
  if (!reader) return '';
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = '';
  try {
    for (;;) {
      const result = await reader.read();
      if (result.done) break;
      bytes += result.value.byteLength;
      if (bytes > limit) {
        await reader.cancel();
        throw new BodyTooLargeError();
      }
      text += decoder.decode(result.value, { stream: true });
    }
    return text + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}
