import { orders, order_items, customers } from '@prisma/client'
import { OrderDTO } from '../dtos/order.dto'

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
}