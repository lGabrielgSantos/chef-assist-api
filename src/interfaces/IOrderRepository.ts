import { customers, order_items, orders } from "@prisma/client";
import { OrderStatus } from "../enums/order-status.enum";
import { OrderFilters } from "./OrderFilters";

export type OrderWithRelations = orders & {
  order_items?: order_items[];
  customers?: customers | null;
};

export type UpdateOrderPayload = Partial<orders> & {
  order_items?: {
    product_id: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
  }[];
};

export type CreateOrderPayload = Omit<
  orders,
  "id" | "created_at" | "updated_at" | "status"
> & {
  status?: OrderStatus | null;
  order_items?: {
    product_id: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
  }[];
};

export interface IOrderRepository {
  findAll(user_id: string, filters?: OrderFilters): Promise<OrderWithRelations[]>;
  findById(id: number, user_id: string): Promise<OrderWithRelations | null>;
  create(data: CreateOrderPayload, user_id: string): Promise<orders>;
  update(id: number, user_id: string, data: UpdateOrderPayload): Promise<OrderWithRelations>;
  delete(id: number, user_id: string): Promise<void>;
}
