import { products } from '@prisma/client'

export interface ProductDTO extends Omit<products, 'price'> {
  price: number
}
