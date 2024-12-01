import { PrismaClient } from '@prisma/client';
import { Category, CreateCategoryDTO, UpdateCategoryDTO } from '@/domain/entities/Category';
import { PaginatedResult, PaginationParams } from '@/domain/types/common';

export class PrismaCategoryRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(params?: PaginationParams): Promise<PaginatedResult<Category>> {
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const skip = (page - 1) * limit;

    const [total, items] = await Promise.all([
      this.prisma.category.count(),
      this.prisma.category.findMany({
        skip,
        take: limit,
        orderBy: {
          name: 'asc'
        },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          parentId: true,
          createdAt: true,
          updatedAt: true
        }
      })
    ]);

    return {
      items,
      total,
      page,
      limit
    };
  }

  async create(data: CreateCategoryDTO): Promise<Category> {
    return this.prisma.category.create({
      data: {
        name: data.name,
        slug: this.createSlug(data.name),
        description: data.description || null,
        parentId: data.parentId || null
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        parentId: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async update(id: string, data: UpdateCategoryDTO): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.name ? this.createSlug(data.name) : undefined,
        description: data.description,
        parentId: data.parentId
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        parentId: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id }
    });
  }

  private createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
} 