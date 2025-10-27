import { OrderRepository } from '../repositories/order.repository'
import { OrderMapper } from '../mappers/order.mapper'
import { CreateOrderDTO, OrderDTO, UpdateOrderDTO } from '../dtos/order.dto'
import { IOrderRepository } from '../interfaces/IOrderRepository'
import { IOrderService } from '../interfaces/IOrderService'

export class OrderService implements IOrderService {
  private repository: IOrderRepository

   constructor(repository?: IOrderRepository) {
    this.repository = repository ?? new OrderRepository()
  }

  async getAll(): Promise<OrderDTO[]> {
    console.log('Fetching all orders')
    const orders = await this.repository.findAll()
    return OrderMapper.toDTOList(orders)
  }

  async getById(id: number): Promise<OrderDTO | null> {
    const order = await this.repository.findById(id)
    return order ? OrderMapper.toDTO(order) : null
  }

  async create(data: CreateOrderDTO): Promise<OrderDTO> {
    const order = await this.repository.create(OrderMapper.toCreatePrisma(data))
    return OrderMapper.toDTO(order)
  }

  async update(id: number, data: UpdateOrderDTO): Promise<OrderDTO> {
    const order = await this.repository.update(id, OrderMapper.toUpdatePrisma(data))
    return OrderMapper.toDTO(order)
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
