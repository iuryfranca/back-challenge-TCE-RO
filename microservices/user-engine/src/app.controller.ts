import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserEntity } from './interfaces/user.entity';
import { User } from './interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('find-all-users')
  async index(): Promise<UserEntity[]> {
    return this.appService.findAll();
  }

  @MessagePattern('find-user')
  async find(@Payload() data: any): Promise<User> {
    return this.appService.find(Number(data.id));
  }

  @MessagePattern('create-user')
  async create(@Payload() data: any): Promise<UserEntity> {
    this.logger.log(`create-user: ${JSON.stringify(data)}`);

    return await this.appService.create(data);
  }

  @MessagePattern('update-user')
  async update(@Payload() data: any): Promise<void> {
    this.logger.log(`update-user: ${JSON.stringify(data)}`);

    await this.appService.update(data);
  }

  @MessagePattern('delete-user')
  async remove(@Payload() data: any): Promise<void> {
    return this.appService.delete(Number(data.id));
  }

  @MessagePattern('activate-user')
  async activate(@Payload() data: any): Promise<void> {
    return this.appService.activate(Number(data.id));
  }

  @MessagePattern('inactivate-user')
  async inactivate(@Payload() data: any): Promise<void> {
    return this.appService.inactivate(Number(data.id));
  }
}
