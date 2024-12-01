import { CategoryServiceImpl } from "@/application/services/admin/CategoryService";
import { CategoryList } from "@/presentation/components/admin/Categories/CategoryList";
import Link from "next/link";

export default async function CategoriesPage() {
  const categoryService = new CategoryServiceImpl();
  const categories = await categoryService.getAll({ page: 1, limit: 10 });

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Kategoriler</h1>
            <p className="mt-1 text-sm text-gray-600">
              Tüm kategorileri görüntüleyin ve yönetin
            </p>
          </div>
          <Link
            href="/administration/categories/create"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Yeni Kategori
          </Link>
        </div>
        <CategoryList categories={categories} />
      </div>
    </div>
  );
}
