import { IProduct } from './IProduct'

export interface IProductService {
  getAll(): Promise<IProduct[]>
  getById(id: number): Promise<IProduct | null>
  create(data: IProduct): Promise<IProduct>
  update(id: number, data: IProduct): Promise<IProduct | null>
  delete(id: number): Promise<void>
}
