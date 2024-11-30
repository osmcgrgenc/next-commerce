"use client";

import { AdminMenuItem } from "@/domain/types/admin/AdminMenuItem";
import Link from "next/link";
import * as HeroIcons from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props {
  item: AdminMenuItem;
  depth?: number;
}

export function AdminSidebarItem({ item, depth = 0 }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = HeroIcons[item.iconName as keyof typeof HeroIcons];
  const hasSubItems = item.children && item.children.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    if (hasSubItems) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div>
      <Link
        href={item.href}
        onClick={handleClick}
        className={`
          flex items-center px-4 py-3 text-gray-600 transition-colors rounded-lg 
          hover:bg-gray-50 hover:text-indigo-600 group
          ${depth > 0 ? 'ml-6' : ''}
        `}
      >
        <div className="flex items-center flex-1">
          {Icon && <Icon className="w-6 h-6 mr-3" />}
          <span className="font-medium">{item.name}</span>
        </div>
        {hasSubItems && (
          <div className="ml-auto">
            {isExpanded ? (
              <ChevronDownIcon className="w-5 h-5" />
            ) : (
              <ChevronRightIcon className="w-5 h-5" />
            )}
          </div>
        )}
      </Link>

      {hasSubItems && isExpanded && (
        <div className="mt-1">
          {item.children?.map((subItem) => (
            <AdminSidebarItem
              key={subItem.name}
              item={subItem}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
} 