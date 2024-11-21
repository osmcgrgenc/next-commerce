'use client';

import { useEffect, useState } from 'react';
import { Address } from '@/modules/users/domain/Address';
import { PaymentInfo } from '@/modules/users/domain/Order';

type CheckoutFormProps = {
  currentStep: 'address' | 'payment' | 'review';
  selectedAddress: Address | null;
  paymentInfo: Partial<PaymentInfo>;
  onAddressSubmit: (address: Address) => void;
  onPaymentSubmit: (payment: Partial<PaymentInfo>) => void;
  onPlaceOrder: () => void;
};

export function CheckoutForm({
  currentStep,
  selectedAddress,
  paymentInfo,
  onAddressSubmit,
  onPaymentSubmit,
  onPlaceOrder
}: CheckoutFormProps) {
  const [addresses, setAddresses] = useState<Address[]>([]); // API'den gelecek
  useEffect(() => {
    setAddresses([]);
  }, []);

  return (
    <div className="space-y-8">
      {/* Adres Seçimi */}
      <div className={`${currentStep !== 'address' && 'opacity-50'}`}>
        <h2 className="text-xl font-semibold mb-4">1. Teslimat Adresi</h2>
        {currentStep === 'address' ? (
          addresses.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {addresses.map((address) => (
                <button
                  key={address.id}
                  onClick={() => onAddressSubmit(address)}
                  className="p-4 border rounded-lg text-left hover:border-purple-600"
                >
                  <h3 className="font-medium">{address.title}</h3>
                  <p className="text-sm text-gray-600">
                    {address.street}, {address.city}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Adres Başlığı</label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sokak/Cadde</label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Şehir</label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
              <button 
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
              >
                Adresi Kaydet
              </button>
            </form>
          )
        ) : (
          selectedAddress && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium">{selectedAddress.title}</h3>
              <p className="text-sm text-gray-600">
                {selectedAddress.street}, {selectedAddress.city}
              </p>
            </div>
          )
        )}
      </div>

      {/* Ödeme Bilgileri */}
      <div className={`${currentStep !== 'payment' && 'opacity-50'}`}>
        <h2 className="text-xl font-semibold mb-4">2. Ödeme Bilgileri</h2>
        {currentStep === 'payment' && (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              onPaymentSubmit({
                method: 'CREDIT_CARD',
                status: 'PENDING'
              });
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Kart Numarası
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="**** **** **** ****"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Son Kullanma
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="AA/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="***"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              Devam Et
            </button>
          </form>
        )}
      </div>

      {/* Sipariş Özeti */}
      <div className={`${currentStep !== 'review' && 'opacity-50'}`}>
        <h2 className="text-xl font-semibold mb-4">3. Sipariş Onayı</h2>
        {currentStep === 'review' && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg space-y-2">
              <p>Tüm bilgilerinizi kontrol ettikten sonra siparişi onaylayabilirsiniz.</p>
              {paymentInfo.method && (
                <p className="text-sm text-gray-600">
                  Ödeme Yöntemi: {paymentInfo.method === 'CREDIT_CARD' ? 'Kredi Kartı' : paymentInfo.method}
                </p>
              )}
            </div>
            <button
              onClick={onPlaceOrder}
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              Siparişi Onayla
            </button>
          </div>
        )}
      </div>
    </div>
  );
}