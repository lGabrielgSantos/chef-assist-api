import { ProductRepository } from '../repositories/product.repository'
import { ProductMapper } from '../mappers/product.mapper'
import { ProductDTO } from '../dtos/product.dto'

export class ProductService {
  private repository: ProductRepository

  constructor() {
    this.repository = new ProductRepository()
  }

  async getAll(): Promise<ProductDTO[]> {
    const products = await this.repository.findAll()
    return ProductMapper.toDTOList(products)
  }

  async getById(id: number): Promise<ProductDTO | null> {
    const product = await this.repository.findById(id)
    return product ? ProductMapper.toDTO(product) : null
  }

  async create(data: any): Promise<ProductDTO> {
    const product = await this.repository.create(data)
    return ProductMapper.toDTO(product)
  }

  async update(id: number, data: any): Promise<ProductDTO> {
    const product = await this.repository.update(id, data)
    return ProductMapper.toDTO(product)
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
