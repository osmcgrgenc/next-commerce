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
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar items={navigationItems} />
      
      <div className="pl-64">
        <AdminHeader title="Yönetim Paneli" />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
