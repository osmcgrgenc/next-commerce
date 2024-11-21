import { PrismaClient } from "@prisma/client";
import { CartItem } from "../domain/cart";

const prisma = new PrismaClient();

export class CartRepository {
  static async getCartByUserId(userId: string) {
    return prisma.cart.findUnique({
      where: { userId },
    });
  }

  static async saveCart(userId: string, cartData: CartItem[]) {
    return prisma.cart.upsert({
      where: { userId },
      update: { items: cartData },
      create: { userId, items: cartData },
    });
  }
}
