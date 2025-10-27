import { PrismaClient } from "@prisma/client"
import { CustomerDTO } from "../dtos/customer.dto"
import { ICustomerRepository } from "../interfaces/ICustomerRepository"

const prisma = new PrismaClient()

export class CustomerRepository implements ICustomerRepository {
  async findAll(): Promise<CustomerDTO[]> {
    const customers = await prisma.customers.findMany({
      orderBy: { id: "desc" },
    })
    return customers
  }

  async findById(id: number): Promise<CustomerDTO | null> {
    const customer = await prisma.customers.findUnique({
      where: { id },
    })
    return customer
  }

  async create(data: CustomerDTO): Promise<CustomerDTO> {
    const customer = await prisma.customers.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
      },
    })
    return customer
  }

  async update(id: number, data: CustomerDTO): Promise<CustomerDTO | null> {
    const existing = await prisma.customers.findUnique({ where: { id } })
    if (!existing) return null

    const customer = await prisma.customers.update({
      where: { id },
      data: {
        name: data.name ?? existing.name,
        phone: data.phone ?? existing.phone,
        email: data.email ?? existing.email,
      },
    })
    return customer
  }

  async delete(id: number): Promise<void> {
    await prisma.customers.delete({
      where: { id },
    })
  }
}
