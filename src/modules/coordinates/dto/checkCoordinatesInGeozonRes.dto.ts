import { ApiProperty } from '@nestjs/swagger';

export class checkCoordinatesInGeozonResDto {
  @ApiProperty({
    example: true,
    description: `Статус вхождения`,
  })
  intersects: boolean;
}
