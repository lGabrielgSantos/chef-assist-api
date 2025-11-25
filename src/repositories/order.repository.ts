import { PrismaClient } from "@prisma/client";
import { IOrderRepository } from "../interfaces/IOrderRepository";
import { OrderFilters } from "../interfaces/OrderFilters";

const prisma = new PrismaClient();

export class OrderRepository implements IOrderRepository {
  async findAll(user_id: string, filters?: OrderFilters) {
    const where: any = { user_id };

    if (filters?.customerId) {
      where.customer_id = filters.customerId;
    }

    if (filters?.startDate || filters?.endDate) {
      where.order_date = {};
      if (filters.startDate) where.order_date.gte = filters.startDate;
      if (filters.endDate) where.order_date.lte = filters.endDate;
    }

    const orders = await prisma.orders.findMany({
      where,
      orderBy: { order_date: "desc" },
    });

    if (filters?.status) {
      return orders.filter((order: any) => order.status === filters.status);
    }

    return orders;
  }

  async findById(id: number, user_id: string) {
    return await prisma.orders.findUnique({
      where: { id, user_id },
    });
  }
  async create(data: any, user_id: string) {
    const { order_items, ...orderData } = data;
    orderData.user_id = user_id;

    delete orderData.id;

    const order = await prisma.orders.create({
      data: orderData,
    });

    if (order_items && order_items.length > 0) {
      const itemsData = order_items.map((item: any) => ({
        ...item,
        order_id: order.id,
      }));

      await prisma.order_items.createMany({
        data: itemsData,
      });
    }

    return order;
  }

  async update(id: number, user_id: string, data: any) {
    const { order_items, ...orderData } = data;
    const order = await prisma.orders.update({
      where: { id, user_id },
      data: orderData,
    });
    if (order_items) {
      await prisma.order_items.deleteMany({
        where: { order_id: id },
      });
      const itemsData = order_items.map((item: any) => ({
        ...item,
        order_id: id,
      }));
      await prisma.order_items.createMany({
        data: itemsData,
      });
    }
    return order;
  }

  async delete(id: number, user_id: string) {
    await prisma.order_items.deleteMany({
      where: { order_id: id },
    });
    await prisma.orders.delete({
      where: { id, user_id },
    });
  }
}
