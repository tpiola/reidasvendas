import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MEASUREMENT_CONSENT_KEY } from '@/lib/analytics';
import { useI18n } from '@/lib/i18n';

type ConsentValue = 'accepted' | 'rejected';

export function CookieConsent() {
  const { t } = useI18n();
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
    <aside className="rdv-cookie" aria-label={t('cookie.label')}>
      <p>
        {t('cookie.body.before')}{' '}
        <Link to="/politica">{t('cookie.body.link')}</Link>.
      </p>
      <div className="rdv-cookie-actions">
        <button type="button" className="is-primary" onClick={() => persist('accepted')}>{t('cookie.accept')}</button>
        <button type="button" onClick={() => persist('rejected')}>{t('cookie.reject')}</button>
      </div>
    </aside>
  );
}
