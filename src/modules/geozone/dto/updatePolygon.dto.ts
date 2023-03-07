import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePolygonDto {
  @ApiProperty({
    example: 'Обнинск',
    description: `Название геозоны`,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: [
      [
        [55.0874, 36.6172],
        [55.1232, 36.6316],
        [55.1259, 36.6144],
      ],
    ],
    description: 'Массив координат (узлов полигона)',
  })
  @IsNotEmpty()
  polygon: number[][][];
}
