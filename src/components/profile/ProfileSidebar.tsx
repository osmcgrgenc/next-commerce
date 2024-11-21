'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Profilim', href: '/profile' },
  { name: 'Siparişlerim', href: '/profile/orders' },
  { name: 'Adreslerim', href: '/profile/addresses' },
  { name: 'Favorilerim', href: '/profile/wishlist' },
  { name: 'Hesap Ayarları', href: '/profile/settings' },
];

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`block px-4 py-2 rounded-md ${
            pathname === item.href
              ? 'bg-purple-100 text-purple-700'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}