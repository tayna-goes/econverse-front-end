import { useState } from 'react';
import type { ReactElement } from 'react';
import {
  BottleIcon,
  DevicesIcon,
  FashionIcon,
  FitnessIcon,
  HealthIcon,
  StoreIcon,
  ToolsIcon,
} from '../icons/Icons';
import styles from './CategoryNav.module.scss';

interface Category {
  id: string;
  label: string;
  icon: ReactElement;
}

const CATEGORIES: Category[] = [
  { id: 'tecnologia', label: 'Tecnologia', icon: <DevicesIcon size={64} /> },
  { id: 'supermercado', label: 'Supermercado', icon: <StoreIcon size={64} /> },
  { id: 'bebidas', label: 'Bebidas', icon: <BottleIcon size={64} /> },
  { id: 'ferramentas', label: 'Ferramentas', icon: <ToolsIcon size={64} /> },
  { id: 'saude', label: 'Saúde', icon: <HealthIcon size={64} /> },
  { id: 'esportes', label: 'Esportes e Fitness', icon: <FitnessIcon size={64} /> },
  { id: 'moda', label: 'Moda', icon: <FashionIcon size={64} /> },
];

export function CategoryNav() {
  const [active, setActive] = useState('tecnologia');

  return (
    <nav id="categorias" className={styles.nav} aria-label="Categorias">
      <ul className={styles.list}>
        {CATEGORIES.map(({ id, label, icon }) => (
          <li key={id}>
            <button
              type="button"
              className={styles.item}
              aria-pressed={active === id}
              onClick={() => setActive(id)}
            >
              <span className={styles.card}>{icon}</span>
              <span className={styles.label}>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
