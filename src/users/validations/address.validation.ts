import { Address } from './../interfaces/address.interface';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'AddressValidator', async: false })
export class AddressValidator implements ValidatorConstraintInterface {
  validate(addressData: Address) {
    return addressData.cep.length > 0;
  }

  defaultMessage() {
    return 'Endereço inválido, digite um que faça sentido! 😅';
  }
}
