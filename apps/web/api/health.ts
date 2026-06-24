import type { VercelRequest, VercelResponse } from "@vercel/node";

function json(res: VercelResponse, status: number, body: Record<string, unknown>) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  return json(res, 200, {
    ok: true,
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
