"use client";

export function LogSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Sistem Günlükleri</h3>
        <p className="mt-1 text-sm text-gray-500">
          Sistem ve kullanıcı aktivite günlüklerini görüntüleyin
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <select className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="all">Tüm Günlükler</option>
                <option value="error">Hatalar</option>
                <option value="warning">Uyarılar</option>
                <option value="info">Bilgiler</option>
              </select>
              <input
                type="date"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <button className="text-indigo-600 hover:text-indigo-900">
              Günlükleri İndir
            </button>
          </div>

          <div className="overflow-hidden rounded-lg border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Seviye
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Mesaj
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Log kayıtları buraya gelecek */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 