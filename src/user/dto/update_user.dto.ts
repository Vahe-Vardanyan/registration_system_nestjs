import { ApiProperty } from "@nestjs/swagger";

export class UserUpdateInfoDo {
    @ApiProperty()
    user_name: string;
  }