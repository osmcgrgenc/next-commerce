"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";
import { Textarea } from "../../ui/Textarea";
import { Category } from "@/domain/entities/Category";

interface CategoryFormProps {
  initialData?: Partial<Category>;
  categories?: Category[];
  isSubmitting?: boolean;
  onSubmit: (data: any) => Promise<void>;
}

const categorySchema = z.object({
  name: z.string().min(2, "Kategori adı en az 2 karakter olmalıdır"),
  description: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export function CategoryForm({
  initialData,
  categories = [],
  isSubmitting,
  onSubmit,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      parentId: null,
    },
  });

  const formValues = watch();

  const handleFormSubmit = async (data: CategoryFormData) => {
    console.log("Form Data:", data);
    
    const formData = {
      ...data,
      parentId: data.parentId || null,
      description: data.description || null
    };
    
    console.log("Processed Form Data:", formData);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form Submit Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Input
            label="Kategori Adı"
            {...register("name")}
            error={errors.name?.message}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Select
            label="Üst Kategori (Opsiyonel)"
            {...register("parentId")}
            error={errors.parentId?.message}
          >
            <option value="">Ana Kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Textarea
          label="Açıklama (Opsiyonel)"
          {...register("description")}
          error={errors.description?.message}
        />
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

      <pre className="mt-4 p-4 bg-gray-100 rounded text-sm">
        {JSON.stringify({ errors, values: formValues }, null, 2)}
      </pre>
    </form>
  );
} 