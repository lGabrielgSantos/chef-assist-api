import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class OrderRepository {
  async findAll() {
    return prisma.orders.findMany({
      include: {
        order_items: true,
        customers: true,
      },
    })
  }

  async findById(id: number) {
    return prisma.orders.findUnique({
      where: { id },
      include: {
        order_items: true,
        customers: true,
      },
    })
  }

  async create(data: any) {
    return prisma.orders.create({ data })
  }

  async update(id: number, data: any) {
    return prisma.orders.update({ where: { id }, data })
  }

  async delete(id: number) {
    await prisma.orders.delete({ where: { id } })
  }
}