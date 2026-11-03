import styles from './PartnerBanners.module.scss';

const PARTNERS = [
  { id: 1, title: 'Frete grátis acima de R$ 200', text: 'Entrega rápida para todo o Brasil nas melhores marcas de tecnologia.' },
  { id: 2, title: 'Parcele em até 12x sem juros', text: 'Compre smartphones, notebooks e muito mais sem pagar nada a mais.' },
];

export function PartnerBanners() {
  return (
    <section className={styles.section} aria-labelledby="parceiros-title">
      <h2 id="parceiros-title" className="visually-hidden">Parceiros e benefícios</h2>
      {PARTNERS.map(({ id, title, text }) => (
        <article key={id} className={styles.banner} aria-labelledby={`parceiro-${id}-title`}>
          <h3 id={`parceiro-${id}-title`} className={styles.title}>{title}</h3>
          <p className={styles.text}>{text}</p>
          <a href="#produtos" className={styles.cta}>
            Confira
          </a>
        </article>
      ))}
    </section>
  );
}
