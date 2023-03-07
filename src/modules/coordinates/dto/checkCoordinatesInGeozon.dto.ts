import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsLatitude, IsLongitude } from 'class-validator';

export class checkCoordinatesInGeozonDto {
  @ApiProperty({
    example: 33.666062322,
    description: `Долгота'`,
  })
  @IsLongitude()
  @Type(() => Number)
  lng: number;

  @ApiProperty({
    example: 44.556627232,
    description: `Широта'`,
  })
  @IsLatitude()
  @Type(() => Number)
  lat: number;
}
