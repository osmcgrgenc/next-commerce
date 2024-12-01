import { Product, CreateProductDTO, UpdateProductDTO } from "@/domain/entities/Product";
import { PaginatedResult, PaginationParams } from "@/domain/types/common";
import { BaseService } from "@/application/services/BaseService";
import { SingleResponse, PaginatedResponse } from "@/domain/types/responses";

export interface ProductService {
  getAll(params?: PaginationParams): Promise<PaginatedResult<Product>>;
  getById?(id: string): Promise<Product>;
  create?(data: CreateProductDTO): Promise<Product>;
  update?(id: string, data: UpdateProductDTO): Promise<Product>;
  delete?(id: string): Promise<void>;
}

export class ProductServiceImpl extends BaseService implements ProductService {
  constructor() {
    super('/api/products');
  }

  async getAll(params?: PaginationParams): Promise<PaginatedResult<Product>> {
    const response = await this.get<PaginatedResponse<Product>>('', {
      page: params?.page || 1,
      limit: params?.limit || 10,
      search: params?.search
    });

    return {
      items: response.data,
      total: response.pagination.total,
      page: response.pagination.page,
      limit: response.pagination.limit
    };
  }

  async getById(id: string): Promise<Product> {
    const response = await this.get<SingleResponse<Product>>(`/${id}`);
    return response.data;
  }

  async create(data: CreateProductDTO): Promise<Product> {
    const response = await this.post<SingleResponse<Product>>("", data);
    return response.data;
  }

  async update(id: string, data: UpdateProductDTO): Promise<Product> {
    const response = await this.put<SingleResponse<Product>>(`/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await this.delete(`/${id}`);
  }
} 