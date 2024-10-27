import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../db/ormconfig';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/user.entity';
import { EmailModule } from './email/email.module';

import mailerConfig from './config/mailer.config';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './userRoles/userRoles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      load: [mailerConfig],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    AuthModule,
    EmailModule,
    RolesModule,
    UserRolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
