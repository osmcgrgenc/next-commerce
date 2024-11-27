import { Brand } from "./Brand";
import { Category } from "./Category";

export interface ProductImage {
    id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
}

export interface ProductVariation {
    id: string;
    name: string;
    options: Array<{
        id: string;
        name: string;
    }>;
}

export interface ProductBase {
    id: string;
    name: string;
    slug: string;
    price: number;
    description?: string;
    images: ProductImage[];
    category: Category;
    brand: Brand;
    stock: number;
    isActive: boolean;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductWithVariations extends ProductBase {
    variations: ProductVariation[];
}

export interface ProductWithoutVariations extends ProductBase {
    variations?: never;
}

export type Product = ProductWithVariations | ProductWithoutVariations;
