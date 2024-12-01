import { PrismaClient } from '@prisma/client';
import { ProductBrand } from '@/domain/entities/Product';

export class PrismaBrandRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<ProductBrand[]> {
    const brands = await this.prisma.brand.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return brands.map(brand => ({
      id: brand.id,
      name: brand.name,
      slug: brand.slug,
      logoUrl: brand.logoUrl || undefined,
      description: brand.description || undefined
    }));
  }
} 