import { Address } from './address.interface';

export interface User {
  id?: number;
  name: string;
  affiliation: string;
  dateOfBirth: Date;
  cpf: string;
  email: string;
  phone: string;
  status?: 'ACTIVATE' | 'INACTIVATE';
  address: Address;
}
