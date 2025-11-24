import { CustomerDTO } from "../dtos/customer.dto";
import { ICustomerRepository } from "../interfaces/ICustomerRepository";
import { ICustomerService } from "../interfaces/ICustomerService";
import { CustomerMapper } from "../mappers/customer.mapper";
import { CustomerRepository } from "../repositories/customer.repository";

export class CustomerService implements ICustomerService {
  private repository: ICustomerRepository;

  constructor(repository?: ICustomerRepository) {
    this.repository = repository ?? new CustomerRepository();
  }

  async getAll(userId: string): Promise<CustomerDTO[]> {
    try {
      const customers = await this.repository.findAll(userId);
      return CustomerMapper.toDTOList(customers);
    } catch (error: any) {
      console.error("[CustomerService] Failed to fetch customers:", error);
      throw new Error("Failed to load customers.");
    }
  }

  async getById(id: number, userId: string): Promise<CustomerDTO | null> {
    try {
      const customer = await this.repository.findById(id, userId);
      if (!customer) throw new Error("Customer not found.");
      return CustomerMapper.toDTO(customer);
    } catch (error: any) {
      console.error(`[CustomerService] Failed to fetch customer #${id}:`, error);
      throw new Error("Failed to fetch the customer.");
    }
  }

  async create(data: CustomerDTO, userId: string): Promise<CustomerDTO> {
    try {
      const mappedData = CustomerMapper.toCreatePrisma(data);
      console.log("Mapped Data:", mappedData);
      const customer = await this.repository.create(mappedData, userId);
      return CustomerMapper.toDTO(customer);
    } catch (error: any) {
      console.error("[CustomerService] Failed to create customer:", error);

      if (error.code === "P2002") {
        throw new Error("Duplicate customer detected.");
      }

      throw new Error("Failed to create the customer.");
    }
  }

  async update(id: number, data: CustomerDTO, userId: string): Promise<CustomerDTO | null> {
    try {
      const mappedData = CustomerMapper.toUpdatePrisma(data);
      const customer = await this.repository.update(id, mappedData, userId);

      if (!customer) {
        throw new Error("Customer not found for update.");
      }

      return CustomerMapper.toDTO(customer);
    } catch (error: any) {
      console.error(`[CustomerService] Failed to update customer #${id}:`, error);

      if (error.code === "P2025") {
        throw new Error("Customer not found for update.");
      }

      throw new Error("Failed to update the customer.");
    }
  }

  async delete(id: number, userId: string): Promise<void> {
    try {
      await this.repository.delete(id, userId);
    } catch (error: any) {
      console.error(`[CustomerService] Failed to delete customer #${id}:`, error);

      if (error.code === "P2025") {
        throw new Error("Customer not found for deletion.");
      }

      throw new Error("Failed to delete the customer.");
    }
  }
}
