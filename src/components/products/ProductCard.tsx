import { Product } from "@/modules/products/domain/product";
import { ProductService } from "@/modules/products/services/product.service";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  discountRate?: number;
}

export function ProductCard({ product, discountRate }: ProductCardProps) {
  const discountedPrice = discountRate 
    ? ProductService.calculateDiscountPrice(product, discountRate)
    : null;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        {product.images?.[0] && (
          <div className="relative h-48">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-600 text-sm">{product.brand.name}</p>
          <div className="mt-2">
            {discountedPrice ? (
              <>
                <span className="line-through text-gray-400">{product.price} TL</span>
                <span className="ml-2 text-red-600 font-bold">{discountedPrice} TL</span>
              </>
            ) : (
              <span className="font-bold">{product.price} TL</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}