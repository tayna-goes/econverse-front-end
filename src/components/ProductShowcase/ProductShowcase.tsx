import { useCallback, useEffect, useRef, useState } from 'react';
import type { Product, RequestStatus, SortOption } from '../../types/product';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/Icons';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import styles from './ProductShowcase.module.scss';

interface ProductShowcaseProps {
    id?: string;
    title: string;
    products: Product[];
    status: RequestStatus;
    onSelectProduct: (product: Product) => void;
    onRetry?: () => void;
    tabs?: string[];
    showSeeAll?: boolean;
    showSort?: boolean;
    sortBy?: SortOption;
    onSortChange?: (sort: SortOption) => void;
    searchQuery?: string;
}

export function ProductShowcase({
    id,
    title,
    products,
    status,
    onSelectProduct,
    onRetry,
    tabs,
    showSeeAll,
    showSort,
    sortBy = 'default',
    onSortChange,
    searchQuery,
}: ProductShowcaseProps) {
    const trackRef = useRef<HTMLUListElement>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(false);
    const headingId = `${id ?? 'vitrine'}-title`;

    const updateArrows = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        setCanPrev(track.scrollLeft > 1);
        setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
    }, []);

    useEffect(() => {
        updateArrows();
        window.addEventListener('resize', updateArrows);
        return () => window.removeEventListener('resize', updateArrows);
    }, [updateArrows, products, status]);

    const scrollByCard = (direction: 1 | -1) => {
        const track = trackRef.current;
        const card = track?.firstElementChild as HTMLElement | null;
        if (!track || !card) return;
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
    };

    const isEmpty = status === 'success' && products.length === 0;

    return (
        <section id={id} className={styles.section} aria-labelledby={headingId}>
            <div className={styles.header}>
                <h2 id={headingId} className={styles.title}>
                    <span>{title}</span>
                </h2>
                {showSeeAll && (
                    <a href="#produtos" className={styles.seeAll}>
                        Ver todos
                    </a>
                )}
            </div>

            {(tabs || showSort) && (
                <div className={styles.toolbar}>
                    {tabs && (
                        <div className={styles.tabs} role="tablist" aria-label="Categorias de produtos">
                            {tabs.map((tab, index) => (
                                <button
                                    key={tab}
                                    type="button"
                                    role="tab"
                                    aria-selected={activeTab === index}
                                    className={styles.tab}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    )}
                    {showSort && onSortChange && (
                        <div className={styles.sortWrap}>
                            <label htmlFor={`sort-${id}`} className={styles.sortLabel}>
                                Ordenar:
                            </label>
                            <select
                                id={`sort-${id}`}
                                className={styles.sortSelect}
                                value={sortBy}
                                onChange={(e) => onSortChange(e.target.value as SortOption)}
                            >
                                <option value="default">Relevância</option>
                                <option value="price-asc">Menor preço</option>
                                <option value="price-desc">Maior preço</option>
                                <option value="name-asc">Nome A–Z</option>
                            </select>
                        </div>
                    )}
                </div>
            )}

            {status === 'loading' && (
                <div aria-busy="true" aria-label="Carregando produtos">
                    <p className="visually-hidden" role="status">Carregando produtos…</p>
                    <div className={styles.carousel}>
                        <ul className={styles.track}>
                            {Array.from({ length: 4 }, (_, i) => (
                                <li key={i} className={styles.slide}>
                                    <ProductCardSkeleton />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {status === 'error' && (
                <div className={styles.feedback} role="alert">
                    <p>Não foi possível carregar os produtos.</p>
                    {onRetry && (
                        <button type="button" className={styles.retry} onClick={onRetry}>
                            Tentar novamente
                        </button>
                    )}
                </div>
            )}

            {isEmpty && (
                <p className={styles.feedback} role="status">
                    {searchQuery
                        ? `Nenhum produto encontrado para "${searchQuery}".`
                        : 'Nenhum produto disponível.'}
                </p>
            )}

            {status === 'success' && products.length > 0 && (
                <div className={styles.carousel}>
                    <button
                        type="button"
                        className={`${styles.arrow} ${styles.prev}`}
                        aria-label="Produtos anteriores"
                        onClick={() => scrollByCard(-1)}
                        disabled={!canPrev}
                    >
                        <ChevronLeftIcon size={18} />
                    </button>

                    <ul className={styles.track} ref={trackRef} onScroll={updateArrows}>
                        {products.map((product, index) => (
                            <li key={`${product.productName}-${index}`} className={styles.slide}>
                                <ProductCard product={product} onSelect={onSelectProduct} />
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        className={`${styles.arrow} ${styles.next}`}
                        aria-label="Próximos produtos"
                        onClick={() => scrollByCard(1)}
                        disabled={!canNext}
                    >
                        <ChevronRightIcon size={18} />
                    </button>
                </div>
            )}
        </section>
    );
}
