import { Product } from "../domain/product";

export class ProductService {
  static calculateDiscountPrice(product: Product, discountRate: number): number {
    return product.price - product.price * discountRate;
  }
}
