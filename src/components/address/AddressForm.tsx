'use client';

import { Address } from "@/modules/users/domain/Address";
import { useState } from "react";

interface AddressFormProps {
    initialAddress?: Address;
    onSubmit: (address: Omit<Address, 'id'>) => void;
    onCancel: () => void;
}

export function AddressForm({ initialAddress, onSubmit, onCancel }: AddressFormProps) {
  const [address, setAddress] = useState({
    title: initialAddress?.title || "",
    street: initialAddress?.street || "",
    city: initialAddress?.city || "",
    state: initialAddress?.state || "",
    postalCode: initialAddress?.postalCode || "",
    country: initialAddress?.country || "",
    isDefault: initialAddress?.isDefault || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(address);
  };
  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Adres Başlığı</label>
        <input
          type="text"
          value={address.title}
          onChange={(e) => setAddress({ ...address, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Sokak</label>
        <input
          type="text"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Şehir</label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Posta Kodu</label>
          <input
            type="text"
            value={address.postalCode}
            onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300"
            required
          />
        </div>
      </div>

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={address.isDefault}
            onChange={(e) => setAddress({ ...address, isDefault: e.target.checked })}
            className="rounded border-gray-300"
          />
          <span className="ml-2">Varsayılan adres olarak ayarla</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        Kaydet
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="w-full bg-gray-300 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-400"
      >
        İptal
      </button>
    </form>
  );
}