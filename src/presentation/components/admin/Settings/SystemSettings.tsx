"use client";

import { useState } from "react";

interface SystemSettings {
  siteName: string;
  siteUrl: string;
  adminEmail: string;
  timezone: string;
  maintenance: boolean;
  allowRegistration: boolean;
}

export function SystemSettings() {
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: "",
    siteUrl: "",
    adminEmail: "",
    timezone: "Europe/Istanbul",
    maintenance: false,
    allowRegistration: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Sistem Ayarları</h3>
        <p className="mt-1 text-sm text-gray-500">
          Temel sistem ayarlarını yapılandırın
        </p>
      </div>

      <form className="bg-white shadow rounded-lg">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Site Adı
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Site URL
              </label>
              <input
                type="url"
                value={settings.siteUrl}
                onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Admin E-posta
              </label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Zaman Dilimi
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="Europe/Istanbul">İstanbul (UTC+3)</option>
                {/* Diğer zaman dilimleri */}
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={settings.maintenance}
                onChange={(e) => setSettings({ ...settings, maintenance: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Bakım Modu
              </label>
            </div>
          </div>
        </div>
        <div className="px-6 py-3 bg-gray-50 flex justify-end rounded-b-lg">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
} 