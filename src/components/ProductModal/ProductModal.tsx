import { useEffect, useId, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import type { Product } from '../../types/product';
import { formatPrice } from '../../utils/format';
import { CloseIcon } from '../icons/Icons';
import { handleImageError } from '../ProductShowcase/ProductCard';
import { QuantitySelector } from './QuantitySelector';
import styles from './ProductModal.module.scss';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onBuy?: (product: Product, quantity: number) => void;
}

const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function ProductModal({ product, onClose, onBuy }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.classList.add('no-scroll');

    return () => {
      document.body.classList.remove('no-scroll');
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleBuy = () => {
    onBuy?.(product, quantity);
    onClose();
  };

  return createPortal(
    <div className={styles.overlay} onMouseDown={handleOverlayClick}>
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.close}
          aria-label="Fechar"
          onClick={onClose}
        >
          <CloseIcon size={24} />
        </button>

        <div className={styles.media}>
          <img src={product.photo} alt={product.productName} onError={handleImageError} />
        </div>

        <div className={styles.info}>
          <h2 id={titleId} className={styles.name}>
            {product.productName}
          </h2>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p id={descriptionId} className={styles.description}>
            {product.descriptionShort}
          </p>
          <a href="#produtos" className={styles.details} onClick={(e) => e.preventDefault()}>
            Veja mais detalhes do produto &gt;
          </a>

          <div className={styles.actions}>
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <button type="button" className={styles.buy} onClick={handleBuy}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
