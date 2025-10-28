import { CreateOrderDTO, OrderDTO, UpdateOrderDTO } from "../dtos/order.dto"

export interface IOrderService{
  getAll(user_id: string): Promise<OrderDTO[]>
  getById(id: number, user_id: string): Promise<OrderDTO | null>
  create(data: CreateOrderDTO, user_id: string): Promise<OrderDTO>
  update(id: number, data: UpdateOrderDTO, user_id: string): Promise<OrderDTO>
  delete(id: number, user_id: string): Promise<void>
}
