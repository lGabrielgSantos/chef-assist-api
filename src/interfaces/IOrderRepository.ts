import { OrderDTO } from "../dtos/order.dto"

export interface OrderRepositoryInterface {
  findAll(): Promise<OrderDTO[]>
  findById(id: number): Promise<OrderDTO | null>
  create(data: OrderDTO): Promise<OrderDTO>
  update(id: number, data: OrderDTO): Promise<OrderDTO>
  delete(id: number): Promise<void>
}
