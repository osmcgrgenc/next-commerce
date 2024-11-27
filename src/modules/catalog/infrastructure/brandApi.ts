import { Brand } from '../domain/Brand';

export const brandApi = {
    getBrands: async (): Promise<Brand[]> => {
        const response = await fetch('/api/brands');
        return response.json();
    },

    getBrand: async (id: number): Promise<Brand> => {
        const response = await fetch(`/api/brands/${id}`);
        return response.json();
    },

    createBrand: async (brand: Omit<Brand, 'id' | 'createdAt' | 'updatedAt'>): Promise<Brand> => {
        const response = await fetch('/api/brands', {
            method: 'POST',
            body: JSON.stringify(brand),
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    }
}; 