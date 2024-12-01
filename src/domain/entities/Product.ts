
export interface ProductImage {
    id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
}

export interface ProductCategory {
    id: string;
    name: string;
    slug: string;
}

export interface ProductBrand {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
    description?: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    description?: string;
    stock: number;
    isActive: boolean;
    featured: boolean;
    category: ProductCategory;
    brand: ProductBrand;
    images: ProductImage[];
    createdAt: Date;
    updatedAt: Date;
}

export type CreateProductDTO = Omit<Product, 'id' | 'slug' | 'createdAt' | 'updatedAt'>;
export type UpdateProductDTO = Partial<CreateProductDTO>;
