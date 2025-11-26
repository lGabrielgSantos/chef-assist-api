import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { success, error } from "../utils/response";
import { IOrderService } from "../interfaces/IOrderService";
import { OrderFilters } from "../interfaces/OrderFilters";
import { OrderStatus, parseOrderStatus } from "../enums/order-status.enum";

const normalizeStatusInput = (value: any): OrderStatus | undefined => {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number" && (value === OrderStatus.Pending || value === OrderStatus.Approved)) {
    return value;
  }
  return parseOrderStatus(String(value));
};

export class OrderController {
  private orderService: IOrderService;

  constructor(orderService?: IOrderService) {
    this.orderService = orderService ?? new OrderService();
  }

  async getAll(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { status, date, startDate, endDate, customerId } = req.query;
      const parsedStatus = parseOrderStatus(status as string | undefined);

      const parseDate = (value?: string | string[]) => {
        if (!value) return undefined;
        const parsed = new Date(String(value));
        return Number.isNaN(parsed.getTime()) ? undefined : parsed;
      };

      const filters: OrderFilters = {
        status: parsedStatus,
        customerId: customerId ? Number(customerId) : undefined,
      };

      const singleDate = parseDate(date as string | undefined);
      const rangeStart = parseDate(startDate as string | undefined);
      const rangeEnd = parseDate(endDate as string | undefined);

      if (singleDate) {
        const startOfDay = new Date(singleDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(singleDate);
        endOfDay.setHours(23, 59, 59, 999);
        filters.startDate = startOfDay;
        filters.endDate = endOfDay;
      } else {
        if (rangeStart) filters.startDate = rangeStart;
        if (rangeEnd) filters.endDate = rangeEnd;
      }

      const orders = await this.orderService.getAll(req.user.id, filters);
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
      const normalizedStatus = normalizeStatusInput(req.body.status);
      if (req.body.status !== undefined && normalizedStatus === undefined) {
        return error(res, "Invalid order status. Use PENDING or APPROVED.", 400);
      }
      req.body.status = normalizedStatus;

      const newOrder = await this.orderService.create(req.body, req.user.id);
      return success(res, newOrder, "Order created successfully.", 201);
    } catch (err: any) {
      return error(res, err?.message || "Error creating order.");
    }
  }

  async update(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { id } = req.params;
      const normalizedStatus = normalizeStatusInput(req.body.status);
      if (req.body.status !== undefined && normalizedStatus === undefined) {
        return error(res, "Invalid order status. Use PENDING or APPROVED.", 400);
      }
      req.body.status = normalizedStatus;

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
