export type Category = {
    id: number; // Kategorinin benzersiz kimliği
    name: string; // Kategori adı
    parentCategory?: Category | null; // Üst kategori (isteğe bağlı)
}