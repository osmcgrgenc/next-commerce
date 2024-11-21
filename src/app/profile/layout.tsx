import { ProfileSidebar } from '@/components/profile/ProfileSidebar';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64">
          <ProfileSidebar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}