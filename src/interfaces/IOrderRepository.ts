import { orders } from "@prisma/client"

export interface IOrderRepository{
  findAll(user_id: string): Promise<orders[]>
  findById(id: number, user_id: string): Promise<orders | null>
  create(data: orders, user_id: string): Promise<orders>
  update(id: number, user_id: string, data: Partial<orders>): Promise<orders>
  delete(id: number, user_id: string): Promise<void>
}
