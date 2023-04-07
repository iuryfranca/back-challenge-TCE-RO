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
    const { id, name, email, password, phone, status } =
      await this.userRepository.findOneBy({ id: userId });

    if (!id) {
      throw new Error();
    }

    const response: User = {
      id,
      name,
      email,
      phone,
      password,
      status,
    };

    return response;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  async update(userData: UserEntity): Promise<void> {
    const { id, name, email, phone, password } = userData;
    const user: User = await this.find(id);

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.phone = phone ? phone : user.phone;
    user.password = password ? password : user.password;

    await this.userRepository.save(user as UserEntity);
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
