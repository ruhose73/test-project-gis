import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPolygonDto } from '../geozone/dto';
import { Geozone } from '../geozone/model';
import {
  checkCoordinatesInGeozonDto,
  checkCoordinatesInGeozonResDto,
} from './dto';
import {
  checkCoordinatesInGeozonSql,
  checkCoordinatesInGeozonsSql,
} from './sql';

@Injectable()
export class CoordinatesService {
  constructor(
    @InjectRepository(Geozone)
    private geozoneRepository: Repository<Geozone>,
  ) {}

  //Проверка вхождения координат в конкретную геозону
  async checkCoordinatesInGeozon(
    geozoneId: string,
    coordinates: checkCoordinatesInGeozonDto,
  ): Promise<checkCoordinatesInGeozonResDto> {
    const checkStatus = await this.geozoneRepository.query(
      checkCoordinatesInGeozonSql(geozoneId, coordinates),
    );
    return { intersects: !!checkStatus[0].st_intersects };
  }

  //Просмотр геозон в которую входит координата
  async checkCoordinatesInGeozons(
    coordinates: checkCoordinatesInGeozonDto,
  ): Promise<GetPolygonDto[] | []> {
    const intersectsPolygons = await this.geozoneRepository.query(
      checkCoordinatesInGeozonsSql(coordinates),
    );
    if (intersectsPolygons.length > 0) {
      return intersectsPolygons.map((e) =>
        e.json_build_object ? e.json_build_object : {},
      );
    }
    return [];
  }
}
