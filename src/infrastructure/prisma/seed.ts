import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Elektronik',
        description: 'Elektronik ürünler',
        slug: 'elektronik',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Giyim',
        description: 'Giyim ürünleri',
        slug: 'giyim',
      },
    }),
  ]);

  // Create Brands
  const brands = await Promise.all([
    prisma.brand.create({
      data: {
        name: 'Apple',
        description: 'Apple ürünleri',
        slug: 'apple',
      },
    }),
    prisma.brand.create({
      data: {
        name: 'Samsung',
        description: 'Samsung ürünleri',
        slug: 'samsung',
      },
    }),
  ]);

  // Create Products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'iPhone 13',
        description: 'Apple iPhone 13',
        price: 999.99,
        stock: 100,
        categoryId: categories[0].id,
        brandId: brands[0].id,
        images: ['iphone13-1.jpg', 'iphone13-2.jpg'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Samsung Galaxy S21',
        description: 'Samsung Galaxy S21',
        price: 899.99,
        stock: 150,
        categoryId: categories[0].id,
        brandId: brands[1].id,
        images: ['galaxy-s21-1.jpg', 'galaxy-s21-2.jpg'],
      },
    }),
  ]);

  // Create Users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        password: await hash('password123', 10),
        role: 'ADMIN',
      },
    }),
    prisma.user.create({
      data: {
        email: 'user@example.com',
        name: 'Test User',
        password: await hash('password123', 10),
        role: 'USER',
      },
    }),
  ]);

  // Create Addresses
  const addresses = await Promise.all([
    prisma.address.create({
      data: {
        userId: users[1].id,
        title: 'Ev',
        address: 'Test Sokak No:1',
        city: 'İstanbul',
        country: 'Türkiye',
        zipCode: '34000',
        phone: '5551234567',
        isDefault: true,
      },
    }),
  ]);

  // Create Orders
  await prisma.order.create({
    data: {
      userId: users[1].id,
      addressId: addresses[0].id,
      status: 'CONFIRMED',
      total: 999.99,
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            price: 999.99,
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 