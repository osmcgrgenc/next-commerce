import { Address } from "./Address";
import { Order } from "./Order";
import { Wishlist } from "./Wishlist";

export type AdminPermission = 
    | "MANAGE_USERS"
    | "MANAGE_PRODUCTS"
    | "VIEW_REPORTS"
    | "MANAGE_ORDERS"
    | "MANAGE_CATEGORIES";

export interface AdminActivityLog {
    id: string;
    activity: string;
    createdAt: Date;
    details?: string;
}

export interface BaseUser {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt?: Date;
    profileImageUrl?: string;
}

export interface RegularUser extends BaseUser {
    role: "USER";
    addresses?: Address[];
    orders?: Order[];
    wishlist?: Wishlist;
}

export interface AdminUser extends BaseUser {
    role: "ADMIN";
    permissions: AdminPermission[];
    managedUsers?: string[];
    activityLog?: AdminActivityLog[];
}

export type User = RegularUser | AdminUser;
