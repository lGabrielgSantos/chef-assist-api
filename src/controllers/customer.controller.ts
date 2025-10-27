import { Request, Response } from "express";
import { ICustomerService } from "../interfaces/ICustomerService";
import { error, success } from "../utils/response";
import { CustomerService } from "../services/customer.service";

export class CustomerController {
  private customerService: ICustomerService;

  constructor(customerService?: ICustomerService) {
    this.customerService = customerService ?? new CustomerService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const orders = await this.customerService.getAll();
      return success(res, orders, "Customers fetched successfully.", 200);
    } catch (err) {
      return error(res, "Error fetching customers.");
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const customer = await this.customerService.getById(Number(id));
      if (!customer) return error(res, "Customer not found.", 404);
      return success(res, customer, "Customer fetched successfully.", 200);
    } catch (err) {
      return error(res, "Error fetching customer.");
    }
  }
  async create(req: Request, res: Response) {
    try {
      const newCustomer = await this.customerService.create(req.body);
      return success(res, newCustomer, "Customer created successfully.", 201);
    } catch (err) {
      return error(res, "Error creating customer.");
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await this.customerService.update(Number(id), req.body);
      return success(res, updated, "Customer updated successfully.", 200);
    } catch (err) {
      return error(res, "Error updating customer.");
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.customerService.delete(Number(id));
      return success(res, null, "Customer deleted successfully.", 204);
    } catch (err) {
      return error(res, "Error deleting customer.");
    }
  }
}
