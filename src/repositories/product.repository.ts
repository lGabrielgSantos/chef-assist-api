import { PrismaClient } from '@prisma/client'
import { IProductRepository } from '../interfaces/IProductRepository'

const prisma = new PrismaClient()

export class ProductRepository implements IProductRepository {
  async findAll() {
    return prisma.products.findMany()
  }
  
  async findById(id: number) {
    return prisma.products.findUnique({ where: { id } })
  }

  async create(data: any) {
    return prisma.products.create({ data })
  }

  async update(id: number, data: any) {
    return prisma.products.update({ where: { id }, data })
  }

  async delete(id: number) {
    await prisma.products.delete({ where: { id } })
  }
}
