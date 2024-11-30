"use client";

import { UsersIcon, ShoppingBagIcon, CurrencyDollarIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const stats = [
  {
    name: "Toplam Müşteri",
    value: "2,543",
    icon: UsersIcon,
    change: "+12.5%",
  },
  {
    name: "Toplam Ürün",
    value: "1,234",
    icon: ShoppingBagIcon,
    change: "+8.2%",
  },
  {
    name: "Toplam Gelir",
    value: "₺156,789",
    icon: CurrencyDollarIcon,
    change: "+15.3%",
  },
  {
    name: "Ortalama Sipariş",
    value: "₺245",
    icon: ChartBarIcon,
    change: "+5.7%",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <stat.icon className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm font-medium text-green-600">{stat.change}</span>
            <span className="text-sm text-gray-500 ml-2">geçen aydan</span>
          </div>
        </div>
      ))}
    </div>
  );
} 