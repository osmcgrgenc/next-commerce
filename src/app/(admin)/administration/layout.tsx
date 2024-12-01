import { AdminNavigationService } from "@/application/services/admin/AdminNavigationService";
import { AdminSidebar } from "@/presentation/components/admin/Sidebar/AdminSidebar";
import { AdminHeader } from "@/presentation/components/admin/Header/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationService = new AdminNavigationService();
  const navigationItems = navigationService.getNavigationItems();

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 fixed inset-y-0 left-0 bg-white shadow-sm z-30">
        <AdminSidebar items={navigationItems} />
      </aside>

      <div className="flex-1 ml-64">
        <header className="sticky top-0 z-20 bg-white shadow-sm">
          <AdminHeader title="Yönetim Paneli" />
        </header>

        <main className="p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
