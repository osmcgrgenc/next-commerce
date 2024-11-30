import { AdminMenuItem } from "@/domain/types/admin/AdminMenuItem";

export class AdminNavigationService {
  getNavigationItems(): AdminMenuItem[] {
    return [
      { name: "Dashboard", href: "/administration", iconName: "HomeIcon" },
      { name: "Müşteriler", href: "/administration/customers", iconName: "UsersIcon" },
      { name: "Ürünler", href: "/administration/products", iconName: "ShoppingBagIcon" },
      { name: "Siparişler", href: "/administration/orders", iconName: "ClipboardDocumentListIcon" },
      { name: "Kategoriler", href: "/administration/categories", iconName: "TagIcon" },
      { name: "Markalar", href: "/administration/brands", iconName: "ShoppingBagIcon" },
      { name: "Bloglar", href: "/administration/blogs", iconName: "ClipboardDocumentListIcon" },
      { name: "Sayfalar", href: "/administration/pages", iconName: "ClipboardDocumentListIcon" },
      { name: "Raporlar", href: "/administration/reports", iconName: "ChartBarIcon" },
      /* Ayarlar Menüsü */
      { name: "Ayarlar", href: "/administration/settings", iconName: "CogIcon", children: [
        { name: "Genel", href: "/administration/settings/general", iconName: "CogIcon" },
        { name: "Sosyal Medya", href: "/administration/settings/social-media", iconName: "ShareIcon" },
        { name: "E-posta", href: "/administration/settings/email", iconName: "EnvelopeIcon" },
        { name: "SMS", href: "/administration/settings/sms", iconName: "ChatBubbleBottomCenterTextIcon" },
        { name: "Bildirimler", href: "/administration/settings/notifications", iconName: "BellIcon" },
        { name: "Güvenlik", href: "/administration/settings/security", iconName: "ShieldCheckIcon" },
        { name: "Bilgiler", href: "/administration/settings/information", iconName: "InformationCircleIcon" },
        { name: "Güncelleme", href: "/administration/settings/update", iconName: "ArrowPathIcon" },
        { name: "Veritabanı", href: "/administration/settings/database", iconName: "DatabaseIcon" },
        { name: "Günlükler", href: "/administration/settings/logs", iconName: "DocumentTextIcon" },
        { name: "Kullanıcılar", href: "/administration/settings/users", iconName: "UsersIcon" },
      ] },
    ];
  }
} 