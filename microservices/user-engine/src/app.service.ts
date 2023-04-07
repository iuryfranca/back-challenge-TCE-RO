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
    return await this.userRepository.find();
  }

  async find(userId: number): Promise<User> {
    const { id, name, email, password, phone } =
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
    };

    return response;
  }

  async create(user: User): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }
}