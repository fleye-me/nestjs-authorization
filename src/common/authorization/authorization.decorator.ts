import { SetMetadata } from '@nestjs/common';
import { PermissionDef } from './types/permission.type';
import { AUTHORIZATION_METADATA_KEY } from './authorization.constants';

export const Permission = (permission: PermissionDef) =>
  SetMetadata(AUTHORIZATION_METADATA_KEY, permission);
