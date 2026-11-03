export interface Product {
    productName: string;
    descriptionShort: string;
    photo: string;
    price: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface ProductsResponse {
    success: boolean;
    products: Product[];
}

export type RequestStatus = 'loading' | 'success' | 'error';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';
