import { Product } from '@/modules/products/domain/product';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/utils/price';

export function WishlistPreview() {
  // Örnek veri, gerçek uygulamada API'den gelecek
  const wishlistProducts: Product[] = [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Favori Ürünlerim</h2>
        <Link 
          href="/profile/wishlist"
          className="text-purple-600 hover:underline text-sm"
        >
          Tümünü Gör
        </Link>
      </div>

      {wishlistProducts.length === 0 ? (
        <p className="text-gray-600 text-center py-4">
          Favori listenizde ürün bulunmuyor.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {wishlistProducts.slice(0, 3).map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="relative aspect-square mb-2">
                <Image
                  src={product.images?.[0] || '/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md group-hover:opacity-75 transition-opacity"
                />
              </div>
              
              <h3 className="font-medium text-sm group-hover:text-purple-600 transition-colors">
                {product.name}
              </h3>
              
              <p className="text-purple-600 font-semibold">
                {formatPrice(product.price)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 