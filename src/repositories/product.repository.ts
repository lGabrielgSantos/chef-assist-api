import { PrismaClient } from '@prisma/client'
import { IProductRepository } from '../interfaces/IProductRepository'
import { IProduct } from '../interfaces/IProduct'

const prisma = new PrismaClient()

export class ProductRepository implements IProductRepository {
  async findAll(): Promise<IProduct[]> {
    return prisma.products.findMany()
  }

  async findById(id: number): Promise<IProduct | null> {
    return prisma.products.findUnique({ where: { id } })
  }

  async create(data: IProduct): Promise<IProduct> {
    return prisma.products.create({ data })
  }

  async update(id: number, data: IProduct): Promise<IProduct | null> {
    return prisma.products.update({ where: { id }, data })
  }

  async delete(id: number): Promise<void> {
    await prisma.products.delete({ where: { id } })
  }
}
