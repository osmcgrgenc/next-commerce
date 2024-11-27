'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SubCategory {
  title: string;
  href: string;
  items?: string[];
}

export const categories = {
  'Yeni Gelenler': {
    href: '/new-arrivals',
    subCategories: [
      { title: 'Son Eklenenler', href: '/new-arrivals/latest' },
      { title: 'Çok Satanlar', href: '/new-arrivals/bestsellers' },
      { title: 'Trend Ürünler', href: '/new-arrivals/trending' },
    ]
  },
  'Kadın': {
    href: '/women',
    subCategories: [
      { title: 'Elbiseler', href: '/women/dresses' },
      { title: 'Üst Giyim', href: '/women/tops', 
        items: ['Bluzlar', 'Tişörtler', 'Kazaklar'] },
      { title: 'Alt Giyim', href: '/women/bottoms',
        items: ['Pantolonlar', 'Etekler', 'Şortlar'] },
      { title: 'Dış Giyim', href: '/women/outerwear',
        items: ['Montlar', 'Ceketler', 'Kabanlar'] },
    ]
  },
  'Erkek': {
    href: '/men',
    subCategories: [
      { title: 'Üst Giyim', href: '/men/tops',
        items: ['Gömlekler', 'Tişörtler', 'Kazaklar'] },
      { title: 'Alt Giyim', href: '/men/bottoms',
        items: ['Pantolonlar', 'Şortlar'] },
      { title: 'Dış Giyim', href: '/men/outerwear',
        items: ['Montlar', 'Ceketler', 'Kabanlar'] },
    ]
  },
  'Aksesuar': {
    href: '/accessories',
    subCategories: [
      { title: 'Çantalar', href: '/accessories/bags' },
      { title: 'Takılar', href: '/accessories/jewelry' },
      { title: 'Saatler', href: '/accessories/watches' },
      { title: 'Kemerler', href: '/accessories/belts' },
    ]
  }
};

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium hover:text-primary"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        Kategoriler
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 w-screen bg-white shadow-lg border-t"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 gap-8">
              {Object.entries(categories).map(([category, { href, subCategories }]) => (
                <div key={category} className="space-y-4">
                  <Link
                    href={href}
                    className="text-lg font-medium text-foreground hover:text-primary"
                  >
                    {category}
                  </Link>
                  <ul className="space-y-2">
                    {subCategories.map((subCategory: SubCategory) => (
                      <li key={subCategory.title} className="group">
                        <Link
                          href={subCategory.href}
                          className="block text-sm font-medium text-muted-foreground group-hover:text-primary"
                        >
                          {subCategory.title}
                        </Link>
                        {subCategory.items && (
                          <ul className="mt-1 space-y-1">
                            {subCategory.items.map((item: string) => (
                              <li key={item}>
                                <Link
                                  href={`${subCategory.href}/${item.toLowerCase()}`}
                                  className="block text-sm text-muted-foreground/75 hover:text-primary pl-2"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 