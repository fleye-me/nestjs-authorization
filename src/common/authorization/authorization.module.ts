import { Global, Inject, Module } from '@nestjs/common';
import { AuthorizationConfig } from './types/authorizationConfig.type';
import {
  AuthorizationModuleClass,
  AuthorizationModuleOptionsToken,
} from './authorization.definition';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';

@Global()
@Module({
  imports: [],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  exports: [AuthorizationService],
})
export class AuthorizationModule extends AuthorizationModuleClass {
  constructor(
    @Inject(AuthorizationModuleOptionsToken)
    private params: AuthorizationConfig,
  ) {
    super();
  }
}
