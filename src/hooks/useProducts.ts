import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../services/products';
import type { Product, RequestStatus } from '../types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<RequestStatus>('loading');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');

    fetchProducts(controller.signal)
      .then((list) => {
        setProducts(list);
        setStatus('success');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('error');
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { products, status, retry };
}
