import type { SyntheticEvent } from 'react';
import fallbackPhoto from '../../assets/iphone.png';
import type { Product } from '../../types/product';
import { formatPrice, hasFreeShipping, INSTALLMENTS, installmentValue } from '../../utils/format';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
  const img = event.currentTarget;
  if (img.dataset.fallback) return;
  img.dataset.fallback = 'true';
  img.src = fallbackPhoto;
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { productName, photo, price } = product;

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.main}
        onClick={() => onSelect(product)}
        aria-label={`Ver detalhes de ${productName}`}
      >
        <img
          src={photo}
          alt={productName}
          width={279}
          height={228}
          loading="lazy"
          onError={handleImageError}
        />
        <h3 className={styles.name}>{productName}</h3>
        <p className={styles.price}>{formatPrice(price)}</p>
        <p className={styles.installments}>
          ou {INSTALLMENTS}x de {formatPrice(installmentValue(price))} sem juros
        </p>
        {hasFreeShipping(price) && <p className={styles.shipping}>Frete grátis</p>}
      </button>

      <button type="button" className={styles.buy} aria-label={`Comprar ${productName}`} onClick={() => onSelect(product)}>
        Comprar
      </button>
    </article>
  );
}
