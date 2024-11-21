'use client';

import { Order } from '@/modules/users/domain/Order';
import { formatDate } from '@/utils/date';
import { formatPrice } from '@/utils/price';

const orderStatusMap = {
  PENDING: { text: 'Beklemede', color: 'bg-yellow-100 text-yellow-800' },
  PROCESSING: { text: 'İşleniyor', color: 'bg-blue-100 text-blue-800' },
  SHIPPED: { text: 'Kargoda', color: 'bg-purple-100 text-purple-800' },
  DELIVERED: { text: 'Teslim Edildi', color: 'bg-green-100 text-green-800' },
  CANCELED: { text: 'İptal Edildi', color: 'bg-red-100 text-red-800' },
};

export function OrderList() {
  // Örnek veri, gerçek uygulamada API'den gelecek
  const orders: Order[] = [];

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Henüz siparişiniz bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600">Sipariş No: #{order.id}</p>
              <p className="text-sm text-gray-600">
                Tarih: {formatDate(order.createdAt)}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${orderStatusMap[order.status].color}`}>
              {orderStatusMap[order.status].text}
            </span>
          </div>
          
          <div className="border-t pt-4">
            <p className="font-semibold">Teslimat Adresi:</p>
            <p className="text-gray-600">
              {order.address.street}, {order.address.city}
            </p>
          </div>

          <div className="border-t pt-4 mt-4">
            <p className="font-semibold">Ödeme Bilgileri:</p>
            <p className="text-gray-600">
              {formatPrice(order.totalAmount)} - {order.payment.method}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}