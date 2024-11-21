import { NextResponse } from 'next/server';
import { orders } from '@/mocks';

// Sipariş oluştur
export async function POST(request: Request) {
    const order = await request.json();
    orders.push(order);
    return NextResponse.json(order, { status: 201 });
}

// Siparişleri listele
export async function GET() {
    return NextResponse.json(orders);
}
