/* ═══════════════════════════════════════════
   API DEPLOY-SITE.TS — Rei das Vendas
   Publica site gerado por IA na Vercel em tempo real
═══════════════════════════════════════════ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Req = { method?: string; headers?: Record<string, string | undefined>; body?: unknown };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Res = { statusCode?: number; setHeader?: (k: string, v: string) => void; end?: (d: unknown) => void };

const MAX_BODY_BYTES = 128_000;
const VERCEL_API = 'https://api.vercel.com';
const VERIFIER = 'reidasvendas.com.br';

type DeployPayload = {
  companyName: string;
  sector: string;
  generatedSite: {
    hero: { title: string; subtitle: string; cta: string };
    sections: { title: string; description: string }[];
    palette: { primary: string; secondary: string; accent: string; background: string };
    summary: string;
  };
  email?: string;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function sanitizeString(value: unknown, maxLen = 2000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

function sanitizeHex(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : fallback;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

function sanitizeDomain(text: string): string {
  const slug = slugify(text);
  return slug || 'site-gerado';
}

function parseDeployBody(input: unknown): { ok: true; value: DeployPayload } | { ok: false; error: string } {
  if (!isObject(input)) return { ok: false, error: 'invalid_body' };

  const companyName = sanitizeString(input.companyName, 200);
  const sector = sanitizeString(input.sector, 200);
  const email = sanitizeString(input.email, 320) || undefined;

  const gs = input.generatedSite;
  if (!isObject(gs)) return { ok: false, error: 'generatedSite_required' };

  const hero = isObject(gs.hero) ? gs.hero as Record<string, unknown> : null;
  const sections = Array.isArray(gs.sections) ? gs.sections : [];
  const palette = isObject(gs.palette) ? gs.palette as Record<string, unknown> : null;
  const summary = sanitizeString(gs.summary, 2000);

  if (!companyName) return { ok: false, error: 'companyName_required' };
  if (!hero) return { ok: false, error: 'hero_required' };
  if (!palette) return { ok: false, error: 'palette_required' };

  return {
    ok: true,
    value: {
      companyName,
      sector,
      generatedSite: {
        hero: {
          title: sanitizeString(hero.title, 200) || companyName,
          subtitle: sanitizeString(hero.subtitle, 500) || 'Site Profissional',
          cta: sanitizeString(hero.cta, 200) || 'Fale Conosco',
        },
        sections: sections.slice(0, 8).map((s: unknown) => {
          const sec = isObject(s) ? s as Record<string, unknown> : {};
          return {
            title: sanitizeString(sec.title, 200),
            description: sanitizeString(sec.description, 1000),
          };
        }),
        palette: {
          primary: sanitizeHex(palette.primary, '#D6A84F'),
          secondary: sanitizeHex(palette.secondary, '#0A2540'),
          accent: sanitizeHex(palette.accent, '#F97316'),
          background: sanitizeHex(palette.background, '#030303'),
        },
        summary,
      },
      email,
    },
  };
}

function json(res: Res, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader?.('Content-Type', 'application/json; charset=utf-8');
  res.setHeader?.('Access-Control-Allow-Origin', '*');
  res.setHeader?.('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader?.('Access-Control-Allow-Headers', 'Content-Type');
  res.end?.(JSON.stringify(body));
}

/* ─── Gera HTML completo do site ─── */
function generateSiteHtml(payload: DeployPayload): string {
  const { companyName, sector, generatedSite: site } = payload;
  const p = site.palette;
  const domainName = `${sanitizeDomain(companyName)}.vercel.app`;

  const featuresHtml = site.sections
    .slice(0, 6)
    .map(
      (s, i) => `
      <div class="feature-card" style="animation-delay: ${i * 0.1}s">
        <div class="feature-icon" style="background: ${p.primary}22; color: ${p.primary}">✦</div>
        <h3>${s.title}</h3>
        <p>${s.description}</p>
      </div>`
    )
    .join('');

  const testimonialHtml = `
      <div class="testimonial">
        <div class="quote">"</div>
        <p>A ${companyName} transformou completamente nossa presença digital. Resultados excepcionais em apenas semanas.</p>
        <div class="author">
          <div class="avatar" style="background: ${p.primary}33; color: ${p.primary}">C</div>
          <div>
            <strong>Cliente Satisfeito</strong>
            <span>CEO, ${sector}</span>
          </div>
        </div>
      </div>`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${companyName} — ${sector} | Site Profissional</title>
  <meta name="description" content="${site.hero.subtitle.slice(0, 160)}">
  <meta name="generator" content="Rei das Vendas AI Builder">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --primary: ${p.primary};
      --secondary: ${p.secondary};
      --accent: ${p.accent};
      --bg: ${p.background};
      --text: #F5F5F5;
      --text-muted: #A1A1AA;
      --radius: 16px;
    }
    html { scroll-behavior: smooth; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    h1, h2, h3, h4 { font-family: 'Playfair Display', Georgia, serif; font-weight: 700; }

    /* Nav */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(3,3,3,0.92); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.06); padding: 16px 24px;
    }
    nav .inner {
      max-width: 1200px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
    }
    .logo { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 800; color: var(--primary); }
    nav .cta-btn {
      display: inline-flex; align-items: center; gap: 8px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: #030303; font-weight: 700; font-size: 0.875rem;
      padding: 10px 24px; border-radius: 999px; text-decoration: none;
      transition: all 0.3s ease;
    }
    nav .cta-btn:hover { transform: scale(1.04); box-shadow: 0 0 30px ${p.primary}44; }

    /* Hero */
    .hero {
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
      text-align: center; padding: 120px 24px 80px;
      position: relative; overflow: hidden;
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at 30% 50%, ${p.primary}11 0%, transparent 60%);
    }
    .hero-content { position: relative; max-width: 800px; }
    .hero-badge {
      display: inline-block; padding: 6px 16px; border-radius: 999px;
      background: ${p.primary}15; border: 1px solid ${p.primary}33;
      color: var(--primary); font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;
      margin-bottom: 24px;
    }
    .hero h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 1.1; margin-bottom: 20px; }
    .hero h1 span { color: var(--primary); }
    .hero p { font-size: clamp(1rem, 2vw, 1.2rem); color: var(--text-muted); max-width: 600px; margin: 0 auto 36px; }
    .hero-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      background: linear-gradient(135deg, var(--primary), #F2D38A);
      color: #030303; font-weight: 700; font-size: 0.95rem;
      padding: 14px 32px; border-radius: 999px; text-decoration: none;
      transition: all 0.3s ease;
    }
    .btn-primary:hover { transform: scale(1.04); box-shadow: 0 0 40px ${p.primary}44; }
    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      border: 1px solid ${p.primary}33; color: var(--text); font-weight: 600; font-size: 0.95rem;
      padding: 14px 32px; border-radius: 999px; text-decoration: none;
      transition: all 0.3s ease;
    }
    .btn-outline:hover { border-color: var(--primary); background: ${p.primary}11; }

    /* Sections */
    section { padding: 96px 24px; max-width: 1200px; margin: 0 auto; }
    .section-label {
      display: inline-block; color: var(--primary); font-size: 0.7rem;
      font-weight: 700; text-transform: uppercase; letter-spacing: 0.18em;
      margin-bottom: 12px;
    }
    .section-title {
      font-size: clamp(1.8rem, 4vw, 3rem); margin-bottom: 16px;
    }
    .section-subtitle { color: var(--text-muted); max-width: 600px; font-size: 1rem; margin-bottom: 48px; }

    /* Features Grid */
    .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
    .feature-card {
      padding: 32px; border-radius: var(--radius);
      border: 1px solid rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.02);
      transition: all 0.4s ease;
    }
    .feature-card:hover { border-color: ${p.primary}44; background: ${p.primary}05; transform: translateY(-4px); }
    .feature-icon {
      width: 48px; height: 48px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem; margin-bottom: 16px;
    }
    .feature-card h3 { font-size: 1.15rem; margin-bottom: 8px; }
    .feature-card p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.7; }

    /* CTA Section */
    .cta-section {
      text-align: center; padding: 96px 24px;
      position: relative;
    }
    .cta-section::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 50%, ${p.primary}11 0%, transparent 60%);
    }
    .cta-section .inner { position: relative; max-width: 600px; margin: 0 auto; }
    .cta-section h2 { font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 16px; }
    .cta-section p { color: var(--text-muted); margin-bottom: 32px; }

    /* Testimonial */
    .testimonial {
      padding: 40px; border-radius: var(--radius);
      border: 1px solid rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.015);
      max-width: 600px; margin: 0 auto;
    }
    .quote { font-size: 3rem; color: var(--primary); opacity: 0.4; line-height: 0.6; margin-bottom: 8px; }
    .testimonial p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.8; margin-bottom: 20px; }
    .author { display: flex; align-items: center; gap: 12px; }
    .avatar {
      width: 44px; height: 44px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 1rem; flex-shrink: 0;
    }
    .author strong { display: block; font-size: 0.9rem; color: var(--text); }
    .author span { display: block; font-size: 0.8rem; color: var(--text-muted); }

    /* Footer */
    footer {
      border-top: 1px solid rgba(255,255,255,0.06);
      padding: 48px 24px; text-align: center;
    }
    footer .inner { max-width: 1200px; margin: 0 auto; }
    footer .powered { font-size: 0.8rem; color: var(--text-muted); margin-top: 16px; }
    footer .powered a { color: var(--primary); text-decoration: none; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .feature-card { animation: fadeInUp 0.6s ease both; }
    .hero-content { animation: fadeInUp 0.8s ease both; }
  </style>
</head>
<body>

  <!-- Nav -->
  <nav>
    <div class="inner">
      <div class="logo">${companyName}</div>
      <a href="#contato" class="cta-btn">${site.hero.cta} →</a>
    </div>
  </nav>

  <!-- Hero -->
  <section class="hero">
    <div class="hero-content">
      <div class="hero-badge">✦ ${sector}</div>
      <h1>${site.hero.title}</h1>
      <p>${site.hero.subtitle}</p>
      <div class="hero-buttons">
        <a href="#contato" class="btn-primary">${site.hero.cta} →</a>
        <a href="#servicos" class="btn-outline">Ver Serviços</a>
      </div>
    </div>
  </section>

  <!-- Serviços -->
  <section id="servicos">
    <div class="section-label">Nossos Serviços</div>
    <h2 class="section-title">Soluções ${sector} de Alto Nível</h2>
    <p class="section-subtitle">Oferecemos o que há de melhor em ${sector.toLowerCase()} para transformar resultados.</p>
    <div class="features-grid">
      ${featuresHtml || '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted)">Soluções personalizadas para sua necessidade.</p>'}
    </div>
  </section>

  <!-- Depoimento -->
  <section id="depoimentos">
    <div class="section-label" style="text-align: center">Depoimentos</div>
    <h2 class="section-title" style="text-align: center">O Que Nossos Clientes Dizem</h2>
    <p class="section-subtitle" style="text-align: center; margin-left: auto; margin-right: auto">A confiança de quem já transformou seu negócio conosco.</p>
    ${testimonialHtml}
  </section>

  <!-- CTA -->
  <section id="contato" class="cta-section">
    <div class="inner">
      <div class="section-label">Entre em Contato</div>
      <h2>Vamos Transformar seu Negócio</h2>
      <p>Agende uma conversa sem compromisso e descubra como podemos ajudar sua empresa a crescer.</p>
      <a href="#" class="btn-primary" style="font-size: 1.05rem">Falar com Consultor →</a>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="inner">
      <div class="logo" style="font-size: 1.1rem; margin-bottom: 8px">${companyName}</div>
      <p style="color: var(--text-muted); font-size: 0.85rem">${site.summary || `${sector} de excelência — compromisso com resultado.`}</p>
      <p class="powered">
        Site criado com <a href="https://reidasvendas.com.br" target="_blank" rel="noopener">Rei das Vendas AI Builder</a>
      </p>
    </div>
  </footer>

</body>
</html>`;
}

/* ─── Deploy na Vercel ─── */
async function deployToVercel(html: string, companyName: string): Promise<{ url: string; id: string }> {
  const tokenFile = '/opt/data/tokens/vercel-token';
  let token: string;

  if (typeof process !== 'undefined' && process.env?.VERCEL_TOKEN) {
    token = process.env.VERCEL_TOKEN;
  } else {
    const fs = await import('node:fs');
    token = fs.readFileSync(tokenFile, 'utf-8').trim();
  }

  // Generate files — single page site
  const files = [
    {
      file: 'index.html',
      data: Buffer.from(html).toString('base64'),
    },
    {
      file: '_headers',
      data: Buffer.from(`/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
`).toString('base64'),
    },
  ];

  const projectName = `site-${sanitizeDomain(companyName)}-${Date.now().toString(36)}`;

  const response = await fetch(`${VERCEL_API}/v13/deployments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: projectName.slice(0, 50),
      files,
      projectSettings: {
        framework: null,
        devCommand: null,
        installCommand: null,
        buildCommand: null,
        outputDirectory: '.',
      },
      target: 'production',
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => 'unknown');
    throw new Error(`Vercel deploy failed (${response.status}): ${errorBody}`);
  }

  const result = (await response.json()) as { url?: string; id?: string; name?: string };
  const url = result.url
    ? `https://${result.url}`
    : `https://${projectName}.vercel.app`;

  return { url, id: result.id || 'unknown' };
}

