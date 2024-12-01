import { Blog } from "@/domain/entities/Blog";
import { PaginationParams, PaginatedResult } from "@/domain/types/common";

export interface BlogService {
  getAll(params?: PaginationParams): Promise<PaginatedResult<Blog>>;
  getById(id: string): Promise<Blog>;
  create(blog: Omit<Blog, "id">): Promise<Blog>;
  update(id: string, blog: Partial<Blog>): Promise<Blog>;
  delete(id: string): Promise<void>;
} 