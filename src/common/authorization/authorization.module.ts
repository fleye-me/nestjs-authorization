import { Inject, Module, NestModule } from '@nestjs/common';
import { AUTHORIZATION_METADATA_KEY } from './authorization.constants';
import { AuthorizationConfig } from './types/authorizationConfig.type';
import {
  AuthorizationModuleClass,
  AuthorizationModuleOptionsToken,
} from './authorization.definition';

import { DiscoveryModule, DiscoveryService } from '@golevelup/nestjs-discovery';
import { PermissionDef } from './types/permission.type';

@Module({
  imports: [DiscoveryModule],
  providers: [],
  exports: [],
})
export class AuthorizationModule
  extends AuthorizationModuleClass
  implements NestModule
{
  constructor(
    @Inject(AuthorizationModuleOptionsToken)
    private params: AuthorizationConfig,
    private readonly discover: DiscoveryService,
  ) {
    super();
  }

  private get defaultPermissions() {
    const { defaultPermissions } = this.params;
    if (!defaultPermissions) {
      return [];
    }

    if (Array.isArray(defaultPermissions)) {
      return defaultPermissions;
    }

    const formattedPermissions: PermissionDef[] = [];
    for (const prefix in defaultPermissions) {
      const permissions = defaultPermissions[prefix];
      permissions.forEach((permission) => {
        formattedPermissions.push({
          ...permission,
          action: `${prefix}.${permission.action}`,
        });
      });
    }

    return formattedPermissions;
  }

  private async getControllersPermissions() {
    const providers =
      await this.discover.controllerMethodsWithMetaAtKey<PermissionDef>(
        AUTHORIZATION_METADATA_KEY,
      );

    const permissions = providers
      .map((provider) => provider.meta)
      .reduce((acc, permission) => {
        const { action } = permission;
        if (!acc[action]) {
          acc[action] = permission;
        }
        return acc;
      }, {});

    return Object.values<PermissionDef>(permissions);
  }

  async configure() {
    const { onInit } = this.params;
    const permissions = await this.getControllersPermissions();
    await onInit(permissions, this.defaultPermissions);
  }
}
