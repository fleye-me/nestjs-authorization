import { Controller, Patch, UseGuards } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { PermissionsSyncGuard } from './guards/permissionsSync.guard';

@Controller('/authorization')
@UseGuards(PermissionsSyncGuard)
export class AuthorizationController {
  constructor(private readonly service: AuthorizationService) {}

  @Patch('/sync')
  handlePermissions() {
    return this.service.handlePermissions();
  }
}
