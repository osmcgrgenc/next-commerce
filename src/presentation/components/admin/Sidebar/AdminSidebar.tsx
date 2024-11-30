import { AdminMenuItem } from "@/domain/types/admin/AdminMenuItem";
import { AdminSidebarItem } from "./AdminSidebarItem";
import { AdminUserProfile } from "../UserProfile/AdminUserProfile";

interface Props {
  items: AdminMenuItem[];
}

export function AdminSidebar({ items }: Props) {
  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 px-4 bg-indigo-600">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {items.map((item) => (
            <AdminSidebarItem key={item.name} item={item} />
          ))}
        </nav>

        <AdminUserProfile />
      </div>
    </div>
  );
} 