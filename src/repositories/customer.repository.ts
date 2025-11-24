import { customers, PrismaClient } from "@prisma/client"
import { ICustomerRepository } from "../interfaces/ICustomerRepository"

const prisma = new PrismaClient()

export class CustomerRepository implements ICustomerRepository {
  async findAll(user_id: string): Promise<customers[]> {
    const customers = await prisma.customers.findMany({
      where: {user_id },
      orderBy: { id: "desc" },
    })
    return customers
  }

  async findById(id: number, user_id: string): Promise<customers | null> {
    const customer = await prisma.customers.findUnique({
      where: { id, user_id },
    })
    return customer
  }

  async create(data: customers, user_id: string): Promise<customers> {
    const customer = await prisma.customers.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        user_id: user_id,
        city: data.city ?? null,
      },
    })
    return customer
  }

  async update(id: number, data: customers, userId: string): Promise<customers | null> {
    const existing = await prisma.customers.findUnique({ where: { id, user_id: userId } })
    if (!existing) return null

    const customer = await prisma.customers.update({
      where: { id },
      data: {
        name: data.name ?? existing.name,
        phone: data.phone ?? existing.phone,
        email: data.email ?? existing.email,
        city: data.city ?? existing.city,
        updated_at: new Date(),
      },
    })
    return customer
  }

  async delete(id: number, userId: string): Promise<void> {
    await prisma.customers.delete({
      where: { id, user_id: userId },
    })
  }
}
