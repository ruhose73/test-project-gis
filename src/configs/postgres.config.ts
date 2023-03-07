import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Geozone } from 'src/modules/geozone/model';
//import { User } from 'src/modules/user/model/user.model';

export const getPostgresConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get('config.postgres.postgresHost'),
    port: configService.get('config.postgres.postgresPort'),
    username: configService.get('config.postgres.postgresUser'),
    password: configService.get('config.postgres.postgresPassword'),
    database: configService.get('config.postgres.postgresDatabase'),
    entities: [Geozone],
    synchronize: true,
  };
};
