import logo from '../../assets/logo.png';
import styles from './BrandList.module.scss';

const BRANDS = [1, 2, 3, 4, 5];

export function BrandList() {
    return (
        <section className={styles.section} aria-labelledby="marcas-title">
            <h2 id="marcas-title" className={styles.title}>
                Navegue por marcas
            </h2>

            <div className={styles.trackWrapper}>
                <ul className={styles.track}>
                    {/* itens originais */}
                    {BRANDS.map((id) => (
                        <li key={id}>
                            <a href="#produtos" className={styles.brand} aria-label={`Marca Econverse ${id}`}>
                                <img src={logo} alt="" width={118} height={35} loading="lazy" />
                            </a>
                        </li>
                    ))}
                    {/* clones para loop infinito — ocultos de leitores de tela */}
                    {BRANDS.map((id) => (
                        <li key={`clone-${id}`} aria-hidden="true">
                            <a href="#produtos" className={styles.brand} tabIndex={-1}>
                                <img src={logo} alt="" width={118} height={35} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
