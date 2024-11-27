import { Product } from "./Product";
import { User } from "./User";

export type Wishlist = {
    id: number; // Favori liste ID'si
    products: Product[]; // Favori ürünler
    user: User;
};