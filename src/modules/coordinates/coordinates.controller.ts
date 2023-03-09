import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetPolygonDto } from '../geozone/dto';
import { CoordinatesService } from './coordinates.service';
import {
  checkCoordinatesInGeozonDto,
  checkCoordinatesInGeozonResDto,
} from './dto';

@ApiTags(`Координаты`)
@Controller('/coordinates')
export class CoordinatesController {
  constructor(private readonly coordinatesService: CoordinatesService) {}

  @ApiOperation({ summary: `Вхождение координаты в конкретную геозону` })
  @ApiParam({
    name: 'id',
    description: 'ID геозоны',
    required: true,
  })
  @ApiQuery({
    name: 'lng',
    description: `longitude - долгота`,
    required: true,
  })
  @ApiQuery({
    name: 'lat',
    description: `latitude - широта`,
    required: true,
  })
  @ApiResponse({ status: 200, type: checkCoordinatesInGeozonResDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Get(':id')
  async checkCoordinatesInGeozon(
    @Param('id', ParseUUIDPipe) geozoneId: string,
    @Query() coordinates: checkCoordinatesInGeozonDto,
  ): Promise<checkCoordinatesInGeozonResDto> {
    return await this.coordinatesService.checkCoordinatesInGeozon(
      geozoneId,
      coordinates,
    );
  }

  @ApiOperation({ summary: `Вхождение координаты во все геозоны` })
  @ApiQuery({
    name: 'lng',
    description: `longitude - долгота`,
    required: true,
  })
  @ApiQuery({
    name: 'lat',
    description: `latitude - широта`,
    required: true,
  })
  @ApiResponse({ status: 200, type: [GetPolygonDto] })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Get()
  async checkCoordinatesInAllGeozons(
    @Query() coordinates: checkCoordinatesInGeozonDto,
  ): Promise<GetPolygonDto[] | []> {
    return await this.coordinatesService.checkCoordinatesInGeozons(coordinates);
  }
}
