export interface CartItem {
    id: string; // Ürün ID'si
    name: string; // Ürün adı
    price: number; // Ürün fiyatı
    quantity: number; // Adet sayısı
    image?: string; // Ürün resmi (opsiyonel)
  };
  
export interface Cart {
    items: CartItem[]; // Sepet içindeki ürünler
    totalQuantity: number; // Toplam ürün sayısı
    totalPrice: number; // Toplam fiyat
  }