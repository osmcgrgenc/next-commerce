import { Product, CreateProductDTO, UpdateProductDTO } from '../entities/Product';
import { PaginationParams, PaginatedResult } from '../types/common';

export interface IProductRepository {
  findAll(params: PaginationParams): Promise<PaginatedResult<Product>>;
  findById(id: string): Promise<Product | null>;
  create(data: CreateProductDTO): Promise<Product>;
  update(id: string, data: UpdateProductDTO): Promise<Product>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
} 