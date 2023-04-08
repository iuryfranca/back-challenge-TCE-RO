import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'CepValidator', async: true })
export class CepValidator implements ValidatorConstraintInterface {
  async validate(addressData: string) {
    const cepData: any = await fetch(
      `https://viacep.com.br/ws/${addressData}/json`,
    ).then((response) => response.json());

    if (cepData.erro) {
      return !cepData;
    }

    return cepData;
  }

  defaultMessage() {
    return 'CEP inválido, digite um que faça sentido! 😅';
  }
}
