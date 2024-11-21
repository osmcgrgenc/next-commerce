export type Address = {
    id: number; // Adres ID'si
    title: string; // Adres başlığı (ör. Ev, İş)
    street: string; // Sokak adı
    city: string; // Şehir
    state?: string; // Eyalet (isteğe bağlı)
    postalCode: string; // Posta kodu
    country: string; // Ülke
    isDefault: boolean; // Varsayılan adres mi?
  };