import { IProductService } from '../interfaces/IProductService'
import { IProduct } from '../interfaces/IProduct'
import { ProductRepository } from '../repositories/product.repository'

export class ProductService implements IProductService {
  private repository: ProductRepository

  constructor() {
    this.repository = new ProductRepository()
  }

  async getAll(): Promise<IProduct[]> {
    return this.repository.findAll()
  }

  async getById(id: number): Promise<IProduct | null> {
    return this.repository.findById(id)
  }

  async create(data: IProduct): Promise<IProduct> {
    return this.repository.create(data)
  }

  async update(id: number, data: IProduct): Promise<IProduct | null> {
    return this.repository.update(id, data)
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
