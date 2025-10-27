import { OrderRepository } from '../repositories/order.repository'
import { OrderMapper } from '../mappers/order.mapper'
import { CreateOrderDTO, OrderDTO, UpdateOrderDTO } from '../dtos/order.dto'

export class OrderService {
  private repository: OrderRepository

  constructor() {
    this.repository = new OrderRepository()
  }

  async getAll(): Promise<OrderDTO[]> {
    const orders = await this.repository.findAll()
    return OrderMapper.toDTOList(orders)
  }

  async getById(id: number): Promise<OrderDTO | null> {
    const order = await this.repository.findById(id)
    return order ? OrderMapper.toDTO(order) : null
  }

  async create(data: CreateOrderDTO): Promise<OrderDTO> {
    const order = await this.repository.create(data)
    return OrderMapper.toDTO(order)
  }

  async update(id: number, data: UpdateOrderDTO): Promise<OrderDTO> {
    const order = await this.repository.update(id, data)
    return OrderMapper.toDTO(order)
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
