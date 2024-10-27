import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RolesDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
