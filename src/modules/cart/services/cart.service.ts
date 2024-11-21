import { Cart, CartItem } from "../domain/cart";

export class CartService {
  static addToCart(cart: Cart, item: CartItem): Cart {
    const existingItem = cart.items?.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity ?? 0;
    } else {
      cart.items?.push(item);
    }

    cart.totalQuantity += item.quantity;
    cart.totalPrice += item.price * item.quantity;

    return cart;
  }

  static removeFromCart(cart: Cart, itemId: string): Cart {
    const itemIndex = cart.items?.findIndex((i) => i.id === itemId);

    if (itemIndex) {
      const item = cart.items?.[itemIndex];
      if (item) {
        cart.totalQuantity -= item.quantity;
        cart.totalPrice -= item.price * item.quantity;
        cart.items?.splice(itemIndex, 1);
      }
    }

    return cart;
  }

  static clearCart(): Cart {
    return { items: [], totalQuantity: 0, totalPrice: 0 };
  }
}
