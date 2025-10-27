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

  async getAll(): Promise<ProductDTO[]> {
    const products = await this.repository.findAll();
    return ProductMapper.toDTOList(products);
  }

  async getById(id: number): Promise<ProductDTO | null> {
    const product = await this.repository.findById(id);
    return product ? ProductMapper.toDTO(product) : null;
  }

  async create(data: CreateProductDTO): Promise<ProductDTO> {
    const product = await this.repository.create(
      ProductMapper.toCreatePrisma(data)
    );
    return ProductMapper.toDTO(product);
  }

  async update(id: number, data: UpdateProductDTO): Promise<ProductDTO> {
    const product = await this.repository.update(
      id,
      ProductMapper.toUpdatePrisma(data)
    );
    if (!product) throw new Error("Product not found");
    return ProductMapper.toDTO(product);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
