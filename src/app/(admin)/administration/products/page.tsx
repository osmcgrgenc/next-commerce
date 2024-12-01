"use client";

import { ProductList } from "@/presentation/components/admin/Products/ProductList";
import { ProductFilters } from "@/presentation/components/admin/Products/ProductFilters";
import { ProductServiceImpl } from "@/application/services/admin/ProductService";

export default function ProductsPage() {
  const productService = new ProductServiceImpl();

  return (
    <div className="space-y-6">
      <ProductFilters />
      <ProductList productService={productService} />
    </div>
  );
}
