import styles from './ProductCardSkeleton.module.scss';

export function ProductCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={styles.image} />
      <div className={styles.title} />
      <div className={styles.titleShort} />
      <div className={styles.price} />
      <div className={styles.installments} />
      <div className={styles.button} />
    </div>
  );
}
