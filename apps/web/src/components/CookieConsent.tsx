import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'reidasvendas:cookie-consent';
type ConsentValue = 'accepted' | 'rejected';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === null) setVisible(true);
  }, []);

  const persist = (value: ConsentValue) => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="rdv-cookie" role="alert" aria-live="polite" aria-label="Preferências de cookies">
      <div className="rdv-cookie-head">
        <div><Cookie aria-hidden="true" /><strong>Cookies e privacidade</strong></div>
        <button type="button" onClick={() => setVisible(false)} aria-label="Fechar"><X aria-hidden="true" /></button>
      </div>
      <p>
        Utilizamos cookies para melhorar a experiência e analisar o tráfego.{' '}
        <Link to="/politica">Leia a política de privacidade</Link>.
      </p>
      <div className="rdv-cookie-actions">
        <button type="button" className="is-primary" onClick={() => persist('accepted')}>Aceitar</button>
        <button type="button" onClick={() => persist('rejected')}>Rejeitar</button>
        <Link to="/politica">Detalhes</Link>
      </div>
    </aside>
  );
}
