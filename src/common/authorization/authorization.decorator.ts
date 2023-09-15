import { SetMetadata } from '@nestjs/common';

import { AUTHORIZATION_METADATA_KEY } from './authorization.constants';
import { PermissionDef } from './types/permission.type';

export const Permission = (permission: PermissionDef) =>
  SetMetadata(AUTHORIZATION_METADATA_KEY, permission);
