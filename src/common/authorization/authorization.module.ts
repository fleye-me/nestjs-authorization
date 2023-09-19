import { Global, Module } from '@nestjs/common';

import { AuthorizationModuleClass } from './authorization.definition';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';

@Global()
@Module({
  imports: [],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  exports: [AuthorizationService],
})
export class AuthorizationModule extends AuthorizationModuleClass {}
