import { ArrowRight, Instagram, Linkedin } from 'lucide-react';
import { TransitionLink } from '@/components/TransitionLink';
import { BrandLockup } from '@/components/BrandLockup';
import { BRAND } from '@/lib/brand';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { trackEvent } from '@/lib/analytics';

const SOCIAL = [
  { label: 'Instagram', href: BRAND.instagram, icon: Instagram },
  { label: 'LinkedIn', href: BRAND.linkedin, icon: Linkedin },
];

const INDEX = [
  ['Possibilidades', '/solucoes'],
  ['Projetos reais', '/portfolio'],
  ['Demonstrações', '/demonstracoes'],
  ['Formas de contratação', '/planos'],
];

const KNOWLEDGE = [
  ['Diagnóstico', '/diagnostico'],
  ['Ferramentas', '/ferramentas'],
  ['Guias e comparativos', '/blog'],
  ['Sobre', '/sobre'],
];

export function SiteFooter() {
  return (
    <footer className="rdv-footer-v3">
      <div className="rdv-shell rdv-footer-v3__top">
        <div className="rdv-footer-v3__brand">
          <TransitionLink to="/" aria-label="Rei das Vendas — página inicial"><BrandLockup /></TransitionLink>
          <p>Dar ao negócio local a presença, os canais e a operação digital necessários para conquistar, atender e manter clientes com velocidade e clareza.</p>
        </div>

        <nav aria-label="Soluções e projetos">
          <p>Construir</p>
          {INDEX.map(([label, to]) => <TransitionLink key={to} to={to}>{label}</TransitionLink>)}
        </nav>

        <nav aria-label="Conhecimento e empresa">
          <p>Decidir</p>
          {KNOWLEDGE.map(([label, to]) => <TransitionLink key={to} to={to}>{label}</TransitionLink>)}
        </nav>

        <div className="rdv-footer-v3__contact">
          <p>Contato</p>
          <a href={BRAND.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { position: 'footer' })}>
            WhatsApp · {BRAND.phoneDisplay}
          </a>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          <span>Franca, SP · atendimento remoto</span>
          <span>Seg–sex 9h–18h · sáb 9h–13h</span>
          <div className="rdv-footer-v3__social" aria-label="Redes sociais">
            {SOCIAL.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${BRAND.name} no ${label}`}
                onClick={() => trackEvent('social_click', { network: label.toLowerCase(), position: 'footer' })}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="rdv-shell rdv-footer-v3__statement">
        <h2>Seu próximo canal precisa levar a algum lugar.</h2>
        <TransitionLink to="/diagnostico?origem=footer" onClick={() => trackEvent('diagnostic_start', { position: 'footer' })}>
          Mapear meu negócio <ArrowRight aria-hidden="true" />
        </TransitionLink>
      </div>

      <div className="rdv-shell rdv-footer-v3__bottom">
        <p>© {new Date().getFullYear()} {BRAND.name}</p>
        <div><TransitionLink to="/politica">Privacidade</TransitionLink><TransitionLink to="/termos">Termos de uso</TransitionLink><TransitionLink to="/contato">Contato</TransitionLink></div>
        <LanguageSwitcher />
        <p>Negócios em movimento · Franca/SP</p>
      </div>
    </footer>
  );
}
