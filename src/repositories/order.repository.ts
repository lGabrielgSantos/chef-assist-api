import { PrismaClient } from "@prisma/client";
import { IOrderRepository } from "../interfaces/IOrderRepository";

const prisma = new PrismaClient();

export class OrderRepository implements IOrderRepository {
  async findAll() {
    return await prisma.orders.findMany();
  }

  async findById(id: number) {
    return await prisma.orders.findUnique({
      where: { id },
    });
  }
  async create(data: any) {
    const { order_items, ...orderData } = data;
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

  async update(id: number, data: any) {
    const { order_items, ...orderData } = data;
    const order = await prisma.orders.update({
      where: { id },
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

  async delete(id: number) {
    await prisma.order_items.deleteMany({
      where: { order_id: id },
    });
    await prisma.orders.delete({
      where: { id },
    });
  }
}
