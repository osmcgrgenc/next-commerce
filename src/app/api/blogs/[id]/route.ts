import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Blog detayı alınamadı:", error);
    return NextResponse.json(
      { error: "Blog detayı alınamadı" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const body = await request.json();
    
    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: body,
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
    console.error("Blog güncellenemedi:", error);
    return NextResponse.json(
      { error: "Blog güncellenemedi" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await prisma.blog.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Blog silinemedi:", error);
    return NextResponse.json(
      { error: "Blog silinemedi" },
      { status: 500 }
    );
  }
} 