import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePolygonDto, UpdatePolygonDto, PaginationDto, GetPolygonDto } from './dto';
import { Geozone } from './model';
import { createPolygonSql, getPolygonByIdSql } from './sql';

// было решено сделать 2 варианта, через ORM и через SQL (оба варианта с PostGis)

@Injectable()
export class GeozoneService {
  constructor(
    @InjectRepository(Geozone)
    private geozoneRepository: Repository<Geozone>,
  ) {}

  //вариант с ORM
  async createPolygon(createPolygonDto: CreatePolygonDto):Promise<GetPolygonDto> {
    const createPolygon = await this.geozoneRepository.save({
      title: createPolygonDto.title,
      polygon: {
        type: 'Polygon',
        //GeoJson format: [lng, lat],
        coordinates: createPolygonDto.polygon,
      },
    });
    return createPolygon;
  }

  async updatePolygon(updatePolygonDto: UpdatePolygonDto) {}

  async deletePolygon(geozoneId: string) {}

  async getPolygons(paginationDto: PaginationDto) {}

  async getPolygonById(geozoneId: string) {}

  //вариант createPolygon на SQL
  async createPolygonSql(createPolygonDto: CreatePolygonDto): Promise<GetPolygonDto> {
    const linestring = await this.createMultiString(createPolygonDto.polygon)
    const geozoneId = await this.geozoneRepository.query(createPolygonSql(createPolygonDto.title, linestring));
    return await this.getPolygonByIdSql(geozoneId[0].id)
  }

  //вариант getPolygonBy на SQL
  async getPolygonByIdSql(geozoneId: string): Promise<GetPolygonDto> {
    const geozone = await this.geozoneRepository.query(getPolygonByIdSql(geozoneId))
    if (geozone.length === 0 || geozone[0].json_agg === null) {
      throw new BadRequestException('Полигон не найден')
    }
    return geozone[0].json_agg[0];
  }

  //Собираем мультистроку из массива координат
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
