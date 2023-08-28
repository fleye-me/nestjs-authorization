import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTHORIZATION_METADATA_KEY } from '../authorization.constants';
import { PermissionDef } from '../types/permission.type';

@Injectable()
export class AuthorizationExampleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  getPermission(context: ExecutionContext) {
    const permission = this.reflector.get<PermissionDef>(
      AUTHORIZATION_METADATA_KEY,
      context.getHandler(),
    );

    return permission;
  }

  canActivate(context: ExecutionContext): boolean {
    const permission = this.getPermission(context);
    console.debug('permission', permission);
    return true;
  }
}
