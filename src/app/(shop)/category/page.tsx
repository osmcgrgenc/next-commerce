'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/components/ui/main-nav';

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-light mb-8">Kategoriler</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.entries(categories).map(([category, { href }]) => (
          <Link
            key={category}
            href={href}
            className="group relative h-[400px] overflow-hidden bg-neutral-100"
          >
            <Image
              src={`/categories/${category.toLowerCase()}.jpg`}
              alt={category}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h2 className="text-2xl font-light tracking-wider">{category}</h2>
              <span className="mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Koleksiyonu Keşfet
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

