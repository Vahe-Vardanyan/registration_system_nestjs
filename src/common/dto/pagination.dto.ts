import { ApiProperty } from "@nestjs/swagger";
export class PaginationDto {
  @ApiProperty()
  skip: number;

  @ApiProperty()
  take: number;
}
