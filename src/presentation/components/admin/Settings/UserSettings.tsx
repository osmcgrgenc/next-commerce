"use client";

import { useState } from "react";
import { DataTable } from "../../ui/DataTable";

interface UserRole {
  id: string;
  name: string;
  permissions: string[];
}

export function UserSettings() {
  const [roles, setRoles] = useState<UserRole[]>([
    {
      id: "1",
      name: "Yönetici",
      permissions: ["users.manage", "settings.manage", "orders.manage"],
    },
    {
      id: "2",
      name: "Editör",
      permissions: ["content.manage", "media.manage"],
    },
    {
      id: "3",
      name: "Müşteri Temsilcisi",
      permissions: ["orders.view", "customers.view"],
    },
  ]);

  const columns = [
    {
      header: "Rol Adı",
      accessor: "name",
    },
    {
      header: "İzinler",
      accessor: (role: UserRole) => (
        <div className="flex flex-wrap gap-1">
          {role.permissions.map((permission) => (
            <span
              key={permission}
              className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
            >
              {permission}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "İşlemler",
      accessor: (role: UserRole) => (
        <div className="flex justify-end space-x-2">
          <button className="text-indigo-600 hover:text-indigo-900">Düzenle</button>
          <button className="text-red-600 hover:text-red-900">Sil</button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Kullanıcı ve Rol Yönetimi</h3>
        <p className="mt-1 text-sm text-gray-500">
          Kullanıcı rollerini ve izinlerini yönetin
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-medium">Roller</h4>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Yeni Rol Ekle
            </button>
          </div>

          <DataTable
            columns={columns}
            data={roles}
          />
        </div>

        <div className="border-t p-6">
          <h4 className="font-medium mb-4">Varsayılan Ayarlar</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Yeni Kullanıcı Varsayılan Rolü
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="text-sm text-gray-700">
                Yeni kayıtlarda e-posta doğrulaması zorunlu
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 