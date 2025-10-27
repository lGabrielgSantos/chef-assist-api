import {
  CreateCustomerDTO,
  CustomerDTO,
  UpdateCustomerDTO,
} from "../dtos/customer.dto"

export interface ICustomerService {
  getAll(): Promise<CustomerDTO[]>
  getById(id: number): Promise<CustomerDTO | null>
  create(data: CreateCustomerDTO): Promise<CustomerDTO>
  update(id: number, data: UpdateCustomerDTO): Promise<CustomerDTO | null>
  delete(id: number): Promise<void>
}
