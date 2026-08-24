import { Reveal, staggerContainer, staggerItem } from '@/hooks/useAnimation';
import { motion } from 'framer-motion';

const pillars = [
  {
    n: '01',
    title: 'Feito pro seu negócio, não template',
    text: 'Nada de site genérico. Cada site é desenhado pro seu público, seu bairro e seu jeito de vender.',
  },
  {
    n: '02',
    title: 'IA que trabalha pra vender',
    text: 'Chatbot que responde, automação que agenda, sistema que qualifica lead — enquanto você atende.',
  },
  {
    n: '03',
    title: 'Foco em negócio local',
    text: 'A gente entende o comércio de Franca e região. Site que aparece pra quem procura perto de mim.',
  },
  {
    n: '04',
    title: 'Rápido e no celular',
    text: 'PageSpeed acima de 90. Seu cliente abre no celular e não espera.',
  },
];

export function WhyUs() {
  return (
    <section className="relative py-24 sm:py-32" aria-labelledby="why-us-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <span className="section-label">Por que o Rei das Vendas</span>
          <h2 id="why-us-title" className="font-serif mt-4 text-3xl font-bold leading-tight text-text-primary sm:text-4xl md:text-5xl">
            Não é template. É <span className="text-gradient-gold">feito pro seu negócio.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-text-secondary">
            Quatro coisas que a gente garante em cada projeto — pra você vender mais, sem dor de cabeça.
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
              <h3 className="font-serif mt-5 text-lg font-semibold text-text-primary sm:text-xl">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{pillar.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
