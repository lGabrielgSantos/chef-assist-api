import { orders, order_items, customers } from "@prisma/client";
import { OrderStatus } from "../enums/order-status.enum";

export interface OrderDTO extends Omit<orders, "total" | "status"> {
  total: number | null;
  status: OrderStatus | null;
  order_items?: order_items[];
  customers?: customers | null;
  order_items_count?: number;
  customer_name?: string | null;
}

export type CreateOrderDTO = Omit<
  orders,
  "id" | "created_at" | "updated_at" | "status"
> & {
  status?: OrderStatus;
  order_items: {
    product_id: number;
    quantity: number;
  }[];
};

export type UpdateOrderDTO = Partial<CreateOrderDTO>;

export type GetAllOrdersDTO = {
  id: number;
  status: OrderStatus | null;
  order_date?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  total: number;
  order_items_count?: number;
  customer_id?: number | null;
  customer_name: string | null;
};
