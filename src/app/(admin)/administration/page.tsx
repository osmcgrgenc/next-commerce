"use client";

import { DashboardStats } from "@/presentation/components/admin/Dashboard/DashboardStats";
import { RecentOrders } from "@/presentation/components/admin/Dashboard/RecentOrders";
import { SalesChart } from "@/presentation/components/admin/Dashboard/SalesChart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <RecentOrders />
      </div>
    </div>
  );
}
