import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    example: 100,
    description: `Лимит`,
  })
  limit: number;

  @ApiProperty({
    example: 0,
    description: `Оффсет`,
  })
  offset: number;
}
