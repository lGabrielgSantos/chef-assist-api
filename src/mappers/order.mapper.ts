import { orders, order_items, customers } from "@prisma/client";
import { CreateOrderDTO, UpdateOrderDTO, OrderDTO, GetAllOrdersDTO } from "../dtos/order.dto";

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

  static toDTOWithRelations(
    order: orders & {
      order_items?: order_items[];
      customers?: customers | null;
    }
  ): OrderDTO {
    const order_items = order.order_items ?? [];
    const customers = order.customers ?? null;

    return {
      ...this.toDTO(order),
      order_items,
      customers,
      order_items_count: order_items.length,
      customer_name: customers?.name ?? null,
    };
  }

  static toDTOCoreData(order: OrderDTO): GetAllOrdersDTO {
    let totalItemCount = 0;
    if (order.order_items) {
      totalItemCount = order.order_items.length;
    }
    return {
      id: order.id,
      order_date: order.order_date ? order.order_date.toISOString() : null,
      created_at: order.created_at ? order.created_at.toISOString() : null,
      updated_at: order.updated_at ? order.updated_at.toISOString() : null,
      total: order.total ? Number(order.total) : 0,
      customer_id: order.customer_id,
      customer_name: order.customers?.name || null,
      order_items_count: totalItemCount,
    };
  } 

  static toDTOCoreDataList(orders: OrderDTO[]): GetAllOrdersDTO[] {
    return orders.map((order) => this.toDTOCoreData(order));
  }
  static toDTOListWithRelations(
    orders: (orders & {
      order_items?: order_items[];
      customers?: customers | null;
    })[]
  ): OrderDTO[] {
    return orders.map((order) => this.toDTOWithRelations(order));
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
