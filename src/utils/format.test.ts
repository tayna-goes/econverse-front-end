import { describe, expect, it } from 'vitest';
import { formatPrice, hasFreeShipping, installmentValue, padQuantity } from './format';

describe('format utils', () => {
  it('formata preços em reais (pt-BR)', () => {
    expect(formatPrice(1499.9)).toBe('R$ 1.499,90');
    expect(formatPrice(15000)).toBe('R$ 15.000,00');
  });

  it('calcula o valor da parcela em 2x', () => {
    expect(installmentValue(9000)).toBe(4500);
    expect(installmentValue(14990)).toBe(7495);
  });

  it('concede frete grátis a partir de R$ 200', () => {
    expect(hasFreeShipping(199.99)).toBe(false);
    expect(hasFreeShipping(200)).toBe(true);
  });

  it('completa a quantidade com zero à esquerda', () => {
    expect(padQuantity(1)).toBe('01');
    expect(padQuantity(12)).toBe('12');
  });
});
