import { customers } from '@prisma/client'
import { CustomerDTO } from '../dtos/customer.dto'

export class CustomerMapper {
  static toDTO(customer: customers): CustomerDTO {
    return { ...customer }
  }

  static toDTOList(customers: customers[]): CustomerDTO[] {
    return customers.map((c) => this.toDTO(c))
  }
}
