"use client";

export function InformationSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Sistem Bilgileri</h3>
        <p className="mt-1 text-sm text-gray-500">
          Sistem durumu ve teknik detaylar
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500">PHP Sürümü</h4>
              <p className="mt-1">8.2.0</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">MySQL Sürümü</h4>
              <p className="mt-1">8.0.32</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Sunucu</h4>
              <p className="mt-1">Apache/2.4.54</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">İşletim Sistemi</h4>
              <p className="mt-1">Ubuntu 22.04 LTS</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-medium mb-4">Sistem Durumu</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">CPU Kullanımı</span>
                <div className="w-64 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">RAM Kullanımı</span>
                <div className="w-64 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Disk Kullanımı</span>
                <div className="w-64 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 