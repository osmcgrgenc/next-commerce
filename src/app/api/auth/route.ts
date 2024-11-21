import { NextResponse } from 'next/server';
import { users } from '@/mocks';

// Kullanıcı kaydı
export async function POST(request: Request) {
    const { email } = await request.json();
    users.push({ id: users.length + 1, email, role: "USER", createdAt: new Date(), updatedAt: new Date(), name: "", passwordHash: "", isActive: true });
    return NextResponse.json({ message: 'Kayıt başarılı' }, { status: 201 });
}

// Kullanıcı girişi
export async function POST_LOGIN(request: Request) {
    const { email } = await request.json();
    const user = users.find(u => u.email === email);
    if (user) {
        return NextResponse.json({ message: 'Giriş başarılı' });
    }
    return NextResponse.json({ message: 'Geçersiz kullanıcı adı veya şifre' }, { status: 401 });
}
