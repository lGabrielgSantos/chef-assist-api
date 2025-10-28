import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { success, error } from "../utils/response";

const productService = new ProductService();

export class ProductController {
  private productService: ProductService;

  constructor(productService?: ProductService) {
    this.productService = productService ?? new ProductService();
  }

  async getAll(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const products = await this.productService.getAll();
      return success(res, products, "Products fetched successfully.", 200);
    } catch (err) {
      return error(res, "Error fetching products.");
    }
  }

  async getById(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { id } = req.params;
      const product = await this.productService.getById(Number(id));
      return success(res, product, "Product found.", 200);
    } catch (err) {
      return error(res, "Product not found.", 404);
    }
  }

  async create(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const product = await this.productService.create(req.body);
      return success(res, product, "Product created successfully.", 201);
    } catch (err) {
      return error(res, "Error creating product.");
    }
  }

  async update(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { id } = req.params;
      const updated = await this.productService.update(Number(id), req.body);
      return success(res, updated, "Product updated successfully.", 200);
    } catch (err) {
      return error(res, "Error updating product.", 400);
    }
  }

  async delete(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { id } = req.params;
      await this.productService.delete(Number(id));
      return success(res, null, "Product deleted successfully.", 204);
    } catch (err) {
      return error(res, "Error deleting product.", 400);
    }
  }
}
