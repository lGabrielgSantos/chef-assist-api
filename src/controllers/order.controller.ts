import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { success, error } from "../utils/response";
import { IOrderService } from "../interfaces/IOrderService";

export class OrderController {
  private orderService: IOrderService;

  constructor(orderService?: IOrderService) {
    this.orderService = orderService ?? new OrderService();
  }

  async getAll(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const orders = await this.orderService.getAll(req.user.id);
      return success(res, orders, "Orders fetched successfully.", 200);
    } catch (err: any) {
      return error(res, err?.message || "Error fetching orders.");
    }
  }

  async getById(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { id } = req.params;
      const order = await this.orderService.getById(Number(id), req.user.id);
      if (!order) return error(res, "Order not found.", 404);
      return success(res, order, "Order fetched successfully.", 200);
    } catch (err: any) {
      return error(res, err?.message || "Error fetching order.");
    }
  }

  async create(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const newOrder = await this.orderService.create(req.body, req.user.id);
      return success(res, newOrder, "Order created successfully.", 201);
    } catch (err: any) {
      return error(res, err?.message || "Error creating order.");
    }
  }

  async update(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { id } = req.params;
      const updated = await this.orderService.update(Number(id), req.body, req.user.id);
      return success(res, updated, "Order updated successfully.", 200);
    } catch (err: any) {
      return error(res, err?.message || "Error updating order.");
    }
  }

  async delete(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { id } = req.params;
      await this.orderService.delete(Number(id), req.user.id);
      return success(res, null, "Order deleted successfully.", 204);
    } catch (err: any) {
      return error(res, err?.message || "Error deleting order.");
    }
  }
}
