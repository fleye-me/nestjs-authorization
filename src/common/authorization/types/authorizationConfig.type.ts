import { ParsedPermissionSchema } from './parsedPermissionSchema.type';
import { PermissionsListDef } from './permission.type';

type SyncPermissionsFn = (
  parsedPermissions: ParsedPermissionSchema[],
  permissions: PermissionsListDef,
) => void | Promise<void>;

export type AuthorizationConfigWithSync = {
  authorizationPrivateKey: string;
  onSyncPermissions: SyncPermissionsFn;
};

export type AuthorizationConfigWithouSync = {
  authorizationPrivateKey?: string;
  onSyncPermissions?: SyncPermissionsFn;
};

export type AuthorizationConfig = {
  permissions: PermissionsListDef;
} & (AuthorizationConfigWithSync | AuthorizationConfigWithouSync);
