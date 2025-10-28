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
      const products = await this.productService.getAll(req.user?.id);
      return success(res, products, "Products fetched successfully.", 200);
    } catch (err: any) {
      return error(res, "Error fetching products.");
    }
  }

  async getById(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { id } = req.params;
      const product = await this.productService.getById(
        Number(id),
        req.user?.id
      );
      return success(res, product, "Product found.", 200);
    } catch (err: any) {
      return error(res, err?.message || "Product not found.", 404);
    }
  }

  async create(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const product = await this.productService.create(req.body, req.user?.id);
      return success(res, product, "Product created successfully.", 201);
    } catch (err: any) {
      return error(res, err?.message || "Error creating product.");
    }
  }

  async update(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { id } = req.params;
      const updated = await this.productService.update(
        Number(id),
        req.user?.id,
        req.body
      );
      return success(res, updated, "Product updated successfully.", 200);
    } catch (err: any) {
      return error(res, err?.message || "Error updating product.", 400);
    }
  }

  async delete(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { id } = req.params;
      await this.productService.delete(Number(id), req.user?.id);
      return success(res, null, "Product deleted successfully.", 204);
    } catch (err: any) {
      return error(res, err?.message || "Error deleting product.", 400);
    }
  }
}
