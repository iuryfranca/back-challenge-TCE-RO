import { Client, Transport, ClientKafka } from '@nestjs/microservices';
import { User } from './interfaces/user.interface';
import { UserDto } from './dtos/user.dtos';
import {
  Body,
  Controller,
  Get,
  Post,
  OnModuleInit,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
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
    const requestPatters = ['find-all-users', 'find-user'];

    requestPatters.forEach(async (pattern) => {
      this.client.subscribeToResponseOf(pattern);
      await this.client.connect();
    });
  }

  @Get()
  index(): Observable<User[]> {
    return this.client.send('find-all-users', {});
  }

  @Get(':id')
  find(@Param('id') id: number): Observable<User> {
    return this.client.send('find-user', { id });
  }

  @Post()
  @ApiBody({ type: UserDto })
  create(@Body() user: UserDto) {
    return this.client.emit('create-user', user);
  }

  @Put(':id')
  @ApiBody({ type: UserDto })
  update(
    @Param('id') id: number,
    @Body() { name, email, phone, affiliation, dateOfBirth, cpf }: UserDto,
  ) {
    const payload = {
      id,
      name,
      email,
      phone,
      affiliation,
      dateOfBirth,
      cpf,
    };

    return this.client.emit('update-user', payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.client.emit('delete-user', { id });
  }

  @Patch(':id/activate')
  activate(@Param('id') id: number) {
    return this.client.emit('activate-user', { id });
  }

  @Patch(':id/inactivate')
  inactivate(@Param('id') id: number) {
    return this.client.emit('inactivate-user', { id });
  }
}
