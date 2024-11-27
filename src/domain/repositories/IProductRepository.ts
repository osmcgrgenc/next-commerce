import { Product } from '../entities/Product';

export interface PaginationOptions {
  skip: number;
  limit: number;
}

export interface IProductRepository {
  findAll(options: PaginationOptions): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product>;
  update(id: string, product: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
} 