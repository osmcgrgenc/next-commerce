import Image from 'next/image';
import { CartItem } from '@/domain/entities/Cart';
import { formatPrice } from '@/lib/utils';

type CartListProps = {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
};

export function CartList({ items, onUpdateQuantity, onRemoveItem }: CartListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Sepetiniz boş.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
          <div className="relative w-24 h-24">
            <Image
              src={item.image || '/placeholder.png'}
              alt={item.name || ''}
              fill
              className="object-cover rounded-md"
            />
          </div>
          
          <div className="flex-grow">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-purple-600 font-semibold">
              {formatPrice(item.price)}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={item.quantity}
              onChange={(e) => onUpdateQuantity(item.id!, parseInt(e.target.value))}
              className="p-2 border rounded-md"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
            
            <button
              onClick={() => onRemoveItem(item.id!)}
              className="text-red-600 hover:text-red-700"
            >
              Kaldır
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}