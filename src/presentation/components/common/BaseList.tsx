"use client";

import { useState, useEffect } from "react";
import { Column, DataTable } from "../ui/DataTable";
import { PaginationParams, PaginatedResult } from "@/domain/types/common";

interface BaseListProps<T> {
  service: {
    getAll: (params?: PaginationParams) => Promise<PaginatedResult<T>>;
    delete?: (id: string) => Promise<void>;
  };
  columns: Column<T>[];
  title: string;
  createButtonText?: string;
  onCreateClick?: () => void;
}

export function BaseList<T extends { id: string | number }>({
  service,
  columns,
  title,
  createButtonText,
  onCreateClick,
}: BaseListProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadData();
  }, [page, search]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const result = await service.getAll({ page, limit, search });
      setData(result.items);
      setTotal(result.total);
    } catch (error) {
      console.error("Veriler yüklenirken bir hata oluştu:", error);
      setError("Veriler yüklenirken bir hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const totalPages = Math.ceil(total / limit);

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">{title}</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Ara..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
            {createButtonText && (
              <button
                onClick={onCreateClick}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                {createButtonText}
              </button>
            )}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
        />

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Toplam {total} kayıt
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Önceki
            </button>
            <span className="px-3 py-1">
              Sayfa {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Sonraki
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}