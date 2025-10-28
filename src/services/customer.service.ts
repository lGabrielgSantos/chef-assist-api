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
    const customers = await this.repository.findAll(userId);
    return CustomerMapper.toDTOList(customers);
  }

  async getById(id: number, userId: string): Promise<CustomerDTO | null> {
    const customer = await this.repository.findById(id, userId);
    return customer ? CustomerMapper.toDTO(customer) : null;
  }

  async create(data: CustomerDTO, userId: string): Promise<CustomerDTO> {
    const customer = await this.repository.create(
      CustomerMapper.toCreatePrisma(data),
      userId
    );
    return CustomerMapper.toDTO(customer);
  }

  async update(id: number, data: CustomerDTO, userId: string): Promise<CustomerDTO | null> {
    const customer = await this.repository.update(
      id,
      CustomerMapper.toUpdatePrisma(data),
      userId
    );
    return customer ? CustomerMapper.toDTO(customer) : null;
  }

  async delete(id: number, userId: string): Promise<void> {
    await this.repository.delete(id, userId);
  }
}
