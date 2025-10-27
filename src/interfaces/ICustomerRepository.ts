import { CustomerDTO } from "../dtos/customer.dto"

export interface ICustomerRepository {
  findAll(): Promise<CustomerDTO[]>
  findById(id: number): Promise<CustomerDTO | null>
  create(data: CustomerDTO): Promise<CustomerDTO>
  update(id: number, data: CustomerDTO): Promise<CustomerDTO | null>
  delete(id: number): Promise<void>
}
