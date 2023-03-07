import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreatePolygonDto, PaginationDto , UpdatePolygonDto } from './dto';
import { GeozoneService } from './geozone.service';

@Controller('/geozone')
export class GeozoneController {
  constructor(private readonly geozoneService: GeozoneService) {}

  @Post()
  async createPolygon(@Body() createPolygonDto: CreatePolygonDto) {
    return await this.geozoneService.createPolygon(createPolygonDto)
  }

  @Post('/sql')
  async createPolygonSql(@Body() createPolygonDto: CreatePolygonDto) {
    return await this.geozoneService.createPolygonSql(createPolygonDto)
  }

  @Put()
  async updatePolygon(@Body() updatePolygonDto: UpdatePolygonDto) {
    return await this.geozoneService.updatePolygon(updatePolygonDto)
  }

  @Get()
  async getPolygons(paginationDto: PaginationDto  ) {
    return await this.geozoneService.getPolygons(paginationDto)
  }

  @Get(':id')
  async getPolygonById(@Param('id', ParseUUIDPipe) geozoneId:string) {
    return await this.geozoneService.getPolygonById(geozoneId)
  }

  @Get(':id')
  async getPolygonByIdSql(@Param('id', ParseUUIDPipe) geozoneId:string) {
    return await this.geozoneService.getPolygonByIdSql(geozoneId)
  }

  @Delete(':id')
  async deletePolygon(@Param('id', ParseUUIDPipe) geozoneId:string) {
    return await this.geozoneService.deletePolygon(geozoneId)
  }

}