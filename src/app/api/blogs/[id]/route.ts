import { NextResponse } from "next/server";
import { PrismaBlogRepository } from "@/infrastructure/repositories/PrismaBlogRepository";
import { SingleResponse, ErrorResponse } from "@/domain/types/responses";
import { Blog } from "@/domain/entities/Blog";

const blogRepository = new PrismaBlogRepository();

interface RouteParams {
    params: {
        id: string;
    };
}

export async function GET(request: Request, { params }: RouteParams) {
    try {
        const blog = await blogRepository.findById(params.id);
        if (!blog) {
            const errorResponse: ErrorResponse = {
                success: false,
                message: "Blog bulunamadı",
                error: {
                    code: "BLOG_NOT_FOUND",
                    details: "İstenen blog yazısı bulunamadı"
                }
            };
            return NextResponse.json(errorResponse, { status: 404 });
        }

        const response: SingleResponse<Blog> = {
            success: true,
            data: blog
        };
        return NextResponse.json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = {
            success: false,
            message: "Blog detayı alınamadı",
            error: {
                code: "BLOG_FETCH_ERROR",
                details: error instanceof Error ? error.message : "Bilinmeyen hata"
            }
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const body = await request.json();
        const blog = await blogRepository.update(params.id, body);

        const response: SingleResponse<Blog> = {
            success: true,
            data: blog
        };
        return NextResponse.json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = {
            success: false,
            message: "Blog güncellenemedi",
            error: {
                code: "BLOG_UPDATE_ERROR",
                details: error instanceof Error ? error.message : "Bilinmeyen hata"
            }
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        await blogRepository.delete(params.id);
        return NextResponse.json({ success: true });
    } catch (error) {
        const errorResponse: ErrorResponse = {
            success: false,
            message: "Blog silinemedi",
            error: {
                code: "BLOG_DELETE_ERROR",
                details: error instanceof Error ? error.message : "Bilinmeyen hata"
            }
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const blog = await blogRepository.create(body);

        const response: SingleResponse<Blog> = {
            success: true,
            data: blog
        };
        return NextResponse.json(response);
    } catch (error) {
        const errorResponse: ErrorResponse = {
            success: false,
            message: "Blog oluşturulamadı",
            error: {
                code: "BLOG_CREATE_ERROR",
                details: error instanceof Error ? error.message : "Bilinmeyen hata"
            }
        };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}