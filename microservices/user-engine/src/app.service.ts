import { UserEntity } from './interfaces/user.entity';
import { User } from './interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ where: { status: 'ACTIVATE' } });
  }

  async find(userId: number): Promise<User> {
    const {
      id,
      name,
      affiliation,
      dateOfBirth,
      cpf,
      email,
      phone,
      status,
      street,
      numberHouse,
      neighborhood,
      cep,
      city,
      state,
    } = await this.userRepository.findOneBy({ id: userId });

    if (!id) {
      throw new Error();
    }

    const response: User = {
      id,
      name,
      affiliation,
      dateOfBirth,
      cpf,
      email,
      phone,
      status,
      street,
      numberHouse,
      neighborhood,
      cep,
      city,
      state,
    };

    return response;
  }

  async create(user: User): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async update(userData: UserEntity): Promise<void> {
    const {
      id,
      name,
      email,
      phone,
      affiliation,
      dateOfBirth,
      cpf,
      street,
      numberHouse,
      neighborhood,
      cep,
      city,
      state,
    } = userData;
    const user: User = await this.find(id);

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.phone = phone ? phone : user.phone;
    user.affiliation = affiliation ? affiliation : user.affiliation;
    user.dateOfBirth = dateOfBirth ? dateOfBirth : user.dateOfBirth;
    user.cpf = cpf ? cpf : user.cpf;
    user.street = street ? street : user.street;
    user.numberHouse = numberHouse ? numberHouse : user.numberHouse;
    user.neighborhood = neighborhood ? neighborhood : user.neighborhood;
    user.cep = cep ? cep : user.cep;
    user.city = city ? city : user.city;
    user.state = state ? state : user.state;

    await this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async activate(id: number): Promise<void> {
    await this.userRepository.update(id, { status: 'ACTIVATE' });
  }

  async inactivate(id: number): Promise<void> {
    await this.userRepository.update(id, { status: 'INACTIVATE' });
  }
}
