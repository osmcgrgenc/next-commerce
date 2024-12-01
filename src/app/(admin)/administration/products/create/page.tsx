import { ProductForm } from "@/presentation/components/admin/Products/ProductForm";
import { PrismaCategoryRepository } from "@/infrastructure/repositories/PrismaCategoryRepository";
import { PrismaBrandRepository } from "@/infrastructure/repositories/PrismaBrandRepository";
import { ProductServiceImpl } from "@/application/services/admin/ProductService";
import { redirect } from "next/navigation";

export default async function CreateProductPage() {
  const categoryRepository = new PrismaCategoryRepository();
  const brandRepository = new PrismaBrandRepository();
  const productService = new ProductServiceImpl();

  const [categories, brands] = await Promise.all([
    categoryRepository.findAll(),
    brandRepository.findAll(),
  ]);

  const handleSubmit = async (formData: any) => {
    "use server";
    
    try {
      await productService.create({
        ...formData,
        category: { id: formData.categoryId },
        brand: { id: formData.brandId },
      });
      redirect("/admin/products");
    } catch (error) {
      console.error("Ürün oluşturma hatası:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Yeni Ürün Ekle
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Yeni bir ürün eklemek için aşağıdaki formu doldurun.
            </p>
          </div>

          <ProductForm
            categories={categories}
            brands={brands}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
} 