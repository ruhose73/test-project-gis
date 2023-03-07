import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeozoneService } from './geozone.service';
import { GeozoneController } from './geozone.controller';
import { Geozone } from './model';
import { CheckPolygonGuard } from './quard/checkPolygon.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Geozone])],
  providers: [GeozoneService, CheckPolygonGuard],
  controllers: [GeozoneController],
  exports: [GeozoneService],
})
export class GeozoneModule {}