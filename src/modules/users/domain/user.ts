import { Address } from "./Address";
import { Order } from "./Order";
import { Wishlist } from "./Wishlist";

// Ortak Özellikler
type BaseUser = {
    id: number; // Kullanıcı ID'si
    name: string; // Kullanıcı adı
    email: string; // E-posta adresi
    passwordHash: string; // Şifre (hashlenmiş)
    isActive: boolean; // Kullanıcı aktif mi?
    createdAt: Date; // Hesap oluşturulma tarihi
    updatedAt?: Date; // Hesap güncellenme tarihi (isteğe bağlı)
    profileImageUrl?: string; // Profil resmi (isteğe bağlı)
  };
  
  // Kullanıcı için detaylar
  type RegularUser = BaseUser & {
    role: "USER"; // Kullanıcı rolü (sabit USER)
    addresses?: Address[]; // Kullanıcının adresleri
    orders?: Order[]; // Kullanıcının siparişleri
    wishlist?: Wishlist; // Kullanıcının favori ürünleri
  };
  
  // Admin için detaylar
  type AdminUser = BaseUser & {
    role: "ADMIN"; // Admin rolü (sabit ADMIN)
    permissions: AdminPermission[]; // Admin izinleri
    managedUsers?: string[]; // Yönetilen kullanıcıların ID'leri
    activityLog?: AdminActivityLog[]; // Admin aktiviteleri
  };

  type AdminPermission = 
  | "MANAGE_USERS" // Kullanıcıları yönetme
  | "MANAGE_PRODUCTS" // Ürünleri yönetme
  | "VIEW_REPORTS" // Raporları görüntüleme
  | "MANAGE_ORDERS" // Siparişleri yönetme
  | "MANAGE_CATEGORIES"; // Kategorileri yönetme

// Admin Aktivite Logları
type AdminActivityLog = {
  id: number; // Aktivite ID'si
  activity: string; // Yapılan aktivite (ör. "Kullanıcı oluşturdu")
  createdAt: Date; // Aktivitenin zamanı
  details?: string; // Detaylar (isteğe bağlı)
};

// User ve Admin birleşik tip
export type User = RegularUser | AdminUser;
