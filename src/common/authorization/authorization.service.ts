import { Inject, Injectable } from '@nestjs/common';
import { AuthorizationModuleOptionsToken } from './authorization.definition';
import { AuthorizationConfig } from './types/authorizationConfig.type';
import { ParsedPermissionSchema } from './types/parsedPermissionSchema.type';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject(AuthorizationModuleOptionsToken)
    private params: AuthorizationConfig,
  ) {}

  get permissions() {
    return this.params.permissions;
  }

  get parsedPermissions() {
    return Object.keys(this.params.permissions).reduce<
      ParsedPermissionSchema[]
    >((list, resource) => {
      const permissionList = this.params.permissions[resource];
      const resourceActions = Object.values(permissionList).map(
        (permissionItem) => {
          return {
            action: permissionItem.action,
            description: permissionItem.description,
            resource,
          } as ParsedPermissionSchema;
        },
      );

      return [...list, ...resourceActions];
    }, []);
  }

  async syncPermissions() {
    return this.params.onSyncPermissions?.(
      this.parsedPermissions,
      this.params.permissions,
    );
  }
}
