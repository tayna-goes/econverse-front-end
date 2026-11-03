import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { CartItem } from '../../types/product';
import { formatPrice } from '../../utils/format';
import { CloseIcon, MinusIcon, PlusIcon } from '../icons/Icons';
import styles from './CartDrawer.module.scss';

interface CartDrawerProps {
    open: boolean;
    items: CartItem[];
    total: number;
    onClose: () => void;
    onRemove: (name: string) => void;
    onUpdateQty: (name: string, qty: number) => void;
    onClear: () => void;
}

export function CartDrawer({ open, items, total, onClose, onRemove, onUpdateQty, onClear }: CartDrawerProps) {
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;
        document.body.classList.add('no-scroll');
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        return () => {
            document.body.classList.remove('no-scroll');
            document.removeEventListener('keydown', onKey);
        };
    }, [open, onClose]);

    return createPortal(
        <>
            <div className={`${styles.overlay} ${open ? styles.open : ''}`} aria-hidden="true" onClick={onClose}/>
                <aside className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`} aria-label="Carrinho de compras" aria-hidden={!open} role="dialog" aria-modal="true">
                    <div className={styles.head}>
                        <h2 className={styles.heading}>
                            Carrinho
                            {items.length > 0 && (
                                <span className={styles.badge}>{items.reduce((s, i) => s + i.quantity, 0)}</span>
                            )}
                        </h2>
                        <button ref={closeRef} type="button" className={styles.close} aria-label="Fechar carrinho" onClick={onClose}>
                            <CloseIcon size={22} />
                        </button>
                    </div>

                    {items.length === 0 ? (
                        <div className={styles.empty}>
                            <p>Seu carrinho está vazio.</p>
                            <button type="button" className={styles.continueShopping} onClick={onClose}>
                                Ver produtos
                            </button>
                        </div>
                    ) : (
                        <>
                            <ul className={styles.list}>
                                {items.map(({ product, quantity }) => (
                                    <li key={product.productName} className={styles.item}>
                                        <img src={product.photo} alt={product.productName} width={72} height={72} />
                                        <div className={styles.info}>
                                            <p className={styles.name}>{product.productName}</p>
                                            <p className={styles.price}>{formatPrice(product.price)}</p>
                                            <div className={styles.qty}>
                                                <button type="button" aria-label="Diminuir quantidade" onClick={() => onUpdateQty(product.productName, quantity - 1)} disabled={quantity <= 1}>
                                                    <MinusIcon size={14} />
                                                </button>
                                                <span>{quantity}</span>
                                                <button type="button" aria-label="Aumentar quantidade" onClick={() => onUpdateQty(product.productName, quantity + 1)}>
                                                    <PlusIcon size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <button type="button" className={styles.remove} aria-label={`Remover ${product.productName}`} onClick={() => onRemove(product.productName)}>
                                            <CloseIcon size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.footer}>
                                <div className={styles.totalRow}>
                                    <span>Total</span>
                                    <strong>{formatPrice(total)}</strong>
                                </div>
                                <button type="button" className={styles.checkout}>
                                    Finalizar compra
                                </button>
                                <button type="button" className={styles.clearCart} onClick={onClear}>
                                    Limpar carrinho
                                </button>
                            </div>
                        </>
                    )}
                </aside>
        </>,
        document.body,
    );
}
