import { PrismaClient } from '@prisma/client'
import { IProductRepository } from '../interfaces/IProductRepository'

const prisma = new PrismaClient()

export class ProductRepository implements IProductRepository {
  async findAll(user_id: string) {
    return prisma.products.findMany({ where: { user_id } })
  }
  
  async findById(id: number, user_id: string) {
    return prisma.products.findUnique({ where: { id, user_id } })
  }

  async create(data: any, user_id: string) {
    data.user_id = user_id
    return prisma.products.create({ data })
  }

  async update(id: number, user_id: string, data: any) {
    data.user_id = user_id
    return prisma.products.update({ where: { id, user_id }, data })
  }

  async delete(id: number, user_id: string) {
    await prisma.products.delete({ where: { id, user_id } })
  }
}
