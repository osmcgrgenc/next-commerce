import { Product } from '@/types/Product';
import { Order } from '@/types/Order';
import { User } from '@/types/User';
import { Address } from '@/types/Address';
import { Wishlist } from '@/types/Wishlist';
import { Category } from '@/types/Category';
import { Brand } from '@/types/Brand';

export const users: User[] = [];
export const orders: Order[] = [];
export const addresses: Address[] = [];
export const wishlists: Wishlist[] = [];
export const categories: Category[] = [
    { id: 2, name: 'Üst Kategori 1', parentCategory: null },
    { id: 1, name: 'Kategori 1', parentCategory: { id: 2, name: 'Üst Kategori 1', parentCategory: null } },
    { id: 3, name: 'Kategori 2', parentCategory: { id: 2, name: 'Üst Kategori 1', parentCategory: null } },
    { id: 4, name: 'Kategori 3', parentCategory: { id: 3, name: 'Kategori 2', parentCategory: { id: 2, name: 'Üst Kategori 1', parentCategory: null } } },
    { id: 5, name: 'Kategori 4', parentCategory: null },
    { id: 6, name: 'Kategori 5', parentCategory: { id: 5, name: 'Kategori 4', parentCategory: null } },
    { id: 7, name: 'Kategori 6', parentCategory: { id: 6, name: 'Kategori 5', parentCategory: { id: 5, name: 'Kategori 4', parentCategory: null } } },
    { id: 8, name: 'Kategori 7', parentCategory: { id: 6, name: 'Kategori 5', parentCategory: { id: 5, name: 'Kategori 4', parentCategory: null } } },
    { id: 9, name: 'Kategori 8', parentCategory: { id: 8, name: 'Kategori 7', parentCategory: { id: 6, name: 'Kategori 5', parentCategory: { id: 5, name: 'Kategori 4', parentCategory: null } } } },
    { id: 10, name: 'Kategori 9', parentCategory: { id: 9, name: 'Kategori 8', parentCategory: { id: 6, name: 'Kategori 5', parentCategory: { id: 5, name: 'Kategori 4', parentCategory: null } } } },
    { id: 11, name: 'Kategori 10', parentCategory: { id: 10, name: 'Kategori 9', parentCategory: { id: 9, name: 'Kategori 8', parentCategory: { id: 6, name: 'Kategori 5', parentCategory: { id: 5, name: 'Kategori 4', parentCategory: null } } } } },
];
export const brands: Brand[] = [
    { id: 1, name: 'Marka 1' },
];
export const products: Product[] = [
    { id: 1, name: 'Ürün 1', price: 10, stock: 100, description: 'Ürün 1 açıklaması', category: categories[0], images: ['resim1.jpg'], brand: brands[0] },
    { id: 2, name: 'Ürün 2', price: 20, stock: 200, description: 'Ürün 2 açıklaması', category: categories[0], images: ['resim2.jpg'], brand: brands[0] },
];
