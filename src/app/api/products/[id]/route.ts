import { NextResponse } from "next/server";
import { PrismaProductRepository } from "@/infrastructure/repositories/PrismaProductRepository";
import { SingleResponse, ErrorResponse } from "@/domain/types/responses";
import { Product } from "@/domain/entities/Product";

const productRepository = new PrismaProductRepository();

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const product = await productRepository.findById(params.id);
    if (!product) {
      const errorResponse: ErrorResponse = {
        success: false,
        message: "Ürün bulunamadı",
        error: {
          code: "PRODUCT_NOT_FOUND",
          details: "İstenen ürün bulunamadı"
        }
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const response: SingleResponse<Product> = {
      success: true,
      data: product
    };
    return NextResponse.json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: "Ürün detayı alınamadı",
      error: {
        code: "PRODUCT_FETCH_ERROR",
        details: error instanceof Error ? error.message : "Bilinmeyen hata"
      }
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
} 