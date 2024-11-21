import { Order } from "@/modules/users/domain/Order";
import { formatDate } from "@/utils/date";

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold">Sipariş #{order.id}</p>
              <p className="text-sm text-gray-600">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>
          
          <div className="mt-4">
            <p className="font-medium">Teslimat Adresi</p>
            <p className="text-sm text-gray-600">
              {order.address.street}, {order.address.city}
            </p>
          </div>

          <div className="mt-4">
            <p className="font-medium">Ödeme Bilgileri</p>
            <p className="text-sm text-gray-600">
              {order.payment.method} - {order.payment.status}
            </p>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <p className="font-bold">Toplam: {order.totalAmount} TL</p>
            <button className="text-blue-600 hover:underline">
              Detayları Görüntüle
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function getStatusColor(status: Order["status"]) {
  const colors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELED: "bg-red-100 text-red-800",
  };
  return colors[status];
}

function getStatusText(status: Order["status"]) {
  const texts = {
    PENDING: "Beklemede",
    PROCESSING: "İşleniyor",
    SHIPPED: "Kargoda",
    DELIVERED: "Teslim Edildi",
    CANCELED: "İptal Edildi",
  };
  return texts[status];
}