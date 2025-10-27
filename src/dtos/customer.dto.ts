import { customers } from '@prisma/client'

export type CustomerDTO = customers

export type CreateCustomerDTO = Omit<customers, 'id' | 'created_at' | 'updated_at'>
export type UpdateCustomerDTO = Partial<CreateCustomerDTO>
