import { orders, order_items, customers } from "@prisma/client";
import { CreateOrderDTO, UpdateOrderDTO, OrderDTO } from "../dtos/order.dto";

export class OrderMapper {
  static toDTO(
    order: orders & {
      order_items?: order_items[];
      customers?: customers | null;
    }
  ): OrderDTO {
    return {
      ...order,
      total: order.total ? Number(order.total) : null,
    };
  }

  static toDTOList(
    orders: (orders & {
      order_items?: order_items[];
      customers?: customers | null;
    })[]
  ): OrderDTO[] {
    return orders.map((order) => this.toDTO(order));
  }

  static toCreatePrisma(data: CreateOrderDTO): any {
    const now = new Date();

    const orderItems =
      data.order_items?.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        created_at: now,
        updated_at: now,
      })) ?? [];

    return {
      customer_id: data.customer_id ?? null,
      order_date: data.order_date ?? now,
      total: data.total ?? null,
      created_at: now,
      updated_at: now,
      order_items: orderItems,
    };
  }

  static toUpdatePrisma(data: UpdateOrderDTO): Partial<orders> {
    return {
      customer_id: data.customer_id ?? undefined,
      order_date: data.order_date ?? undefined,
      total: data.total ?? undefined,
      updated_at: new Date(),
    };
  }
}
