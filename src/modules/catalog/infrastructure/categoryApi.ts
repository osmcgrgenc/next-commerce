import { Category } from '../domain/Category';

export const categoryApi = {
    getCategories: async (): Promise<Category[]> => {
        const response = await fetch('/api/categories');
        return response.json();
    },

    getCategory: async (id: number): Promise<Category> => {
        const response = await fetch(`/api/categories/${id}`);
        return response.json();
    },

    createCategory: async (category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
        const response = await fetch('/api/categories', {
            method: 'POST',
            body: JSON.stringify(category),
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    }
}; 