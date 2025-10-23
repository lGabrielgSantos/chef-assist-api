import { orders, order_items, customers } from '@prisma/client'

export interface OrderDTO extends Omit<orders, 'total'> {
  total: number | null
  order_items?: order_items[]
  customers?: customers | null
}
