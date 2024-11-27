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

export interface ProductResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  stock: number;
  categories: ProductCategory[];
  images: ProductImage[];
  metadata: {
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    featured: boolean;
  };
} 