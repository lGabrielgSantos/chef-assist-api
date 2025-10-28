import { products } from "@prisma/client"

export interface IProductRepository {
  findAll(user_id: string): Promise<products[]>
  findById(id: number, user_id: string): Promise<products | null>
  create(data: products, user_id: string): Promise<products>
  update(id: number, user_id: string, data: Partial<products>): Promise<products | null>
  delete(id: number, user_id: string): Promise<void>
}
