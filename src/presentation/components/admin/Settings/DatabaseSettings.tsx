"use client";

export function DatabaseSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Veritabanı Ayarları</h3>
        <p className="mt-1 text-sm text-gray-500">
          Veritabanı bağlantı ve yedekleme ayarları
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h4 className="font-medium mb-4">Yedekleme Planı</h4>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="daily">Günlük</option>
                <option value="weekly">Haftalık</option>
                <option value="monthly">Aylık</option>
              </select>
            </div>

            <div>
              <h4 className="font-medium mb-4">Son Yedeklemeler</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-3">
                  {[1, 2, 3].map((backup) => (
                    <li key={backup} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Yedek_{backup}.sql - {new Date().toLocaleDateString()}
                      </span>
                      <button className="text-indigo-600 hover:text-indigo-900 text-sm">
                        İndir
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                Manuel Yedek Al
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 