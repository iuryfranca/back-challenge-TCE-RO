import { CpfValidator } from './../validations/cpf.validation';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  ValidationArguments,
  Validate,
} from 'class-validator';
import { CepValidator } from '../validations/address.validation';

export class UserDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio! 😅' })
  @Length(3, 20, { message: 'Nome precisa ter entre 3 e 20 caracteres' })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: 'Afiliação não pode ser vazio! 😅' })
  @ApiProperty()
  affiliation: string;

  @IsNotEmpty({ message: 'Data de Nascimento não pode ser vazio! 😅' })
  @ApiProperty()
  dateOfBirth: Date;

  @IsNotEmpty({ message: 'CPF não pode ser vazio! 😅' })
  @Validate(CpfValidator)
  @ApiProperty()
  cpf: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio! 😅' })
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'Telefone não pode ser vazio! 😅' })
  @IsPhoneNumber('BR', {
    message: (args: ValidationArguments) => {
      if (args.value.length !== 10) {
        throw new BadRequestException(
          `${args.value} não é um número de telefone válido! 😅`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    },
  })
  @ApiProperty()
  phone: string;

  @IsNotEmpty({ message: 'Rua não pode ser vazio! 😅' })
  @ApiProperty()
  street: string;

  @IsNotEmpty({ message: 'Número da casa não pode ser vazio! 😅' })
  @ApiProperty()
  numberHouse: string;

  @IsNotEmpty({ message: 'Bairro não pode ser vazio! 😅' })
  @ApiProperty()
  neighborhood: string;

  @IsNotEmpty({ message: 'CEP não pode ser vazio! 😅' })
  @Validate(CepValidator)
  @ApiProperty()
  cep: string;

  @IsNotEmpty({ message: 'Cidade não pode ser vazio! 😅' })
  @ApiProperty()
  city: string;

  @IsNotEmpty({ message: 'Estado não pode ser vazio! 😅' })
  @ApiProperty()
  state: string;
}
