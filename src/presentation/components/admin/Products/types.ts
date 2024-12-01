import { CreateProductDTO } from "@/domain/entities/Product";
import { ProductCategory } from "@/domain/entities/Product";
import { ProductBrand } from "@/domain/entities/Product";

export interface ProductFormData extends Omit<CreateProductDTO, 'category' | 'brand'> {
  categoryId: string;
  brandId: string;
}

export interface ProductFormProps {
  initialData?: ProductFormData;
  categories: ProductCategory[];
  brands: ProductBrand[];
  isSubmitting?: boolean;
  onSubmit: (data: ProductFormData) => Promise<void>;
} 