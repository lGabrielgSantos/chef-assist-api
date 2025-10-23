import { products } from '@prisma/client'
import { ProductDTO } from '../dtos/product.dto'

export class ProductMapper {
  static toDTO(product: products): ProductDTO {
    return {
      ...product,
      price: product.price ? Number(product.price) : 0,
    }
  }

  static toDTOList(products: products[]): ProductDTO[] {
    return products.map((product) => this.toDTO(product))
  }
}
