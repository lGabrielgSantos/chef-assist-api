import { Product } from "../models/product.model";

export async function getTestProduct(): Promise<Product> {
  return {
    id: 1,
    name: "Ração Premium Boi Saúde",
    price: 199.9,
    description: "Suplemento mineral proteico energético de alta performance."
  };
}