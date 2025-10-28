
import { CreateProductDTO, ProductDTO, UpdateProductDTO } from "../dtos/product.dto"
export interface IProductService {
  getAll(user_id: string): Promise<ProductDTO[]>
  getById(id: number, user_id: string): Promise<ProductDTO | null>
  create(data: CreateProductDTO, user_id: string): Promise<ProductDTO>
  update(id: number, user_id: string, data: UpdateProductDTO): Promise<ProductDTO | null>
  delete(id: number, user_id: string): Promise<void>
}
