import { Blog } from '../entities/Blog';

export interface PaginationOptions {
  skip: number;
  limit: number;
}

export interface IBlogRepository {
  findAll(options: PaginationOptions): Promise<Blog[]>;
  findById(id: string): Promise<Blog | null>;
  create(blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Promise<Blog>;
  update(id: string, blog: Partial<Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Blog>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
} 