import type { Product, ProductsResponse } from '../types/product';

export const PRODUCTS_URL = 'https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json';
export const FALLBACK_URL = `${import.meta.env.BASE_URL}produtos.json`;

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p.productName === 'string' &&
    typeof p.descriptionShort === 'string' &&
    typeof p.photo === 'string' &&
    typeof p.price === 'number'
  );
}

async function request(url: string, signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = (await response.json()) as ProductsResponse;
  if (!data.success || !Array.isArray(data.products)) {
    throw new Error('Resposta inválida da API de produtos');
  }
  return data.products.filter(isProduct);
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  try {
    return await request(PRODUCTS_URL, signal);
  } catch (error) {
    if (signal?.aborted) throw error;
    return request(FALLBACK_URL, signal);
  }
}
