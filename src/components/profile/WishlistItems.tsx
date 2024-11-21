'use client';

import { Product } from '@/modules/products/domain/product';
import { HeartIcon } from '@/components/icons/HeartIcon';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/utils/price';

export function WishlistItems() {
  // Örnek veri, gerçek uygulamada API'den gelecek
  const wishlistProducts: Product[] = [];

  if (wishlistProducts.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <HeartIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">Favori listeniz boş.</p>
        <Link 
          href="/products" 
          className="text-purple-600 hover:underline mt-2 inline-block"
        >
          Ürünleri keşfedin
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlistProducts.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="relative aspect-square mb-4">
            <Image
              src={product.images?.[0] || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover rounded-md"
            />
            <button 
              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm"
              onClick={() => {/* Favorilerden kaldır */}}
            >
              <HeartIcon className="w-5 h-5 text-red-500" filled />
            </button>
          </div>
          
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold mb-2 hover:text-purple-600">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-lg font-bold text-purple-600">
            {formatPrice(product.price)}
          </p>
          
          <button 
            className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
            onClick={() => {/* Sepete ekle */}}
          >
            Sepete Ekle
          </button>
        </div>
      ))}
    </div>
  );
}