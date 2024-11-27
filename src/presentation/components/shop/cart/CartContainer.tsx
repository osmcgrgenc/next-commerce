'use client';

import { useState } from 'react';
import { CartList } from './CartList';
import { CartSummary } from './CartSummary';
import { Cart } from '@/domain/entities/Cart';

export function CartContainer() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalQuantity: 0,
    totalPrice: 0
  });

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.filter(item => item.id !== itemId)
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow">
        <CartList 
          items={cart.items}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </div>
      <div className="lg:w-80">
        <CartSummary cart={cart} />
      </div>
    </div>
  );
}