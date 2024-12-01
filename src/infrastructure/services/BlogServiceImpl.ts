import { Blog } from "@/domain/entities/Blog";
import { BlogService } from "@/application/services/admin/BlogService";
import { PaginationParams, PaginatedResult } from "@/domain/types/common";

export class BlogServiceImpl implements BlogService {
  async getAll(params?: PaginationParams): Promise<PaginatedResult<Blog>> {
    try {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.search) searchParams.set("search", params.search);

      const response = await fetch(`/api/blogs?${searchParams.toString()}`);
      if (!response.ok) throw new Error("Blog verileri alınamadı");
      
      const result = await response.json();
      if (!result.success) throw new Error(result.error.details);
      
      return {
        items: result.data,
        total: result.pagination.total,
        page: result.pagination.page,
        limit: result.pagination.limit
      };
    } catch (error) {
      console.error("Blog servisi hatası:", error);
      throw error;
    }
  }

  async create(blog: Omit<Blog, "id">): Promise<Blog> {
    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });
      
      const result = await response.json();
      if (!result.success) throw new Error(result.error.details);
      
      return result.data;
    } catch (error) {
      console.error("Blog servisi hatası:", error);
      throw error;
    }
  }

  async update(id: string, blog: Partial<Blog>): Promise<Blog> {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        body: JSON.stringify(blog),
      });
      return response.json();
    } catch (error) {
      console.error("Blog servisi hatası:", error);
      throw error;
    }
  }

  async getById(id: string): Promise<Blog> {
    try {
      const response = await fetch(`/api/blogs/${id}`);
      if (!response.ok) throw new Error("Blog bulunamadı");
      return response.json();
    } catch (error) {
      console.error("Blog servisi hatası:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      return response.json();
    } catch (error) {
      console.error("Blog servisi hatası:", error);
      throw error;
    }
  }
} 