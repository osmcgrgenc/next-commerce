import { NextResponse } from 'next/server';
import { products } from '@/mocks';

// Ürünleri listele
export async function GET() {
    return NextResponse.json(products);
}

// Ürün ekle
export async function POST(request: Request) {
    const newProduct = await request.json();
    products.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
}
