import { orders } from "@prisma/client"

export interface IOrderRepository{
  findAll(): Promise<orders[]>
  findById(id: number): Promise<orders | null>
  create(data: orders): Promise<orders>
  update(id: number, data: Partial<orders>): Promise<orders>
  delete(id: number): Promise<void>
}
