"use client";

import { Category } from "@/domain/entities/Category";
import { Brand } from "@/domain/entities/Brand";
import { useState } from "react";
export function ProductFilters() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input
            type="text"
            placeholder="Ürün ara..."
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option value="">Tüm Kategoriler</option>
            {/* Kategoriler buraya gelecek */}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option value="">Tüm Markalar</option>
            {/* Markalar buraya gelecek */}
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500">
            <option value="">Stok Durumu</option>
            <option value="in_stock">Stokta Var</option>
            <option value="out_of_stock">Stokta Yok</option>
          </select>
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