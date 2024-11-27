import { PrismaClient } from '@prisma/client';
import { IProductRepository } from '@/domain/repositories/IProductRepository';
import { Product, ProductBase, ProductImage } from '@/domain/entities/Product';

interface PaginationOptions {
  skip: number;
  limit: number;
}

interface CreateProductImageInput {
  url: string;
  alt: string;
  isPrimary: boolean;
}

interface PrismaCreateInput {
  name: string;
  slug: string;
  price: number;
  description?: string;
  stock: number;
  isActive: boolean;
  featured: boolean;
  category: {
    connect: { id: string }
  };
  brand: {
    connect: { id: string }
  };
  images?: {
    create: CreateProductImageInput[];
  };
}

interface PrismaUpdateInput {
  name?: string;
  slug?: string;
  price?: number;
  description?: string;
  category?: {
    connect: { id: string }
  };
  images?: {
    deleteMany: object;
    create: Omit<ProductImage, 'url' | 'id' | 'isPrimary' | 'alt'>[];
  };
}

interface PrismaProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string | null;
  stock: number;
  isActive: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  brand: {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
    description?: string;
  };
  images: {
    id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
  }[];
}

export class PrismaProductRepository implements IProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll({ skip, limit }: PaginationOptions): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        category: true,
        brand: true,
        images: true,
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return products.map(this.mapPrismaProductToEntity);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        images: true,
      }
    });

    return product ? this.mapPrismaProductToEntity(product) : null;
  }

  async create(productData: Omit<ProductBase, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const { category, brand, images, ...rest } = productData;

    const createData: PrismaCreateInput = {
      ...rest,
      slug: rest.name.toLowerCase().replace(/\s+/g, '-'),
      category: {
        connect: { id: category.id }
      },
      brand: {
        connect: { id: brand.id }
      }
    };

    if (images && images.length > 0) {
      createData.images = {
        create: images.map(image => ({
          url: image.url,
          alt: image.alt || rest.name,
          isPrimary: image.isPrimary
        }))
      };
    }

    const product = await this.prisma.product.create({
      data: createData,
      include: {
        category: true,
        brand: true,
        images: true,
      }
    });

    return this.mapPrismaProductToEntity(product);
  }

  private mapPrismaProductToEntity(prismaProduct: PrismaProduct): Product {
    return {
      id: prismaProduct.id,
      name: prismaProduct.name,
      slug: prismaProduct.slug,
      price: prismaProduct.price,
      description: prismaProduct.description,
      stock: prismaProduct.stock,
      isActive: prismaProduct.isActive,
      featured: prismaProduct.featured,
      category: prismaProduct.category,
      brand: prismaProduct.brand,
      images: prismaProduct.images.map((image) => ({
        id: image.id,
        url: image.url,
        alt: image.alt,
        isPrimary: image.isPrimary
      })),
      createdAt: prismaProduct.createdAt,
      updatedAt: prismaProduct.updatedAt
    } as Product;
  }

  async update(id: string, productData: Partial<Omit<ProductBase, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
    const { category, images, ...rest } = productData;

    const updateData: PrismaUpdateInput = {
      ...rest
    };

    if (category) {
      updateData.category = {
        connect: { id: category.id }
      };
    }

    if (images) {
      updateData.images = {
        deleteMany: {},
        create: images.map(url => ({
          url,
          alt: productData.name || '',
          isPrimary: false
        }))
      };
    }

    return this.prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        images: true,
        brand: true,
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id }
    });
  }

  async count(): Promise<number> {
    return this.prisma.product.count();
  }
} 