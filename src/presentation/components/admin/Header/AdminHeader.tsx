import { BellIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
}

export function AdminHeader({ title }: Props) {
  return (
    <header className="h-16 bg-white shadow-sm">
      <div className="flex items-center justify-between h-full px-6">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="h-8 w-[1px] bg-gray-200"></div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
} 