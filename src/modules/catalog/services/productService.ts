import { prisma } from '@/lib/prisma';
import { AppError } from '@/lib/errors/AppError';
import type { ProductInput } from '@/lib/validation/schemas/catalog';

export class ProductService {
  static async getAll({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip,
        take: limit,
        where: { isActive: true },
        include: {
          category: true,
          brand: true,
        },
      }),
      prisma.product.count({ where: { isActive: true } }),
    ]);

    return { products, total };
  }

  static async create(data: ProductInput) {
    // İş mantığı kontrolleri
    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) {
      throw AppError.BadRequest('Category not found', 'CATEGORY_NOT_FOUND');
    }

    return prisma.product.create({
      data: {
        ...data,
        isActive: true,
      },
      include: {
        category: true,
        brand: true,
      },
    });
  }
} 