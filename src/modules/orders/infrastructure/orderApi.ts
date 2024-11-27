import { Order } from '../domain/Order';

export const orderApi = {
    getOrders: async (): Promise<Order[]> => {
        const response = await fetch('/api/orders');
        return response.json();
    },

    getOrder: async (id: number): Promise<Order> => {
        const response = await fetch(`/api/orders/${id}`);
        return response.json();
    },

    createOrder: async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
        const response = await fetch('/api/orders', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    },

    updateOrderStatus: async (id: number, status: Order['status']): Promise<Order> => {
        const response = await fetch(`/api/orders/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    }
}; 