import { Request, Response } from 'express'
import { ProductService } from '../services/product.service'
import { success, error } from '../utils/response'

const productService = new ProductService()

export class ProductController {

  async getAll(req: Request, res: Response) {
    try {
      const products = await productService.getAll()
      return success(res, products, 'Products fetched successfully.', 200)
    } catch (err) {
      return error(res, 'Error fetching products.')
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const product = await productService.getById(Number(id))
      return success(res, product, 'Product found.', 200)
    } catch (err) {
      return error(res, 'Product not found.', 404)
    }
  }

  async create(req: Request, res: Response) {
    try {
      const product = await productService.create(req.body)
      return success(res, product, 'Product created successfully.', 201)
    } catch (err) {
      return error(res, 'Error creating product.')
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const updated = await productService.update(Number(id), req.body)
      return success(res, updated, 'Product updated successfully.', 200)
    } catch (err) {
      return error(res, 'Error updating product.', 400)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      await productService.delete(Number(id))
      return success(res, null, 'Product deleted successfully.', 204)
    } catch (err) {
      return error(res, 'Error deleting product.', 400)
    }
  }
}
