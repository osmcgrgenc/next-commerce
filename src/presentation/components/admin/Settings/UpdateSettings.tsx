"use client";

import { useState } from "react";

export function UpdateSettings() {
  const [checking, setChecking] = useState(false);
  const [currentVersion] = useState("1.0.0");

  const checkForUpdates = async () => {
    setChecking(true);
    // API çağrısı yapılacak
    setTimeout(() => setChecking(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Sistem Güncellemeleri</h3>
        <p className="mt-1 text-sm text-gray-500">
          Sistem güncellemelerini kontrol edin ve yönetin
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Mevcut Sürüm</h4>
              <p className="text-sm text-gray-500">v{currentVersion}</p>
            </div>
            <button
              onClick={checkForUpdates}
              disabled={checking}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {checking ? "Kontrol Ediliyor..." : "Güncellemeleri Kontrol Et"}
            </button>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-medium mb-4">Otomatik Güncelleme</h4>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="text-sm text-gray-700">
                Güvenlik güncellemelerini otomatik yükle
              </label>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-medium mb-4">Güncelleme Geçmişi</h4>
            <div className="space-y-4">
              {[
                { version: "1.0.0", date: "2024-03-15", type: "Major" },
                { version: "0.9.5", date: "2024-02-28", type: "Security" },
                { version: "0.9.0", date: "2024-02-01", type: "Minor" },
              ].map((update) => (
                <div
                  key={update.version}
                  className="flex justify-between items-center text-sm"
                >
                  <div>
                    <span className="font-medium">v{update.version}</span>
                    <span className="ml-2 text-gray-500">{update.date}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                      ${update.type === "Security" ? "bg-red-100 text-red-800" : ""}
                      ${update.type === "Major" ? "bg-blue-100 text-blue-800" : ""}
                      ${update.type === "Minor" ? "bg-green-100 text-green-800" : ""}`}
                  >
                    {update.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 