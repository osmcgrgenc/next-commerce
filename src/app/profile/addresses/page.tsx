'use client';

import { AddressList } from '@/components/address/AddressList';
import { Address } from '@/modules/users/domain/Address';
import { useState } from 'react';

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>([]);

    const handleAddAddress = async (newAddress: Omit<Address, 'id'>) => {
        // API çağrısı yapılacak
        const fakeId = Math.random();
        setAddresses([...addresses, { ...newAddress, id: fakeId }]);
      };
    
      const handleDeleteAddress = async (addressId: number) => {
        // API çağrısı yapılacak
        setAddresses(addresses.filter(address => address.id !== addressId));
      };
    
      const handleSetDefault = async (addressId: number) => {
        // API çağrısı yapılacak
        setAddresses(addresses.map(address => ({
          ...address,
          isDefault: address.id === addressId
        })));
      };
    
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Adreslerim</h1>
      <AddressList addresses={addresses} 
      onAddAddress={handleAddAddress} 
      onUpdateAddress={() => {}} 
      onDeleteAddress={handleDeleteAddress} 
      onSetDefault={handleSetDefault} />
    </div>
  );
}