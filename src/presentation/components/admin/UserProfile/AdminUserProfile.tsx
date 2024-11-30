import Image from "next/image";

export function AdminUserProfile() {
  return (
    <div className="p-4 border-t">
      <div className="flex items-center">
        <Image
          src="https://ui-avatars.com/api/?name=Admin+User"
          alt="Admin"
          className="w-10 h-10 rounded-full"
          width={40}
          height={40}
        />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-700">Admin User</p>
          <p className="text-xs text-gray-500">admin@example.com</p>
        </div>
      </div>
    </div>
  );
} 