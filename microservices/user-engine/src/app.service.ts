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
      address,
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
      address,
    };

    return response;
  }

  async create(user: User): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async update(userData: UserEntity): Promise<void> {
    const { id, name, email, phone, affiliation, dateOfBirth, cpf, address } =
      userData;
    const user: User = await this.find(id);

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.phone = phone ? phone : user.phone;
    user.affiliation = affiliation ? affiliation : user.affiliation;
    user.dateOfBirth = dateOfBirth ? dateOfBirth : user.dateOfBirth;
    user.cpf = cpf ? cpf : user.cpf;
    user.address = address ? address : user.address;

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
