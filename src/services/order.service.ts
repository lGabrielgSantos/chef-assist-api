import { OrderRepository } from "../repositories/order.repository";
import { OrderMapper } from "../mappers/order.mapper";
import { CreateOrderDTO, GetAllOrdersDTO, OrderDTO, UpdateOrderDTO } from "../dtos/order.dto";
import { IOrderRepository } from "../interfaces/IOrderRepository";
import { IOrderService } from "../interfaces/IOrderService";
import { OrderFilters } from "../interfaces/OrderFilters";

export class OrderService implements IOrderService {
  private repository: IOrderRepository;

  constructor(repository?: IOrderRepository) {
    this.repository = repository ?? new OrderRepository();
  }

  async getAll(user_id: string, filters?: OrderFilters): Promise<GetAllOrdersDTO[]> {
    try {
      const orders = await this.repository.findAll(user_id, filters);
      const dtoOrders = orders.map((order) => OrderMapper.toDTO(order));
      return OrderMapper.toDTOCoreDataList(dtoOrders);
    } catch (error: any) {
      throw new Error("Failed to load orders.");
    }
  }

  async getById(id: number, user_id: string): Promise<OrderDTO | null> {
    try {
      const order = await this.repository.findById(id, user_id);
      if (!order) throw new Error("Order not found.");
      return OrderMapper.toDTO(order);
    } catch (error: any) {
      console.error(`[OrderService] Failed to fetch order #${id}:`, error);
      throw new Error("Failed to fetch the order.");
    }
  }

  async create(data: CreateOrderDTO, user_id: string): Promise<OrderDTO> {
    try {
      const mappedData = OrderMapper.toCreatePrisma(data);
      const order = await this.repository.create(mappedData, user_id);
      return OrderMapper.toDTO(order);
    } catch (error: any) {
      console.error("[OrderService] Failed to create order:", error);
      console.log("Error code:", error.code);
      if (error.code === "P2003") {
        throw new Error("Invalid or non-existent product reference.");
      }
      if (error.code === "P2002") {
        throw new Error("Duplicate order detected.");
      }

      throw new Error("Failed to create the order.");
    }
  }

  async update(
    id: number,
    data: UpdateOrderDTO,
    user_id: string
  ): Promise<OrderDTO> {
    try {
      const mappedData = OrderMapper.toUpdatePrisma(data);
      const order = await this.repository.update(id, user_id, mappedData);
      return OrderMapper.toDTO(order);
    } catch (error: any) {
      console.error(`[OrderService] Failed to update order #${id}:`, error);

      if (error.code === "P2025") {
        throw new Error("Order not found for update.");
      }

      throw new Error("Failed to update the order.");
    }
  }

  async delete(id: number, user_id: string): Promise<void> {
    try {
      await this.repository.delete(id, user_id);
    } catch (error: any) {
      console.error(`[OrderService] Failed to delete order #${id}:`, error);

      if (error.code === "P2025") {
        throw new Error("Order not found for deletion.");
      }

      throw new Error("Failed to delete the order.");
    }
  }
}
