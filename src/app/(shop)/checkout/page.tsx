import { CheckoutContainer } from '@/components/checkout/CheckoutContainer';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-8">Ödeme</h1>
      <CheckoutContainer />
    </div>
  );
}