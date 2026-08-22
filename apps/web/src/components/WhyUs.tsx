import { Reveal, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { motion } from 'framer-motion';

const pillars = [
  {
    n: '01',
    title: 'Diagnóstico antes da tecnologia',
    text: 'A tecnologia começa no gargalo, não na ferramenta. Mapeamos o que existe antes de propor o que construir.',
  },
  {
    n: '02',
    title: 'Arquitetura exclusiva',
    text: 'Cada fluxo responde à operação real da empresa — não a um template ou a um pacote pronto.',
  },
  {
    n: '03',
    title: 'Governança verificável',
    text: 'Escopo, critérios e próximos movimentos visíveis. Sem métrica inventada e sem urgência artificial.',
  },
  {
    n: '04',
    title: 'Unidade externa, não fornecedor',
    text: 'Uma estrutura independente que mapeia prioridades, constrói a solução e mantém a evolução conectada a indicadores.',
  },
];

export function WhyUs() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="why-us-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <span className="section-label">Por que o Rei das Vendas</span>
          <h2 id="why-us-title" className="font-serif mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Não é pacote pronto. É uma <span className="text-gradient-gold">unidade externa de tecnologia e governança.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#A1A1AA]">
            Uma estrutura terceirizada e independente que mapeia prioridades, constrói a solução e mantém a
            evolução digital conectada a indicadores verificáveis.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-4 sm:gap-5 md:grid-cols-2"
        >
          {pillars.map((pillar) => (
            <motion.article
              key={pillar.n}
              variants={staggerItem}
              className="glass-card group relative overflow-hidden rounded-2xl p-6 sm:p-8"
            >
              <span className="num-gold font-serif text-4xl font-bold leading-none sm:text-5xl">{pillar.n}</span>
              <h3 className="font-serif mt-5 text-lg font-semibold text-white sm:text-xl">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#A1A1AA]">{pillar.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
