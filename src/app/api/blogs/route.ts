import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaginatedResponse, ErrorResponse } from "@/domain/types/responses";
import { Blog } from "@/domain/entities/Blog";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where: {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.blog.count({
        where: {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { content: { contains: search, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    const response: PaginatedResponse<Blog> = {
      success: true,
      data: blogs,
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
    
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        authorId: body.authorId,
        isPublished: body.isPublished,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Blog oluşturulamadı:", error);
    return NextResponse.json(
      { error: "Blog oluşturulamadı" },
      { status: 500 }
    );
  }
} 