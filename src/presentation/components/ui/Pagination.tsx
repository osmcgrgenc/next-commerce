"use client";

import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);
  
  const pages = useMemo(() => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push('...');
      }
    }
    return pageNumbers;
  }, [currentPage, totalPages]);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t">
      <div className="text-sm text-gray-500">
        Toplam {totalItems} kayıttan {(currentPage - 1) * pageSize + 1}-
        {Math.min(currentPage * pageSize, totalItems)} arası gösteriliyor
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
        >
          Önceki
        </button>
        
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            className={`px-3 py-1 border rounded 
              ${currentPage === page ? 'bg-indigo-600 text-white' : 'hover:bg-gray-50'}
              ${typeof page !== 'number' ? 'cursor-default' : ''}`
            }
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50"
        >
          Sonraki
        </button>
      </div>
    </div>
  );
} 