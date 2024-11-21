import { OrderList } from '@/components/profile/OrderList';

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Siparişlerim</h1>
      <OrderList />
    </div>
  );
}