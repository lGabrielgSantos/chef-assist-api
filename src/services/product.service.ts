import { ProductRepository } from "../repositories/product.repository";
import { ProductMapper } from "../mappers/product.mapper";
import {
  CreateProductDTO,
  ProductDTO,
  UpdateProductDTO,
} from "../dtos/product.dto";
import { IProductService } from "../interfaces/IProductService";
import { IProductRepository } from "../interfaces/IProductRepository";

export class ProductService implements IProductService {
  private repository: IProductRepository;

  constructor(repository?: IProductRepository) {
    this.repository = repository ?? new ProductRepository();
  }

  async getAll(user_id: string): Promise<ProductDTO[]> {
    try {
      const products = await this.repository.findAll(user_id);
      return ProductMapper.toDTOList(products);
    } catch (error: any) {
      console.error("[ProductService] Failed to fetch products:", error);
      throw new Error("Failed to load products.");
    }
  }

  async getById(id: number, user_id: string): Promise<ProductDTO | null> {
    try {
      const product = await this.repository.findById(id, user_id);
      if (!product) throw new Error("Product not found.");
      return ProductMapper.toDTO(product);
    } catch (error: any) {
      console.error(`[ProductService] Failed to fetch product #${id}:`, error);
      throw new Error("Failed to fetch the product.");
    }
  }

  async create(data: CreateProductDTO, user_id: string): Promise<ProductDTO> {
    try {
      const mappedData = ProductMapper.toCreatePrisma(data);
      const product = await this.repository.create(mappedData, user_id);
      return ProductMapper.toDTO(product);
    } catch (error: any) {
      console.error("[ProductService] Failed to create product:", error);

      if (error.code === "P2002") {
        throw new Error("Duplicate product detected.");
      }

      throw new Error("Failed to create the product.");
    }
  }

  async update(id: number, user_id: string, data: UpdateProductDTO): Promise<ProductDTO> {
    try {
      const mappedData = ProductMapper.toUpdatePrisma(data);
      const product = await this.repository.update(id, user_id, mappedData);

      if (!product) {
        throw new Error("Product not found for update.");
      }

      return ProductMapper.toDTO(product);
    } catch (error: any) {
      console.error(`[ProductService] Failed to update product #${id}:`, error);

      if (error.code === "P2025") {
        throw new Error("Product not found for update.");
      }

      throw new Error("Failed to update the product.");
    }
  }

  async delete(id: number, user_id: string): Promise<void> {
    try {
      await this.repository.delete(id, user_id);
    } catch (error: any) {
      console.error(`[ProductService] Failed to delete product #${id}:`, error);

      if (error.code === "P2025") {
        throw new Error("Product not found for deletion.");
      }

      throw new Error("Failed to delete the product.");
    }
  }
}
