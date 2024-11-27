export interface Order {
    id: number;
    userId: number;
    status: OrderStatus;
    total: number;
    items: OrderItem[];
    addressId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderItem {
    id: number;
    productId: number;
    quantity: number;
    price: number;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
} 