import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
  static async getUserById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static async getUsers() {
    return prisma.user.findMany();
  }
}