/* ─── Handler ─── */
export default async function handler(req: Req, res: Res) {
  /* CORS */
  res.setHeader?.('Access-Control-Allow-Origin', '*');
  res.setHeader?.('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader?.('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return json(res, 204, {});

  if (req.method !== 'POST') {
    res.setHeader?.('Allow', 'POST');
    return json(res, 405, { ok: false, error: 'method_not_allowed' });
  }

  /* Parse body */
  let bodyUnknown: unknown = req.body;
  if (typeof req.body === 'string') {
    if (req.body.length > MAX_BODY_BYTES) {
      return json(res, 413, { ok: false, error: 'payload_too_large' });
    }
    try {
      bodyUnknown = JSON.parse(req.body);
    } catch {
      return json(res, 400, { ok: false, error: 'invalid_json' });
    }
  }

  const parsed = parseDeployBody(bodyUnknown);
  if (!parsed.ok) {
    const err = (parsed as { ok: false; error: string }).error;
    return json(res, 400, { ok: false, error: err });
  }

  /* Generate HTML */
  const html = generateSiteHtml(parsed.value);

  /* Deploy to Vercel */
  try {
    const deployResult = await deployToVercel(html, parsed.value.companyName);

    return json(res, 200, {
      ok: true,
      url: deployResult.url,
      id: deployResult.id,
      companyName: parsed.value.companyName,
      sector: parsed.value.sector,
      message: `Site publicado com sucesso em ${deployResult.url}`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown_error';
    console.error('[deploy-site] Error:', message);
    return json(res, 502, { ok: false, error: message });
  }
}
