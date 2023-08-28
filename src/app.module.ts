import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './common/authorization/authorization.module';

@Module({
  imports: [
    AuthorizationModule.register({
      onInit(permissionMap, defaultPermissions) {
        console.log(permissionMap, defaultPermissions);
      },
      defaultPermissions: [
        {
          action: 'invoice.view-table-report',
          description: 'View table report',
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
