import { withErrorHandling } from '@/lib/api/middleware';
import { ApiResponseHelper } from '@/lib/api/response';
import { AppError } from '@/lib/errors/AppError';
import { productSchema } from '@/lib/validation/schemas/catalog';
import { ProductService } from '@/modules/catalog/services/productService';

export const GET = withErrorHandling(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  const { products, total } = await ProductService.getAll({ page, limit });

  return Response.json(
    ApiResponseHelper.paginated(products, total, page, limit)
  );
});

export const POST = withErrorHandling(async (req: Request) => {
  const body = await req.json();
  
  // Validation
  const validatedData = productSchema.parse(body);

  // Business logic
  const product = await ProductService.create(validatedData);

  return Response.json(
    ApiResponseHelper.success(product, 'Product created successfully'),
    { status: 201 }
  );
}); 