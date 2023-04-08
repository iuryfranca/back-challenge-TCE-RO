import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { cpf } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'CpfValidator', async: false })
export class CpfValidator implements ValidatorConstraintInterface {
  validate(numberCpf: string) {
    const cpfIsNumber = cpf.verifierDigit(numberCpf);
    return cpf.isValid(
      Number.isNaN(cpfIsNumber) ? cpfIsNumber.toString() : numberCpf,
    );
  }

  defaultMessage() {
    return 'CPF inválido, digite um que faça sentido! 😅';
  }
}
