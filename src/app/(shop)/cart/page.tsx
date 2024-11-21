import { CartContainer } from '@/components/cart/CartContainer';

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-8">Alışveriş Sepeti</h1>
      <CartContainer />
    </div>
  );
}