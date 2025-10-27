import { CreateOrderDTO, OrderDTO, UpdateOrderDTO } from "../dtos/order.dto"

export interface IOrderService{
  getAll(): Promise<OrderDTO[]>
  getById(id: number): Promise<OrderDTO | null>
  create(data: CreateOrderDTO): Promise<OrderDTO>
  update(id: number, data: UpdateOrderDTO): Promise<OrderDTO>
  delete(id: number): Promise<void>
}
