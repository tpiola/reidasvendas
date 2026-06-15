import { motion } from 'framer-motion';

const flowSteps = [
  { label: 'Diagnóstico', icon: '🔍', desc: 'Análise estratégica do negócio' },
  { label: 'Arquitetura', icon: '⚙️', desc: 'Projeto da infraestrutura digital' },
  { label: 'Design', icon: '🎯', desc: 'Interface premium e identidade' },
  { label: 'Desenvolvimento', icon: '⚡', desc: 'Tecnologia de ponta' },
  { label: 'Automação', icon: '🤖', desc: 'Processos inteligentes' },
  { label: 'Governança', icon: '📊', desc: 'Métricas e resultados' },
];

export function AutomationFlow() {
  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Central line */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[rgba(214,168,79,0.3)] to-transparent" />

      <div className="relative grid gap-0">
        {flowSteps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex items-center gap-4 py-6 ${
                isLeft ? 'flex-row pr-[calc(50%+2rem)]' : 'flex-row-reverse pl-[calc(50%+2rem)]'
              }`}
            >
              {/* Connector dot */}
              <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10`}>
                <div className="h-3 w-3 rounded-full border-2 border-[#D6A84F] bg-[#030303] shadow-[0_0_10px_rgba(214,168,79,0.3)]" />
              </div>

              {/* Card */}
              <div className={`glass-premium rounded-xl p-4 sm:p-5 w-full max-w-xs ${isLeft ? 'text-right' : 'text-left'}`}>
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#D6A84F]">
                  {step.label}
                </span>
                <p className="mt-1 text-xs text-[#A1A1AA]">{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
