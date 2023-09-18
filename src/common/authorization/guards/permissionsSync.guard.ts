import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthorizationModuleOptionsToken } from '../authorization.definition';
import { AuthorizationConfig } from '../types/authorizationConfig.type';
import { PERMISSIONS_SYNC_ENDPOINT_SECRET_HEADER_KEY } from '../authorization.constants';

@Injectable()
export class PermissionsSyncGuard implements CanActivate {
  constructor(
    @Inject(AuthorizationModuleOptionsToken)
    private params: AuthorizationConfig,
  ) {}

  getPrivateKey() {
    const privateKey = this.params.permissionsSyncEndpointSecretKey;

    if (!privateKey) {
      throw new Error(
        `${PERMISSIONS_SYNC_ENDPOINT_SECRET_HEADER_KEY} not provided`,
      );
    }

    return privateKey;
  }

  canActivate(context: ExecutionContext): boolean {
    const privateKey = this.getPrivateKey();
    const keyFromHeader = context.switchToHttp().getRequest().headers[
      PERMISSIONS_SYNC_ENDPOINT_SECRET_HEADER_KEY
    ];

    if (keyFromHeader !== privateKey) {
      return false;
    }

    return true;
  }
}
