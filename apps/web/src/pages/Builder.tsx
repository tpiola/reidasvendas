import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, Sparkles, MessageCircle, MousePointerClick, Globe,
  CheckCircle2, Zap, Palette, Layout, Smartphone, Search, Shield,
  Bot, Wifi, Loader2, AlertCircle, RotateCcw, Building2, Target,
  Eye, RefreshCw,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { Reveal, SectionLabel, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { PremiumButton } from '@/components/PremiumButton';
import { FeatureCard } from '@/components/PremiumComponents';
import { GoldParticles } from '@/components/GoldParticles';

/* ─── Types ─── */
type BuilderStatus = 'idle' | 'loading' | 'success' | 'deployed' | 'error';

interface GeneratedSite {
  hero: { title: string; subtitle: string; cta: string };
  sections: { title: string; description: string }[];
  palette: { primary: string; secondary: string; accent: string; background: string };
  summary: string;
}

interface DeployResult {
  url: string;
  id: string;
  companyName: string;
  message: string;
}

/* ─── Fluxo do Builder ─── */
const FLOW = [
  {
    icon: MessageCircle, step: '01', title: 'Entrevista de Marca',
    desc: 'Você responde algumas perguntas sobre seu negócio — público-alvo, objetivo, estilo visual. Nosso AI aprende sua marca em minutos.',
  },
  {
    icon: Sparkles, step: '02', title: 'Geração por IA',
    desc: 'A inteligência artificial cria um site completo com design, copy e estrutura otimizados para conversão. Em segundos, não em semanas.',
  },
  {
    icon: MousePointerClick, step: '03', title: 'Customização Drag-and-Drop',
    desc: 'Arrume, troque cores, ajuste textos e imagens com o editor visual mais intuitivo do mercado. Sem precisar escrever uma linha de código.',
  },
  {
    icon: Globe, step: '04', title: 'Publicação com 1 Clique',
    desc: 'Seu site no ar com domínio próprio, SSL grátis, CDN global e SEO otimizado. Tudo incluso, sem surpresas.',
  },
];

/* ─── Templates Gerados por IA ─── */
const AI_TEMPLATES = [
  {
    name: 'Clínica Odontológica',
    category: 'Saúde',
    gradient: 'from-[#D6A84F]/20 via-[#B88932]/10 to-[#F2D38A]/5',
    borderColor: 'rgba(214,168,79,0.3)',
    accentColor: '#D6A84F',
    tag: 'Alta Conversão',
    preview: (
      <div className="flex h-44 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6A84F]/10 to-[#030303] sm:h-52">
        <div className="text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-[rgba(214,168,79,0.15)] flex items-center justify-center">
            <span className="text-lg font-bold text-[#D6A84F]">+</span>
          </div>
          <p className="text-xs text-[#A1A1AA]">Template • Saúde</p>
          <p className="text-sm font-semibold text-white">Dr. Carlos Silva</p>
        </div>
      </div>
    ),
  },
  {
    name: 'Loja de Calçados',
    category: 'Calçados',
    gradient: 'from-[#B88932]/20 via-[#D6A84F]/10 to-[#F2D38A]/5',
    borderColor: 'rgba(184,137,50,0.3)',
    accentColor: '#B88932',
    tag: 'E-commerce',
    preview: (
      <div className="flex h-44 items-center justify-center rounded-xl bg-gradient-to-br from-[#B88932]/10 to-[#030303] sm:h-52">
        <div className="text-center">
          <div className="mx-auto mb-3 flex gap-1">
            <div className="h-8 w-6 rounded bg-[rgba(184,137,50,0.15)]" />
            <div className="h-8 w-6 rounded bg-[rgba(184,137,50,0.2)]" />
            <div className="h-8 w-6 rounded bg-[rgba(184,137,50,0.15)]" />
          </div>
          <p className="text-xs text-[#A1A1AA]">Template • Calçados</p>
          <p className="text-sm font-semibold text-white">Sapataria Premium</p>
        </div>
      </div>
    ),
  },
  {
    name: 'Consultoria Empresarial',
    category: 'Serviços',
    gradient: 'from-[#F2D38A]/20 via-[#D6A84F]/10 to-[#B88932]/5',
    borderColor: 'rgba(242,211,138,0.3)',
    accentColor: '#F2D38A',
    tag: 'Landing Page',
    preview: (
      <div className="flex h-44 items-center justify-center rounded-xl bg-gradient-to-br from-[#F2D38A]/10 to-[#030303] sm:h-52">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-10 w-28 items-center justify-center rounded-lg border border-[rgba(242,211,138,0.2)] bg-[rgba(242,211,138,0.06)]">
            <span className="text-[10px] font-semibold text-[#F2D38A]">LOGOMARCA</span>
          </div>
          <p className="text-xs text-[#A1A1AA]">Template • Serviços</p>
          <p className="text-sm font-semibold text-white">Mentoria & Resultados</p>
        </div>
      </div>
    ),
  },
];

/* ─── Features do Builder ─── */
const BUILDER_FEATURES = [
  {
    icon: <Bot className="h-5 w-5" />,
    title: 'AI que Conhece sua Marca',
    description: 'Nosso algoritmo analisa seu negócio, segmento e concorrência para gerar um site que realmente representa sua marca.',
  },
  {
    icon: <Layout className="h-5 w-5" />,
    title: 'Editor Visual Completo',
    description: 'Drag-and-drop intuitivo com dezenas de componentes. Altere cores, fontes, imagens e layout em tempo real.',
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: '100% Responsivo',
    description: 'Seu site fica perfeito em qualquer dispositivo — celular, tablet e desktop. Teste e ajuste cada visualização.',
  },
  {
    icon: <Search className="h-5 w-5" />,
    title: 'SEO Inteligente',
    description: 'Meta tags, sitemap, structured data e otimização de performance aplicados automaticamente pela IA.',
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Velocidade Ultrarápida',
    description: 'CDN global, imagens otimizadas e código enxuto. Seu site carrega em menos de 1 segundo em qualquer lugar.',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'SSL & Segurança',
    description: 'Certificado SSL grátis, proteção contra ataques DDoS e backups automáticos. Sua presença digital protegida 24/7.',
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: 'Design Premium',
    description: 'Templates criados por designers profissionais. Tipografia refinada, paletas harmônicas e micro-interações elegantes.',
  },
  {
    icon: <Wifi className="h-5 w-5" />,
    title: 'Domínio & Hospedagem',
    description: 'Domínio .com.br grátis no primeiro ano, hospedagem cloud com 99.9% de uptime e suporte técnico dedicado.',
  },
];

/* ─── Setores disponíveis ─── */
const SECTORS = [
  { value: '', label: 'Selecione o setor' },
  { value: 'Saúde', label: 'Saúde' },
  { value: 'Calçados', label: 'Calçados' },
  { value: 'Comércio', label: 'Comércio' },
  { value: 'Serviços', label: 'Serviços' },
  { value: 'Educação', label: 'Educação' },
  { value: 'Outro', label: 'Outro' },
];

export default function Builder() {
  /* ─── Estados ─── */
  const [status, setStatus] = useState<BuilderStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [deploying, setDeploying] = useState(false);
  const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>(null);
  const [deployResult, setDeployResult] = useState<DeployResult | null>(null);

  /* ─── Form State ─── */
  const [companyName, setCompanyName] = useState('');
  const [sector, setSector] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#D6A84F');
  const [description, setDescription] = useState('');

  /* ─── Handlers ─── */
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/generate-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName: companyName,
          industry: sector,
          colors: primaryColor,
          description,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `Erro ${res.status}: não foi possível gerar o site`);
      }

      const data: GeneratedSite = await res.json();
      setGeneratedSite(data);
      setStatus('success');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Ocorreu um erro inesperado ao gerar o site');
      setStatus('error');
    }
  };

  const handleDeploy = async () => {
    if (!generatedSite) return;
    setDeploying(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/deploy-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, sector, generatedSite }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Erro ${res.status}: não foi possível publicar o site`);
      }

      const data: DeployResult = await res.json();
      setDeployResult(data);
      setStatus('deployed');
      // Abre o link do site publicado em nova aba
      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Ocorreu um erro ao publicar o site');
      setStatus('error');
    } finally {
      setDeploying(false);
    }
  };

  const handleRefine = () => {
    setStatus('idle');
    setGeneratedSite(null);
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
    setGeneratedSite(null);
  };

  return (
    <main>
      <GoldParticles count={25} />

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[#030303]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(214,168,79,0.08)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>AI Site Builder Premium</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              O Builder de Sites{' '}
              <span className="text-gradient-gold">Mais Inteligente do Mundo</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#A1A1AA] sm:text-lg">
              Crie um site profissional em minutos com inteligência artificial.
              Responda algumas perguntas sobre sua marca e veja a mágica acontecer.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PremiumButton href="/builder">
                Começar Gratuito <Sparkles className="h-4 w-4" />
              </PremiumButton>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold text-sm group inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-6 py-2.5 font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
              >
                <MessageCircle className="h-4 w-4" />
                Falar com Consultor
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#D6A84F]" /> Site em Minutos
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#D6A84F]" /> Sem Codificação
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#D6A84F]" /> Grátis por 14 Dias
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FORMULÁRIO DE ENTRADA ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Gerar Site com IA</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Conte-nos sobre{' '}
              <span className="text-gradient-gold">Sua Marca</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#A1A1AA]">
              Preencha os dados abaixo e nossa IA criará um site profissional para seu negócio em segundos.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12">
              {status === 'idle' && (
                <form onSubmit={handleGenerate} className="space-y-6">
                  {/* Nome da empresa */}
                  <div className="group">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#A1A1AA]">
                      <Building2 className="mr-1.5 inline-block h-3.5 w-3.5 text-[#D6A84F]" />
                      Nome da Empresa / Marca
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ex: Clínica Sorriso Perfeito"
                      required
                      className="w-full rounded-xl border border-[rgba(214,168,79,0.15)] bg-[rgba(255,255,255,0.02)] px-5 py-3.5 text-sm text-white placeholder:text-[#52525B] outline-none transition-all duration-300 focus:border-[#D6A84F] focus:bg-[rgba(214,168,79,0.03)] focus:shadow-[0_0_20px_rgba(214,168,79,0.06)]"
                    />
                  </div>

                  {/* Setor */}
                  <div className="group">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#A1A1AA]">
                      <Target className="mr-1.5 inline-block h-3.5 w-3.5 text-[#D6A84F]" />
                      Setor / Indústria
                    </label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[rgba(214,168,79,0.15)] bg-[rgba(255,255,255,0.02)] px-5 py-3.5 text-sm text-white outline-none transition-all duration-300 focus:border-[#D6A84F] focus:bg-[rgba(214,168,79,0.03)] focus:shadow-[0_0_20px_rgba(214,168,79,0.06)]"
                      style={{ color: sector ? '#fff' : '#52525B' }}
                    >
                      {SECTORS.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[#080808] text-white">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Cor Primária */}
                  <div className="group">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#A1A1AA]">
                      <Palette className="mr-1.5 inline-block h-3.5 w-3.5 text-[#D6A84F]" />
                      Cor Primária
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="h-12 w-12 cursor-pointer rounded-xl border border-[rgba(214,168,79,0.15)] bg-transparent p-1 transition-all duration-300 hover:border-[#D6A84F]"
                      />
                      <span className="text-sm font-mono text-[#A1A1AA]">{primaryColor}</span>
                      <div
                        className="h-8 w-8 rounded-full border border-[rgba(255,255,255,0.1)]"
                        style={{ backgroundColor: primaryColor }}
                      />
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="group">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#A1A1AA]">
                      <MessageCircle className="mr-1.5 inline-block h-3.5 w-3.5 text-[#D6A84F]" />
                      Descrição do Negócio
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Descreva seu negócio em 3 a 5 frases. Fale sobre seus clientes, o que você oferece, seu diferencial..."
                      required
                      rows={5}
                      className="w-full resize-none rounded-xl border border-[rgba(214,168,79,0.15)] bg-[rgba(255,255,255,0.02)] px-5 py-3.5 text-sm text-white placeholder:text-[#52525B] outline-none transition-all duration-300 focus:border-[#D6A84F] focus:bg-[rgba(214,168,79,0.03)] focus:shadow-[0_0_20px_rgba(214,168,79,0.06)]"
                    />
                    <p className="mt-1.5 text-[10px] text-[#52525B]">
                      {description.split(' ').filter(Boolean).length} palavras (recomendado: 30-100)
                    </p>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] bg-[length:200%_auto] px-8 py-3.5 text-sm font-bold text-[#030303] transition-all duration-400 hover:bg-right hover:shadow-[0_0_40px_rgba(214,168,79,0.35),0_0_80px_rgba(214,168,79,0.12)] hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Gerar Site com IA{' '}
                      <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                    </button>
                  </div>
                </form>
              )}

              {/* ═══════ LOADING ═══════ */}
              {status === 'loading' && (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative mb-8">
                    <div className="h-20 w-20 animate-spin rounded-full border-2 border-[rgba(214,168,79,0.1)] border-t-[#D6A84F]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="h-7 w-7 text-[#D6A84F] animate-pulse" />
                    </div>
                  </div>
                  <Reveal>
                    <h3 className="font-serif text-2xl font-bold text-white">Criando seu site...</h3>
                    <p className="mt-2 text-sm text-[#A1A1AA]">
                      Nossa IA está analisando sua marca e gerando um site profissional.
                    </p>
                    <div className="mt-6 flex items-center gap-2">
                      <div className="h-1 w-32 overflow-hidden rounded-full bg-[rgba(214,168,79,0.1)]">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#D6A84F] to-[#F2D38A]"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        />
                      </div>
                      <span className="text-[10px] text-[#71717A]">Processando...</span>
                    </div>
                  </Reveal>
                </div>
              )}

              {/* ═══════ SUCCESS (pré-visualizar) ═══════ */}
              {status === 'success' && generatedSite && (
                <div className="space-y-8">
                  {/* Badge de sucesso */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(34,197,94,0.12)]">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="text-sm font-semibold text-green-400">Site gerado com sucesso!</span>
                  </div>

                  {/* Preview do Site Gerado */}
                  <div className="rounded-2xl border border-[rgba(214,168,79,0.12)] bg-[rgba(255,255,255,0.02)] p-6 sm:p-8">
                    <h3 className="mb-1 font-serif text-xl font-bold text-white">
                      {generatedSite.hero.title}
                    </h3>
                    <p className="text-sm text-[#A1A1AA]">{generatedSite.hero.subtitle}</p>
                    <p className="mt-3 text-xs text-[#D6A84F] font-semibold">
                      CTA: {generatedSite.hero.cta}
                    </p>

                    {/* Seções */}
                    <div className="mt-6 space-y-3">
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A]">
                        Seções do Site
                      </h4>
                      {generatedSite.sections.map((section, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.015)] p-4 transition-all hover:border-[rgba(214,168,79,0.12)]"
                        >
                          <h5 className="text-sm font-semibold text-white">{section.title}</h5>
                          <p className="mt-1 text-xs text-[#A1A1AA]">{section.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Paleta de Cores */}
                    <div className="mt-6">
                      <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A]">
                        Paleta de Cores Sugerida
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {Object.entries(generatedSite.palette).map(([name, color]) => (
                          <div key={name} className="flex items-center gap-2">
                            <div
                              className="h-7 w-7 rounded-lg border border-[rgba(255,255,255,0.08)]"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-[10px] font-mono text-[#A1A1AA] capitalize">
                              {name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="mt-6 rounded-xl bg-[rgba(214,168,79,0.04)] p-4">
                      <p className="text-xs leading-relaxed text-[#A1A1AA]">{generatedSite.summary}</p>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={handleDeploy}
                      disabled={deploying}
                      className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] bg-[length:200%_auto] px-6 py-3 text-sm font-bold text-[#030303] transition-all duration-400 hover:bg-right hover:shadow-[0_0_40px_rgba(214,168,79,0.35),0_0_80px_rgba(214,168,79,0.12)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {deploying ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Publicando...
                        </>
                      ) : (
                        <>
                          Publicar Site <Globe className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleRefine}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-6 py-3 text-sm font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Refinar com IA
                    </button>
                  </div>
                </div>
              )}

              {/* ═══════ DEPLOYED (publicado) ═══════ */}
              {status === 'deployed' && deployResult && (
                <div className="space-y-8">
                  {/* Badge de deployed */}
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(34,197,94,0.12)]">
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="text-sm font-semibold text-green-400">Site publicado com sucesso!</span>
                  </div>

                  {/* Card de URL */}
                  <div className="rounded-2xl border border-[rgba(34,197,94,0.15)] bg-[rgba(34,197,94,0.03)] p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Globe className="h-6 w-6 text-green-400" />
                      <h3 className="font-serif text-xl font-bold text-white">
                        {deployResult.companyName}
                      </h3>
                    </div>

                    <a
                      href={deployResult.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-xl border border-[rgba(34,197,94,0.12)] bg-[rgba(34,197,94,0.04)] p-4 text-green-400 transition-all duration-300 hover:bg-[rgba(34,197,94,0.08)] hover:border-green-400/30"
                    >
                      <Globe className="h-4 w-4 shrink-0" />
                      <span className="truncate text-sm font-semibold underline underline-offset-2 decoration-green-400/30 group-hover:decoration-green-400/60">
                        {deployResult.url}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 ml-auto transition-transform group-hover:translate-x-1" />
                    </a>

                    <p className="mt-4 text-xs text-[#A1A1AA] leading-relaxed">
                      Seu site está no ar! Compartilhe o link com seus clientes.
                      Domínio personalizado disponível nos planos premium.
                    </p>
                  </div>

                  {/* Ações pós-deploy */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      href={deployResult.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] bg-[length:200%_auto] px-6 py-3 text-sm font-bold text-[#030303] transition-all duration-400 hover:bg-right hover:shadow-[0_0_40px_rgba(214,168,79,0.35)] hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Visitar Site <ArrowRight className="h-4 w-4" />
                    </a>
                    <button
                      onClick={handleRefine}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-6 py-3 text-sm font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Criar Novo Site
                    </button>
                  </div>

                  {/* Share hint */}
                  <p className="text-center text-[10px] text-[#52525B]">
                    {deployResult.url} • Publicado via Rei das Vendas AI Builder
                  </p>
                </div>
              )}

              {/* ═══════ ERROR ═══════ */}
              {status === 'error' && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(239,68,68,0.1)]">
                    <AlertCircle className="h-7 w-7 text-red-400" />
                  </div>
                  <Reveal>
                    <h3 className="font-serif text-xl font-bold text-white">Algo deu errado</h3>
                    <p className="mt-2 max-w-md text-center text-sm text-[#A1A1AA]">
                      {errorMessage}
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <button
                        onClick={handleGenerate}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D6A84F] via-[#F2D38A] to-[#D6A84F] bg-[length:200%_auto] px-6 py-2.5 text-sm font-bold text-[#030303] transition-all duration-400 hover:bg-right hover:shadow-[0_0_40px_rgba(214,168,79,0.35)]"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Tentar Novamente
                      </button>
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-6 py-2.5 text-sm font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
                      >
                        Voltar ao Formulário
                      </button>
                    </div>
                  </Reveal>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════ FLUXO DO BUILDER ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Como Funciona</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Crie seu Site em{' '}
              <span className="text-gradient-gold">4 Passos Simples</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#A1A1AA]">
              Do briefing ao site no ar. Sem complicação, sem código, sem estresse.
            </p>
          </Reveal>

          <div className="relative mt-16">
            {/* Desktop connector line */}
            <div className="absolute top-12 left-[10%] right-[10%] h-px hidden bg-gradient-to-r from-[rgba(214,168,79,0.3)] via-[rgba(214,168,79,0.15)] to-[rgba(214,168,79,0.3)] lg:block" />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {FLOW.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.step}
                    variants={staggerItem}
                    className="relative flex flex-col items-center text-center"
                  >
                    <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
                      <div className="absolute inset-0 rounded-full border border-[rgba(214,168,79,0.15)] bg-[rgba(214,168,79,0.04)]" />
                      <div className="absolute inset-2 rounded-full bg-[rgba(214,168,79,0.08)]" />
                      <Icon className="relative h-7 w-7 text-[#D6A84F]" />
                    </div>
                    <span className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6A84F]">
                      {item.step}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#A1A1AA]">{item.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ TEMPLATES GERADOS POR IA ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Templates Inteligentes</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Sites Gerados por IA para{' '}
              <span className="text-gradient-gold">Seu Segmento</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#A1A1AA]">
              Veja exemplos reais de sites criados pelo nosso AI em segundos.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {AI_TEMPLATES.map((template) => (
              <motion.div
                key={template.name}
                variants={staggerItem}
                className="glass-card group rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden transition-all duration-500 hover:border-[rgba(214,168,79,0.25)] hover:bg-[rgba(214,168,79,0.02)]"
              >
                {/* Preview */}
                {template.preview}

                {/* Info */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-block rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em]"
                      style={{
                        borderColor: template.borderColor,
                        color: template.accentColor,
                        backgroundColor: `${template.accentColor}10`,
                      }}
                    >
                      {template.tag}
                    </span>
                    <span className="text-[10px] text-[#71717A]">{template.category}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-bold text-white">{template.name}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['Responsivo', 'SEO', 'Moderno'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-[rgba(255,255,255,0.04)] px-2 py-0.5 text-[10px] text-[#A1A1AA]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6A84F] transition-all duration-300 group-hover:gap-2.5">
                      Usar Template <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ FEATURES ═══════ */}
      <section className="border-t border-[rgba(214,168,79,0.08)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <SectionLabel>Recursos Premium</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Tudo que Você Precisa para{' '}
              <span className="text-gradient-gold">Vender Mais</span>
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#A1A1AA]">
              Infraestrutura completa de sites profissionais com o poder da inteligência artificial.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {BUILDER_FEATURES.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ CTA FINAL ═══════ */}
      <section className="relative overflow-hidden border-t border-[rgba(214,168,79,0.1)] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,168,79,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <SectionLabel>Comece Agora</SectionLabel>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Crie seu Site com IA{' '}
              <span className="text-gradient-gold">Gratuitamente</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
              Teste o AI Site Builder Premium por 14 dias grátis. Sem cartão de crédito.
              Sem compromisso. Seu site no ar em minutos.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <PremiumButton href="/builder">
                Começar Gratuito <Sparkles className="h-4 w-4" />
              </PremiumButton>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold text-sm group inline-flex items-center gap-2 rounded-full border border-[rgba(214,168,79,0.22)] px-6 py-2.5 font-semibold text-[#F5F5F5] transition-all duration-400 hover:border-[#D6A84F] hover:bg-[rgba(214,168,79,0.08)]"
              >
                Ver Demonstração <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#71717A]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#D6A84F]" /> 14 Dias Grátis
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#D6A84F]" /> Sem Cartão
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#D6A84F]" /> Cancele Quando Quiser
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-[#D6A84F]" /> Domínio Grátis
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
