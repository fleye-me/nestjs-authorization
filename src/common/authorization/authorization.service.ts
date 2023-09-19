import { Inject, Injectable } from '@nestjs/common';
import { AuthorizationModuleOptionsToken } from './authorization.definition';
import { AuthorizationConfig } from './types/authorizationConfig.type';
import { PermissionSchema } from './types/permissionSchema.type';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject(AuthorizationModuleOptionsToken)
    private params: AuthorizationConfig,
  ) {}

  get permissionsObject() {
    return this.params.permissionsObject;
  }

  get permissionsList() {
    return Object.keys(this.params.permissionsObject).reduce<
      PermissionSchema[]
    >((list, resource) => {
      const permissionList = this.params.permissionsObject[resource];
      const resourceActions = Object.values(
        permissionList,
      ).map<PermissionSchema>((permissionItem) => {
        return {
          action: permissionItem.action.trim(),
          description: permissionItem.description.trim(),
          resource: resource.trim(),
        };
      });

      return [...list, ...resourceActions];
    }, []);
  }

  async handlePermissions() {
    return this.params.permissionsSyncEndpointCallback?.(
      this.permissionsList,
      this.permissionsObject,
    );
  }
}
