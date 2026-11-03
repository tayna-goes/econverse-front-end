import { useState } from 'react';
import type { FormEvent } from 'react';
import styles from './Newsletter.module.scss';

export function Newsletter() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);

    const form = event.currentTarget;
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      form.reset();
    }, 800);
  };

  return (
    <section className={styles.section} aria-labelledby="newsletter-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="newsletter-title" className={styles.title}>
            Inscreva-se na nossa newsletter
          </h2>
          <p className={styles.text}>
            Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} onChange={() => setSent(false)}>
          <label className="visually-hidden" htmlFor="news-nome">
            Nome
          </label>
          <input
            id="news-nome"
            name="nome"
            type="text"
            placeholder="Digite seu nome"
            required
            minLength={2}
            autoComplete="given-name"
          />

          <label className="visually-hidden" htmlFor="news-email">
            E-mail
          </label>
          <input
            id="news-email"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            required
            autoComplete="email"
          />

          <button type="submit" className={styles.submit} disabled={loading} aria-busy={loading}>
            {loading ? 'Inscrevendo…' : 'Inscrever'}
          </button>

          <label className={styles.terms} htmlFor="news-termos">
            <input id="news-termos" type="checkbox" name="termos" required aria-describedby="news-termos-hint" />
            Aceito os{' '}
            <a href="/termos/">Termos e Condições</a>
            {' '}e a{' '}
            <a href="/privacidade/">Política de Privacidade</a>
          </label>
          <p id="news-termos-hint" className="visually-hidden">
            Você precisa aceitar os termos para se inscrever.
          </p>

          <p className={styles.status} role="status" aria-live="polite">
            {sent ? 'Inscrição realizada com sucesso!' : ''}
          </p>
        </form>
      </div>
    </section>
  );
}
