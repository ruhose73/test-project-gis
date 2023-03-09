import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePolygonDto,
  UpdatePolygonDto,
  PaginationDto,
  GetPolygonDto,
} from './dto';
import { Geozone } from './model';
import {
  checkPolygonSql,
  createPolygonSql,
  deletePolygonSql,
  getPolygonByIdSql,
  getPolygonsSql,
  updatePolygonSql,
} from './sql';

@Injectable()
export class GeozoneService {
  constructor(
    @InjectRepository(Geozone)
    private geozoneRepository: Repository<Geozone>,
  ) {}

  //Создание полигона
  async createPolygon(
    createPolygonDto: CreatePolygonDto,
  ): Promise<GetPolygonDto> {
    const linestring = await this.createMultiString(createPolygonDto.polygon);
    const geozoneId = await this.geozoneRepository.query(
      createPolygonSql(createPolygonDto.title, linestring),
    );
    return await this.getPolygonById(geozoneId[0].id);
  }

  //Обновление полигона
  async updatePolygon(geozoneId: string, updatePolygonDto: UpdatePolygonDto) {
    const linestring = await this.createMultiString(updatePolygonDto.polygon);
    await this.geozoneRepository.query(
      updatePolygonSql(geozoneId, updatePolygonDto.title, linestring),
    );
    return await this.getPolygonById(geozoneId);
  }

  //Удаление полигона
  async deletePolygon(geozoneId: string): Promise<void> {
    await this.geozoneRepository.query(deletePolygonSql(geozoneId));
  }

  //Получение всех полигонов
  async getPolygons(
    paginationDto: PaginationDto,
  ): Promise<GetPolygonDto[] | []> {
    const polygons = await this.geozoneRepository.query(
      getPolygonsSql(paginationDto),
    );
    if (polygons.length > 0) {
      return polygons.map((e) =>
        e.json_build_object ? e.json_build_object : {},
      );
    }
    return [];
  }

  //Получение полигона по ID
  async getPolygonById(geozoneId: string): Promise<GetPolygonDto> {
    const polygons = await this.geozoneRepository.query(
      getPolygonByIdSql(geozoneId),
    );
    if (polygons.length === 0 || polygons[0].json_agg === null) {
      throw new BadRequestException('Полигон не найден');
    }
    return polygons[0].json_agg[0];
  }

  //Проверка на наличие полигона с таким же названием
  async checkPolygon(title: string) {
    return await this.geozoneRepository.query(checkPolygonSql(title));
  }

  //Собираем мультистроку из массива координат (geoJson multistring)
  private async createMultiString(lineArray: number[][][]): Promise<string> {
    let linestring: string = '';
    const array = lineArray[0];
    array.map((items, index) => {
      let line = items.reverse().join(' ');
      linestring +=
        (index === 0 ? '' : ' ') +
        line +
        (index + 1 === array.length ? '' : ',');
    });
    return linestring;
  }
}
