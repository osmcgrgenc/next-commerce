'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// Örnek ürün verisi
const products = [
  {
    id: '1',
    name: 'Premium Deri Ceket',
    price: 2499.99,
    image: '/product-1.jpg',
  },
  // Diğer ürünler...
];

export default function BrandPage({ params }: { params: { id: string } }) {
    const [sortBy, setSortBy] = useState('newest');
  
    return (
      <div className="container mx-auto py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light capitalize">{params.id}</h1>
          
          <div className="flex items-center gap-4">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="newest">En Yeniler</option>
              <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
              <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
            </select>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtreler</SheetTitle>
                </SheetHeader>
                {/* Filtre içeriği */}
              </SheetContent>
            </Sheet>
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-100 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">
                {product.price.toLocaleString('tr-TR', {
                  style: 'currency',
                  currency: 'TRY'
                })}
              </p>
            </Link>
          ))}
        </div>
      </div>
    );
}