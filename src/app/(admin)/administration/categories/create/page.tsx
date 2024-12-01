import { CreateCategoryForm } from "@/presentation/components/admin/Categories/CreateCategoryForm";
import { CategoryServiceImpl } from "@/application/services/admin/CategoryService";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const createCategory = async (formData: FormData) => {
  "use server";
  
  try {
    const categoryService = new CategoryServiceImpl();
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string || null,
      parentId: formData.get("parentId") as string || null,
    };

    await categoryService.create(data);
    revalidatePath("/administration/categories");
    redirect("/administration/categories");
  } catch (error) {
    console.error("Kategori oluşturma hatası:", error);
    throw error;
  }
};

export default async function CreateCategoryPage() {
  const categoryService = new CategoryServiceImpl();
  const categoriesResult = await categoryService.getAll({ page: 1, limit: 100 });
  const categories = categoriesResult.items;

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Yeni Kategori Ekle
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Yeni bir kategori eklemek için aşağıdaki formu doldurun
                </p>
              </div>
              <Link
                href="/administration/categories"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Geri Dön
              </Link>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <CreateCategoryForm
              categories={categories}
              createCategory={createCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}