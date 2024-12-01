"use client";

import { Product } from "@/domain/entities/Product";
import { ProductService } from "@/application/services/admin/ProductService";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useMemo } from "react";
import { BaseList } from "../../common/BaseList";
import { useRouter } from "next/navigation";

interface ProductListProps {
  productService: ProductService;
}

export function ProductList({ productService }: ProductListProps) {
  const router = useRouter();

  const columns = useMemo(() => [
    {
      header: "Ürün Adı",
      accessor: (product: Product) => (
        <div className="flex items-center">
          {product.images.length > 0 && (
            <img
              src={product.images[0].url}
              alt={product.images[0].alt}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
          )}
          <span>{product.name}</span>
        </div>
      ),
    },
    {
      header: "Kategori",
      accessor: (product: Product) => product.category.name,
    },
    {
      header: "Marka",
      accessor: (product: Product) => product.brand.name,
    },
    {
      header: "Fiyat",
      accessor: (product: Product) => (
        <span className="font-medium">
          {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })
            .format(product.price)}
        </span>
      ),
    },
    {
      header: "Stok",
      accessor: (product: Product) => product.stock,
    },
    {
      header: "Durum",
      accessor: (product: Product) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full
          ${product.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`
        }>
          {product.isActive ? "Aktif" : "Pasif"}
        </span>
      ),
    },
    {
      header: "İşlemler",
      align: "right" as const,
      accessor: (product: Product) => (
        <div className="space-x-2">
          <button
            onClick={() => router.push(`/admin/products/${product.id}/edit`)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Düzenle
          </button>
          <button className="text-red-600 hover:text-red-900">
            Sil
          </button>
        </div>
      ),
    },
  ], [router]);

  return (
    <BaseList<Product>
      service={productService}
      columns={columns}
      title="Ürünler"
      createButtonText="Yeni Ürün"
      onCreateClick={() => router.push("/admin/products/create")}
    />
  );
} 