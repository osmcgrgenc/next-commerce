import { Order } from "../../../domain/entities/Order";

export interface OrderService {
  getAll(): Promise<Order[]>;
  getById(id: string): Promise<Order>;
  updateStatus(id: string, status: string): Promise<Order>;
  delete(id: string): Promise<void>;
} 