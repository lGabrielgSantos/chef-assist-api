import { Request, Response } from "express";
import { ICustomerService } from "../interfaces/ICustomerService";
import { error, success } from "../utils/response";
import { CustomerService } from "../services/customer.service";

export class CustomerController {
  private customerService: ICustomerService;

  constructor(customerService?: ICustomerService) {
    this.customerService = customerService ?? new CustomerService();
  }

  async getAll(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const userId = req.user?.id;
      const customers = await this.customerService.getAll(userId);
      return success(res, customers, "Customers fetched successfully.", 200);
    } catch (err: any) {
      return error(res, err?.message || "Error fetching customers.");
    }
  }
  async getById(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const customer = await this.customerService.getById(Number(id), userId);
      if (!customer) return error(res, "Customer not found.", 404);
      return success(res, customer, "Customer fetched successfully.", 200);
    } catch (err: any) {
      return error(res, err?.message || "Error fetching customer.");
    }
  }
  async create(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const userId = req.user?.id;
      const newCustomer = await this.customerService.create(req.body, userId);
      return success(res, newCustomer, "Customer created successfully.", 201);
    } catch (err: any) {
      return error(res, err?.message || "Error creating customer.");
    }
  }
  async update(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      const updated = await this.customerService.update(Number(id), req.body, userId);
      return success(res, updated, "Customer updated successfully.", 200);
    } catch (err: any) {
      return error(res, err?.message || "Error updating customer.");
    }
  }
  async delete(req: Request & { user?: any; token?: string }, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;
      await this.customerService.delete(Number(id), userId);
      return success(res, null, "Customer deleted successfully.", 204);
    } catch (err: any) {
      return error(res, err?.message || "Error deleting customer.");
    }
  }
}
