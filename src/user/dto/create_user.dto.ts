import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LoginUserDto } from './login_user.dto';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto extends LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  user_name: string;

  verification_code: number;

  email_update: boolean;

  @ApiProperty()
  role: string;
}

export class CodeDto {
  @ApiProperty()
  @IsNotEmpty()
  code: number;
  
  @ApiProperty()
  @IsNotEmpty()
  user_id: number;
}


export class UserEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;
}



export class UserSendEmailDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  verification_code: number;

  @ApiProperty()
  @IsNotEmpty()
  user_name: string;
}

