import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Permission } from './common/authorization/authorization.decorator';
import { AuthorizationExampleGuard } from './common/authorization/example/authorizationExample.guard';

@Controller()
@UseGuards(AuthorizationExampleGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Permission({ action: 'app.test', description: 'read' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/2')
  @Permission({ action: 'app.test', description: 'read' })
  getHello2(): string {
    return this.appService.getHello();
  }
}
