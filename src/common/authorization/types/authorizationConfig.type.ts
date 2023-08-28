import { PermissionDef } from './permission.type';

export type AuthorizationConfig = {
  onInit: (
    permissionMap: PermissionDef[],
    defaultPermissions: PermissionDef[],
  ) => Promise<void> | void;
  defaultPermissions?: PermissionDef[] | { [prefix: string]: PermissionDef[] };
};
