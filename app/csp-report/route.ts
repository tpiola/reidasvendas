import { readTextLimit, BodyTooLargeError } from '@/lib/request-body';
export async function POST(request: Request) {
  try {
    JSON.parse(await readTextLimit(request, 4096));
  } catch (error) {
    return new Response(null, {
      status: error instanceof BodyTooLargeError ? 413 : 400,
    });
  }
  // Discard raw reports: blocked URLs may contain user-provided query strings.
  return new Response(null, {
    status: 204,
    headers: { 'Cache-Control': 'no-store' },
  });
}
