import { customers } from "@prisma/client"

export interface ICustomerRepository {
  findAll(user_id: string): Promise<customers[]>
  findById(id: number, user_id: string): Promise<customers | null>
  create(data: customers, user_id: string): Promise<customers>
  update(id: number, data: Partial<customers>, user_id: string): Promise<customers | null>
  delete(id: number, user_id: string): Promise<void>
}
