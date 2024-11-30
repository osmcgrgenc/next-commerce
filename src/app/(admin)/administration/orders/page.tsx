 "use client";

import { OrderList } from "@/presentation/components/admin/Orders/OrderList";
import { OrderFilters } from "@/presentation/components/admin/Orders/OrderFilters";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <OrderFilters />
      <OrderList />
    </div>
  );
}