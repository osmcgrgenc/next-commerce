import { Brand } from "./Brand";
import { Category } from "./Category";

type VariationOption = {
    id: number; // Özelliğin benzersiz kimliği (ör. renk kırmızı için "red")
    name: string; // Özellik adı (ör. "Kırmızı")
};

type Variation = {
    id: number; // Varyasyon kimliği (ör. "color" ya da "memory")
    name: string; // Varyasyon adı (ör. "Renk" ya da "Hafıza")
    options: VariationOption[]; // Bu varyasyona ait tüm seçenekler
};

type ProductBase = {
    id: number; // Ürün benzersiz kimliği
    name: string; // Ürün adı
    price: number; // Ürün fiyatı
    description?: string; // Ürün açıklaması (isteğe bağlı)
    images?: string[]; // Ürün görselleri
    category: Category; // Ürünün kategorisi
    brand: Brand; // Ürünün markası
    stock: number; // Ürün stok sayısı
};

type ProductWithVariations = ProductBase & {
    variations: Variation[]; // Ürüne ait varyasyonlar
};

type ProductWithoutVariations = ProductBase & {
    variations?: never; // Varyasyonsuz ürünlerde varyasyon bulunmaz
};

export type Product = ProductWithVariations | ProductWithoutVariations;
