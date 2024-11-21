import { Cart } from '@/modules/cart/domain/cart';
import { formatPrice } from '@/utils/price';

type CartSummaryProps = {
  cart: Cart;
};

export function CartSummary({ cart }: CartSummaryProps) {
  const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 29.90;
  const total = subtotal + shipping;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <h2 className="text-lg font-semibold">Sipariş Özeti</h2>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Ara Toplam</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Kargo</span>
          <span>{shipping === 0 ? 'Ücretsiz' : formatPrice(shipping)}</span>
        </div>
        
        {shipping > 0 && (
          <p className="text-xs text-gray-600">
            500 TL üzeri alışverişlerde kargo ücretsiz!
          </p>
        )}
        
        <div className="border-t pt-2 font-semibold flex justify-between">
          <span>Toplam</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      
      <button 
        className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700"
        disabled={cart.items.length === 0}
      >
        Ödemeye Geç
      </button>
    </div>
  );
}