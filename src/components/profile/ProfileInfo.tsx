'use client';

import { User } from '@/modules/users/domain/user';
import Image from 'next/image';

interface ProfileInfoProps {
  user?: User;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  if (!user) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-6">
        <div className="relative w-24 h-24">
          {user.profileImageUrl ? (
            <Image
              src={user.profileImageUrl}
              alt={user.name}
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-purple-600">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500">
            Üyelik Tarihi: {new Date(user.createdAt).toLocaleDateString('tr-TR')}
          </p>
        </div>
      </div>
    </div>
  );
}