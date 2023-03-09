import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeozoneModule } from '../geozone/geozone.module';
import { Geozone } from '../geozone/model';
import { CoordinatesController } from './coordinates.controller';
import { CoordinatesService } from './coordinates.service';

@Module({
  imports: [
    forwardRef(() => GeozoneModule),
    TypeOrmModule.forFeature([Geozone]),
  ],
  providers: [CoordinatesService],
  controllers: [CoordinatesController],
  exports: [CoordinatesService],
})
export class CoordinatesModule {}
