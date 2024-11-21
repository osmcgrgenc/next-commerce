import Image from 'next/image';
import { Product } from "@/modules/products/domain/product";
import { ProductRepository } from "@/modules/products/repositories/product.repository";

export default async function ProductsPage() {
  const products = await ProductRepository.getProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ürünler</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: Product) => (
          <div key={product.id} className="border rounded-lg p-4">
            {product.images?.[0] && (
              <Image 
                src={product.images[0]} 
                alt={product.name} 
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
            )}
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.price} TL</p>
          </div>
        ))}
      </div>
    </div>
  );
}