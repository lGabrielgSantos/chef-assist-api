import { getTestProduct } from "../repositories/product.repository";
import { Product } from "../models/product.model";

export async function getProductTest(): Promise<Product> {
  const product = await getTestProduct();
  // Exemplo: lógica de negócio
  product.price = Number(product.price.toFixed(2));
  return product;
}
