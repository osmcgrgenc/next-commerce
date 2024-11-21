import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { OrderSummary } from '@/components/profile/OrderSummary';
import { WishlistPreview } from '@/components/profile/WishlistPreview';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <ProfileInfo />
      <OrderSummary />
      <WishlistPreview />
    </div>
  );
}