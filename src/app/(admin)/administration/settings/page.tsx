"use client";

import { SettingsMenu } from "@/presentation/components/admin/Settings/SettingsMenu";

export default function SettingsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SettingsMenu />
      <div className="md:col-span-2">
        <h1 className="text-2xl font-semibold mb-6">Genel Ayarlar</h1>
        {/* Ayarlar içeriği */}
      </div>
    </div>
  );
}
