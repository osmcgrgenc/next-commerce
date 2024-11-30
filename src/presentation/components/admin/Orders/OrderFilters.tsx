"use client";

import { OrderStatus } from "@/domain/entities/Order";

export function OrderFilters() {
  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input
            type="text"
            placeholder="Sipariş ID veya Müşteri..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option value="">Tüm Durumlar</option>
            <option value="PENDING">Beklemede</option>
            <option value="PROCESSING">İşleniyor</option>
            <option value="SHIPPED">Kargoda</option>
            <option value="DELIVERED">Teslim Edildi</option>
            <option value="CANCELED">İptal Edildi</option>
          </select>
        </div>

        <div>
          <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option value="">Ödeme Durumu</option>
            <option value="SUCCESS">Ödendi</option>
            <option value="PENDING">Beklemede</option>
            <option value="FAILED">Başarısız</option>
          </select>
        </div>

        <div>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          Filtrele
        </button>
        <button className="text-gray-600 hover:text-gray-900">
          Filtreleri Temizle
        </button>
      </div>
    </div>
  );
} 