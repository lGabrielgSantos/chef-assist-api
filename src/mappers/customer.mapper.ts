import { customers } from '@prisma/client'
import { CustomerDTO } from '../dtos/customer.dto'

export class CustomerMapper {
  static toDTO(customer: customers): CustomerDTO {
    return { ...customer }
  }

  static toDTOList(customers: customers[]): CustomerDTO[] {
    return customers.map((c) => this.toDTO(c))
  }

  static toCreatePrisma(data: CustomerDTO): customers {
    const now = new Date()
    return {
      id: 0, 
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      created_at: now,
      updated_at: now,
    } as unknown as customers
  } 

  static toUpdatePrisma(data: CustomerDTO): Partial<customers> {
    return {
      name: data.name ?? undefined,
      email: data.email ?? undefined,
      phone: data.phone ?? undefined,
      updated_at: new Date(),
    }
  }
}
