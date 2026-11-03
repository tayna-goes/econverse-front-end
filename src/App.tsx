import { useCallback, useMemo, useState } from 'react';
import { BrandList } from './components/BrandList/BrandList';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { CookieBanner } from './components/CookieBanner/CookieBanner';
import { CategoryNav } from './components/CategoryNav/CategoryNav';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Newsletter } from './components/Newsletter/Newsletter';
import { PartnerBanners } from './components/PartnerBanners/PartnerBanners';
import { ProductModal } from './components/ProductModal/ProductModal';
import { ProductShowcase } from './components/ProductShowcase/ProductShowcase';
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';
import type { Product, SortOption } from './types/product';
import styles from './App.module.scss';

const TABS = ['Celular', 'Acessórios', 'Tablets', 'Notebooks', 'TVs', 'Ver todos'];

export default function App() {
    const { products, status, retry } = useProducts();
    const cart = useCart();
    const [selected, setSelected] = useState<Product | null>(null);
    const [cartOpen, setCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('default');

    const closeModal = useCallback(() => setSelected(null), []);

    const handleBuy = useCallback(
        (product: Product, quantity: number) => {
            cart.add(product, quantity);
            setCartOpen(true);
        },
        [cart],
    );

    const filteredProducts = useMemo(() => {
        let list = [...products];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter((p) => p.productName.toLowerCase().includes(q));
        }

        switch (sortBy) {
            case 'price-asc':
                list.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                list.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                list.sort((a, b) => a.productName.localeCompare(b.productName, 'pt-BR'));
                break;
        }

        return list;
    }, [products, searchQuery, sortBy]);

    const showcaseProps = {
        products: filteredProducts,
        status,
        onSelectProduct: setSelected,
        onRetry: retry,
        sortBy,
        onSortChange: setSortBy,
        searchQuery,
    };

    return (
        <>
            <Header cartCount={cart.count} onCartOpen={() => setCartOpen(true)} onSearch={setSearchQuery} />

            <main id="main-content">
                <Hero />
                <CategoryNav />

                <div className={styles.block} id="produtos">
                    <ProductShowcase id="vitrine-1" title="Produtos relacionados" tabs={TABS} showSort {...showcaseProps}/>
                </div>

                <div className={styles.block}>
                    <PartnerBanners />
                </div>

                <div className={styles.block}>
                    <ProductShowcase id="vitrine-2" title="Produtos relacionados" showSeeAll {...showcaseProps} />
                </div>

                <div className={styles.block}>
                    <PartnerBanners />
                </div>

                <div className={styles.block}>
                    <BrandList />
                </div>

                <div className={styles.block}>
                    <ProductShowcase id="vitrine-3" title="Produtos relacionados" showSeeAll {...showcaseProps} />
                </div>
            </main>

            <Newsletter />
            <Footer />

            {selected && <ProductModal product={selected} onClose={closeModal} onBuy={handleBuy} />}

            <CartDrawer open={cartOpen} items={cart.items} total={cart.total} onClose={() => setCartOpen(false)} onRemove={cart.remove} onUpdateQty={cart.updateQty} onClear={cart.clear}/>
            <CookieBanner />
        </>
    );
}
