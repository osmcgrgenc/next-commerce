import { PrismaClient } from '@prisma/client';
import { IBlogRepository } from '@/domain/repositories/IBlogRepository';
import { Blog } from '@/domain/entities/Blog';

interface PaginationOptions {
  skip: number;
  limit: number;
  search?: string;
}

interface PrismaCreateInput {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  isPublished: boolean;
  publishedAt?: Date;
  author: {
    connect: { id: string }
  };
}

interface PrismaUpdateInput {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  isPublished?: boolean;
  publishedAt?: Date;
  author?: {
    connect: { id: string }
  };
}

interface PrismaBlog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string;
  };
}

export class PrismaBlogRepository implements IBlogRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll({ skip, limit, search }: PaginationOptions): Promise<{ items: Blog[], total: number }> {
    const where = search ? {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ],
    } : {};

    const [blogs, total] = await Promise.all([
      this.prisma.blog.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.blog.count({ where })
    ]);

    return {
      items: blogs.map(this.mapPrismaBlogToEntity),
      total
    };
  }

  async findById(id: string): Promise<Blog | null> {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      }
    });

    return blog ? this.mapPrismaBlogToEntity(blog) : null;
  }

  async create(blogData: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Promise<Blog> {
    const { author, ...rest } = blogData;

    const createData: PrismaCreateInput = {
      ...rest,
      slug: rest.title.toLowerCase().replace(/\s+/g, '-'),
      author: {
        connect: { id: author.id }
      }
    };

    const blog = await this.prisma.blog.create({
      data: createData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      }
    });

    return this.mapPrismaBlogToEntity(blog);
  }

  private mapPrismaBlogToEntity(prismaBlog: PrismaBlog): Blog {
    return {
      id: prismaBlog.id,
      title: prismaBlog.title,
      slug: prismaBlog.slug,
      content: prismaBlog.content,
      excerpt: prismaBlog.excerpt,
      author: prismaBlog.author,
      isPublished: prismaBlog.isPublished,
      publishedAt: prismaBlog.publishedAt || new Date(),
      createdAt: prismaBlog.createdAt,
      updatedAt: prismaBlog.updatedAt
    };
  }

  async update(id: string, blogData: Partial<Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Blog> {
    const { author, ...rest } = blogData;

    const updateData: PrismaUpdateInput = {
      ...rest
    };

    if (author) {
      updateData.author = {
        connect: { id: author.id }
      };
    }

    const blog = await this.prisma.blog.update({
      where: { id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      }
    });

    return this.mapPrismaBlogToEntity(blog);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.blog.delete({
      where: { id }
    });
  }
} 