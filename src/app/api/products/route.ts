import { ProductService } from '@/application/services/ProductService';
import { PrismaProductRepository } from '@/infrastructure/repositories/PrismaProductRepository';
import { PaginatedResponse, SingleResponse, ErrorResponse } from '@/domain/types/responses';
import { ProductResponse } from '@/domain/types/product';

const productRepository = new PrismaProductRepository();
const productService = new ProductService(productRepository);

export async function GET(
  request: Request
): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;

    const products = await productService.getAllProducts({ page, limit });
    
    const response: PaginatedResponse<ProductResponse> = {
      success: true,
      message: 'Ürünler başarıyla getirildi',
      data: products.items,
      meta: {
        total: products.total,
        page: products.page,
        limit: products.limit,
        totalPages: Math.ceil(products.total / products.limit)
      }
    };

    return Response.json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Ürünler yüklenirken hata oluştu',
      error: {
        code: 'PRODUCTS_FETCH_ERROR',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      }
    };

    return Response.json(errorResponse, { status: 500 });
  }
}

export async function POST(
  request: Request
): Promise<Response> {
  try {
    const body = await request.json();
    const product = await productService.createProduct(body);
    
    const response: SingleResponse<ProductResponse> = {
      success: true,
      message: 'Ürün başarıyla oluşturuldu',
      data: product
    };

    return Response.json(response, { status: 201 });
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Ürün oluşturulurken hata oluştu',
      error: {
        code: 'PRODUCT_CREATE_ERROR',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata'
      }
    };

    return Response.json(errorResponse, { status: 500 });
  }
}