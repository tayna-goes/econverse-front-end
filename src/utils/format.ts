const currency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const FREE_SHIPPING_MIN = 200;

export const INSTALLMENTS = 2;

export function formatPrice(value: number): string {
  return currency.format(value).replace(/\s/g, ' ');
}

export function installmentValue(price: number, installments = INSTALLMENTS): number {
  return Math.round((price / installments) * 100) / 100;
}

export function hasFreeShipping(price: number): boolean {
  return price >= FREE_SHIPPING_MIN;
}

export function padQuantity(quantity: number): string {
  return String(quantity).padStart(2, '0');
}
