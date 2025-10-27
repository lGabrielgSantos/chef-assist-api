import { customers } from "@prisma/client"

export interface ICustomerRepository {
  findAll(): Promise<customers[]>
  findById(id: number): Promise<customers | null>
  create(data: customers): Promise<customers>
  update(id: number, data: Partial<customers>): Promise<customers | null>
  delete(id: number): Promise<void>
}
