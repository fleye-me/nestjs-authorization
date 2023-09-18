import { PermissionSchema } from './permissionSchema.type';
import { PermissionsObject } from './permission.type';

type PermissionsSyncEndpointCallback = (
  permissionsList: PermissionSchema[],
  permissionsObject: PermissionsObject,
) => void | Promise<void>;

export type AuthorizationConfigWithSync = {
  permissionsSyncEndpointSecretKey: string;
  permissionsSyncEndpointCallback: PermissionsSyncEndpointCallback;
};

export type AuthorizationConfigWithouSync = {
  permissionsSyncEndpointSecretKey?: string;
  permissionsSyncEndpointCallback?: PermissionsSyncEndpointCallback;
};

export type AuthorizationConfig = {
  permissionsObject: PermissionsObject;
} & (AuthorizationConfigWithSync | AuthorizationConfigWithouSync);
