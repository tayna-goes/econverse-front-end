import { useCallback, useState } from 'react';
import type { CartItem, Product } from '../types/product';

export function useCart() {
    const [items, setItems] = useState<CartItem[]>([]);

    const add = useCallback((product: Product, quantity: number) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.product.productName === product.productName);
            if (existing) {
                return prev.map((i) =>
                    i.product.productName === product.productName
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            return [...prev, { product, quantity }];
        });
    }, []);

    const remove = useCallback((productName: string) => {
        setItems((prev) => prev.filter((i) => i.product.productName !== productName));
    }, []);

    const updateQty = useCallback((productName: string, quantity: number) => {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((i) =>
                i.product.productName === productName ? { ...i, quantity } : i
            )
        );
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    return { items, add, remove, updateQty, clear, count, total };
}
