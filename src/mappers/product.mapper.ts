import { products } from '@prisma/client'
import { CreateProductDTO, ProductDTO, UpdateProductDTO } from '../dtos/product.dto'

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
    static toCreatePrisma(data: CreateProductDTO): products {
    const now = new Date()

    return {
      name: data.name,
      description: data.description ?? null,
      price: data.price ?? null,
      created_at: now,
      updated_at: now,
    } as products
  }

  // 🔹 Mapeia UpdateProductDTO → objeto parcial de `products`
  static toUpdatePrisma(data: UpdateProductDTO): Partial<products> {
    return {
      name: data.name,
      description: data.description,
      price: data.price,
      updated_at: new Date(),
    }
  }
}
