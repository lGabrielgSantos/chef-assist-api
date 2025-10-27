import { CreateOrderDTO, OrderDTO, UpdateOrderDTO } from "../dtos/order.dto"

export interface OrderServiceInterface {
  getAll(): Promise<OrderDTO[]>
  getById(id: number): Promise<OrderDTO | null>
  create(data: CreateOrderDTO): Promise<OrderDTO>
  update(id: UpdateOrderDTO, data: OrderDTO): Promise<OrderDTO>
  delete(id: number): Promise<void>
}
