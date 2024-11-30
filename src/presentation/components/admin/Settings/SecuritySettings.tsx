"use client";

export function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Güvenlik Ayarları</h3>
        <p className="mt-1 text-sm text-gray-500">
          Hesap güvenliği ve oturum ayarlarını yönetin
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-medium">İki Faktörlü Doğrulama</h4>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Hesabınızı daha güvenli hale getirmek için iki faktörlü doğrulamayı etkinleştirin
                </p>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Etkinleştir
              </button>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h4 className="font-medium">Oturum Yönetimi</h4>
            <div className="mt-4">
              <button className="text-red-600 hover:text-red-900">
                Tüm Oturumları Sonlandır
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 