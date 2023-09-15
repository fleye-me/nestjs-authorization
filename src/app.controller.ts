import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Permission } from './common/authorization/authorization.decorator';
import { AuthorizationExampleGuard } from './common/authorization/example/authorizationExample.guard';
import { permissions } from './permissions';

@Controller()
@UseGuards(AuthorizationExampleGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Permission(permissions.users.create)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/2')
  @Permission(permissions.users.delete)
  getHello2(): string {
    return this.appService.getHello();
  }
}
