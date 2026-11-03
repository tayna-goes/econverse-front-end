import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon, InstagramIcon, LinkedinIcon } from '../icons/Icons';
import styles from './DevModal.module.scss';

interface DevModalProps {
    open: boolean;
    onClose: () => void;
}

const DEV = {
    name: 'Tayná Sousa',
    title: 'Desenvolvedora Frontend',
    bio: 'Transformando sua ideia em soluções',
    email: 'tayynagoes@gmail.com',
    linkedin: 'https://linkedin.com/in/taynasousa',
    github: 'https://github.com/tayynagoes',
    instagram: 'https://instagram.com/tayynagoes',
    Site: 'https://tayna-goes.infinityfreeapp.com/',
    initials: 'TS',
};

export function DevModal({ open, onClose }: DevModalProps) {
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
        <div
            className={`${styles.overlay} ${open ? styles.open : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Informações da desenvolvedora"
            aria-hidden={!open}
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className={styles.card}>
                <button ref={closeRef} type="button" className={styles.close} aria-label="Fechar" onClick={onClose}>
                    <CloseIcon size={20} />
                </button>

                <div className={styles.avatar} aria-hidden="true">
                    {DEV.initials}
                </div>

                <h2 className={styles.name}>{DEV.name}</h2>
                <p className={styles.title}>{DEV.title}</p>
                <p className={styles.bio}>{DEV.bio}</p>

                <a href={`mailto:${DEV.email}`} className={styles.email}>
                    {DEV.email}
                </a>

                <a href={DEV.Site} target="_blank" rel="noopener noreferrer" className={styles.siteLink}>
                    🌐 Portfolio
                </a>

                <div className={styles.socials}>
                    <a href={DEV.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <LinkedinIcon size={22} />
                    </a>
                    <a href={DEV.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                    </a>
                    <a href={DEV.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <InstagramIcon size={22} />
                    </a>
                    <a href={`mailto:${DEV.email}`} aria-label="E-mail">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m2 7 10 7 10-7" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>,
        document.body,
    );
}
