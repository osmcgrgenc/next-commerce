"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  { name: "Genel", href: "/administration/settings" },
  { name: "Bildirimler", href: "/administration/settings/notifications" },
  { name: "Güvenlik", href: "/administration/settings/security" },
  { name: "Bilgiler", href: "/administration/settings/information" },
  { name: "Güncelleme", href: "/administration/settings/update" },
  { name: "Veritabanı", href: "/administration/settings/database" },
  { name: "Günlükler", href: "/administration/settings/logs" },
  { name: "Kullanıcılar", href: "/administration/settings/users" },
];

export function SettingsMenu() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-3 py-2 rounded-md text-sm font-medium ${
              isActive
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-900 hover:bg-gray-50"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
} 