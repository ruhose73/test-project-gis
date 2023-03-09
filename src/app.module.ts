import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, getPostgresConfig } from './configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeozoneModule } from './modules/geozone/geozone.module';
import { CoordinatesModule } from './modules/coordinates/coordinates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    GeozoneModule,
    CoordinatesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
