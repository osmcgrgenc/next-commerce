import { Category, CreateCategoryDTO, UpdateCategoryDTO } from "@/domain/entities/Category";
import { PaginatedResult, PaginationParams } from "@/domain/types/common";
import { PrismaCategoryRepository } from "@/infrastructure/repositories/PrismaCategoryRepository";

export class CategoryServiceImpl {
  private repository: PrismaCategoryRepository;

  constructor() {
    this.repository = new PrismaCategoryRepository();
  }

  async getAll(params?: PaginationParams): Promise<PaginatedResult<Category>> {
    return this.repository.findAll(params);
  }

  async create(data: CreateCategoryDTO): Promise<Category> {
    return this.repository.create(data);
  }

  async update(id: string, data: UpdateCategoryDTO): Promise<Category> {
    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
} 