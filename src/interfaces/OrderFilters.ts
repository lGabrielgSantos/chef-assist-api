import { OrderStatus } from "../enums/order-status.enum"

export interface OrderFilters {
  status?: OrderStatus
  startDate?: Date
  endDate?: Date
  customerId?: number
}
