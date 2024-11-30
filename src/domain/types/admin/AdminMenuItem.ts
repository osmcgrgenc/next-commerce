export interface AdminMenuItem {
  name: string;
  href: string;
  iconName: string;
  children?: AdminMenuItem[];
} 