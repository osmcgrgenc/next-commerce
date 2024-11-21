'use client';

import { useState } from 'react';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Cart } from '@/modules/cart/domain/cart';
import { Address } from '@/modules/users/domain/Address';
import { PaymentInfo } from '@/modules/users/domain/Order';

type CheckoutStep = 'address' | 'payment' | 'review';

export function CheckoutContainer() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<Partial<PaymentInfo>>({});
  
  // Örnek cart verisi
  const cart: Cart = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0
  };

  const handleAddressSubmit = (address: Address) => {
    setSelectedAddress(address);
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (payment: Partial<PaymentInfo>) => {
    setPaymentInfo(payment);
    setCurrentStep('review');
  };

  const handlePlaceOrder = async () => {
    // Sipariş oluşturma API çağrısı yapılacak
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow">
        <CheckoutForm
          currentStep={currentStep}
          selectedAddress={selectedAddress}
          paymentInfo={paymentInfo}
          onAddressSubmit={handleAddressSubmit}
          onPaymentSubmit={handlePaymentSubmit}
          onPlaceOrder={handlePlaceOrder}
        />
      </div>
      <div className="lg:w-80">
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
}