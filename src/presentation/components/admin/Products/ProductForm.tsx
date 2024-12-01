"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProductFormData, ProductFormProps } from "./types";
import { Input } from "@/presentation/components/ui/Input";
import { Select } from "@/presentation/components/ui/Select";
import { Textarea } from "@/presentation/components/ui/Textarea";
import { ImageUpload } from "@/presentation/components/ui/ImageUpload";
import { useState } from "react";

const productSchema = z.object({
  name: z.string().min(3, "Ürün adı en az 3 karakter olmalıdır"),
  price: z.number().min(0, "Fiyat 0'dan küçük olamaz"),
  stock: z.number().min(0, "Stok 0'dan küçük olamaz"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Kategori seçilmelidir"),
  brandId: z.string().min(1, "Marka seçilmelidir"),
  isActive: z.boolean().default(true),
  featured: z.boolean().default(false),
});

export function ProductForm({
  initialData,
  categories,
  brands,
  isSubmitting,
  onSubmit,
}: ProductFormProps) {
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      stock: 0,
      description: "",
      categoryId: "",
      brandId: "",
      isActive: true,
      featured: false,
    },
  });

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      await onSubmit(data);
      reset();
      setImages([]);
    } catch (error) {
      console.error("Form gönderimi sırasında hata:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Input
            label="Ürün Adı"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>
        <div>
          <Select
            label="Kategori"
            {...register("categoryId")}
            error={errors.categoryId?.message}
          >
            <option value="">Kategori Seçin</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Select
            label="Marka"
            {...register("brandId")}
            error={errors.brandId?.message}
          >
            <option value="">Marka Seçin</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Input
            label="Fiyat"
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            error={errors.price?.message}
          />
        </div>
        <div>
          <Input
            label="Stok"
            type="number"
            {...register("stock", { valueAsNumber: true })}
            error={errors.stock?.message}
          />
        </div>
      </div>

      <div>
        <Textarea
          label="Açıklama"
          {...register("description")}
          error={errors.description?.message}
        />
      </div>

      <div>
        <ImageUpload
          label="Ürün Görselleri"
          maxFiles={5}
          files={images}
          onFilesChange={setImages}
        />
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("isActive")} />
          <span>Aktif</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("featured")} />
          <span>Öne Çıkan</span>
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </form>
  );
} 