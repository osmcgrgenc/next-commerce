import { forwardRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          ref={ref}
          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500
            ${error ? 'border-red-300' : 'border-gray-300'}`}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select"; 