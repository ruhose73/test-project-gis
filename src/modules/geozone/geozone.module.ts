import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeozoneService } from './geozone.service';
import { GeozoneController } from './geozone.controller';
import { Geozone } from './model';

@Module({
  imports: [TypeOrmModule.forFeature([Geozone])],
  providers: [GeozoneService],
  controllers: [GeozoneController],
  exports: [GeozoneService],
})
export class GeozoneModule {}