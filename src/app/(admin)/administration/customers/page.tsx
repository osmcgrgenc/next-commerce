"use client";

import { CustomerList } from "@/presentation/components/admin/Customers/CustomerList";
import { CustomerFilters } from "@/presentation/components/admin/Customers/CustomerFilters";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <CustomerFilters />
      <CustomerList />
    </div>
  );
}
