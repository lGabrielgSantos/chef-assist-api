import { products } from '@prisma/client'

export interface ProductDTO extends Omit<products, 'price'> {
  price: number
}


export type CreateProductDTO = Omit<products, 'id' | 'created_at' | 'updated_at'>
export type UpdateProductDTO = Partial<CreateProductDTO>