import { Product } from '@/domain/entities/Product';
import { ProductResponse } from '@/domain/types/product';
import { IProductRepository } from '@/domain/repositories/IProductRepository';

export interface PaginationParams {
    page: number;
    limit: number;
}

export interface PaginatedResult<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
}

export class ProductService {
    constructor(private readonly productRepository: IProductRepository) {}

    private mapToProductResponse(product: Product): ProductResponse {
        return {
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description || '',
            price: {
                amount: product.price,
                currency: 'TRY'
            },
            stock: product.stock,
            categories: [{
                id: product.category.id,
                name: product.category.name,
                slug: product.category.slug
            }],
            images: product.images,
            metadata: {
                createdAt: product.createdAt.toISOString(),
                updatedAt: product.updatedAt.toISOString(),
                isActive: product.isActive,
                featured: product.featured
            }
        };
    }

    async getAllProducts(params: PaginationParams): Promise<PaginatedResult<ProductResponse>> {
        const { page, limit } = params;
        const skip = (page - 1) * limit;

        const [items, total] = await Promise.all([
            this.productRepository.findAll({ skip, limit }),
            this.productRepository.count()
        ]);

        return {
            items: items.map(this.mapToProductResponse),
            total,
            page,
            limit
        };
    }
    async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductResponse> {
        const product = await this.productRepository.create(productData);
        return this.mapToProductResponse(product);
    }
} 