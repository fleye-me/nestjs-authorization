import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './common/authorization';
import { permissions } from './permissions';

// EXAMPLE
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthorizationModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          permissionsObject: permissions,
          permissionsSyncEndpointSecretKey: 'secret',
          async permissionsSyncEndpointCallback(permissions) {
            console.log('Syncing permissions...');
            console.log(`permissions ${permissions}`);
            // TODO: database sync here
            console.log(configService);
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
