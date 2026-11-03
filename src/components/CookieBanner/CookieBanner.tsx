import { useEffect, useState } from 'react';
import styles from './CookieBanner.module.scss';

const STORAGE_KEY = 'econverse_cookie_consent';

type ConsentStatus = 'accepted' | 'rejected' | null;

function readConsent(): ConsentStatus {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    if (val === 'accepted' || val === 'rejected') return val;
  } catch {
  }
  return null;
}

function saveConsent(status: 'accepted' | 'rejected') {
  try {
    localStorage.setItem(STORAGE_KEY, status);
  } catch {
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent() === null) setVisible(true);
  }, []);

  const handleAccept = () => {
    saveConsent('accepted');
    setVisible(false);
  };

  const handleReject = () => {
    saveConsent('rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner} role="region" aria-label="Aviso de cookies" aria-live="polite">
      <div className={styles.inner}>
        <p className={styles.text}>
          Usamos cookies essenciais para o funcionamento do site. Com o seu consentimento,
          também utilizamos cookies de desempenho e análise.{' '}
          <a href="/cookies/">Saiba mais na Política de Cookies</a>.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.accept} onClick={handleAccept}>
            Aceitar todos
          </button>
          <button type="button" className={styles.reject} onClick={handleReject}>
            Recusar opcionais
          </button>
          <a href="/cookies/" className={styles.prefs}>
            Personalizar
          </a>
        </div>
      </div>
    </div>
  );
}
