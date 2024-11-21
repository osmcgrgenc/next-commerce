'use client';

import { useState } from 'react';
import { Address } from '@/modules/users/domain/Address';
import { AddressForm } from './AddressForm';

interface AddressListProps {
  addresses: Address[];
  onAddAddress: (address: Omit<Address, 'id'>) => void;
  onUpdateAddress: (id: number, address: Omit<Address, 'id'>) => void;
  onDeleteAddress: (id: number) => void;
  onSetDefault: (id: number) => void;
}

export function AddressList({
  addresses,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
  onSetDefault,
}: AddressListProps) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmitNew = (address: Omit<Address, 'id'>) => {
    onAddAddress(address);
    setIsAddingNew(false);
  };

  const handleSubmitEdit = (address: Omit<Address, 'id'>) => {
    if (editingId !== null) {
      onUpdateAddress(editingId, address);
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Adreslerim</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Yeni Adres Ekle
        </button>
      </div>

      {isAddingNew && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-medium mb-4">Yeni Adres</h3>
          <AddressForm
            onSubmit={handleSubmitNew}
            onCancel={() => setIsAddingNew(false)}
          />
        </div>
      )}

      <div className="grid gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            {editingId === address.id ? (
              <div className="bg-gray-50 p-4 rounded-md">
                <AddressForm
                  initialAddress={address}
                  onSubmit={handleSubmitEdit}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{address.title}</h3>
                    {address.isDefault && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Varsayılan
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">
                    {address.street}
                    <br />
                    {address.city}, {address.state} {address.postalCode}
                    <br />
                    {address.country}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setEditingId(address.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => onDeleteAddress(address.id)}
                    className="text-red-600 hover:underline"
                  >
                    Sil
                  </button>
                  {!address.isDefault && (
                    <button
                      onClick={() => onSetDefault(address.id)}
                      className="text-gray-600 hover:underline"
                    >
                      Varsayılan Yap
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}