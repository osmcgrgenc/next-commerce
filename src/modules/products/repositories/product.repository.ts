import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ProductRepository {
  static async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  static async getProducts() {
    return prisma.product.findMany();
  }
}
