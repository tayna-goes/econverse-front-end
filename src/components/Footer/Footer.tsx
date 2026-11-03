import { useState } from 'react';
import logo from '../../assets/logo.png';
import { DevModal } from '../DevModal/DevModal';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '../icons/Icons';
import styles from './Footer.module.scss';

const COLUMNS = [
    {
        title: 'Institucional',
        links: [
            { label: 'Sobre Nós', href: '#sobre' },
            { label: 'Movimento', href: '#movimento' },
            { label: 'Trabalhe conosco', href: '#vagas' },
        ],
    },
    {
        title: 'Ajuda',
        links: [
            { label: 'Suporte', href: '#suporte' },
            { label: 'Fale Conosco', href: '#contato' },
            { label: 'Perguntas Frequentes', href: '#faq' },
        ],
    },
    {
        title: 'Termos',
        links: [
            { label: 'Termos e Condições', href: '/termos/' },
            { label: 'Política de Privacidade', href: '/privacidade/' },
            { label: 'Troca e Devolução', href: '/trocas/' },
            { label: 'Política de Cookies', href: '/cookies/' },
        ],
    },
];

const SOCIAL = [
    { label: 'Instagram', href: 'https://instagram.com/econverse', icon: <InstagramIcon size={26} /> },
    { label: 'Facebook', href: 'https://facebook.com/econverse', icon: <FacebookIcon size={26} /> },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/econverse', icon: <LinkedinIcon size={26} /> },
];

export function Footer() {
    const [devOpen, setDevOpen] = useState(false);

    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.inner}>
                    <div className={styles.brand}>
                        <img src={logo} alt="Econverse" width={164} height={49} loading="lazy" />
                        <p>Tecnologia, eletrônicos e muito mais com frete grátis e parcelamento sem juros.</p>
                        <ul className={styles.social}>
                            {SOCIAL.map(({ label, href, icon }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        aria-label={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <nav className={styles.links} aria-label="Rodapé">
                        {COLUMNS.map(({ title, links }) => (
                            <div key={title}>
                                <h2>{title}</h2>
                                <ul>
                                    {links.map(({ label, href }) => (
                                        <li key={label}>
                                            <a href={href}>{label}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>

                <address className={styles.companyInfo}>
                    <span>Econverse Comércio de Tecnologia Ltda.</span>
                    {' · '}
                    <span>CNPJ: <strong>[CNPJ]</strong></span>
                    {' · '}
                    <span>[Endereço completo]</span>
                    {' · '}
                    <a href="mailto:contato@econverse.com.br">contato@econverse.com.br</a>
                </address>

                <p className={styles.copy}>
                    © {new Date().getFullYear()} Econverse. Todos os direitos reservados.
                    {' · '}
                    <button
                        type="button"
                        className={styles.devCredit}
                        onClick={() => setDevOpen(true)}
                    >
                        Desenvolvido por Tayná Sousa
                    </button>
                </p>
            </footer>

            <DevModal open={devOpen} onClose={() => setDevOpen(false)} />
        </>
    );
}
