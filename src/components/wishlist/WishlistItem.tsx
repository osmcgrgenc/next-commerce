import { Product } from "@/modules/products/domain/product";
import Image from "next/image";

interface WishlistItemProps {
  product: Product;
  onRemove: (productId: number) => void;
  onAddToCart: (product: Product) => void;
}

export function WishlistItem({ product, onRemove, onAddToCart }: WishlistItemProps) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      {product.images?.[0] && (
        <div className="relative w-24 h-24">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
      
      <div className="flex-grow">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-gray-600">{product.brand.name}</p>
        <p className="font-bold mt-1">{product.price} TL</p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Sepete Ekle
        </button>
        
        <button
          onClick={() => onRemove(product.id)}
          className="text-red-600 hover:underline"
        >
          Kaldır
        </button>
      </div>
    </div>
  );
}