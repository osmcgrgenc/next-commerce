import { NextResponse } from "next/server";
import { PrismaProductRepository } from "@/infrastructure/repositories/PrismaProductRepository";
import { PaginatedResponse, ErrorResponse, SingleResponse } from "@/domain/types/responses";
import { Product } from "@/domain/entities/Product";

const productRepository = new PrismaProductRepository();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const { items, total } = await productRepository.findAll({
      skip: (page - 1) * limit,
      limit,
      search
    });

    const response: PaginatedResponse<Product> = {
      success: true,
      data: items,
      pagination: {
        total,
        page,
        limit,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: "Ürün listesi alınamadı",
      error: {
        code: "PRODUCT_LIST_ERROR",
        details: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await productRepository.create(body);
    
    const response: SingleResponse<Product> = {
      success: true,
      data: product
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorResponse: ErrorResponse = {
      success: false,
      message: "Ürün oluşturulamadı",
      error: {
        code: "PRODUCT_CREATE_ERROR",
        details: error instanceof Error ? error.message : "Bilinmeyen hata"
      }
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}