"use client";

import { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: ((item: T) => ReactNode) | keyof T;
  align?: "left" | "right" | "center";
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({ 
  columns, 
  data, 
  isLoading,
  emptyMessage = "Veri bulunamadı" 
}: DataTableProps<T>) {
  if (isLoading) {
    return <div className="p-4 text-center">Yükleniyor...</div>;
  }

  const getAlignmentClass = (align?: string) => {
    switch (align) {
      case 'right': return 'text-right';
      case 'center': return 'text-center';
      default: return 'text-left';
    }
  };

  const renderCellContent = (item: T, accessor: Column<T>['accessor']): ReactNode => {
    if (typeof accessor === 'function') {
      return accessor(item);
    }
    const value = item[accessor];
    return value as ReactNode;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-6 py-3 ${getAlignmentClass(column.align)} text-xs font-medium text-gray-500 uppercase tracking-wider`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${getAlignmentClass(column.align)}`}
                  >
                    {renderCellContent(item, column.accessor)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 