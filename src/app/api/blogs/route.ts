import { NextResponse } from "next/server";
import { PaginatedResponse, ErrorResponse } from "@/domain/types/responses";
import { Blog } from "@/domain/entities/Blog";
import { PrismaBlogRepository } from "@/infrastructure/repositories/PrismaBlogRepository";

const blogRepository = new PrismaBlogRepository();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const { items, total } = await blogRepository.findAll({
      skip: (page - 1) * limit,
      limit,
      search
    });

    const response: PaginatedResponse<Blog> = {
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
      message: "Blog listesi alınamadı",
      error: {
        code: "BLOG_LIST_ERROR",
        details: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const blog = await blogRepository.create(body);
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false,
        error: "Blog oluşturulamadı",
        details: error instanceof Error ? error.message : "Bilinmeyen hata"
      },
      { status: 500 }
    );
  }
} 