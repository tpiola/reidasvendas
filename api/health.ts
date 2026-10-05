type Request = {
  method?: string;
};

type Response = {
  statusCode?: number;
  setHeader?: (key: string, value: string) => void;
  end?: (body?: string) => void;
  status?: (code: number) => { json: (body: unknown) => void };
};

function json(res: Response, status: number, body: Record<string, unknown>) {
  res.setHeader?.('Cache-Control', 'no-store');
  if (res.status) {
    res.status(status).json(body);
    return;
  }

  res.statusCode = status;
  res.setHeader?.('Content-Type', 'application/json; charset=utf-8');
  res.setHeader?.('Cache-Control', 'no-store');
  res.end?.(JSON.stringify(body));
}

export default function handler(req: Request, res: Response) {
  if (req.method !== 'GET') {
    json(res, 405, { ok: false, error: 'method_not_allowed' });
    return;
  }

  json(res, 200, {
    ok: true,
    service: 'reidasvendas',
    revision: process.env.VERCEL_GIT_COMMIT_SHA || null,
    leadDelivery: process.env.LEAD_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL ? 'webhook' : 'whatsapp_handoff',
  });
}
