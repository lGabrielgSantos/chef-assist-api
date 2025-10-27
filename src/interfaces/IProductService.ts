
import { CreateProductDTO, ProductDTO, UpdateProductDTO } from "../dtos/product.dto"
export interface IProductService {
  getAll(): Promise<ProductDTO[]>
  getById(id: number): Promise<ProductDTO | null>
  create(data: CreateProductDTO): Promise<ProductDTO>
  update(id: number, data: UpdateProductDTO): Promise<ProductDTO | null>
  delete(id: number): Promise<void>
}
