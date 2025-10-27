import { orders, order_items, customers } from "@prisma/client"
import {
  CreateOrderDTO,
  UpdateOrderDTO,
  OrderDTO,
} from "../dtos/order.dto"

export class OrderMapper {
  static toDTO(
    order: orders & {
      order_items?: order_items[]
      customers?: customers | null
    }
  ): OrderDTO {
    return {
      ...order,
      total: order.total ? Number(order.total) : null,
    }
  }

  static toDTOList(
    orders: (orders & {
      order_items?: order_items[]
      customers?: customers | null
    })[]
  ): OrderDTO[] {
    return orders.map((order) => this.toDTO(order))
  }

  static toCreatePrisma(data: CreateOrderDTO): orders {
    const now = new Date()
    return {
      id: 0, 
      customer_id: data.customer_id ?? null,
      order_date: data.order_date ?? now,
      total: data.total ?? null,
      created_at: now,
      updated_at: now,
    } as unknown as orders
  }

  static toUpdatePrisma(data: UpdateOrderDTO): Partial<orders> {
    return {
      customer_id: data.customer_id ?? undefined,
      order_date: data.order_date ?? undefined,
      total: data.total ?? undefined,
      updated_at: new Date(),
    }
  }
}
