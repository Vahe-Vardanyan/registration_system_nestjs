import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesController } from './userRoles.controller';
import { UserRolesEntity } from './userRoles.entity';
import { UserRolesService } from './userRoles.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRolesEntity])],
  providers: [UserRolesService],
  controllers: [UserRolesController],
  exports: [UserRolesService],
})
export class UserRolesModule {}
