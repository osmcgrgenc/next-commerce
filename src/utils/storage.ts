import { Cart } from "@/modules/cart/domain/cart";

export const storage = {
  setItem: (key: string, value: any): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  getItem: <T>(key: string): T | null => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  },

  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },

  // Sepet için özel metodlar
  getCart: (): Cart | null => {
    return storage.getItem<Cart>('cart');
  },

  setCart: (cart: Cart): void => {
    storage.setItem('cart', cart);
  },

  clearCart: (): void => {
    storage.removeItem('cart');
  }
};