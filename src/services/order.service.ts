import { OrderRepository } from "../repositories/order.repository";
import { OrderMapper } from "../mappers/order.mapper";
import { CreateOrderDTO, OrderDTO, UpdateOrderDTO } from "../dtos/order.dto";
import { IOrderRepository } from "../interfaces/IOrderRepository";
import { IOrderService } from "../interfaces/IOrderService";

export class OrderService implements IOrderService {
  private repository: IOrderRepository;

  constructor(repository?: IOrderRepository) {
    this.repository = repository ?? new OrderRepository();
  }

  async getAll(user_id: string): Promise<OrderDTO[]> {
    const orders = await this.repository.findAll(user_id);
    return OrderMapper.toDTOList(orders);
  }

  async getById(id: number, user_id: string): Promise<OrderDTO | null> {
    const order = await this.repository.findById(id, user_id);
    return order ? OrderMapper.toDTO(order) : null;
  }

  async create(data: CreateOrderDTO, user_id: string): Promise<OrderDTO> {
    const order = await this.repository.create(
      OrderMapper.toCreatePrisma(data),
      user_id
    );
    return OrderMapper.toDTO(order);
  }

  async update(
    id: number,
    data: UpdateOrderDTO,
    user_id: string
  ): Promise<OrderDTO> {
    const order = await this.repository.update(
      id,
      user_id,
      OrderMapper.toUpdatePrisma(data)
    );
    return OrderMapper.toDTO(order);
  }

  async delete(id: number, user_id: string): Promise<void> {
    await this.repository.delete(id, user_id);
  }
}
