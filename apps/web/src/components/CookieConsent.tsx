import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MEASUREMENT_CONSENT_KEY } from '@/lib/analytics';

type ConsentValue = 'accepted' | 'rejected';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(MEASUREMENT_CONSENT_KEY) === null) setVisible(true);
    } catch {
      setVisible(false);
    }
  }, []);

  const persist = (value: ConsentValue) => {
    try {
      localStorage.setItem(MEASUREMENT_CONSENT_KEY, value);
    } catch {
      // The user's browser may block local storage; dismissal still works for this session.
    }
    window.dispatchEvent(new CustomEvent('rdv:consent', { detail: { value } }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="rdv-cookie" aria-label="Preferências de cookies">
      <p>
        Usamos medição de tráfego para entender o que precisa melhorar. Veja a <Link to="/politica">política de privacidade</Link>.
      </p>
      <div className="rdv-cookie-actions">
        <button type="button" className="is-primary" onClick={() => persist('accepted')}>Permitir medição</button>
        <button type="button" onClick={() => persist('rejected')}>Continuar sem medir</button>
      </div>
    </aside>
  );
}
