import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Product } from '../../types/product';
import { ProductModal } from './ProductModal';

const product: Product = {
  productName: 'IPHONE 13 MINI 1',
  descriptionShort: 'Descrição curta do produto',
  photo: 'https://example.com/foto.png',
  price: 9000,
};

describe('ProductModal', () => {
  it('exibe as informações do produto selecionado', () => {
    render(<ProductModal product={product} onClose={() => {}} />);

    const dialog = screen.getByRole('dialog', { name: 'IPHONE 13 MINI 1' });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('R$ 9.000,00')).toBeInTheDocument();
    expect(screen.getByText('Descrição curta do produto')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'IPHONE 13 MINI 1' })).toBeInTheDocument();
  });

  it('altera a quantidade sem ficar abaixo de 1', async () => {
    const user = userEvent.setup();
    render(<ProductModal product={product} onClose={() => {}} />);

    const output = screen.getByLabelText('Quantidade selecionada');
    expect(output).toHaveTextContent('01');
    expect(screen.getByRole('button', { name: 'Diminuir quantidade' })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Aumentar quantidade' }));
    expect(output).toHaveTextContent('02');
  });

  it('fecha com o botão, com ESC e ao comprar', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onBuy = vi.fn();
    render(<ProductModal product={product} onClose={onClose} onBuy={onBuy} />);

    await user.click(screen.getByRole('button', { name: 'Fechar' }));
    await user.keyboard('{Escape}');
    await user.click(screen.getByRole('button', { name: 'Comprar' }));

    expect(onBuy).toHaveBeenCalledWith(product, 1);
    expect(onClose).toHaveBeenCalledTimes(3);
  });
});
