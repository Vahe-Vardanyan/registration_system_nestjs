import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdUserDto {
  @ApiProperty()
  @IsNotEmpty()
  user_id: number;
}
export class IdRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  role_id: number;
}

export class UserRolesDto {
  @ApiProperty()
  user_id: number;

  @ApiProperty()
  role_id: number;
}

