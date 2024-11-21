// src/types/Order.ts

import { Address } from "./Address";

type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELED"; // Sipariş durumları

type PaymentInfo = {
  method: "CREDIT_CARD" | "PAYPAL" | "BANK_TRANSFER"; // Ödeme yöntemi
  transactionId: string; // Ödeme işleminin ID'si
  amountPaid: number; // Ödenen miktar
  status: "SUCCESS" | "FAILED" | "PENDING"; // Ödeme durumu
  paidAt?: Date; // Ödeme zamanı (başarılı ise)
};
export type Order = {
    id: number; // Sipariş ID'si
    userId: string; // Sipariş veren kullanıcının ID'si
    productIds: string[]; // Sipariş edilen ürünlerin ID'leri
    totalAmount: number; // Sipariş toplam tutarı
    status: OrderStatus; // Sipariş durumu
    address: Address; // Teslimat adresi
    payment: PaymentInfo; // Ödeme bilgileri
    createdAt: Date; // Sipariş tarihi
    updatedAt?: Date; // Sipariş güncelleme tarihi
  };