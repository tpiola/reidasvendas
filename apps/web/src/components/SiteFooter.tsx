import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Send, ArrowUpRight } from 'lucide-react';
import { BRAND } from '@/lib/brand';

const YEAR = new Date().getFullYear();
const EASE_OUT = [0.16, 1, 0.3, 1];

const FOOTER_LINKS = [
  { label: 'Soluções', to: '/solucoes' },
  { label: 'Cases', to: '/projetos' },
  { label: 'Contato', to: '/contato' },
  { label: 'Privacidade', to: '/politica' },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#030305] text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.08)_0%,transparent_50%)]" />
      
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        {/* Main CTA */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#C9A84C]/60">
            Pronto para começar?
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-white">
            Sua próxima conquista{' '}
            <span className="text-gradient-gold">começa aqui.</span>
          </h2>
          
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
          >
            <motion.a
              href={BRAND.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-14 items-center gap-3 bg-[#25D366] px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all"
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(37,211,102,0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              <WhatsAppIcon className="w-5 h-5" />
              Falar no WhatsApp
              <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </motion.a>
            
            <Link
              to="/contato"
              className="inline-flex h-14 items-center gap-2 border border-white/15 bg-white/5 px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 hover:bg-white/10 hover:text-white transition-all"
            >
              <Send className="w-4 h-4" />
              Enviar Mensagem
            </Link>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />

        {/* Grid: Logo + Links + Social */}
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Logo & tagline */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src="/logo-transparent.png"
                alt="Logo Rei das Vendas"
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
                loading="lazy"
                decoding="async"
              />
              <span className="flex flex-col -space-y-1">
                <span className="text-sm font-bold tracking-tight text-gradient-gold">REI DAS VENDAS</span>
                <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-white/40">Hub de Soluções Digitais</span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/40">
              Transformando negócios em máquinas de resultados. Cada projeto, uma história de sucesso.
            </p>
            
            {/* Social */}
            <div className="mt-8 flex items-center gap-3">
              <motion.a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </motion.a>
              {BRAND.instagram && (
                <motion.a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </motion.a>
              )}
              {BRAND.linkedin && (
                <motion.a
                  href={BRAND.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.nav
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
            aria-label="Links rápidos"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A84C]/60 mb-6">
              Navegação
            </p>
            <ul className="space-y-4">
              {FOOTER_LINKS.map((link, i) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <span className="w-0 h-px bg-[#C9A84C] group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Contact Info */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A84C]/60 mb-6">
              Contato
            </p>
            <div className="space-y-4">
              <a
                href={`mailto:${BRAND.email}`}
                className="block text-sm text-white/50 hover:text-white transition-colors"
              >
                {BRAND.email}
              </a>
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-white/50 hover:text-[#25D366] transition-colors"
              >
                +55 16 99233-3344
              </a>
              <p className="text-sm text-white/30">
                {BRAND.baseCity}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="text-[11px] text-white/30">
            &copy; {YEAR} {BRAND.name}. Todos os direitos reservados.
          </span>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-white/30" aria-label="Links legais">
            <Link className="hover:text-white transition-colors" to="/termos">Termos de Uso</Link>
            <Link className="hover:text-white transition-colors" to="/politica">LGPD & Privacidade</Link>
          </nav>
        </motion.div>
      </div>
    </footer>
  );
}
