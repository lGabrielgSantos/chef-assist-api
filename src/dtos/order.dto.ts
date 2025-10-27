import { orders, order_items, customers } from '@prisma/client'

export interface OrderDTO extends Omit<orders, 'total'> {
  total: number | null
  order_items?: order_items[]
  customers?: customers | null
}

export type CreateOrderDTO = Omit<orders, 'id' | 'created_at' | 'updated_at'> & {
  order_items: {
    product_id: number
    quantity: number
  }[]
}

export type UpdateOrderDTO = Partial<CreateOrderDTO>