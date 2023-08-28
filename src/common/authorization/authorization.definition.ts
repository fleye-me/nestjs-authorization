import { ConfigurableModuleBuilder } from '@nestjs/common';
import { AuthorizationConfig } from './types/authorizationConfig.type';

const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<AuthorizationConfig>({
    moduleName: 'AuthorizationModule',
  }).build();

export const AuthorizationModuleClass = ConfigurableModuleClass;
export const AuthorizationModuleOptionsToken = MODULE_OPTIONS_TOKEN;
