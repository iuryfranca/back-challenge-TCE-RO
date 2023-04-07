import { UserEntity } from './database/user.entity';
import { UserDto } from './dtos/user.dtos';
import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Post()
  @ApiBody({ type: UserDto })
  async create(@Body() user: UserDto): Promise<UserEntity> {
    return await this.usersService.create(user);
  }
}
