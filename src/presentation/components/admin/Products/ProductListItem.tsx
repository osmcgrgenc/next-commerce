"use client";

import { Product } from "@/domain/entities/Product";
import Image from "next/image";

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductListItem({ product, onEdit, onDelete }: Props) {
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <Image
              className="h-10 w-10 rounded object-cover"
              src={primaryImage.url}
              alt={primaryImage.alt}
              width={40}
              height={40}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">{product.brand.name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.category.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ₺{product.price.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.stock}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {product.isActive ? 'Aktif' : 'Pasif'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button 
          onClick={() => onEdit(product)}
          className="text-indigo-600 hover:text-indigo-900 mr-4"
        >
          Düzenle
        </button>
        <button 
          onClick={() => onDelete(product)}
          className="text-red-600 hover:text-red-900"
        >
          Sil
        </button>
      </td>
    </tr>
  );
} 