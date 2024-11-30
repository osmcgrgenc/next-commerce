"use client";

import { Order } from "@/domain/entities/Order";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { DataTable } from "../../ui/DataTable";
import { useMemo } from "react";

export function OrderList() {
  const orders: Order[] = []; // API'den gelecek
  
  const columns = useMemo(() => [
    {
      header: "Sipariş No",
      accessor: (order: Order) => `#${order.id}`,
    },
    {
      header: "Müşteri",
      accessor: (order: Order) => order.userId,
    },
    {
      header: "Tutar",
      accessor: (order: Order) => 
        new Intl.NumberFormat('tr-TR', { 
          style: 'currency', 
          currency: 'TRY' 
        }).format(order.totalAmount),
    },
    {
      header: "Durum",
      accessor: (order: Order) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full
          ${order.status === "PENDING" ? "bg-yellow-100 text-yellow-800" : ""}
          ${order.status === "DELIVERED" ? "bg-green-100 text-green-800" : ""}`
        }>
          {order.status}
        </span>
      ),
    },
    {
      header: "Tarih",
      accessor: (order: Order) => 
        format(order.createdAt, 'dd MMM yyyy', { locale: tr }),
    },
    {
      header: "İşlemler",
      align: "right" as const,
      accessor: (order: Order) => (
        <div className="space-x-2">
          <button className="text-indigo-600 hover:text-indigo-900">
            Detay
          </button>
          <button className="text-red-600 hover:text-red-900">
            İptal
          </button>
        </div>
      ),
    },
  ], []);

  return <DataTable columns={columns} data={orders} />;
} 