import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo.png';
import {
    CardIcon,
    CartIcon,
    CloseIcon,
    CrownIcon,
    HeartIcon,
    MenuIcon,
    OrdersIcon,
    SearchIcon,
    ShieldIcon,
    TruckIcon,
    UserIcon,
} from '../icons/Icons';
import styles from './Header.module.scss';

const NAV_ITEMS = [
    { label: 'Todas categorias', href: '#categorias' },
    { label: 'Supermercado', href: '#categorias' },
    { label: 'Livros', href: '#categorias' },
    { label: 'Moda', href: '#categorias' },
    { label: 'Lançamentos', href: '#produtos' },
    { label: 'Ofertas do dia', href: '#produtos', highlight: true },
    { label: 'Assinatura', href: '#categorias', icon: <CrownIcon size={20} /> },
];

interface HeaderProps {
    cartCount: number;
    onCartOpen: () => void;
    onSearch: (query: string) => void;
}

export function Header({ cartCount, onCartOpen, onSearch }: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const closeMenu = () => setMenuOpen(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query.trim());
    };

    const handleClearSearch = () => {
        setQuery('');
        onSearch('');
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (!menuOpen) return;
        document.body.classList.add('no-scroll');
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMenu();
        document.addEventListener('keydown', onKey);
        return () => {
            document.body.classList.remove('no-scroll');
            document.removeEventListener('keydown', onKey);
        };
    }, [menuOpen]);

    return (
        <>
            <header className={styles.header}>
                <div className={styles.inner}>
                    <ul className={styles.benefits}>
                        <li>
                            <ShieldIcon size={20} />
                            <span>
                                Compra <strong>100% segura</strong>
                            </span>
                        </li>
                        <li>
                            <TruckIcon size={20} />
                            <span>
                                <strong>Frete grátis</strong> acima de R$ 200
                            </span>
                        </li>
                        <li>
                            <CardIcon size={20} />
                            <span>
                                <strong>Parcele</strong> suas compras
                            </span>
                        </li>
                    </ul>

                    <div className={styles.main}>
                        <a href="/" className={styles.logo} aria-label="Econverse - página inicial">
                            <img src={logo} alt="Econverse" width={140} height={42} />
                        </a>

                        <form className={styles.search} role="search" onSubmit={handleSearch}>
                            <label htmlFor="busca" className="visually-hidden">
                                Buscar produtos
                            </label>
                            <input
                                ref={inputRef}
                                id="busca"
                                type="search"
                                placeholder="O que você está buscando?"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    if (!e.target.value) onSearch('');
                                }}
                            />
                            {query && (
                                <button type="button" className={styles.clearSearch} aria-label="Limpar busca" onClick={handleClearSearch}>
                                    <CloseIcon size={16} />
                                </button>
                            )}
                            <button type="submit" aria-label="Pesquisar">
                                <SearchIcon size={26} />
                            </button>
                        </form>

                        <ul className={styles.actions}>
                            <li className={styles.desktopOnly}>
                                <button type="button" aria-label="Meus pedidos">
                                    <OrdersIcon size={28} />
                                </button>
                            </li>
                            <li className={styles.desktopOnly}>
                                <button type="button" aria-label="Favoritos">
                                    <HeartIcon size={28} />
                                </button>
                            </li>
                            <li className={styles.desktopOnly}>
                                <button type="button" aria-label="Minha conta">
                                    <UserIcon size={28} />
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    aria-label={`Carrinho${cartCount > 0 ? ` — ${cartCount} ${cartCount === 1 ? 'item' : 'itens'}` : ''}`}
                                    className={styles.cartBtn}
                                    onClick={onCartOpen}
                                >
                                    <CartIcon size={28} />
                                    {cartCount > 0 && (
                                        <span className={styles.cartBadge} aria-hidden="true">
                                            {cartCount > 99 ? '99+' : cartCount}
                                        </span>
                                    )}
                                </button>
                            </li>
                            <li className={styles.mobileOnly}>
                                <button
                                    type="button"
                                    aria-label="Abrir menu"
                                    aria-expanded={menuOpen}
                                    aria-controls="mobile-menu"
                                    onClick={() => setMenuOpen(true)}
                                >
                                    <MenuIcon size={28} />
                                </button>
                            </li>
                        </ul>
                    </div>

                    <nav className={styles.nav} aria-label="Navegação principal">
                        <ul>
                            {NAV_ITEMS.map(({ label, href, highlight, icon }) => (
                                <li key={label}>
                                    <a href={href} className={highlight ? styles.highlight : undefined}>
                                        {icon}
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

            <div
                className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`}
                aria-hidden="true"
                onClick={closeMenu}
            />

            <nav
                id="mobile-menu"
                className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}
                aria-label="Menu mobile"
                aria-hidden={!menuOpen}
            >
                <div className={styles.drawerHeader}>
                    <img src={logo} alt="Econverse" width={110} height={33} />
                    <button type="button" className={styles.drawerClose} aria-label="Fechar menu" onClick={closeMenu}>
                        <CloseIcon size={22} />
                    </button>
                </div>

                <ul className={styles.drawerNav}>
                    {NAV_ITEMS.map(({ label, href, highlight, icon }) => (
                        <li key={label}>
                            <a href={href} className={highlight ? styles.highlight : undefined} onClick={closeMenu}>
                                {icon}
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                <ul className={styles.drawerActions}>
                    <li>
                        <button type="button" onClick={closeMenu}>
                            <OrdersIcon size={22} /> Meus pedidos
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={closeMenu}>
                            <HeartIcon size={22} /> Favoritos
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={closeMenu}>
                            <UserIcon size={22} /> Minha conta
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );
}
