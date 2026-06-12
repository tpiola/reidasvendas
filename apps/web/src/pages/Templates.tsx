import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { applySeo } from '@/lib/seo';
import { TEMPLATES } from '@/data/templates';
import { LeadCaptureSection } from '@/components/LeadCaptureSection';
import { TemplatePreviewModal } from '@/components/TemplatePreviewModal';
import { DEFAULT_OG_IMAGE } from '@/lib/seo-meta';

/* ── Typewriter animado ── */
function TypewriterBadge({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const done = !deleting && sub === words[index].length;
    const shouldDelete = deleting && sub === 0;
    if (shouldDelete) { setDeleting(false); setIndex((i) => (i + 1) % words.length); return; }
    const t = setTimeout(() => {
      if (done) { setTimeout(() => setDeleting(true), 2000); return; }
      setSub((s) => (deleting ? s - 1 : s + 1));
    }, done ? 0 : deleting ? 40 : 80);
    return () => clearTimeout(t);
  }, [sub, index, deleting, words]);

  return (
    <span className="relative">
      {words[index].substring(0, sub)}
      <span className="animate-pulse">|</span>
    </span>
  );
}

/* ── Partículas Canvas de fundo ── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    let id: number;

    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      a: Math.random() * 0.3 + 0.05,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,87,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      id = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden />;
}

/* ── Contador animado ── */
function AnimatedCount({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = 16;
    const increment = end / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Stats bar ── */
function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const stats = [
    { end: 9, suffix: '+', label: 'Nichos' },
    { end: 120, suffix: '+', label: 'Assets' },
    { end: 3, suffix: 'x', label: 'Conversão média' },
    { end: 24, suffix: 'h', label: 'Primeiro deploy' },
  ];

  return (
    <div ref={ref} className="relative z-10 mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          className="flex flex-col items-center justify-center px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1 }}
        >
          <span className="bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-3xl font-black tracking-tight text-transparent">
            <AnimatedCount end={s.end} suffix={s.suffix} />
          </span>
          <span className="mt-1 text-xs font-medium tracking-wide text-zinc-500">{s.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ── Filter bar ── */
const NICHO_ALL = 'todos';
const NICHOS = [NICHO_ALL, ...new Set(TEMPLATES.map((t) => t.niche))];

/* ── Template card premium ── */
function PremiumTemplateCard({ template, index, onPreview }: { template: typeof TEMPLATES[0]; index: number; onPreview: (t: typeof TEMPLATES[0]) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.setProperty('--rotate-x', `${y * -8}deg`);
    cardRef.current.style.setProperty('--rotate-y', `${x * 8}deg`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rotate-x', '0deg');
    cardRef.current.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative perspective-[1000px]"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative transition-transform duration-200 ease-out"
        style={{
          transform: 'perspective(1000px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))',
        }}
      >
        <Link to={`/templates/${template.slug}`} className="block focus-visible:outline-none">
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-500/30 group-hover:shadow-[0_0_40px_-8px_rgba(0,87,255,0.15)]">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={template.thumbImageUrl}
                alt={`${template.name} — ${template.niche}`}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute left-3 top-3">
                <span className="inline-block rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm">
                  {template.niche}
                </span>
              </div>
              {template.featured && (
                <div className="absolute right-3 top-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-lg">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/80 animate-pulse" />
                    Destaque
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold tracking-tight text-white">{template.name}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">{template.tagline}</p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">
              <span className="text-[11px] font-medium text-zinc-500">
                a partir de <span className="text-zinc-300">R$ {Math.floor(template.basePriceCents / 100).toLocaleString('pt-BR')}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-400 transition-all group-hover:text-blue-300 group-hover:gap-1.5">
                Ver amostra
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
        <button
          onClick={(e) => { e.preventDefault(); onPreview(template); }}
          className="absolute right-3 bottom-[4.5rem] z-10 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/90 text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-blue-500 group-hover:opacity-100"
          aria-label={`Preview rápido: ${template.name}`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default function Templates() {
  const [filter, setFilter] = useState(NICHO_ALL);
  const [previewTemplate, setPreviewTemplate] = useState<typeof TEMPLATES[0] | null>(null);
  const filtered = filter === NICHO_ALL ? TEMPLATES : TEMPLATES.filter((t) => t.niche === filter);
  const featured = TEMPLATES.filter((t) => t.featured);

  useEffect(() => {
    applySeo({
      title: 'Catálogo de templates premium — Rei das Vendas',
      description: '9 nichos, design profissional e conversão real. Cada template é ponto de partida para um projeto exclusivo feito do zero.',
      canonicalPath: '/templates',
      ogImage: DEFAULT_OG_IMAGE,
    });
  }, []);

  return (
    <>
      <ParticleField />
      <TemplatePreviewModal template={previewTemplate} onClose={() => setPreviewTemplate(null)} />

      <main className="relative z-10 page-surface min-h-screen">
        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent" />
          <div className="absolute top-1/4 left-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-blue-400/5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-12 md:pt-32 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                  Catálogo de amostras
                </span>
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                <span className="text-white">Inspiração que </span>
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-zinc-100 bg-clip-text text-transparent">
                  vende.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
                <TypewriterBadge words={['9 nichos prontos.', 'Design que converte.', 'Feito do zero.', 'Para o seu negócio.']} />
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                Cada template é referência visual de estética e estrutura — seu projeto será{' '}
                <span className="text-zinc-300">exclusivo, feito do zero</span> para maximizar conversão.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#catalogo" className="relative inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-b from-blue-600 to-blue-700 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:shadow-blue-500/30 hover:brightness-110 active:scale-[0.98]">
                  Explorar catálogo
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
                <Link to="/diagnostico" className="inline-flex h-12 items-center rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white">
                  Quero um projeto exclusivo
                </Link>
              </div>
            </motion.div>
            <StatsBar />
          </div>
        </section>

        {/* ═══ DESTAQUES ═══ */}
        {featured.length > 0 && (
          <section className="border-b border-white/5 py-16">
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">Templates em destaque</span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
              </div>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {featured.slice(0, 4).map((t, i) => (
                  <PremiumTemplateCard key={t.slug} template={t} index={i} onPreview={setPreviewTemplate} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ CATÁLOGO COMPLETO ═══ */}
        <section id="catalogo" className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-wrap items-center gap-2">
              <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Filtrar:</span>
              {NICHOS.map((n) => (
                <button
                  key={n}
                  onClick={() => setFilter(n)}
                  className={`rounded-full px-4 py-1.5 text-[11px] font-medium transition-all ${
                    filter === n
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                      : 'border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                  }`}
                >
                  {n === NICHO_ALL ? 'Todos' : n}
                </button>
              ))}
              <span className="ml-auto text-xs text-zinc-600">
                {filtered.length} template{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((t, i) => (
                <PremiumTemplateCard key={t.slug} template={t} index={i} onPreview={setPreviewTemplate} />
              ))}
            </div>

            <motion.div
              className="mt-16 flex flex-col items-center gap-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-5 py-2 text-xs text-zinc-500 backdrop-blur-sm">
                <span>Não encontrou o nicho ideal?</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/planos"
                  className="relative inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-b from-zinc-100 to-zinc-200 px-6 text-sm font-semibold text-zinc-900 shadow-lg transition-all hover:brightness-110 active:scale-[0.98]"
                >
                  Ver planos
                </Link>
                <Link
                  to="/diagnostico"
                  className="inline-flex h-12 items-center rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-medium text-zinc-300 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white"
                >
                  Agendar diagnóstico gratuito
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-white/5">
          <LeadCaptureSection
            id="diagnostico"
            source="template_catalog"
            headline="Quer um projeto exclusivo — não uma cópia?"
            description="Nome, e-mail e WhatsApp. Devolvemos rota, escopo e próximo passo em até 24h."
            intent="templates"
          />
        </section>
      </main>
    </>
  );
}
