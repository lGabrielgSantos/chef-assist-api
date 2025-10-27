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

  async getAll(): Promise<CustomerDTO[]> {
    const customers = await this.repository.findAll();
    return CustomerMapper.toDTOList(customers);
  }

  async getById(id: number): Promise<CustomerDTO | null> {
    const customer = await this.repository.findById(id);
    return customer ? CustomerMapper.toDTO(customer) : null;
  }

  async create(data: CustomerDTO): Promise<CustomerDTO> {
    const customer = await this.repository.create(
      CustomerMapper.toCreatePrisma(data)
    );
    return CustomerMapper.toDTO(customer);
  }

  async update(id: number, data: CustomerDTO): Promise<CustomerDTO | null> {
    const customer = await this.repository.update(
      id,
      CustomerMapper.toUpdatePrisma(data)
    );
    return customer ? CustomerMapper.toDTO(customer) : null;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
