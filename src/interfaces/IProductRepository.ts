import { ProductDTO } from "../dtos/product.dto"

export interface IProductRepository {
  findAll(): Promise<ProductDTO[]>
  findById(id: number): Promise<ProductDTO | null>
  create(data: ProductDTO): Promise<ProductDTO>
  update(id: number, data: ProductDTO): Promise<ProductDTO | null>
  delete(id: number): Promise<void>
}
