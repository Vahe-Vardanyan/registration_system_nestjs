import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { EmailModule } from "../email/email.module";
import { AuthModule } from "../auth/auth.module";
import { UserRolesModule } from "../userRoles/userRoles.module";
import { UserRolesEntity } from "../userRoles/userRoles.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,UserRolesEntity]),
    AuthModule,
    EmailModule,
    UserRolesModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
