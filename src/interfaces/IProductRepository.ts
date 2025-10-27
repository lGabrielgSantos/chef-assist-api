import { products } from "@prisma/client"

export interface IProductRepository {
  findAll(): Promise<products[]>
  findById(id: number): Promise<products | null>
  create(data: products): Promise<products>
  update(id: number, data: Partial<products>): Promise<products | null>
  delete(id: number): Promise<void>
}
