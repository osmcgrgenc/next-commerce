"use client";

import { CategoryListItem } from "@/domain/entities/Category";
import { PaginatedResult } from "@/domain/types/common";
import Link from "next/link";

interface CategoryListProps {
  categories: PaginatedResult<CategoryListItem>;
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori Adı
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Üst Kategori
                </th>
                <th scope="col" className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.items.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {category.parentId ? "Alt Kategori" : "Ana Kategori"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/admin/categories/edit/${category.id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Düzenle
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Toplam <span className="font-medium">{categories.total}</span> kategori
          </div>
          {/* Sayfalama buraya eklenecek */}
        </div>
      </div>
    </div>
  );
} 