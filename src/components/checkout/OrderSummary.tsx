import { Cart, CartItem } from '@/modules/cart/domain/cart';

interface OrderSummaryProps {
  cart: Cart;
}

export function OrderSummary({ cart }: OrderSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
      
      {/* Sepet Ürünleri */}
      <div className="space-y-3 mb-4">
        {cart.items.map((item: CartItem, index: number) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{item.quantity}x {item.name}</span>
            <span>{item.price * item.quantity} TL</span>
          </div>
        ))}
      </div>
      
      {/* Alt Toplam */}
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between mb-2">
          <span>Ara Toplam</span>
          <span>{cart.totalPrice} TL</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Kargo</span>
          <span>Ücretsiz</span>
        </div>
        
        {/* Toplam */}
        <div className="flex justify-between font-semibold text-lg border-t pt-4 mt-4">
          <span>Toplam</span>
          <span>{cart.totalPrice} TL</span>
        </div>
      </div>
    </div>
  );
}