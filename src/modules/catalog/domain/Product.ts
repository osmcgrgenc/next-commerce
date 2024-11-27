export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;
    brandId: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
} 