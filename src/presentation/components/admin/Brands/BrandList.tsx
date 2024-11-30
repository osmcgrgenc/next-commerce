"use client";

import { Brand } from "@/domain/entities/Brand";
import Image from "next/image";
import { useState } from "react";

export function BrandList() {
  const [brands, setBrands] = useState<Brand[]>([]);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Markalar</h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Yeni Marka
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div key={brand.id} className="border rounded-lg p-4">
              <div className="flex items-center space-x-4">
                {brand.logoUrl && (
                  <Image
                    src={brand.logoUrl}
                    alt={brand.name}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                )}
                <div>
                  <h3 className="font-medium">{brand.name}</h3>
                  <p className="text-sm text-gray-500">{brand.description}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="text-indigo-600 hover:text-indigo-900">
                  Düzenle
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 