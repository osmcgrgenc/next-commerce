'use client';

import { Order } from '@/modules/users/domain/Order';
import Link from 'next/link';
import { formatPrice } from '@/utils/price';

export function OrderSummary() {
  // Örnek veri, gerçek uygulamada API'den gelecek
  const recentOrders: Order[] = [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Son Siparişler</h2>
        <Link 
          href="/profile/orders"
          className="text-purple-600 hover:underline text-sm"
        >
          Tümünü Gör
        </Link>
      </div>

      {recentOrders.length === 0 ? (
        <p className="text-gray-600 text-center py-4">
          Henüz siparişiniz bulunmuyor.
        </p>
      ) : (
        <div className="space-y-4">
          {recentOrders.slice(0, 3).map((order) => (
            <div 
              key={order.id}
              className="flex justify-between items-center p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">Sipariş #{order.id}</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-purple-600">
                  {formatPrice(order.totalAmount)}
                </p>
                <p className="text-sm text-gray-600">
                  {order.status === 'DELIVERED' ? 'Teslim Edildi' : 'İşlemde'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}