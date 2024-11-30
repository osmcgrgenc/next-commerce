"use client";

import { ProductList } from "@/presentation/components/admin/Products/ProductList";
import { ProductFilters } from "@/presentation/components/admin/Products/ProductFilters";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <ProductFilters />
      <ProductList />
    </div>
  );
}
