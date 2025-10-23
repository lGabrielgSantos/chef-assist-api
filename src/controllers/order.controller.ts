import { Request, Response } from 'express'
import { OrderService } from '../services/order.service'
import { success, error } from '../utils/response'

const orderService = new OrderService()

export class OrderController {
  async getAll(req: Request, res: Response) {
    try {
      const orders = await orderService.getAll()
      return success(res, orders, 'Orders fetched successfully.', 200)
    } catch (err) {
      return error(res, 'Error fetching orders.')
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const order = await orderService.getById(Number(id))
      if (!order) return error(res, 'Order not found.', 404)
      return success(res, order, 'Order fetched successfully.', 200)
    } catch (err) {
      return error(res, 'Error fetching order.')
    }
  }

  async create(req: Request, res: Response) {
    try {
      const newOrder = await orderService.create(req.body)
      return success(res, newOrder, 'Order created successfully.', 201)
    } catch (err) {
      return error(res, 'Error creating order.')
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const updated = await orderService.update(Number(id), req.body)
      return success(res, updated, 'Order updated successfully.', 200)
    } catch (err) {
      return error(res, 'Error updating order.')
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      await orderService.delete(Number(id))
      return success(res, null, 'Order deleted successfully.', 204)
    } catch (err) {
      return error(res, 'Error deleting order.')
    }
  }
}
