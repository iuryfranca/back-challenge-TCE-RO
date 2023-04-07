import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  affiliation: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;
}
