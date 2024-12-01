"use client";

import { CategoryForm } from "./CategoryForm";
import { Category } from "@/domain/entities/Category";

interface CreateCategoryFormProps {
  categories: Category[];
  createCategory: (formData: FormData) => Promise<void>;
}

export function CreateCategoryForm({ categories, createCategory }: CreateCategoryFormProps) {
  return (
    <CategoryForm
      categories={categories}
      onSubmit={async (data) => {
        const formData = new FormData();
        formData.set("name", data.name);
        if (data.description) formData.set("description", data.description);
        if (data.parentId) formData.set("parentId", data.parentId);
        
        await createCategory(formData);
      }}
    />
  );
} 