import { Upload, Sparkles, Edit3, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionLabel, Reveal, staggerContainer, staggerItem, springGentle } from '@/hooks/useAnimation';

const steps = [
  {
    icon: Upload,
    title: 'Upload Marca',
    description: 'Faça upload da sua logo, cores, fontes e preferências de design.',
    highlights: ['Logo em PNG/SVG', 'Paleta de cores', 'Fontes da marca', 'Referências visuais'],
    gradient: 'from-[#0A1628] to-[#030303]',
  },
  {
    icon: Zap,
    title: 'AI Gera Layout',
    description: 'Nossa IA analisa sua marca e gera instantaneamente layouts premium.',
    highlights: ['Design consistente', 'Hierarquia visual', 'Responsivo nativo', 'SEO otimizado'],
    gradient: 'from-[rgba(212,175,55,0.08)] to-[#0A1628]',
  },
  {
    icon: Edit3,
    title: 'Você Edita',
    description: 'Personalize cada detalhe com drag-drop intuitivo. Zero código necessário.',
    highlights: ['Drag-drop visual', 'Componentes vivos', 'Prévia em tempo real', 'Export com 1 clique'],
    gradient: 'from-[#030303] to-[#0A1628]',
  },
];

export function AIBrandLearning() {
  return (
    <SectionWrapper dark id="ai-brand">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <SectionLabel>AI Brand Learning</SectionLabel>
          <h2 className="font-serif mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            AI que aprende sua{' '}
            <span className="text-gradient-gold">marca em segundos</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Upload de logo, cores e preferências → site gerado instantaneamente. Sem templates genéricos.
          </p>
        </Reveal>

        {/* Flow visualization: Input → Processing → Output */}
        <Reveal delay={0.1}>
          <div className="mb-14 overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.1)] bg-gradient-to-br from-[rgba(212,175,55,0.03)] to-[rgba(10,22,40,0.3)] backdrop-blur-sm">
            <div className="grid grid-cols-1 divide-y divide-[rgba(212,175,55,0.08)] md:grid-cols-3 md:divide-x md:divide-y-0">
              {/* Step 1: Input */}
              <div className="relative p-6 sm:p-8">
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[rgba(212,175,55,0.1)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">
                  <Upload className="h-3 w-3" />
                  Input
                </span>
                <div className="mt-4 rounded-xl border border-dashed border-[rgba(212,175,55,0.15)] bg-[rgba(212,175,55,0.03)] p-5">
                  {/* Fake upload preview */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.1)]">
                      <Upload className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2.5 w-28 rounded-full bg-[rgba(255,255,255,0.06)]" />
                      <div className="mt-1.5 h-2 w-20 rounded-full bg-[rgba(255,255,255,0.03)]" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {['logo.svg', 'colors.json', 'fonts.zip'].map((file) => (
                      <div key={file} className="flex items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.03)] px-3 py-2">
                        <CheckCircle2 className="h-3 w-3 text-[#D4AF37]" />
                        <span className="text-xs text-[#A1A1AA]">{file}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow connector (desktop) */}
              <div className="hidden items-center justify-center md:flex">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="h-6 w-6 text-[#D4AF37]/40" />
                </motion.div>
              </div>

              {/* Step 2: Processing */}
              <div className="relative p-6 sm:p-8">
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[rgba(212,175,55,0.1)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">
                  <Zap className="h-3 w-3" />
                  Processing
                </span>
                <div className="mt-4 rounded-xl border border-[rgba(212,175,55,0.1)] bg-[rgba(212,175,55,0.03)] p-5">
                  {/* AI processing animation */}
                  <div className="flex items-center justify-center gap-1.5 py-2">
                    {[0, 0.15, 0.3, 0.45, 0.6].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay }}
                        className="h-2 w-2 rounded-full bg-[#D4AF37]"
                      />
                    ))}
                  </div>
                  <div className="mt-3 space-y-2">
                    {['Analisando identidade visual...', 'Gerando arquitetura de layout...', 'Aplicando design system...'].map((text, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-lg bg-[rgba(255,255,255,0.03)] px-3 py-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        >
                          <Sparkles className="h-3 w-3 text-[#D4AF37]" />
                        </motion.div>
                        <span className="text-xs text-[#A1A1AA]">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow connector */}
              <div className="hidden items-center justify-center md:flex">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <ArrowRight className="h-6 w-6 text-[#D4AF37]/40" />
                </motion.div>
              </div>

              {/* Step 3: Output */}
              <div className="relative p-6 sm:p-8">
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[rgba(212,175,55,0.1)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#D4AF37]">
                  <CheckCircle2 className="h-3 w-3" />
                  Result
                </span>
                <div className="mt-4 rounded-xl border border-[rgba(212,175,55,0.1)] bg-[rgba(212,175,55,0.03)] p-5">
                  {/* Output preview mockup */}
                  <div className="overflow-hidden rounded-lg border border-[rgba(212,175,55,0.1)]">
                    <div className="flex items-center gap-2 bg-[rgba(212,175,55,0.05)] px-3 py-2">
                      <div className="h-2 w-2 rounded-full bg-green-500/60" />
                      <span className="text-[9px] text-[rgba(212,175,55,0.5)]">Site generated ✓</span>
                    </div>
                    <div className="space-y-1.5 p-3">
                      <div className="h-2 w-full rounded-full bg-[rgba(212,175,55,0.06)]" />
                      <div className="h-2 w-3/4 rounded-full bg-[rgba(212,175,55,0.04)]" />
                      <div className="flex gap-2">
                        <div className="h-8 flex-1 rounded bg-[rgba(212,175,55,0.08)]" />
                        <div className="h-8 flex-1 rounded bg-[rgba(212,175,55,0.04)]" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[rgba(212,175,55,0.1)] px-3 py-1 text-[10px] font-bold text-[#D4AF37]">
                    <Sparkles className="h-2.5 w-2.5" />
                    Pronto em segundos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 3 Feature Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-children"
        >
          {steps.map((step) => (
            <motion.div
              key={step.title}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.1)] bg-gradient-to-br from-[rgba(212,175,55,0.03)] to-[rgba(10,22,40,0.15)] p-6 sm:p-7 transition-all duration-500 hover:border-[rgba(212,175,55,0.25)] hover:shadow-[0_0_40px_rgba(212,175,55,0.06)]"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

              <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(212,175,55,0.1)] text-[#D4AF37] transition-all duration-300 group-hover:bg-[rgba(212,175,55,0.18)] group-hover:scale-110">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{step.description}</p>

                {/* Highlights */}
                <ul className="mt-4 space-y-1.5">
                  {step.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-[#71717A]">
                      <CheckCircle2 className="h-3 w-3 text-[#D4AF37]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
