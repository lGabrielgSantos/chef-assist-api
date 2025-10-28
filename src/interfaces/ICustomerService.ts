import {
  CreateCustomerDTO,
  CustomerDTO,
  UpdateCustomerDTO,
} from "../dtos/customer.dto"

export interface ICustomerService {
  getAll(user_id: string): Promise<CustomerDTO[]>
  getById(id: number, user_id: string): Promise<CustomerDTO | null>
  create(data: CreateCustomerDTO, user_id: string): Promise<CustomerDTO>
  update(id: number, data: UpdateCustomerDTO, user_id: string): Promise<CustomerDTO | null>
  delete(id: number, user_id: string): Promise<void>
}
