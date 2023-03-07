import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatePolygonDto,
  GetPolygonDto,
  PaginationDto,
  UpdatePolygonDto,
} from './dto';
import { GeozoneService } from './geozone.service';
import { CheckPolygonGuard } from './quard/checkPolygon.guard';

@ApiTags(`Геозоны`)
@Controller('/geozone')
export class GeozoneController {
  constructor(private readonly geozoneService: GeozoneService) {}

  @ApiOperation({ summary: `Создание геозоны` })
  @ApiResponse({ status: 200, type: GetPolygonDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @UseGuards(CheckPolygonGuard)
  @Post()
  async createPolygon(
    @Body() createPolygonDto: CreatePolygonDto,
  ): Promise<GetPolygonDto> {
    return await this.geozoneService.createPolygon(createPolygonDto);
  }
  
  @ApiOperation({ summary: `Получение всех геозон` })
  @ApiResponse({ status: 200, type: [GetPolygonDto] })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Get()
  async getPolygons(
    @Query() paginationDto: PaginationDto,
  ): Promise<GetPolygonDto[] | []> {
    return await this.geozoneService.getPolygons(paginationDto);
  }

  @ApiOperation({ summary: `Обновление геозоны` })
  @ApiParam({
    name: 'id',
    description: 'ID геозоны',
  })
  @ApiResponse({ status: 200, type: GetPolygonDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @UseGuards(CheckPolygonGuard)
  @Put(':id')
  async updatePolygon(
    @Param('id', ParseUUIDPipe) geozoneId: string,
    @Body() updatePolygonDto: UpdatePolygonDto,
  ): Promise<GetPolygonDto> {
    return await this.geozoneService.updatePolygon(geozoneId, updatePolygonDto);
  }

  @ApiOperation({ summary: `Получение геозоны по ID` })
  @ApiParam({
    name: 'id',
    description: 'ID геозоны',
  })
  @ApiResponse({ status: 200, type: GetPolygonDto })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Get(':id')
  async getPolygonById(
    @Param('id', ParseUUIDPipe) geozoneId: string,
  ): Promise<GetPolygonDto> {
    return await this.geozoneService.getPolygonById(geozoneId);
  }

  
  @ApiOperation({ summary: `Удаление геозоны по ID` })
  @ApiParam({
    name: 'id',
    description: 'ID геозоны',
  })
  @ApiResponse({ status: 200, description: `OK` })
  @ApiResponse({ status: 400, description: `BAD_REQUEST` })
  @ApiResponse({ status: 500, description: `INTERNAL_SERVER_ERROR` })
  @Delete(':id')
  async deletePolygon(
    @Param('id', ParseUUIDPipe) geozoneId: string,
  ): Promise<void> {
    return await this.geozoneService.deletePolygon(geozoneId);
  }
}
