import { padQuantity } from '../../utils/format';
import { MinusIcon, PlusIcon } from '../icons/Icons';
import styles from './QuantitySelector.module.scss';

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({ value, min = 1, max = 99, onChange }: QuantitySelectorProps) {
  return (
    <div className={styles.selector} role="group" aria-label="Quantidade">
      <button
        type="button"
        aria-label="Diminuir quantidade"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <MinusIcon size={20} />
      </button>
      <output aria-live="polite" aria-label="Quantidade selecionada">
        {padQuantity(value)}
      </output>
      <button
        type="button"
        aria-label="Aumentar quantidade"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <PlusIcon size={20} />
      </button>
    </div>
  );
}
