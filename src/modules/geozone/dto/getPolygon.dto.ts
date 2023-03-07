import { ApiProperty } from '@nestjs/swagger';

export class GetPolygonDto {
  @ApiProperty({
    example: '064b2dc3-1a63-4cc0-aaee-8d87cb3cc51a',
    description: `ID геозоны`,
  })
  id: string;

  @ApiProperty({
    example: 'Обнинск',
    description: `Название геозоны`,
  })
  title: string;

  @ApiProperty({
    example: {
      type: 'Polygon',
      coordinates: [
        [
          [55.0874, 36.6172],
          [55.1232, 36.6316],
          [55.1259, 36.6144],
        ],
      ],
    },
    description: 'Массив координат (узлов полигона)',
  })
  polygon: {
    type: string;
    coordinates: number[][][];
  };
}
