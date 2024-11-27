import { Product } from '../domain/Product';

export const productApi = {
    getProducts: async (): Promise<Product[]> => {
        const response = await fetch('/api/products');
        return response.json();
    },

    getProduct: async (id: number): Promise<Product> => {
        const response = await fetch(`/api/products/${id}`);
        return response.json();
    },

    createProduct: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
        const response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    },

    updateProduct: async (id: number, product: Partial<Product>): Promise<Product> => {
        const response = await fetch(`/api/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    }
}; 