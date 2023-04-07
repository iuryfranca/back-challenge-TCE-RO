import { Client, Transport, ClientKafka } from '@nestjs/microservices';
import { UserEntity } from './database/user.entity';
import { UserDto } from './dtos/user.dtos';
import { Body, Controller, Get, Post, OnModuleInit } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@Controller('users')
export class UsersController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  async onModuleInit() {
    const requestPatters = ['find-all-users', 'create-user'];

    requestPatters.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Get()
  index(): Observable<UserEntity[]> {
    return this.client.send('find-all-users', {});
  }

  @Post()
  @ApiBody({ type: UserDto })
  create(@Body() user: UserDto): Observable<UserEntity> {
    return this.client.send('create-user', user);
  }
}
